import axios from 'axios';
import type { Note, PostNote, TagProps } from '../types/note';

const key = import.meta.env.VITE_API_KEY;

interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

interface SearchNotesProps {
  search?: string;
  page: number;
  perPage: number;
}

export async function fetchNotes({
  search,
  page,
  perPage
}: SearchNotesProps): Promise<FetchNotesProps> {
  const response = await axios.get<FetchNotesProps>(
    `https://notehub-public.goit.study/api/notes`,
    {
      params: {
        search,
        page,
        perPage
      },
      headers: {
        Authorization: `Bearer ${key}`
      }
    }
  );
  return response.data;
}

export async function postNote(object: PostNote): Promise<Note> {
  const response = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    object,
    {
      headers: {
        Authorization: `Bearer ${key}`
      }
    }
  );
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${key}`
      }
    }
  );

  return response.data;
}
