export interface Note {
  id: string;
  title: string;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  tag: TagProps;
}

export interface PostNote {
  title: string;
  content: string;
  tag: string;
}

export type TagProps = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
