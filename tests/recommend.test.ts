import { describe, expect, it } from "vitest";
import type { FormData } from "../types/questionnaire";
import { recommend } from "../lib/recommend";

const baseData: FormData = {
  projectType: "web",
  audience: "b2c",
  languagePreference: "js",
  userLoad: "small",
  realTime: "no",
  dataNeed: "relational",
  timeline: "short",
  experience: "intermediate",
  priority: "dx",
};

describe("recommend", () => {
  it("returns a recommendation object", () => {
    const result = recommend(baseData);

    expect(result).toBeDefined();
  });

  it("returns a title", () => {
    const result = recommend(baseData);

    expect(result.title).toBeDefined();
    expect(typeof result.title).toBe("string");
    expect(result.title.length).toBeGreaterThan(0);
  });

  it("returns a summary", () => {
    const result = recommend(baseData);

    expect(result.summary).toBeDefined();
    expect(typeof result.summary).toBe("string");
    expect(result.summary.length).toBeGreaterThan(0);
  });

  it("returns a stack", () => {
    const result = recommend(baseData);

    expect(Array.isArray(result.stack)).toBe(true);
    expect(result.stack.length).toBeGreaterThan(0);
  });

  it("returns architecture layers", () => {
    const result = recommend(baseData);

    expect(Array.isArray(result.layers)).toBe(true);
    expect(result.layers.length).toBeGreaterThan(0);
  });

  it("includes a frontend or full-stack layer", () => {
    const result = recommend(baseData);

    const hasFrontend = result.stack.some(
      (item) =>
        item.role === "Frontend" ||
        item.role === "Full-Stack",
    );

    expect(hasFrontend).toBe(true);
  });

  it("includes a database recommendation", () => {
    const result = recommend(baseData);

    const database = result.stack.find(
      (item) => item.role === "Database",
    );

    expect(database).toBeDefined();
  });

  it("includes a hosting recommendation", () => {
    const result = recommend(baseData);

    const hosting = result.stack.find(
      (item) => item.role === "Hosting",
    );

    expect(hosting).toBeDefined();
  });

  it("does not include realtime when realtime is disabled", () => {
    const result = recommend({
      ...baseData,
      realTime: "no",
    });

    const realtime = result.stack.find(
      (item) => item.role === "Realtime",
    );

    expect(realtime).toBeUndefined();
  });

  it("includes realtime when realtime is requested", () => {
    const result = recommend({
      ...baseData,
      realTime: "yes",
    });

    const realtime = result.stack.find(
      (item) => item.role === "Realtime",
    );

    expect(realtime).toBeDefined();
  });

  it("produces deterministic results", () => {
    const first = recommend(baseData);
    const second = recommend(baseData);

    expect(second).toEqual(first);
  });

  it("returns the same title for identical input", () => {
    const first = recommend(baseData);
    const second = recommend(baseData);

    expect(first.title).toBe(second.title);
  });

  it("returns the same stack for identical input", () => {
    const first = recommend(baseData);
    const second = recommend(baseData);

    expect(first.stack).toEqual(second.stack);
  });

  it("mentions project type in summary", () => {
    const result = recommend(baseData);

    expect(result.summary).toContain("web");
  });

  it("mentions developer experience priority", () => {
    const result = recommend({
      ...baseData,
      priority: "dx",
    });

    expect(result.summary).toContain(
      "optimized for developer experience",
    );
  });

  it("mentions speed priority", () => {
    const result = recommend({
      ...baseData,
      priority: "speed",
    });

    expect(result.summary).toContain(
      "optimized for speed to market",
    );
  });

  it("mentions performance priority", () => {
    const result = recommend({
      ...baseData,
      priority: "performance",
    });

    expect(result.summary).toContain(
      "optimized for performance and scale",
    );
  });

  it("mentions cost priority", () => {
    const result = recommend({
      ...baseData,
      priority: "cost",
    });

    expect(result.summary).toContain(
      "optimized to minimize cost",
    );
  });
});

describe("recommendation confidence", () => {
  it("keeps every confidence value between 0 and 100", () => {
    const result = recommend(baseData);

    for (const item of result.stack) {
      expect(item.confidence).toBeGreaterThanOrEqual(0);
      expect(item.confidence).toBeLessThanOrEqual(100);
    }
  });

  it("returns numeric confidence values", () => {
    const result = recommend(baseData);

    for (const item of result.stack) {
      expect(typeof item.confidence).toBe("number");
    }
  });

  it("gives every primary technology a rationale", () => {
    const result = recommend(baseData);

    for (const item of result.stack) {
      expect(typeof item.rationale).toBe("string");
      expect(item.rationale.length).toBeGreaterThan(0);
    }
  });

  it("gives every primary technology a name", () => {
    const result = recommend(baseData);

    for (const item of result.stack) {
      expect(typeof item.name).toBe("string");
      expect(item.name.length).toBeGreaterThan(0);
    }
  });

  it("gives every primary technology a role", () => {
    const result = recommend(baseData);

    for (const item of result.stack) {
      expect(typeof item.role).toBe("string");
      expect(item.role.length).toBeGreaterThan(0);
    }
  });
});

