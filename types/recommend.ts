export type StackItem = {
  role: string;
  name: string;
  rationale: string;
};

export type Recommendation = {
  title: string;
  summary: string;
  stack: StackItem[];
};
