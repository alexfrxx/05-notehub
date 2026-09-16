import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import type { ComponentType } from 'react';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  setCurrentPage: (selectedItem: { selected: number }) => void;
  force: number;
}

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function Pagination({
  pageCount,
  setCurrentPage,
  force
}: PaginationProps) {
  console.log(pageCount);
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={setCurrentPage}
      pageRangeDisplayed={5}
      nextLabel="→"
      previousLabel="←"
      activeClassName={css.active}
      containerClassName={css.pagination}
      marginPagesDisplayed={1}
      forcePage={force}
    />
  );
}
