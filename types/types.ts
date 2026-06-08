export type FormData = {
  projectType: string;
  teamSize: string;
  userLoad: string;
  realTime: string;
  dataComplexity: string;
  timeline: string;
  experience: string;
  priority: string;
};

export type Option = { label: string; value: string };

export type Field = {
  key: keyof FormData;
  label: string;
  options: Option[];
};

export type Step = {
  title: string;
  description: string;
  fields: Field[];
};
