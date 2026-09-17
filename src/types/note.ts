export default interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface PostNote {
  title: string;
  content: string;
  tag: string;
}
