import Fuse from "fuse.js";
import { componentRegistry, type ComponentEntry } from "./component-registry";

export type MatchResult = {
  type: "exact" | "fuzzy" | "ambiguous" | "none";
  matches: ComponentEntry[];
};

const fuse = new Fuse(componentRegistry, {
  keys: [
    { name: "name", weight: 3 },
    { name: "aliases", weight: 2 },
    { name: "keywords", weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
});

export function matchComponent(query: string): MatchResult {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return { type: "none", matches: [] };

  // Check if query appears in multiple component names/aliases
  // e.g. "input" matches "Input", "Number Input", "Pin Input", "Tags Input"
  const nameContains = componentRegistry.filter(
    (c) =>
      c.name.toLowerCase().includes(trimmed) ||
      c.aliases.some((a) => a.toLowerCase().includes(trimmed))
  );

  if (nameContains.length > 1) {
    // Multiple components contain this term — ambiguous
    return { type: "ambiguous", matches: nameContains.slice(0, 5) };
  }

  // Direct exact name/alias match
  const exactMatch = componentRegistry.find(
    (c) =>
      c.name.toLowerCase() === trimmed ||
      c.aliases.some((a) => a.toLowerCase() === trimmed)
  );
  if (exactMatch) {
    return { type: "exact", matches: [exactMatch] };
  }

  // Fuzzy search
  const results = fuse.search(trimmed);
  if (results.length === 0) {
    return { type: "none", matches: [] };
  }

  const topScore = results[0].score ?? 1;

  // Strong single match
  if (topScore < 0.2 && (results.length === 1 || (results[1]?.score ?? 1) > 0.35)) {
    return { type: "fuzzy", matches: [results[0].item] };
  }

  // Multiple close matches — ambiguous
  const closeMatches = results
    .filter((r) => (r.score ?? 1) < 0.45)
    .slice(0, 5)
    .map((r) => r.item);

  if (closeMatches.length === 1) {
    return { type: "fuzzy", matches: closeMatches };
  }

  return {
    type: closeMatches.length > 0 ? "ambiguous" : "none",
    matches: closeMatches,
  };
}
