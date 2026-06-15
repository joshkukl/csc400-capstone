export type FormData = {
  projectType: string;
  audience: string;
  languagePreference: string;
  userLoad: string;
  realTime: string;
  dataNeed: string;
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
