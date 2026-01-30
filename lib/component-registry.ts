import { type ReactNode } from "react";

export type ComponentEntry = {
  name: string;
  aliases: string[];
  keywords: string[];
  category:
    | "form"
    | "display"
    | "overlay"
    | "interactive"
    | "feedback"
    | "navigation"
    | "layout";
  preview: () => ReactNode;
};

// Lazily populated — preview functions are defined in ComponentPreview.tsx
// This file provides metadata only.
export const componentRegistry: ComponentEntry[] = [
  {
    name: "Accordion",
    aliases: ["collapse", "expandable", "collapsible"],
    keywords: ["expand", "faq", "sections", "toggle"],
    category: "interactive",
    preview: () => null,
  },
  {
    name: "Alert",
    aliases: ["notification", "banner", "message"],
    keywords: ["warning", "info", "error", "success", "notice"],
    category: "feedback",
    preview: () => null,
  },
  {
    name: "Avatar",
    aliases: ["profile", "user-image", "photo"],
    keywords: ["user", "picture", "identity", "circle"],
    category: "display",
    preview: () => null,
  },
  {
    name: "Badge",
    aliases: ["tag", "chip", "label"],
    keywords: ["status", "count", "indicator", "pill"],
    category: "display",
    preview: () => null,
  },
  {
    name: "Button",
    aliases: ["btn", "click", "press", "action"],
    keywords: ["submit", "cta", "action", "click", "press"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Card",
    aliases: ["panel", "tile", "container"],
    keywords: ["content", "box", "section", "wrapper"],
    category: "layout",
    preview: () => null,
  },
  {
    name: "Checkbox",
    aliases: ["check", "tick", "checkmark"],
    keywords: ["toggle", "select", "boolean", "option"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Code",
    aliases: ["snippet", "codeblock", "source"],
    keywords: ["programming", "syntax", "monospace"],
    category: "display",
    preview: () => null,
  },
  {
    name: "Date Picker",
    aliases: ["datepicker", "calendar", "date-select"],
    keywords: ["date", "calendar", "schedule", "pick a date"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Dialog",
    aliases: ["modal", "popup", "lightbox"],
    keywords: ["overlay", "confirm", "alert", "prompt", "window"],
    category: "overlay",
    preview: () => null,
  },
  {
    name: "Drawer",
    aliases: ["sidebar", "side-panel", "slide"],
    keywords: ["panel", "slide", "navigation", "off-canvas"],
    category: "overlay",
    preview: () => null,
  },
  {
    name: "Heading",
    aliases: ["title", "header", "h1", "h2", "h3"],
    keywords: ["text", "title", "headline"],
    category: "display",
    preview: () => null,
  },
  {
    name: "Hover Card",
    aliases: ["hovercard", "preview-card", "popover-preview"],
    keywords: ["hover", "preview", "tooltip-card"],
    category: "overlay",
    preview: () => null,
  },
  {
    name: "Icon Button",
    aliases: ["icon-btn", "round-button"],
    keywords: ["icon", "action", "circle-button"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Input",
    aliases: ["text-input", "textfield", "text-box"],
    keywords: ["type", "enter", "field", "form", "text"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Menu",
    aliases: ["dropdown", "dropdown-menu", "context-menu"],
    keywords: ["options", "actions", "list", "select"],
    category: "interactive",
    preview: () => null,
  },
  {
    name: "Number Input",
    aliases: ["number-field", "stepper", "numeric"],
    keywords: ["number", "quantity", "increment", "counter"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Pagination",
    aliases: ["pager", "page-nav"],
    keywords: ["pages", "navigate", "next", "previous"],
    category: "navigation",
    preview: () => null,
  },
  {
    name: "Pin Input",
    aliases: ["otp", "verification-code", "pin-code"],
    keywords: ["code", "verify", "otp", "pin"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Popover",
    aliases: ["popup", "bubble", "dropdown-content"],
    keywords: ["overlay", "float", "tooltip", "info"],
    category: "overlay",
    preview: () => null,
  },
  {
    name: "Progress",
    aliases: ["progress-bar", "loading-bar", "meter"],
    keywords: ["loading", "percent", "status", "bar"],
    category: "feedback",
    preview: () => null,
  },
  {
    name: "Radio Group",
    aliases: ["radio", "radio-button", "option-group"],
    keywords: ["select", "choose", "option", "single"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Rating Group",
    aliases: ["rating", "stars", "star-rating"],
    keywords: ["rate", "review", "score", "stars"],
    category: "interactive",
    preview: () => null,
  },
  {
    name: "Select",
    aliases: ["dropdown-select", "picker", "combobox"],
    keywords: ["choose", "option", "list", "pick"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Skeleton",
    aliases: ["placeholder", "loading-skeleton", "shimmer"],
    keywords: ["loading", "placeholder", "ghost"],
    category: "feedback",
    preview: () => null,
  },
  {
    name: "Slider",
    aliases: ["range", "range-slider", "scrubber"],
    keywords: ["slide", "range", "value", "drag"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Spinner",
    aliases: ["loader", "loading", "busy"],
    keywords: ["loading", "wait", "progress", "spin"],
    category: "feedback",
    preview: () => null,
  },
  {
    name: "Switch",
    aliases: ["toggle", "toggle-switch", "on-off"],
    keywords: ["toggle", "boolean", "on", "off", "enable"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Table",
    aliases: ["data-table", "grid", "spreadsheet"],
    keywords: ["rows", "columns", "data", "list"],
    category: "display",
    preview: () => null,
  },
  {
    name: "Tabs",
    aliases: ["tab-bar", "tab-list", "tab-group"],
    keywords: ["navigate", "switch", "sections", "views"],
    category: "navigation",
    preview: () => null,
  },
  {
    name: "Tags Input",
    aliases: ["tag-input", "chip-input", "multi-input"],
    keywords: ["tags", "labels", "chips", "multi"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Text",
    aliases: ["paragraph", "body", "copy"],
    keywords: ["text", "content", "paragraph", "prose"],
    category: "display",
    preview: () => null,
  },
  {
    name: "Textarea",
    aliases: ["text-area", "multiline", "comment-box"],
    keywords: ["multiline", "long text", "comment", "message"],
    category: "form",
    preview: () => null,
  },
  {
    name: "Toast",
    aliases: ["snackbar", "notification", "flash"],
    keywords: ["message", "alert", "temporary", "popup"],
    category: "feedback",
    preview: () => null,
  },
  {
    name: "Toggle Group",
    aliases: ["button-group", "segmented-control"],
    keywords: ["group", "toggle", "segment", "options"],
    category: "interactive",
    preview: () => null,
  },
  {
    name: "Tooltip",
    aliases: ["hint", "info-tip", "help-text"],
    keywords: ["hover", "info", "help", "tip"],
    category: "overlay",
    preview: () => null,
  },
  {
    name: "Tree View",
    aliases: ["tree", "file-tree", "hierarchy"],
    keywords: ["tree", "nested", "expand", "files", "folders"],
    category: "interactive",
    preview: () => null,
  },
];
