"use client";

import { css } from "@/styled-system/css";
import type { ComponentEntry } from "@/lib/component-registry";
import { getComponentPreview } from "./ComponentPreview";

type Props = {
  matches: ComponentEntry[];
  onSelect: (entry: ComponentEntry) => void;
  onClose: () => void;
};

export function ComponentPicker({ matches, onSelect, onClose }: Props) {
  return (
    <div className={css({
      position: "fixed",
      inset: "0",
      zIndex: "overlay",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    })}>
      {/* Backdrop */}
      <div
        className={css({
          position: "absolute",
          inset: "0",
          bg: "black/40",
          cursor: "pointer",
        })}
        onClick={onClose}
      />

      {/* Picker */}
      <div className={css({
        position: "relative",
        bg: "bg.default",
        borderRadius: "l3",
        shadow: "xl",
        p: "6",
        maxW: "600px",
        w: "90vw",
        maxH: "80vh",
        overflow: "auto",
      })}>
        <div className={css({ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "4" })}>
          <h2 className={css({ fontSize: "lg", fontWeight: "semibold" })}>
            Which component did you mean?
          </h2>
          <button
            onClick={onClose}
            className={css({
              w: "8",
              h: "8",
              borderRadius: "l2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              _hover: { bg: "bg.muted" },
              fontSize: "lg",
            })}
          >
            &#10005;
          </button>
        </div>

        <div className={css({ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "3" })}>
          {matches.map((entry) => (
            <button
              key={entry.name}
              onClick={() => onSelect(entry)}
              className={css({
                p: "4",
                borderRadius: "l2",
                border: "1px solid",
                borderColor: "border.muted",
                cursor: "pointer",
                textAlign: "left",
                bg: "bg.default",
                _hover: { bg: "bg.muted", borderColor: "border.default" },
                transition: "all 0.15s",
                display: "flex",
                flexDir: "column",
                gap: "3",
              })}
            >
              <div className={css({ fontSize: "sm", fontWeight: "semibold" })}>
                {entry.name}
              </div>
              <div className={css({ transform: "scale(0.8)", transformOrigin: "top left" })}>
                {getComponentPreview(entry.name)}
              </div>
              <div className={css({ fontSize: "xs", color: "fg.muted" })}>
                {entry.category}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
