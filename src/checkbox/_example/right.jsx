import React from 'react';
import { Checkbox, CellGroup, Cell } from 'tdesign-mobile-react';

export default function () {
  return (
    <CellGroup>
      <Cell rightIcon={<Checkbox />} title="多选" />
      <Cell rightIcon={<Checkbox checked />} title="多选" />
      <Cell rightIcon={<Checkbox checked />} title="多选" />
      <Cell
        rightIcon={<Checkbox maxLabelRow={1} />}
        title="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选"
      />
    </CellGroup>
  );
}
