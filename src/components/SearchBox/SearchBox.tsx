import css from './SearchBox.module.css';

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ onChange }: SearchBarProps) {
  return (
    <input
      onChange={onChange}
      type="text"
      name="notes"
      placeholder="Search notes"
      className={css.input}
    />
  );
}
