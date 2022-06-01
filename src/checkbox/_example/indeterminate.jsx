import React from 'react';
import { Checkbox, CellGroup, Cell } from 'tdesign-mobile-react';

export default function () {
  return (
    <CellGroup>
      <Cell leftIcon={<Checkbox indeterminate defaultChecked />} title="多选" />
    </CellGroup>
  );
}
