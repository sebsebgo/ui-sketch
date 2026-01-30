"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Tldraw,
  HTMLContainer,
  ShapeUtil,
  Rectangle2d,
  T,
  resizeBox,
  useEditor,
  type TLShape,
  type TLResizeInfo,
  type Geometry2d,
  type RecordProps,
  type Editor,
} from "tldraw";
import "tldraw/tldraw.css";
import { css } from "@/styled-system/css";
import { Toolbar, type Mode } from "./Toolbar";
import { VoiceInput } from "./VoiceInput";
import { ComponentPicker } from "./ComponentPicker";
import { getComponentPreview } from "./ComponentPreview";
import { matchComponent, type MatchResult } from "@/lib/matcher";
import { componentRegistry, type ComponentEntry } from "@/lib/component-registry";
import { classifySketch } from "@/lib/sketch-classifier";

// ── Custom shape type ──────────────────────────────────────
declare module "tldraw" {
  export interface TLGlobalShapePropsMap {
    "ui-component": {
      w: number;
      h: number;
      componentName: string;
    };
  }
}

type UIComponentShape = TLShape<"ui-component">;

class UIComponentShapeUtil extends ShapeUtil<UIComponentShape> {
  static override type = "ui-component" as const;

  static override props: RecordProps<UIComponentShape> = {
    w: T.number,
    h: T.number,
    componentName: T.string,
  };

  getDefaultProps(): UIComponentShape["props"] {
    return { w: 100, h: 50, componentName: "Button" };
  }

  override canEdit() {
    return false;
  }
  override canResize() {
    return true;
  }
  override isAspectRatioLocked() {
    return false;
  }

  getGeometry(shape: UIComponentShape): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  override onResize(
    shape: UIComponentShape,
    info: TLResizeInfo<UIComponentShape>
  ) {
    return resizeBox(shape, info);
  }

  component(shape: UIComponentShape) {
    return <AutoSizeWrapper shape={shape} />;
  }

  indicator(shape: UIComponentShape) {
    return (
      <rect
        width={shape.props.w}
        height={shape.props.h}
        rx={8}
        ry={8}
      />
    );
  }
}

function AutoSizeWrapper({ shape }: { shape: UIComponentShape }) {
  const editor = useEditor();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (
        width > 0 &&
        height > 0 &&
        (Math.abs(width - shape.props.w) > 1 ||
          Math.abs(height - shape.props.h) > 1)
      ) {
        editor.updateShape({
          id: shape.id,
          type: "ui-component",
          props: { w: width, h: height },
        });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [editor, shape.id, shape.props.w, shape.props.h]);

  return (
    <HTMLContainer
      style={{
        width: "fit-content",
        height: "fit-content",
        pointerEvents: "all",
      }}
    >
      <div ref={ref} style={{ pointerEvents: "none" }}>
        {getComponentPreview(shape.props.componentName)}
      </div>
    </HTMLContainer>
  );
}

const shapeUtils = [UIComponentShapeUtil];

