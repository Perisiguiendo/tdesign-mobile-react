import React, { useState } from 'react';
import { Icon } from 'tdesign-icons-react';
import { Radio, RadioGroup, CellGroup, Cell } from 'tdesign-mobile-react';

export default function () {
  const [defaultValue, setDefaultValue] = useState('idx1');
  const ICON1 = <Icon className="t-icon" name="check-rectangle-filled" />;
  const ICON2 = <Icon className="t-icon" name="check-rectangle" />;
  return (
    <RadioGroup value={defaultValue} onChange={(value) => setDefaultValue(value)}>
      <CellGroup>
        <Cell title="单选" leftIcon={<Radio value="idx1" checked icon={[ICON1, ICON2]} />} />
        <Cell title="单选" bordered={false} leftIcon={<Radio value="idx2" icon={[ICON1, ICON2]} />} />
      </CellGroup>
    </RadioGroup>
  );
}
