import React, { useState } from 'react';
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
    value: `option_${String.fromCharCode(str.charCodeAt() + i)}`,
  }));

  const numberArrB = emptyArr.map((_, i) => ({
    label: `选项 ${i + 3}`,
    value: `option_${i + 3}`,
  }));

  const buildTree = (length) => {
    const tree = [];
    for (let i = 0; i < length; i++) {
      const item = {
        label: `选项 ${i + 1}`,
        value: `options_${i + 1}`,
      };

      const options = new Array(10).fill(null).map((_, index) => ({
        label: `子选项 ${index + 1 + i}`,
        value: `options_${1 + i}_${index + 1 + i}`,
      }));

      item.options = options;

      tree.push(item);
    }
    return tree;
  };

  const buildTreeDepth3 = (length) => {
    const tree = [];
    for (let i = 0; i < length; i++) {
      const item = {
        label: `选项 ${i + 1}`,
        value: `options_${i + 1}`,
      };

      const options = new Array(10).fill(null).map((_, index) => ({
        label: `子选项 ${index + 1 + i}`,
        value: `options_${i + 1}_${index + 1 + i}`,
        options: new Array(10).fill(null).map((_, j) => ({
          label: `孙子项 ${j + 1 + i + index}`,
          value: `options_${i + 1}_${index + 1 + i}_${j + 1 + i + index}`,
        })),
      }));

      item.options = options;

      tree.push(item);
    }
    return tree;
  };

  const optionsT1 = buildTree(8);
  console.log('optionsT1: ', optionsT1);

  const optionsT3 = buildTreeDepth3(6);
  console.log('optionsT3: ', optionsT3);

  const [value1, setValue1] = useState('');

  const onChange1 = (value) => {
    console.log(value);
    if (!value[1]) {
      setValue1(value[0]);
    } else {
      setValue1(value);
    }
  };

  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="DropdownMenu 下拉菜单"
        summary="菜单呈现数个并列的选项类目，用于整个页面的内容筛选，由菜单面板和菜单选项组成。"
      />
      <TDemoBlock summary="单选单行下拉菜单">
        <DropdownMenu activeColor="#450">
          <DropdownItem label="菜单1" options={numberArr} defaultValue="option_3" onChange={onChange1} />
          <DropdownItem label="菜单1" options={numberArrA} value={value1} onChange={onChange1} />
          <DropdownItem label="最多1" options={numberArrB} onChange={onChange1} />
        </DropdownMenu>
      </TDemoBlock>
      <TDemoBlock title="01 类型" summary="树形单选多行下拉菜单">
        <DropdownMenu activeColor="#450">
          <DropdownItem label="菜单" options={numberArr} onChange={onChange1} />
          <DropdownItem label="菜单" options={optionsT1} optionsLayout="tree" optionsColumns={2} onChange={onChange1} />
          <DropdownItem label="最多" options={optionsT3} optionsLayout="tree" optionsColumns={3} onChange={onChange1} />
        </DropdownMenu>
      </TDemoBlock>
      <TDemoBlock summary="多选多行下拉菜单">
        <DropdownMenu activeColor="#450">
          <DropdownItem label="菜单2" multiple options={numberArr} onChange={onChange1} />
          <DropdownItem label="菜单2" multiple options={optionsT1} onChange={onChange1} optionsColumns={2} />
          <DropdownItem label="最多2" multiple options={numberArrB} onChange={onChange1} optionsColumns={3} />
        </DropdownMenu>
      </TDemoBlock>
      <TDemoBlock summary="树形多选下拉菜单">
        <DropdownMenu activeColor="#450">
          <DropdownItem label="菜单3" multiple optionsLayout="tree" options={optionsT1} />
          <DropdownItem label="菜单3" multiple optionsLayout="tree" options={numberArrA} />
          <DropdownItem label="最多3" multiple optionsLayout="tree" options={numberArrB} />
        </DropdownMenu>
      </TDemoBlock>
      <TDemoBlock summary="多选下拉菜单">
        <DropdownMenu activeColor="#450">
          <DropdownItem label="菜单4" multiple options={numberArr} />
          <DropdownItem label="菜单4" multiple options={numberArrA} />
          <DropdownItem label="最多4" multiple options={numberArrB} />
        </DropdownMenu>
      </TDemoBlock>
    </div>
  );
}
