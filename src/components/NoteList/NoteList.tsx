import css from './NoteList.module.css';
import type Note from '../../types/note';

interface NoteListProps {
  arr: Note[];
}

export default function NoteList({ arr }: NoteListProps) {
  return (
    <ul className={css.list}>
      {arr.map((note) => {
        return (
          <li className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button className={css.button}>Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
