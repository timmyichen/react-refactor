import React from 'react';
import { Row } from './types';

const usePagination = (pageSize: number | undefined, rows: Row[]) => {
  const [page, setPage] = React.useState(0);

  let pagedRows = rows;
  let maxPages = 1;

  if (pageSize) {
    const startIndex = page * pageSize;
    pagedRows = rows.slice(startIndex, startIndex + pageSize);
    maxPages = Math.floor(rows.length / pageSize);
  }

  function safelySetPage(newPage: number) {
    if (newPage > maxPages) {
      return setPage(maxPages)
    }
    if (newPage < 0) {
      return setPage(0)
    }
    return setPage(newPage)
  }

  return {
    page,
    setPage: safelySetPage,
    pagedRows,
    hasNextPage: page !== maxPages,
    hasPreviousPage: page !== 0,
  }
}

export default usePagination;
