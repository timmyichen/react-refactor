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

export interface TableProps {
  headings: string[];
  rows: Array<Row>;
}

export function Table({ headings, rows }: TableProps): React.ReactElement {
  return (
    <CTable variant="striped">
      <Thead>
        <Tr>
          {headings.map(heading => (
            <Th>{heading}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map(row => (
          <Tr key={row.key}>
            {row.cells.map(props => <Cell props={props} />)}
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
        <Td colSpan={2}>
            <Flex justifyContent="center">
              <InputGroup>
                <InputLeftElement pointerEvents="none"><SearchIcon /></InputLeftElement>
                <Input placeholder="Search" />
              </InputGroup>
            </Flex>
          </Td>
          <Td colSpan={1}>
            <Flex justifyContent="center" alignItems="center" style={{ gap: '0.25rem' }}>
              <IconButton
                aria-label="previous-page"
                size="sm"
                icon={<ArrowLeftIcon />}
              />
              <NumberInput step={1} defaultValue={1} min={1} max={100}>
                <NumberInputField />
              </NumberInput>
              <IconButton
                aria-label="next-page"
                size="sm"
                icon={<ArrowRightIcon />}
              />
            </Flex>
          </Td>
        </Tr>
      </Tfoot>
    </CTable>
  );
}
