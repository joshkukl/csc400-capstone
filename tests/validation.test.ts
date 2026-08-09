import { describe, expect, it } from "vitest";
import type { FormData } from "../types/questionnaire";
import {
  getMissingQuestionnaireFields,
  getQuestionnaireErrorMessage,
  getQuestionnaireErrors,
  isValidQuestionnaire,
  validateQuestionnaire,
} from "../lib/validation";

const validQuestionnaire: FormData = {
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

describe("validateQuestionnaire", () => {
  it("accepts a completely valid questionnaire", () => {
    const result = validateQuestionnaire(validQuestionnaire);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("rejects an empty questionnaire", () => {
    const result = validateQuestionnaire({});

    expect(result.valid).toBe(false);
    expect(Object.keys(result.errors)).toHaveLength(9);
  });

  it("rejects a missing project type", () => {
    const data = {
      ...validQuestionnaire,
      projectType: "",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.projectType).toBe(
      "Project type is required.",
    );
  });

  it("rejects an invalid project type", () => {
    const data = {
      ...validQuestionnaire,
      projectType: "banana",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.projectType).toBe(
      "Project type contains an invalid value.",
    );
  });

  it("accepts web project type", () => {
    const data = {
      ...validQuestionnaire,
      projectType: "web",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts mobile project type", () => {
    const data = {
      ...validQuestionnaire,
      projectType: "mobile",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts desktop project type", () => {
    const data = {
      ...validQuestionnaire,
      projectType: "desktop",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts game project type", () => {
    const data = {
      ...validQuestionnaire,
      projectType: "game",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts api project type", () => {
    const data = {
      ...validQuestionnaire,
      projectType: "api",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts internal project type", () => {
    const data = {
      ...validQuestionnaire,
      projectType: "internal",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts cli project type", () => {
    const data = {
      ...validQuestionnaire,
      projectType: "cli",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts extension project type", () => {
    const data = {
      ...validQuestionnaire,
      projectType: "extension",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("rejects a missing audience", () => {
    const data = {
      ...validQuestionnaire,
      audience: "",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.audience).toBe(
      "Audience is required.",
    );
  });

  it("rejects an invalid audience", () => {
    const data = {
      ...validQuestionnaire,
      audience: "students",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.audience).toBe(
      "Audience contains an invalid value.",
    );
  });

  it("accepts b2c audience", () => {
    const data = {
      ...validQuestionnaire,
      audience: "b2c",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts b2b audience", () => {
    const data = {
      ...validQuestionnaire,
      audience: "b2b",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts internal audience", () => {
    const data = {
      ...validQuestionnaire,
      audience: "internal",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts mixed audience", () => {
    const data = {
      ...validQuestionnaire,
      audience: "mixed",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("rejects a missing language preference", () => {
    const data = {
      ...validQuestionnaire,
      languagePreference: "",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.languagePreference).toBe(
      "Language preference is required.",
    );
  });

  it("rejects an invalid language preference", () => {
    const data = {
      ...validQuestionnaire,
      languagePreference: "php",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.languagePreference).toBe(
      "Language preference contains an invalid value.",
    );
  });

  it("accepts javascript preference", () => {
    const data = {
      ...validQuestionnaire,
      languagePreference: "js",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts python preference", () => {
    const data = {
      ...validQuestionnaire,
      languagePreference: "python",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts go preference", () => {
    const data = {
      ...validQuestionnaire,
      languagePreference: "go",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts java preference", () => {
    const data = {
      ...validQuestionnaire,
      languagePreference: "java",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts dotnet preference", () => {
    const data = {
      ...validQuestionnaire,
      languagePreference: "dotnet",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts ruby preference", () => {
    const data = {
      ...validQuestionnaire,
      languagePreference: "ruby",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts rust preference", () => {
    const data = {
      ...validQuestionnaire,
      languagePreference: "rust",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts no language preference", () => {
    const data = {
      ...validQuestionnaire,
      languagePreference: "none",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("rejects a missing user load", () => {
    const data = {
      ...validQuestionnaire,
      userLoad: "",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.userLoad).toBe(
      "Expected user load is required.",
    );
  });

  it("rejects an invalid user load", () => {
    const data = {
      ...validQuestionnaire,
      userLoad: "huge",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.userLoad).toBe(
      "Expected user load contains an invalid value.",
    );
  });

  it("accepts tiny user load", () => {
    const data = {
      ...validQuestionnaire,
      userLoad: "tiny",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts small user load", () => {
    const data = {
      ...validQuestionnaire,
      userLoad: "small",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts medium user load", () => {
    const data = {
      ...validQuestionnaire,
      userLoad: "medium",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts large user load", () => {
    const data = {
      ...validQuestionnaire,
      userLoad: "large",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("rejects a missing realtime requirement", () => {
    const data = {
      ...validQuestionnaire,
      realTime: "",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.realTime).toBe(
      "Real-time requirement is required.",
    );
  });

  it("rejects an invalid realtime requirement", () => {
    const data = {
      ...validQuestionnaire,
      realTime: "sometimes",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.realTime).toBe(
      "Real-time requirement contains an invalid value.",
    );
  });

  it("accepts yes for realtime", () => {
    const data = {
      ...validQuestionnaire,
      realTime: "yes",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts no for realtime", () => {
    const data = {
      ...validQuestionnaire,
      realTime: "no",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("rejects a missing data requirement", () => {
    const data = {
      ...validQuestionnaire,
      dataNeed: "",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.dataNeed).toBe(
      "Data requirements is required.",
    );
  });

  it("rejects an invalid data requirement", () => {
    const data = {
      ...validQuestionnaire,
      dataNeed: "spreadsheet",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.dataNeed).toBe(
      "Data requirements contains an invalid value.",
    );
  });

  it("accepts simple data requirement", () => {
    const data = {
      ...validQuestionnaire,
      dataNeed: "simple",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts relational data requirement", () => {
    const data = {
      ...validQuestionnaire,
      dataNeed: "relational",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts analytics data requirement", () => {
    const data = {
      ...validQuestionnaire,
      dataNeed: "analytics",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts document data requirement", () => {
    const data = {
      ...validQuestionnaire,
      dataNeed: "document",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("rejects a missing timeline", () => {
    const data = {
      ...validQuestionnaire,
      timeline: "",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.timeline).toBe(
      "Project timeline is required.",
    );
  });

  it("rejects an invalid timeline", () => {
    const data = {
      ...validQuestionnaire,
      timeline: "tomorrow",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.timeline).toBe(
      "Project timeline contains an invalid value.",
    );
  });

  it("accepts sprint timeline", () => {
    const data = {
      ...validQuestionnaire,
      timeline: "sprint",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts short timeline", () => {
    const data = {
      ...validQuestionnaire,
      timeline: "short",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts medium timeline", () => {
    const data = {
      ...validQuestionnaire,
      timeline: "medium",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts long timeline", () => {
    const data = {
      ...validQuestionnaire,
      timeline: "long",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("rejects a missing experience level", () => {
    const data = {
      ...validQuestionnaire,
      experience: "",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.experience).toBe(
      "Experience level is required.",
    );
  });

  it("rejects an invalid experience level", () => {
    const data = {
      ...validQuestionnaire,
      experience: "professional",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.experience).toBe(
      "Experience level contains an invalid value.",
    );
  });

  it("accepts beginner experience", () => {
    const data = {
      ...validQuestionnaire,
      experience: "beginner",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts intermediate experience", () => {
    const data = {
      ...validQuestionnaire,
      experience: "intermediate",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts advanced experience", () => {
    const data = {
      ...validQuestionnaire,
      experience: "advanced",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("rejects a missing priority", () => {
    const data = {
      ...validQuestionnaire,
      priority: "",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.priority).toBe(
      "Project priority is required.",
    );
  });

  it("rejects an invalid priority", () => {
    const data = {
      ...validQuestionnaire,
      priority: "looks",
    };

    const result = validateQuestionnaire(data);

    expect(result.valid).toBe(false);
    expect(result.errors.priority).toBe(
      "Project priority contains an invalid value.",
    );
  });

  it("accepts speed priority", () => {
    const data = {
      ...validQuestionnaire,
      priority: "speed",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts performance priority", () => {
    const data = {
      ...validQuestionnaire,
      priority: "performance",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts cost priority", () => {
    const data = {
      ...validQuestionnaire,
      priority: "cost",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });

  it("accepts developer experience priority", () => {
    const data = {
      ...validQuestionnaire,
      priority: "dx",
    };

    expect(validateQuestionnaire(data).valid).toBe(true);
  });
});

describe("isValidQuestionnaire", () => {
  it("returns true for valid questionnaire data", () => {
    expect(isValidQuestionnaire(validQuestionnaire)).toBe(true);
  });

  it("returns false for incomplete questionnaire data", () => {
    expect(
      isValidQuestionnaire({
        projectType: "web",
      }),
    ).toBe(false);
  });

  it("returns false for invalid questionnaire data", () => {
    expect(
      isValidQuestionnaire({
        ...validQuestionnaire,
        priority: "invalid",
      }),
    ).toBe(false);
  });
});

describe("getQuestionnaireErrors", () => {
  it("returns no errors for valid data", () => {
    expect(
      getQuestionnaireErrors(validQuestionnaire),
    ).toEqual({});
  });

  it("returns the correct field error", () => {
    const errors = getQuestionnaireErrors({
      ...validQuestionnaire,
      projectType: "",
    });

    expect(errors.projectType).toBe(
      "Project type is required.",
    );
  });

  it("returns multiple errors when multiple fields are missing", () => {
    const errors = getQuestionnaireErrors({
      ...validQuestionnaire,
      projectType: "",
      audience: "",
      priority: "",
    });

    expect(errors.projectType).toBeDefined();
    expect(errors.audience).toBeDefined();
    expect(errors.priority).toBeDefined();
    expect(Object.keys(errors)).toHaveLength(3);
  });
});

describe("getMissingQuestionnaireFields", () => {
  it("returns an empty array for complete data", () => {
    expect(
      getMissingQuestionnaireFields(validQuestionnaire),
    ).toEqual([]);
  });

  it("returns projectType when project type is missing", () => {
    const missing = getMissingQuestionnaireFields({
      ...validQuestionnaire,
      projectType: "",
    });

    expect(missing).toContain("projectType");
  });

  it("returns all nine fields for an empty object", () => {
    const missing = getMissingQuestionnaireFields({});

    expect(missing).toHaveLength(9);
  });

  it("returns multiple missing fields", () => {
    const missing = getMissingQuestionnaireFields({
      ...validQuestionnaire,
      audience: "",
      timeline: "",
      priority: "",
    });

    expect(missing).toContain("audience");
    expect(missing).toContain("timeline");
    expect(missing).toContain("priority");
    expect(missing).toHaveLength(3);
  });
});

describe("getQuestionnaireErrorMessage", () => {
  it("returns null for valid questionnaire data", () => {
    expect(
      getQuestionnaireErrorMessage(validQuestionnaire),
    ).toBeNull();
  });

  it("returns an error message for invalid data", () => {
    const message = getQuestionnaireErrorMessage({
      ...validQuestionnaire,
      projectType: "",
    });

    expect(message).toContain(
      "Project type is required.",
    );
  });

  it("combines multiple validation messages", () => {
    const message = getQuestionnaireErrorMessage({
      ...validQuestionnaire,
      projectType: "",
      audience: "",
    });

    expect(message).toContain(
      "Project type is required.",
    );

    expect(message).toContain(
      "Audience is required.",
    );
  });
});