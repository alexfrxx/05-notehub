import axios from 'axios';
import type Note from '../types/note';
import type { PostNote } from '../types/note';

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

interface PostNotesProps {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes({
  page,
  perPage
}: SearchNotesProps): Promise<FetchNotesProps> {
  const response = await axios.get<FetchNotesProps>(
    `https://notehub-public.goit.study/api/notes`,
    {
      params: {
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

export async function searchNotes({
  search,
  page,
  perPage
}: SearchNotesProps): Promise<FetchNotesProps> {
  const response = await axios.get<FetchNotesProps>(
    `https://notehub-public.goit.study/api/notes/`,
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
  console.log(response.data.notes);
  return response.data;
}

export async function postNotes(object: PostNote): Promise<PostNotesProps> {
  const response = await axios.post<PostNotesProps>(
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
