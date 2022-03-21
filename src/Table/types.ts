import React from "react";

// for any props common to every cell
interface CommonCell {
  searchable?: boolean;
  style?: React.CSSProperties;
}

export interface CheckboxCellType extends CommonCell {
  type: 'checkbox',
  checked: boolean;
  onClick: () => unknown;
}

export interface TextCellType extends CommonCell {
  type: 'text',
  text: string | number;
  href?: string;
}

export interface ButtonCellType extends CommonCell {
  type: 'button',
  icon: React.ReactElement;
  onClick: () => unknown;
}

export interface ImageCellType extends CommonCell {
  type: 'image',
  src?: string;
}

export type CellType = CheckboxCellType | TextCellType | ButtonCellType | ImageCellType;

export interface Row {
  key: string | number;
  cells: Array<CellType>;
}
