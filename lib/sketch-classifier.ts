import type { ComponentEntry } from "./component-registry";
import { componentRegistry } from "./component-registry";

export type SketchClassification = {
  matches: ComponentEntry[];
};

type ShapeInfo = {
  type: "geo" | "draw";
  geo?: string; // rectangle, ellipse, triangle, etc.
  width: number;
  height: number;
  isClosed?: boolean;
  pointCount?: number;
};

function findByNames(...names: string[]): ComponentEntry[] {
  return names
    .map((n) => componentRegistry.find((c) => c.name === n))
    .filter((c): c is ComponentEntry => c !== undefined);
}

export function classifySketch(info: ShapeInfo): SketchClassification {
  const aspectRatio = info.width / info.height;
  const isWide = aspectRatio > 2;
  const isTall = aspectRatio < 0.5;
  const isSquarish = aspectRatio > 0.7 && aspectRatio < 1.4;
  const isSmall = info.width < 80 && info.height < 80;

  // Geo shapes — direct mapping from tldraw's built-in shape tools
  if (info.type === "geo" && info.geo) {
    switch (info.geo) {
      case "rectangle":
        if (isSmall) return { matches: findByNames("Button", "Icon Button", "Badge", "Checkbox") };
        if (isWide) return { matches: findByNames("Input", "Textarea", "Progress", "Slider", "Tabs") };
        if (isTall) return { matches: findByNames("Drawer", "Menu", "Tree View") };
        return { matches: findByNames("Card", "Dialog", "Table", "Select") };

      case "ellipse":
      case "oval":
        if (isSquarish && isSmall) return { matches: findByNames("Avatar", "Spinner", "Icon Button") };
        if (isSquarish) return { matches: findByNames("Avatar", "Spinner", "Badge") };
        return { matches: findByNames("Badge", "Button", "Avatar") };

      case "triangle":
        return { matches: findByNames("Alert", "Tooltip") };

      case "diamond":
        return { matches: findByNames("Badge", "Alert", "Toast") };

      case "pentagon":
      case "hexagon":
      case "octagon":
        return { matches: findByNames("Badge", "Avatar", "Icon Button") };

      case "star":
        return { matches: findByNames("Rating Group", "Badge", "Icon Button") };

      case "arrow-right":
      case "arrow-left":
      case "arrow-up":
      case "arrow-down":
        return { matches: findByNames("Pagination", "Button", "Tabs") };

      case "check-box":
        return { matches: findByNames("Checkbox", "Switch", "Toggle Group") };

      case "x-box":
        return { matches: findByNames("Dialog", "Alert", "Toast") };

      case "cloud":
        return { matches: findByNames("Popover", "Hover Card", "Tooltip") };

      case "heart":
        return { matches: findByNames("Rating Group", "Icon Button") };

      default:
        // Fallback for unknown geo types
        return { matches: findByNames("Card", "Button", "Badge") };
    }
  }

  // Freehand draw shapes — classify by bounding box
  if (info.type === "draw") {
    // Closed shapes (user completed a loop)
    if (info.isClosed) {
      if (isSquarish && isSmall) return { matches: findByNames("Avatar", "Checkbox", "Icon Button") };
      if (isSquarish) return { matches: findByNames("Card", "Dialog", "Avatar") };
      if (isWide) return { matches: findByNames("Input", "Button", "Progress", "Tabs") };
      if (isTall) return { matches: findByNames("Drawer", "Menu", "Select") };
      return { matches: findByNames("Card", "Dialog", "Table") };
    }

    // Open strokes
    if (isWide) {
      // Horizontal line
      return { matches: findByNames("Progress", "Slider", "Input", "Tabs") };
    }
    if (isTall) {
      // Vertical line
      return { matches: findByNames("Drawer", "Menu", "Tree View") };
    }

    // Short scribble
    if (isSmall) {
      return { matches: findByNames("Checkbox", "Switch", "Icon Button", "Badge") };
    }

    // General scribble
    return { matches: findByNames("Card", "Button", "Text", "Input") };
  }

  return { matches: findByNames("Card", "Button", "Input") };
}
