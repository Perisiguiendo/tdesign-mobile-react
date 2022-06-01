import React from 'react';
import { Checkbox, CellGroup, Cell } from 'tdesign-mobile-react';

export default function () {
  return (
    <CellGroup>
      <Checkbox.Group defaultValue={['1', '2']} max={2}>
        <Cell leftIcon={<Checkbox value="1" />} title="多选" />
        <Cell leftIcon={<Checkbox value="2" />} title="多选" />
        <Cell leftIcon={<Checkbox value="3" />} title="多选" />
      </Checkbox.Group>
    </CellGroup>
  );
}
