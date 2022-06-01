import React from 'react';
import { Checkbox, CellGroup, Cell } from 'tdesign-mobile-react';

export default function () {
  return (
    <CellGroup>
      <Cell leftIcon={<Checkbox disabled />} title="多选" />
      <Cell leftIcon={<Checkbox checked disabled />} title="多选" />
      <Cell rightIcon={<Checkbox disabled />} title="多选" />
      <Cell rightIcon={<Checkbox checked disabled />} title="多选" />
      <Cell
        leftIcon={<Checkbox disabled />}
        title="多选"
        description="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选"
      />
    </CellGroup>
  );
}