// ── Main Canvas ─────────────────────────────────────────────
export default function Canvas() {
  const [mode, setMode] = useState<Mode>("sketch");
  const [pickerState, setPickerState] = useState<{
    open: boolean;
    matches: ComponentEntry[];
    replaceShapeId?: string; // sketch shape to replace when picking
  }>({ open: false, matches: [] });
  const editorRef = useRef<Editor | null>(null);
  const placeCountRef = useRef(0);
  const modeRef = useRef<Mode>(mode);
  modeRef.current = mode;

  const placeComponent = useCallback(
    (name: string, opts?: { replaceShapeId?: string }) => {
      const editor = editorRef.current;
      if (!editor) return;

      let x: number;
      let y: number;
      let w = 100;
      let h = 50;

      // If replacing a sketch shape, use its position and remove it
      if (opts?.replaceShapeId) {
        const existing = editor.getShape(opts.replaceShapeId as any);
        if (existing) {
          x = existing.x;
          y = existing.y;
          const bounds = editor.getShapeGeometry(existing).bounds;
          w = Math.max(bounds.width, 100);
          h = Math.max(bounds.height, 50);
          editor.deleteShape(opts.replaceShapeId as any);
        } else {
          const viewportCenter = editor.getViewportScreenCenter();
          const point = editor.screenToPage(viewportCenter);
          x = point.x - 150;
          y = point.y - 100;
        }
      } else {
        const viewportCenter = editor.getViewportScreenCenter();
        const point = editor.screenToPage(viewportCenter);

        // Offset each new shape so they don't stack
        const count = placeCountRef.current++;
        const col = count % 4;
        const row = Math.floor(count / 4);
        x = point.x - 150 + (col - 1.5) * 340;
        y = point.y - 100 + (row - 0.5) * 240;
      }

      editor.createShape({
        type: "ui-component",
        x,
        y,
        props: { w, h, componentName: name },
      });
    },
    []
  );

  const handleTranscript = useCallback(
    (text: string) => {
      const result: MatchResult = matchComponent(text);

      switch (result.type) {
        case "exact":
        case "fuzzy":
          placeComponent(result.matches[0].name);
          break;
        case "ambiguous":
          setPickerState({ open: true, matches: result.matches });
          break;
        case "none":
          // Show all components when no match
          setPickerState({
            open: true,
            matches: [],
          });
          break;
      }
    },
    [placeComponent]
  );

  // Expose for testing
  useEffect(() => {
    (window as any).__testTranscript = handleTranscript;
    return () => { delete (window as any).__testTranscript; };
  }, [handleTranscript]);

  const handlePickerSelect = useCallback(
    (entry: ComponentEntry) => {
      placeComponent(entry.name, {
        replaceShapeId: pickerState.replaceShapeId,
      });
      setPickerState({ open: false, matches: [] });
    },
    [placeComponent, pickerState.replaceShapeId]
  );

  return (
    <div
      className={css({
        position: "fixed",
        inset: "0",
        w: "100vw",
        h: "100vh",
      })}
    >
      <Tldraw
        shapeUtils={shapeUtils}
        onMount={(editor) => {
          editorRef.current = editor;

          // Listen for completed draw/geo shapes in sketch mode
          const geoTimers = new Map<string, ReturnType<typeof setTimeout>>();
          const classifiedShapes = new Set<string>();

          editor.sideEffects.registerAfterChangeHandler("shape", (prev, next) => {
            if (modeRef.current !== "sketch") return;
            // Don't re-classify shapes we already handled
            if (classifiedShapes.has(next.id)) return;

            // Only handle draw shapes that just became complete
            if (next.type === "draw") {
              const drawProps = next.props as any;
              if (!drawProps.isComplete || (prev.props as any).isComplete) return;
              classifiedShapes.add(next.id);

              const bounds = editor.getShapeGeometry(next).bounds;
              const result = classifySketch({
                type: "draw",
                width: bounds.width,
                height: bounds.height,
                isClosed: drawProps.isClosed,
                pointCount: drawProps.segments?.reduce(
                  (sum: number, s: any) => sum + (s.path?.split(" ").length ?? 0),
                  0
                ),
              });
              if (result.matches.length > 0) {
                setPickerState({
                  open: true,
                  matches: result.matches,
                  replaceShapeId: next.id,
                });
              }
            }

            // Handle geo shapes — debounce to get final dimensions after drag
            if (next.type === "geo") {
              const geoProps = next.props as any;
              if (geoProps.w <= 1 && geoProps.h <= 1) return;

              // Clear previous timer for this shape
              const existing = geoTimers.get(next.id);
              if (existing) clearTimeout(existing);

              // Set a new timer — fires 300ms after the last resize
              geoTimers.set(
                next.id,
                setTimeout(() => {
                  geoTimers.delete(next.id);
                  if (classifiedShapes.has(next.id)) return;
                  classifiedShapes.add(next.id);

                  // Re-read the shape to get final dimensions
                  const shape = editor.getShape(next.id as any);
                  if (!shape || shape.type !== "geo") return;
                  const props = shape.props as any;

                  const result = classifySketch({
                    type: "geo",
                    geo: props.geo,
                    width: props.w,
                    height: props.h,
                  });
                  if (result.matches.length > 0) {
                    setPickerState({
                      open: true,
                      matches: result.matches,
                      replaceShapeId: next.id,
                    });
                  }
                }, 300)
              );
            }
          });
        }}
      />

      {/* Toolbar */}
      <Toolbar mode={mode} onModeChange={setMode} />

      {/* Voice Input Panel */}
      {mode === "voice" && (
        <div
          className={css({
            position: "fixed",
            bottom: "8",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "modal",
          })}
        >
          <VoiceInput active={mode === "voice"} onTranscript={handleTranscript} />
        </div>
      )}

      {/* Component Picker */}
      {pickerState.open && (
        <ComponentPicker
          matches={
            pickerState.matches.length > 0
              ? pickerState.matches
              : componentRegistry
          }
          onSelect={handlePickerSelect}
          onClose={() => setPickerState({ open: false, matches: [] })}
        />
      )}
    </div>
  );
}
