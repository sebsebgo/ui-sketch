"use client";

import { css } from "@/styled-system/css";

export type Mode = "sketch" | "voice";

type Props = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
};

export function Toolbar({ mode, onModeChange }: Props) {
  return (
    <div className={css({
      position: "fixed",
      top: "4",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: "modal",
      display: "flex",
      gap: "1",
      p: "1",
      borderRadius: "l3",
      bg: "bg.default",
      shadow: "md",
      border: "1px solid",
      borderColor: "border.muted",
    })}>
      <ToolbarButton
        active={mode === "sketch"}
        onClick={() => onModeChange("sketch")}
        label="Sketch"
        icon="✏️"
      />
      <ToolbarButton
        active={mode === "voice"}
        onClick={() => onModeChange("voice")}
        label="Voice"
        icon="🎙️"
      />
    </div>
  );
}

function ToolbarButton({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}) {
  return (
    <button
      onClick={onClick}
      className={css({
        px: "4",
        py: "2",
        borderRadius: "l2",
        fontSize: "sm",
        fontWeight: active ? "semibold" : "normal",
        bg: active ? "amber.9" : "transparent",
        color: active ? "amber.fg" : "fg.default",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "1.5",
        transition: "all 0.15s",
        _hover: { bg: active ? "amber.9" : "bg.muted" },
      })}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}
