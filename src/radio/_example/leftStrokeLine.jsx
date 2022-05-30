import React, { useState } from 'react';
import { Radio, RadioGroup, Cell, CellGroup } from 'tdesign-mobile-react';

export default function Base() {
  const [defaultValue, setDefaultValue] = useState('idx1');
  return (
    <>
      <RadioGroup value={defaultValue} onChange={(value) => setDefaultValue(value)}>
        <CellGroup>
          <Cell title="单选" leftIcon={<Radio value="idx1" icon="stroke-line" />} />
          <Cell
            title="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
            leftIcon={<Radio value="idx2" icon="stroke-line" />}
          />
          <Cell
            title="单选"
            description="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
            leftIcon={<Radio value="idx3" icon="stroke-line" />}
            bordered={false}
          />
        </CellGroup>
      </RadioGroup>
    </>
  );
}
