import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import {
  fetchNotes,
  searchNotes,
  postNote,
  deleteNote
} from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import type { PostNote } from '../../types/note';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      setPage(1);
    },
    1000
  );

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', inputValue, page],
    queryFn: () => {
      if (!inputValue.trim()) {
        return fetchNotes({
          page,
          perPage: 12
        });
      }

      return searchNotes({
        search: inputValue,
        page,
        perPage: 12
      });
    }
  });

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: postNote,
    onSuccess: () => {
      console.log('Todo added');
      queryClient.invalidateQueries({
        queryKey: ['notes']
      });
      setIsModalOpen(false);
    }
  });

  const createNote = (note: PostNote) => {
    postMutation.mutate(note);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      console.log('Todo deleted');
      queryClient.invalidateQueries({
        queryKey: ['notes']
      });
    }
  });

  const deleteTask = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {data && data?.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            setCurrentPage={({ selected }) => setPage(selected + 1)}
            force={page - 1}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isLoading && <p className={css.load}>Loading notes...</p>}
      {isError && <p className={css.error}>Something went wrong, try again</p>}
      {postMutation.isPending && <p className={css.load}>Adding todo...</p>}
      {postMutation.isError && (
        <p className={css.error}>Something went wrong, try again</p>
      )}
      {deleteMutation.isPending && <p className={css.load}>Deleting todo...</p>}
      {deleteMutation.isError && (
        <p className={css.error}>Something went wrong, try again</p>
      )}
      {isModalOpen && <Modal onClose={closeModal} onSubmit={createNote} />}
      {data && <NoteList arr={data.notes} onDelete={deleteTask} />}
    </div>
  );
}

export default App;
