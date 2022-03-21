import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Table as CTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import React from "react";
import { Cell } from "./Cell";
import { Row } from "./types";
import usePagination from "./usePagination";

export interface TableProps {
  headings: string[];
  rows: Array<Row>;
  pageSize?: number;
}

export function Table({ headings, rows, pageSize }: TableProps): React.ReactElement {
  const [filter, setFilter] = React.useState('');

  const canFilter = rows[0]?.cells.find(cell => cell.type === 'text')
  const filteredRows = filter
    ? rows.filter(row => {
      for (const cell of row.cells) {
        if (cell.type !== 'text') continue;
        const content = String(cell.text)
        if (content.toLowerCase().includes(filter)) {
          return true;
        }
      }
      return false;
    })
    : rows;

  const { page, setPage, pagedRows, hasNextPage, hasPreviousPage } = usePagination(pageSize, filteredRows);

  const searchWidth = Math.ceil(headings.length / 2);
  const paginationWidth = headings.length - searchWidth;

  // reset the page when the search filter is changed
  React.useEffect(() => {
    setPage(0);
  }, [filter])

  return (
    <CTable variant="striped">
      <Thead>
        <Tr>
          {headings.map(heading => (
            <Th key={heading}>{heading}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {pagedRows.map(row => (
          <Tr key={row.key}>
            {row.cells.map((props, i) => <Cell key={String(row.key) + i} props={props} />)}
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          {canFilter ? (
            <Td colSpan={searchWidth}>
              <Flex justifyContent="center">
                <InputGroup>
                  <InputLeftElement pointerEvents="none"><SearchIcon /></InputLeftElement>
                  <Input placeholder="Search" value={filter} onChange={e => setFilter(e.currentTarget.value)} />
                </InputGroup>
              </Flex>
            </Td>
          ) : null}
          {pageSize ? (
            <Td colSpan={paginationWidth}>
              <Flex justifyContent="center" alignItems="center" style={{ gap: '0.25rem' }}>
                <IconButton
                  aria-label="previous-page"
                  size="sm"
                  icon={<ArrowLeftIcon />}
                  onClick={() => setPage(page - 1)}
                  disabled={!hasPreviousPage}
                />
                <NumberInput step={1} value={page + 1} min={1} max={100}>
                  <NumberInputField onChange={e => setPage(Number(e.currentTarget.value))} />
                </NumberInput>
                <IconButton
                  aria-label="next-page"
                  size="sm"
                  icon={<ArrowRightIcon />}
                  onClick={() => setPage(page + 1)}
                  disabled={!hasNextPage}
                />
              </Flex>
            </Td>
          ) : null}
        </Tr>
      </Tfoot>
    </CTable>
  );
}
