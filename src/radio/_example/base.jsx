import React, { useState } from 'react';
import { Radio, RadioGroup, Cell, CellGroup } from 'tdesign-mobile-react';
import './style/index.less';

export default function Base() {
  const [defaultValue, setDefaultValue] = useState('idx1');
  return (
    <RadioGroup className="cell-height" value={defaultValue} onChange={(value) => setDefaultValue(value)}>
      <CellGroup bordered={false}>
        <Cell leftIcon={<Radio allowUncheck value="idx1" />} title="单选" />
        <Cell
          leftIcon={<Radio allowUncheck value="idx2" />}
          title="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
        />
        <Cell
          leftIcon={<Radio allowUncheck value="idx3" />}
          title="单选"
          description="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
          bordered={false}
        />
      </CellGroup>
    </RadioGroup>
  );
}