describe("recommendation layers", () => {
  it("gives each layer a primary recommendation", () => {
    const result = recommend(baseData);

    for (const layer of result.layers) {
      expect(layer.primary).toBeDefined();
    }
  });

  it("gives each layer an alternatives array", () => {
    const result = recommend(baseData);

    for (const layer of result.layers) {
      expect(Array.isArray(layer.alternatives)).toBe(true);
    }
  });

  it("does not use the primary recommendation as an alternative", () => {
    const result = recommend(baseData);

    for (const layer of result.layers) {
      const alternativeNames =
        layer.alternatives.map((item) => item.name);

      expect(alternativeNames).not.toContain(
        layer.primary.name,
      );
    }
  });

  it("returns at most two alternatives per layer", () => {
    const result = recommend(baseData);

    for (const layer of result.layers) {
      expect(
        layer.alternatives.length,
      ).toBeLessThanOrEqual(2);
    }
  });

  it("gives alternative recommendations valid confidence", () => {
    const result = recommend(baseData);

    for (const layer of result.layers) {
      for (const alternative of layer.alternatives) {
        expect(
          alternative.confidence,
        ).toBeGreaterThanOrEqual(0);

        expect(
          alternative.confidence,
        ).toBeLessThanOrEqual(100);
      }
    }
  });
});

describe("different project types", () => {
  it("generates a web recommendation", () => {
    const result = recommend({
      ...baseData,
      projectType: "web",
    });

    expect(result.stack.length).toBeGreaterThan(0);
    expect(result.summary).toContain("web");
  });

  it("generates a mobile recommendation", () => {
    const result = recommend({
      ...baseData,
      projectType: "mobile",
    });

    expect(result.stack.length).toBeGreaterThan(0);
    expect(result.summary).toContain("mobile");
  });

  it("generates a desktop recommendation", () => {
    const result = recommend({
      ...baseData,
      projectType: "desktop",
    });

    expect(result.stack.length).toBeGreaterThan(0);
    expect(result.summary).toContain("desktop");
  });

  it("generates a game recommendation", () => {
    const result = recommend({
      ...baseData,
      projectType: "game",
    });

    expect(result.stack.length).toBeGreaterThan(0);
    expect(result.summary).toContain("game");
  });

  it("generates an API recommendation", () => {
    const result = recommend({
      ...baseData,
      projectType: "api",
    });

    expect(result.stack.length).toBeGreaterThan(0);
    expect(result.summary).toContain("api");
  });

  it("generates an internal tool recommendation", () => {
    const result = recommend({
      ...baseData,
      projectType: "internal",
    });

    expect(result.stack.length).toBeGreaterThan(0);
    expect(result.summary).toContain("internal");
  });

  it("generates a CLI recommendation", () => {
    const result = recommend({
      ...baseData,
      projectType: "cli",
    });

    expect(result.stack.length).toBeGreaterThan(0);
    expect(result.summary).toContain("cli");
  });

  it("generates a browser extension recommendation", () => {
    const result = recommend({
      ...baseData,
      projectType: "extension",
    });

    expect(result.stack.length).toBeGreaterThan(0);
    expect(result.summary).toContain("extension");
  });
});

describe("user load scenarios", () => {
  it("handles tiny user load", () => {
    const result = recommend({
      ...baseData,
      userLoad: "tiny",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });

  it("handles small user load", () => {
    const result = recommend({
      ...baseData,
      userLoad: "small",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });

  it("handles medium user load", () => {
    const result = recommend({
      ...baseData,
      userLoad: "medium",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });

  it("handles large user load", () => {
    const result = recommend({
      ...baseData,
      userLoad: "large",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });
});

describe("data requirement scenarios", () => {
  it("handles simple CRUD data", () => {
    const result = recommend({
      ...baseData,
      dataNeed: "simple",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });

  it("handles relational data", () => {
    const result = recommend({
      ...baseData,
      dataNeed: "relational",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });

  it("handles analytics data", () => {
    const result = recommend({
      ...baseData,
      dataNeed: "analytics",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });

  it("handles document data", () => {
    const result = recommend({
      ...baseData,
      dataNeed: "document",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });
});

describe("experience scenarios", () => {
  it("handles beginner teams", () => {
    const result = recommend({
      ...baseData,
      experience: "beginner",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });

  it("handles intermediate teams", () => {
    const result = recommend({
      ...baseData,
      experience: "intermediate",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });

  it("handles advanced teams", () => {
    const result = recommend({
      ...baseData,
      experience: "advanced",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });
});

describe("timeline scenarios", () => {
  it("handles sprint timeline", () => {
    const result = recommend({
      ...baseData,
      timeline: "sprint",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });

  it("handles short timeline", () => {
    const result = recommend({
      ...baseData,
      timeline: "short",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });

  it("handles medium timeline", () => {
    const result = recommend({
      ...baseData,
      timeline: "medium",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });

  it("handles long timeline", () => {
    const result = recommend({
      ...baseData,
      timeline: "long",
    });

    expect(result.stack.length).toBeGreaterThan(0);
  });
});

describe("language preference scenarios", () => {
  const languages = [
    "js",
    "python",
    "go",
    "java",
    "dotnet",
    "ruby",
    "rust",
    "none",
  ];

  for (const language of languages) {
    it(`handles ${language} preference`, () => {
      const result = recommend({
        ...baseData,
        languagePreference: language,
      });

      expect(result.stack.length).toBeGreaterThan(0);
    });
  }
});

describe("audience scenarios", () => {
  const audiences = [
    "b2c",
    "b2b",
    "internal",
    "mixed",
  ];

  for (const audience of audiences) {
    it(`handles ${audience} audience`, () => {
      const result = recommend({
        ...baseData,
        audience,
      });

      expect(result.stack.length).toBeGreaterThan(0);
    });
  }
});