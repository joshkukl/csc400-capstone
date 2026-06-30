export type Runtime =
  | "typescript"
  | "python"
  | "go"
  | "java"
  | "dotnet"
  | "ruby"
  | "rust"
  | "csharp";

export type StackItem = {
  role: string;
  name: string;
  rationale: string;
  confidence: number;
};

export type LayerResult = {
  role: string;
  primary: StackItem;
  alternatives: StackItem[];
};

export type Recommendation = {
  title: string;
  summary: string;
  stack: StackItem[];
  layers: LayerResult[];
};
