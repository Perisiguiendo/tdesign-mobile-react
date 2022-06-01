import React from 'react';
import { Checkbox, CellGroup, Cell } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function () {
  return (
    <CellGroup>
      <Cell
        leftIcon={
          <Checkbox
            value="1"
            icon={[<Icon key="1" name="check-rectangle-filled" />, <Icon key="2" name="rectangle" />]}
          />
        }
        title="多选"
      />
      <Cell
        leftIcon={
          <Checkbox
            value="2"
            defaultChecked
            icon={[<Icon key="1" name="check-rectangle-filled" />, <Icon key="2" name="rectangle" />]}
          />
        }
        title="多选"
      />
      <Cell
        leftIcon={
          <Checkbox
            value="3"
            defaultChecked
            icon={[<Icon key="1" name="check-rectangle-filled" />, <Icon key="2" name="rectangle" />]}
          />
        }
        title="多选"
      />
    </CellGroup>
  );
}
