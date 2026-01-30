"use client";

import { type ReactNode } from "react";
import { css } from "@/styled-system/css";

// Simple preview renderers for each Park UI component
// These render static previews suitable for display on the canvas
const previews: Record<string, () => ReactNode> = {
  Accordion: () => (
    <div className={previewCard}>
      <div className={previewRow}><span>&#9654;</span> Section 1</div>
      <div className={previewRow}><span>&#9660;</span> Section 2</div>
      <div className={css({ pl: "6", py: "2", color: "fg.muted", fontSize: "sm" })}>
        Expanded content here...
      </div>
      <div className={previewRow}><span>&#9654;</span> Section 3</div>
    </div>
  ),
  Alert: () => (
    <div className={css({ p: "4", borderRadius: "l2", bg: "amber.3", border: "1px solid", borderColor: "amber.7", display: "flex", gap: "2", alignItems: "center" })}>
      <span>&#9888;</span>
      <div>
        <div className={css({ fontWeight: "semibold" })}>Alert Title</div>
        <div className={css({ fontSize: "sm", color: "fg.muted" })}>This is an alert message.</div>
      </div>
    </div>
  ),
  Avatar: () => (
    <div className={css({ w: "12", h: "12", borderRadius: "full", bg: "amber.9", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "lg" })}>
      JD
    </div>
  ),
  Badge: () => (
    <span className={css({ px: "2.5", py: "0.5", borderRadius: "full", bg: "amber.9", color: "amber.fg", fontSize: "xs", fontWeight: "semibold" })}>
      Badge
    </span>
  ),
  Button: () => (
    <button className={css({ px: "4", py: "2", borderRadius: "l2", bg: "amber.9", color: "amber.fg", fontWeight: "semibold", cursor: "pointer", fontSize: "sm" })}>
      Button
    </button>
  ),
  Card: () => (
    <div className={css({ p: "5", borderRadius: "l3", bg: "bg.default", border: "1px solid", borderColor: "border.muted", shadow: "sm", minW: "200px" })}>
      <div className={css({ fontWeight: "semibold", mb: "2" })}>Card Title</div>
      <div className={css({ fontSize: "sm", color: "fg.muted" })}>Card content goes here.</div>
    </div>
  ),
  Checkbox: () => (
    <label className={css({ display: "flex", alignItems: "center", gap: "2", cursor: "pointer" })}>
      <div className={css({ w: "5", h: "5", borderRadius: "sm", border: "2px solid", borderColor: "amber.9", display: "flex", alignItems: "center", justifyContent: "center", bg: "amber.9", color: "white", fontSize: "xs" })}>&#10003;</div>
      <span className={css({ fontSize: "sm" })}>Checkbox label</span>
    </label>
  ),
  Code: () => (
    <pre className={css({ p: "3", borderRadius: "l2", bg: "gray.3", fontFamily: "mono", fontSize: "sm", overflow: "auto" })}>
      <code>{`const hello = "world";`}</code>
    </pre>
  ),
  "Date Picker": () => (
    <div className={css({ p: "3", borderRadius: "l2", border: "1px solid", borderColor: "border.default", display: "flex", alignItems: "center", gap: "2", minW: "200px" })}>
      <span>&#128197;</span>
      <span className={css({ fontSize: "sm" })}>Jan 30, 2026</span>
    </div>
  ),
  Dialog: () => (
    <div className={css({ p: "5", borderRadius: "l3", bg: "bg.default", shadow: "lg", border: "1px solid", borderColor: "border.muted", minW: "280px" })}>
      <div className={css({ fontWeight: "semibold", mb: "1" })}>Dialog Title</div>
      <div className={css({ fontSize: "sm", color: "fg.muted", mb: "4" })}>Are you sure you want to continue?</div>
      <div className={css({ display: "flex", gap: "2", justifyContent: "flex-end" })}>
        <button className={css({ px: "3", py: "1.5", borderRadius: "l2", border: "1px solid", borderColor: "border.default", fontSize: "sm" })}>Cancel</button>
        <button className={css({ px: "3", py: "1.5", borderRadius: "l2", bg: "amber.9", color: "amber.fg", fontSize: "sm", fontWeight: "semibold" })}>Confirm</button>
      </div>
    </div>
  ),
  Drawer: () => (
    <div className={css({ p: "4", borderRadius: "l3", bg: "bg.default", shadow: "lg", border: "1px solid", borderColor: "border.muted", minW: "200px", minH: "150px" })}>
      <div className={css({ fontWeight: "semibold", mb: "3" })}>Drawer</div>
      <div className={css({ fontSize: "sm", color: "fg.muted" })}>Side panel content</div>
    </div>
  ),
  Heading: () => (
    <h2 className={css({ fontSize: "2xl", fontWeight: "bold" })}>Heading Text</h2>
  ),
  "Hover Card": () => (
    <div className={css({ p: "4", borderRadius: "l3", bg: "bg.default", shadow: "md", border: "1px solid", borderColor: "border.muted", minW: "220px" })}>
      <div className={css({ fontWeight: "semibold", mb: "1" })}>Hover Card</div>
      <div className={css({ fontSize: "sm", color: "fg.muted" })}>Shows on hover</div>
    </div>
  ),
  "Icon Button": () => (
    <button className={css({ w: "10", h: "10", borderRadius: "l2", bg: "amber.9", color: "amber.fg", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "lg" })}>
      &#9998;
    </button>
  ),
  Input: () => (
    <div className={css({ minW: "240px" })}>
      <label className={css({ fontSize: "sm", fontWeight: "medium", mb: "1.5", display: "block" })}>Label</label>
      <div className={css({ px: "3", py: "2", borderRadius: "l2", border: "1px solid", borderColor: "border.default", fontSize: "sm", color: "fg.subtle" })}>
        Placeholder text...
      </div>
    </div>
  ),
  Menu: () => (
    <div className={css({ borderRadius: "l2", bg: "bg.default", shadow: "md", border: "1px solid", borderColor: "border.muted", minW: "160px", overflow: "hidden" })}>
      {["Edit", "Duplicate", "Delete"].map((item) => (
        <div key={item} className={css({ px: "3", py: "2", fontSize: "sm", _hover: { bg: "bg.muted" }, cursor: "pointer" })}>
          {item}
        </div>
      ))}
    </div>
  ),
  "Number Input": () => (
    <div className={css({ display: "flex", alignItems: "center", border: "1px solid", borderColor: "border.default", borderRadius: "l2", overflow: "hidden" })}>
      <button className={css({ px: "3", py: "2", borderRight: "1px solid", borderColor: "border.default" })}>-</button>
      <span className={css({ px: "4", py: "2", fontSize: "sm", minW: "40px", textAlign: "center" })}>5</span>
      <button className={css({ px: "3", py: "2", borderLeft: "1px solid", borderColor: "border.default" })}>+</button>
    </div>
  ),
  Pagination: () => (
    <div className={css({ display: "flex", gap: "1", alignItems: "center" })}>
      {["<", "1", "2", "3", ">"].map((p) => (
        <button key={p} className={css({ w: "8", h: "8", borderRadius: "l2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "sm", bg: p === "2" ? "amber.9" : "transparent", color: p === "2" ? "amber.fg" : "fg.default", border: "1px solid", borderColor: p === "2" ? "amber.9" : "border.muted" })}>
          {p}
        </button>
      ))}
    </div>
  ),
  "Pin Input": () => (
    <div className={css({ display: "flex", gap: "2" })}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={css({ w: "10", h: "12", borderRadius: "l2", border: "1px solid", borderColor: "border.default", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "lg", fontWeight: "bold" })}>
          {i <= 2 ? "●" : ""}
        </div>
      ))}
    </div>
  ),
  Popover: () => (
    <div className={css({ p: "4", borderRadius: "l3", bg: "bg.default", shadow: "md", border: "1px solid", borderColor: "border.muted", minW: "200px" })}>
      <div className={css({ fontWeight: "semibold", mb: "1", fontSize: "sm" })}>Popover</div>
      <div className={css({ fontSize: "sm", color: "fg.muted" })}>Floating content</div>
    </div>
  ),
  Progress: () => (
    <div className={css({ minW: "200px" })}>
      <div className={css({ h: "2.5", borderRadius: "full", bg: "gray.3", overflow: "hidden" })}>
        <div className={css({ h: "full", w: "65%", bg: "amber.9", borderRadius: "full" })} />
      </div>
    </div>
  ),
  "Radio Group": () => (
    <div className={css({ display: "flex", flexDir: "column", gap: "2" })}>
      {["Option A", "Option B", "Option C"].map((opt, i) => (
        <label key={opt} className={css({ display: "flex", alignItems: "center", gap: "2", fontSize: "sm", cursor: "pointer" })}>
          <div className={css({ w: "5", h: "5", borderRadius: "full", border: "2px solid", borderColor: i === 0 ? "amber.9" : "border.default", display: "flex", alignItems: "center", justifyContent: "center" })}>
            {i === 0 && <div className={css({ w: "2.5", h: "2.5", borderRadius: "full", bg: "amber.9" })} />}
          </div>
          {opt}
        </label>
      ))}
    </div>
  ),
  "Rating Group": () => (
    <div className={css({ display: "flex", gap: "1", fontSize: "xl" })}>
      {"★★★★☆".split("").map((s, i) => (
        <span key={i} className={css({ color: s === "★" ? "amber.9" : "gray.6" })}>{s}</span>
      ))}
    </div>
  ),
  Select: () => (
    <div className={css({ minW: "200px" })}>
      <label className={css({ fontSize: "sm", fontWeight: "medium", mb: "1.5", display: "block" })}>Select</label>
      <div className={css({ px: "3", py: "2", borderRadius: "l2", border: "1px solid", borderColor: "border.default", fontSize: "sm", display: "flex", justifyContent: "space-between", alignItems: "center" })}>
        <span>Choose option...</span>
        <span>&#9660;</span>
      </div>
    </div>
  ),
  Skeleton: () => (
    <div className={css({ display: "flex", flexDir: "column", gap: "2", minW: "200px" })}>
      <div className={css({ h: "4", borderRadius: "l2", bg: "gray.4", animation: "skeleton-pulse" })} />
      <div className={css({ h: "4", w: "75%", borderRadius: "l2", bg: "gray.4", animation: "skeleton-pulse" })} />
      <div className={css({ h: "4", w: "50%", borderRadius: "l2", bg: "gray.4", animation: "skeleton-pulse" })} />
    </div>
  ),
  Slider: () => (
    <div className={css({ minW: "200px", py: "2" })}>
      <div className={css({ h: "2", borderRadius: "full", bg: "gray.3", position: "relative" })}>
        <div className={css({ h: "full", w: "40%", bg: "amber.9", borderRadius: "full" })} />
        <div className={css({ w: "5", h: "5", borderRadius: "full", bg: "amber.9", border: "2px solid white", shadow: "sm", position: "absolute", top: "50%", left: "40%", transform: "translate(-50%, -50%)" })} />
      </div>
    </div>
  ),
  Spinner: () => (
    <div className={css({ w: "8", h: "8", border: "3px solid", borderColor: "gray.3", borderTopColor: "amber.9", borderRadius: "full", animation: "spin" })} />
  ),
  Switch: () => (
    <div className={css({ w: "11", h: "6", borderRadius: "full", bg: "amber.9", position: "relative", cursor: "pointer" })}>
      <div className={css({ w: "5", h: "5", borderRadius: "full", bg: "white", shadow: "sm", position: "absolute", top: "50%", right: "0.5", transform: "translateY(-50%)" })} />
    </div>
  ),
  Table: () => (
    <div className={css({ borderRadius: "l2", border: "1px solid", borderColor: "border.muted", overflow: "hidden", fontSize: "sm", minW: "280px" })}>
      <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", bg: "bg.muted", fontWeight: "semibold" })}>
        <div className={css({ px: "3", py: "2" })}>Name</div>
        <div className={css({ px: "3", py: "2" })}>Email</div>
        <div className={css({ px: "3", py: "2" })}>Role</div>
      </div>
      <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid", borderColor: "border.muted" })}>
        <div className={css({ px: "3", py: "2" })}>John</div>
        <div className={css({ px: "3", py: "2" })}>john@ex.co</div>
        <div className={css({ px: "3", py: "2" })}>Admin</div>
      </div>
    </div>
  ),
  Tabs: () => (
    <div className={css({ minW: "240px" })}>
      <div className={css({ display: "flex", borderBottom: "1px solid", borderColor: "border.muted" })}>
        {["Tab 1", "Tab 2", "Tab 3"].map((t, i) => (
          <div key={t} className={css({ px: "4", py: "2", fontSize: "sm", fontWeight: i === 0 ? "semibold" : "normal", borderBottom: "2px solid", borderColor: i === 0 ? "amber.9" : "transparent", color: i === 0 ? "fg.default" : "fg.muted", cursor: "pointer" })}>
            {t}
          </div>
        ))}
      </div>
      <div className={css({ p: "3", fontSize: "sm", color: "fg.muted" })}>Tab content</div>
    </div>
  ),
  "Tags Input": () => (
    <div className={css({ display: "flex", flexWrap: "wrap", gap: "1.5", p: "2", borderRadius: "l2", border: "1px solid", borderColor: "border.default", minW: "220px" })}>
      {["React", "TypeScript"].map((t) => (
        <span key={t} className={css({ px: "2", py: "0.5", borderRadius: "l1", bg: "gray.3", fontSize: "xs", display: "flex", alignItems: "center", gap: "1" })}>
          {t} <span className={css({ cursor: "pointer" })}>&#10005;</span>
        </span>
      ))}
      <span className={css({ fontSize: "sm", color: "fg.subtle" })}>Add tag...</span>
    </div>
  ),
  Text: () => (
    <p className={css({ fontSize: "sm", color: "fg.default", maxW: "240px" })}>
      The quick brown fox jumps over the lazy dog. This is a paragraph of text.
    </p>
  ),
  Textarea: () => (
    <div className={css({ minW: "240px" })}>
      <label className={css({ fontSize: "sm", fontWeight: "medium", mb: "1.5", display: "block" })}>Message</label>
      <div className={css({ px: "3", py: "2", borderRadius: "l2", border: "1px solid", borderColor: "border.default", fontSize: "sm", color: "fg.subtle", minH: "80px" })}>
        Type your message...
      </div>
    </div>
  ),
  Toast: () => (
    <div className={css({ p: "4", borderRadius: "l3", bg: "bg.default", shadow: "lg", border: "1px solid", borderColor: "border.muted", display: "flex", gap: "3", alignItems: "center", minW: "260px" })}>
      <span className={css({ color: "green.9", fontSize: "lg" })}>&#10003;</span>
      <div>
        <div className={css({ fontWeight: "semibold", fontSize: "sm" })}>Success</div>
        <div className={css({ fontSize: "xs", color: "fg.muted" })}>Changes saved successfully.</div>
      </div>
    </div>
  ),
  "Toggle Group": () => (
    <div className={css({ display: "flex", borderRadius: "l2", border: "1px solid", borderColor: "border.muted", overflow: "hidden" })}>
      {["Left", "Center", "Right"].map((t, i) => (
        <button key={t} className={css({ px: "3", py: "1.5", fontSize: "sm", bg: i === 1 ? "amber.9" : "bg.default", color: i === 1 ? "amber.fg" : "fg.default", borderRight: i < 2 ? "1px solid" : "none", borderColor: "border.muted" })}>
          {t}
        </button>
      ))}
    </div>
  ),
  Tooltip: () => (
    <div className={css({ px: "3", py: "1.5", borderRadius: "l2", bg: "gray.12", color: "gray.1", fontSize: "xs", shadow: "sm" })}>
      Tooltip text
    </div>
  ),
  "Tree View": () => (
    <div className={css({ fontSize: "sm", minW: "180px" })}>
      <div>&#128193; src</div>
      <div className={css({ pl: "4" })}>&#128193; components</div>
      <div className={css({ pl: "8" })}>&#128196; Button.tsx</div>
      <div className={css({ pl: "8" })}>&#128196; Input.tsx</div>
      <div className={css({ pl: "4" })}>&#128196; index.ts</div>
    </div>
  ),
};

const previewCard = css({
  borderRadius: "l2",
  border: "1px solid",
  borderColor: "border.muted",
  overflow: "hidden",
  minW: "220px",
});

const previewRow = css({
  px: "3",
  py: "2",
  fontSize: "sm",
  borderBottom: "1px solid",
  borderColor: "border.subtle",
  display: "flex",
  gap: "2",
  alignItems: "center",
  cursor: "pointer",
});

export function getComponentPreview(name: string): ReactNode {
  return previews[name]?.() ?? (
    <div className={css({ p: "4", borderRadius: "l2", bg: "bg.muted", fontSize: "sm" })}>
      {name}
    </div>
  );
}
