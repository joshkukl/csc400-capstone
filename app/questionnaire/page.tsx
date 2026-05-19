"use client";

import { useState } from "react";
import Link from "next/link";
import type { FormData, Field, Step } from "@/types/types";
import { STEPS, INITIAL_FORM_DATA } from "@/lib/questionnaire";

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepIndicator({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: Step[];
}) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => (
        <div key={step.title} className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors ${
              i < currentStep
                ? "bg-foreground text-background"
                : i === currentStep
                  ? "border-2 border-foreground text-foreground"
                  : "border border-foreground/20 text-foreground/30"
            }`}
          >
            {i < currentStep ? "✓" : i + 1}
          </div>
          <span
            className={`hidden text-sm sm:block ${
              i === currentStep ? "font-medium" : "text-foreground/40"
            }`}
          >
            {step.title}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`mx-1 h-px w-8 ${i < currentStep ? "bg-foreground" : "bg-foreground/15"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function RadioGroup({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (key: keyof FormData, val: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 font-medium">{field.label}</legend>
      <div className="flex flex-col gap-2">
        {field.options.map((opt) => (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
              value === opt.value
                ? "border-foreground bg-foreground/5 font-medium"
                : "border-foreground/10 hover:border-foreground/30 hover:bg-foreground/3"
            }`}
          >
            <input
              type="radio"
              name={field.key}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(field.key, opt.value)}
              className="sr-only"
            />
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                value === opt.value
                  ? "border-foreground bg-foreground"
                  : "border-foreground/30"
              }`}
            >
              {value === opt.value && (
                <span className="h-1.5 w-1.5 rounded-full bg-background" />
              )}
            </span>
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Questionnaire() {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const currentStep = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;
  const isStepComplete = currentStep.fields.every((f) => formData[f.key] !== "");

  function handleChange(key: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleNext() {
    if (isStepComplete) setStepIndex((i) => i + 1);
  }

  function handleBack() {
    setStepIndex((i) => i - 1);
  }

  function handleSubmit() {
    // Joshua wires this to the recommendation API and navigates to /results
  }

  return (
    <main className="flex flex-1 flex-col">
      <nav className="border-b border-foreground/10 px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          StackRec
        </Link>
      </nav>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-12">
        <StepIndicator currentStep={stepIndex} steps={STEPS} />

        <div className="mt-10 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            {currentStep.title}
          </h1>
          <p className="mt-1 text-sm text-foreground/50">
            {currentStep.description}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {currentStep.fields.map((field) => (
            <RadioGroup
              key={field.key}
              field={field}
              value={formData[field.key]}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between">
          {stepIndex > 0 ? (
            <button
              onClick={handleBack}
              className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium transition-colors hover:bg-foreground/5"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={!isStepComplete}
              className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/85 disabled:opacity-35 disabled:cursor-not-allowed"
            >
              Get Recommendations
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isStepComplete}
              className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/85 disabled:opacity-35 disabled:cursor-not-allowed"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
