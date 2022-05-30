import React, { useState } from 'react';
import { Radio, RadioGroup, Cell, CellGroup } from 'tdesign-mobile-react';

export default function () {
  const [defaultValue, setDefaultValue] = useState('idx1');
  return (
    <RadioGroup value={defaultValue} onChange={setDefaultValue}>
      <CellGroup>
        <Cell title="单选" rightIcon={<Radio align="right" icon="stroke-line" value="idx1" />} />
        <Cell
          title="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
          rightIcon={<Radio align="right" icon="stroke-line" value="idx2" />}
        />
        <Cell
          title="单选"
          description="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
          rightIcon={<Radio align="right" icon="stroke-line" value="idx3" />}
          bordered={false}
        />
      </CellGroup>
    </RadioGroup>
  );
}
