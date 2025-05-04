
export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  duration: string;
  imageUrl: string;
  audioUrl: string;
  description: string;
  scripture?: string;
  category?: string;
}
