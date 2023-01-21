export type Category = "SPACE" | "MUSIC" | "ART";

export interface CreationArgs {
  category: Category;
  title: string;
  description: string;
  uri: string;
}
