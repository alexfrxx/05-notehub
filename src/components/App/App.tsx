import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import { fetchNotes, searchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';

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
      {isModalOpen && <Modal onClose={closeModal} />}
      {data && <NoteList arr={data.notes} />}
    </div>
  );
}

export default App;
