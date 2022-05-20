import React from 'react';
import { Radio, RadioGroup, CellGroup, Cell } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const defaultValue = 'idx1';
  return (
    <>
      <div style={{ marginTop: '10px' }}>
        <TDemoBlock>
          <RadioGroup disabled value={defaultValue}>
            <CellGroup>
              <Cell title="单选" leftIcon={<Radio value="idx1" />} />
              <Cell title="单选" bordered={false} leftIcon={<Radio value="idx2" />} />
            </CellGroup>
          </RadioGroup>
        </TDemoBlock>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TDemoBlock>
          <RadioGroup disabled value={defaultValue}>
            <CellGroup>
              <Cell title="单选" leftIcon={<Radio value="idx1" icon="stroke-line" />} />
              <Cell title="单选" bordered={false} leftIcon={<Radio value="idx2" icon="stroke-line" />} />
            </CellGroup>
          </RadioGroup>
        </TDemoBlock>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TDemoBlock>
          <RadioGroup disabled value={defaultValue}>
            <CellGroup>
              <Cell title="单选" rightIcon={<Radio value="idx1" />} />
              <Cell title="单选" bordered={false} rightIcon={<Radio value="idx2" />} />
            </CellGroup>
          </RadioGroup>
        </TDemoBlock>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TDemoBlock>
          <RadioGroup disabled value={defaultValue}>
            <CellGroup>
              <Cell title="单选" rightIcon={<Radio value="idx1" icon="stroke-line" />} />
              <Cell title="单选" bordered={false} rightIcon={<Radio value="idx2" icon="stroke-line" />} />
            </CellGroup>
          </RadioGroup>
        </TDemoBlock>
      </div>
    </>
  );
}
