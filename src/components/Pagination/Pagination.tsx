import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import type { ComponentType } from 'react';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage: number;
}

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function Pagination({
  pageCount,
  onPageChange,
  forcePage
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      nextLabel="→"
      previousLabel="←"
      activeClassName={css.active}
      containerClassName={css.pagination}
      marginPagesDisplayed={1}
      forcePage={forcePage}
    />
  );
}
