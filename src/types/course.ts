
export interface Course {
  id: string;
  title: string;
  instructor: string;
  date: string;
  duration: string;
  imageUrl: string;
  videoUrl: string;
  description: string;
  category: "piano" | "guitare" | "voix" | "batterie" | "basse" | "autre";
  level?: "débutant" | "intermédiaire" | "avancé";
  type: "tutoriel" | "carrière" | "défi" | "exercice";
}
