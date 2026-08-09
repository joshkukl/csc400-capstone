import type { FormData } from "@/types/questionnaire";

export type ValidationResult = {
  valid: boolean;
  errors: Record<string, string>;
};

const ALLOWED_VALUES = {
  projectType: [
    "web",
    "mobile",
    "desktop",
    "game",
    "api",
    "internal",
    "cli",
    "extension",
  ],

  audience: [
    "b2c",
    "b2b",
    "internal",
    "mixed",
  ],

  languagePreference: [
    "js",
    "python",
    "go",
    "java",
    "dotnet",
    "ruby",
    "rust",
    "none",
  ],

  userLoad: [
    "tiny",
    "small",
    "medium",
    "large",
  ],

  realTime: [
    "yes",
    "no",
  ],

  dataNeed: [
    "simple",
    "relational",
    "analytics",
    "document",
  ],

  timeline: [
    "sprint",
    "short",
    "medium",
    "long",
  ],

  experience: [
    "beginner",
    "intermediate",
    "advanced",
  ],

  priority: [
    "speed",
    "performance",
    "cost",
    "dx",
  ],
} as const;

const REQUIRED_FIELDS: Array<keyof FormData> = [
  "projectType",
  "audience",
  "languagePreference",
  "userLoad",
  "realTime",
  "dataNeed",
  "timeline",
  "experience",
  "priority",
];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function getFieldLabel(field: keyof FormData): string {
  const labels: Record<keyof FormData, string> = {
    projectType: "Project type",
    audience: "Audience",
    languagePreference: "Language preference",
    userLoad: "Expected user load",
    realTime: "Real-time requirement",
    dataNeed: "Data requirements",
    timeline: "Project timeline",
    experience: "Experience level",
    priority: "Project priority",
  };

  return labels[field];
}

function validateRequiredFields(
  data: Partial<FormData>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of REQUIRED_FIELDS) {
    const value = data[field];

    if (!isNonEmptyString(value)) {
      errors[field] = `${getFieldLabel(field)} is required.`;
    }
  }

  return errors;
}

function validateAllowedValues(
  data: Partial<FormData>,
  errors: Record<string, string>,
): void {
  for (const field of REQUIRED_FIELDS) {
    const value = data[field];

    if (!isNonEmptyString(value)) {
      continue;
    }

    const allowedValues =
      ALLOWED_VALUES[field as keyof typeof ALLOWED_VALUES];

    if (!allowedValues.includes(value as never)) {
      errors[field] =
        `${getFieldLabel(field)} contains an invalid value.`;
    }
  }
}

export function validateQuestionnaire(
  data: Partial<FormData>,
): ValidationResult {
  const errors = validateRequiredFields(data);

  validateAllowedValues(data, errors);

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function isValidQuestionnaire(
  data: Partial<FormData>,
): boolean {
  return validateQuestionnaire(data).valid;
}

export function getQuestionnaireErrors(
  data: Partial<FormData>,
): Record<string, string> {
  return validateQuestionnaire(data).errors;
}

export function getMissingQuestionnaireFields(
  data: Partial<FormData>,
): Array<keyof FormData> {
  return REQUIRED_FIELDS.filter((field) => {
    return !isNonEmptyString(data[field]);
  });
}

export function getQuestionnaireErrorMessage(
  data: Partial<FormData>,
): string | null {
  const result = validateQuestionnaire(data);

  if (result.valid) {
    return null;
  }

  return Object.values(result.errors).join(" ");
}