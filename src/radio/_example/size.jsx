import React from 'react';
import { Radio, RadioGroup, CellGroup, Cell } from 'tdesign-mobile-react';

export default function () {
  return (
    <RadioGroup>
      <CellGroup>
        <Cell title="单选" bordered={false} leftIcon={<Radio value="H48" />} />
      </CellGroup>
    </RadioGroup>
  );
}
