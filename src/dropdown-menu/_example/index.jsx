import React from 'react';
import { DropdownMenu, DropdownItem } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

import './style/index.less';

export default function () {
  const emptyArr = new Array(20).fill(null);
  const str = 'A';
  const numberArr = emptyArr.map((_, i) => ({
    label: `选项 ${i + 1}`,
    value: `option_${i + 1}`,
  }));

  const numberArrA = emptyArr.map((_, i) => ({
    label: `选项 ${String.fromCharCode(str.charCodeAt() + i)}`,
    value: `option_${i + 1}`,
  }));

  const numberArrB = emptyArr.map((_, i) => ({
    label: `选项 ${i + 3}`,
    value: `option_${i + 1}`,
  }));

  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="DropdownMenu 下拉菜单"
        summary="菜单呈现数个并列的选项类目，用于整个页面的内容筛选，由菜单面板和菜单选项组成。"
      />
      <TDemoBlock title="01 类型" summary="单选下拉菜单">
        <DropdownMenu activeColor="#450">
          <DropdownItem label="菜单" options={numberArr} />
          <DropdownItem label="菜单" options={numberArrA} />
          <DropdownItem label="最多" options={numberArrB} />
        </DropdownMenu>
      </TDemoBlock>
      <TDemoBlock summary="多选下拉菜单">
        <DropdownMenu activeColor="#450">
          <DropdownItem label="菜单1" multiple options={numberArr} />
          <DropdownItem label="菜单1" multiple={true} options={numberArrA} />
          <DropdownItem label="最多1" multiple={true} options={numberArrB} />
        </DropdownMenu>
      </TDemoBlock>
      <TDemoBlock summary="多选下拉菜单">
        <DropdownMenu activeColor="#450">
          <DropdownItem label="菜单2" multiple={true} options={numberArr} />
          <DropdownItem label="菜单2" multiple={true} options={numberArrA} />
          <DropdownItem label="最多2" multiple={true} options={numberArrB} />
        </DropdownMenu>
      </TDemoBlock>
      <TDemoBlock summary="多选下拉菜单">
        <DropdownMenu activeColor="#450">
          <DropdownItem label="菜单3" multiple={true} options={numberArr} />
          <DropdownItem label="菜单3" multiple={true} options={numberArrA} />
          <DropdownItem label="最多3" multiple={true} options={numberArrB} />
        </DropdownMenu>
      </TDemoBlock>
      <TDemoBlock summary="多选下拉菜单">
        <DropdownMenu activeColor="#450">
          <DropdownItem label="菜单4" multiple={true} options={numberArr} />
          <DropdownItem label="菜单4" multiple={true} options={numberArrA} />
          <DropdownItem label="最多4" multiple={true} options={numberArrB} />
        </DropdownMenu>
      </TDemoBlock>
    </div>
  );
}
