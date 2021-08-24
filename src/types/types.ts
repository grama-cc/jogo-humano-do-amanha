export type Option = "yes" | "no" | "maybe"

export type QuestionType = {
  id: number;
  title: string;
  options: Option[];
  answer?: Option;
}

export type Result = {
  id: string,
  avatar: string,
  name: string,
  text: string,
}