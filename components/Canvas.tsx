"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Tldraw,
  HTMLContainer,
  ShapeUtil,
  Rectangle2d,
  T,
  resizeBox,
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
    return { w: 300, h: 200, componentName: "Button" };
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
    return (
      <HTMLContainer
        style={{
          padding: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          borderRadius: 8,
          border: "1px solid #e2e1de",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          overflow: "hidden",
          pointerEvents: "all",
        }}
      >
        <div style={{ pointerEvents: "none" }}>
          {getComponentPreview(shape.props.componentName)}
        </div>
      </HTMLContainer>
    );
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

const shapeUtils = [UIComponentShapeUtil];

// ── Main Canvas ─────────────────────────────────────────────
export default function Canvas() {
  const [mode, setMode] = useState<Mode>("sketch");
  const [pickerState, setPickerState] = useState<{
    open: boolean;
    matches: ComponentEntry[];
  }>({ open: false, matches: [] });
  const editorRef = useRef<Editor | null>(null);
  const placeCountRef = useRef(0);

  const placeComponent = useCallback(
    (name: string) => {
      const editor = editorRef.current;
      if (!editor) return;

      const viewportCenter = editor.getViewportScreenCenter();
      const point = editor.screenToPage(viewportCenter);

      // Offset each new shape so they don't stack
      const count = placeCountRef.current++;
      const col = count % 4;
      const row = Math.floor(count / 4);
      const offsetX = (col - 1.5) * 340;
      const offsetY = (row - 0.5) * 240;

      editor.createShape({
        type: "ui-component",
        x: point.x - 150 + offsetX,
        y: point.y - 100 + offsetY,
        props: {
          w: 300,
          h: 200,
          componentName: name,
        },
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
      placeComponent(entry.name);
      setPickerState({ open: false, matches: [] });
    },
    [placeComponent]
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
