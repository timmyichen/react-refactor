import {
  IconButton,
  Td,
  Checkbox,
  Image,
} from "@chakra-ui/react";

import React from "react";
import { ButtonCellType, CellType, CheckboxCellType, ImageCellType, TextCellType } from "./types";

interface CellProps {
  props: CellType
}

export function Cell({ props }: CellProps): React.ReactElement {
  switch(props.type) {
    case 'checkbox':
      return <CheckboxCell {...props} />
    case 'text':
      return <TextCell {...props} />
    case 'button':
      return <ButtonCell {...props} />
    case 'image':
      return <ImageCell {...props} />
    default:
      return <div>Unknown cell type</div>
  }
}

function CheckboxCell(props: CheckboxCellType): React.ReactElement {
  return (
    <Td style={props.style}>
      <Checkbox
        isChecked={props.checked}
        onChange={props.onClick}
        width={100}
        px={6}
        py={4}
      />
    </Td>
  )
}

function TextCell(props: TextCellType): React.ReactElement {
  return (
    <Td style={props.style}>
      {props.href ? (
        <a href={props.href} target="_blank">{props.text}</a>
      ): props.text}
    </Td>
  )
}

function ButtonCell(props: ButtonCellType): React.ReactElement {
  return (
    <Td style={props.style}>
      <IconButton
        icon={props.icon}
        aria-label="Delete this item"
        onClick={props.onClick}
        size="xs"
        background="gray.600"
        _hover={{ bg: "red.600" }}
        color="white"
      />
    </Td>
  )
}

function ImageCell(props: ImageCellType): React.ReactElement {
  return (
    <Td style={props.style}>
      <Image src={props.src} />
    </Td>
  )
}
