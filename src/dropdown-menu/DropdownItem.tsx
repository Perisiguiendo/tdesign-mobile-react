import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { RadioGroup, Radio, Checkbox, Button } from 'tdesign-mobile-react';
import useDefault from 'tdesign-mobile-react/_util/useDefault';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { TdDropdownItemOptionValueType, TdDropdownItemProps } from './type';
import { dropdownItemDefaultProps } from './defaultProps';
import useConfig from '../_util/useConfig';

export interface DropdownItemProps extends TdDropdownItemProps, NativeProps {
  hide: () => void;
  clearIndex: React.Dispatch<React.SetStateAction<number>>;
}

const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const {
    multiple,
    disabled,
    optionsColumns,
    options,
    defaultValue,
    optionsLayout,
    value,
    onChange,
    hide,
    clearIndex,
  } = props;

  const [tempValue, setTempValue] = useDefault(value, defaultValue, onChange);
  console.log('tempValue: ', tempValue);

  const [isTreeLayout] = useState(optionsLayout === 'tree');

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-dropdown-item`;

  const columns = new Array(optionsColumns || 1).fill(0);

  const dropdownItemClassName = useMemo(
    () =>
      classnames(
        `${name}__content`,
        {
          [`${classPrefix}-is-tree`]: isTreeLayout,
        },
        [`${classPrefix}-is-col${optionsColumns}`],
        {
          [`${classPrefix}-is-single`]: !multiple,
          [`${classPrefix}-is-disabled`]: disabled,
          [`${classPrefix}-is-multi`]: multiple,
        },
      ),
    [name, classPrefix, isTreeLayout, optionsColumns, multiple, disabled],
  );

  const defaultRadioValue = useMemo(() => {
    if (!tempValue) {
      return [];
    }
    if (isArray(tempValue)) {
      return tempValue;
    }
    if (isString(tempValue) || isNumber(tempValue)) {
      return [tempValue];
    }
  }, [tempValue]);

  const [tempRadioValue, setTempRadioValue] = useState<TdDropdownItemOptionValueType[]>(defaultRadioValue);
  const [tempCheckboxValue, setTempCheckboxValue] = useState<TdDropdownItemOptionValueType[]>(defaultRadioValue);

  useEffect(() => {
    console.log('tempRadioValue', tempRadioValue);
    if (onChange) {
      onChange(tempRadioValue?.filter((v) => v));
    }
  }, [tempRadioValue]);
  console.log('tempRadioValue: ', tempRadioValue);

  /**
   * 确定按钮disabled
   */
  const optDisabled = useMemo(() => {
    if (!multiple) {
      if (optionsColumns === 2 && tempRadioValue.filter((v) => v).length === 2) {
        return false;
      }
      if (optionsColumns === 3 && tempRadioValue.filter((v) => v).length === 3) {
        return false;
      }
      return true;
    }
    return !tempRadioValue.length;
  }, [optionsColumns, tempRadioValue, multiple]);

  /**
   * 子节点
   * @description 根据父节点的值，渲染子节点
   */
  const childLeafs = useMemo(
    () => (optionsColumns !== 1 ? options?.filter((v) => v.value === tempRadioValue[0])?.[0]?.options : []),
    [options, tempRadioValue, optionsColumns],
  );

  /**
   * 孙子节点
   * @description 根据子节点的值，渲染孙子节点
   */
  const grandsonLeafs = useMemo(
    () => (optionsColumns === 3 ? childLeafs?.filter((v) => v.value === tempRadioValue[1])?.[0]?.options : []),
    [childLeafs, tempRadioValue, optionsColumns],
  );

  /**
   * @param value
   * @param index
   * @description 单选点击内容，更新状态
   */
  const radioChange = (value, index) => {
    console.log('index: ', index);
    console.log('value: ', value);

    const newValue =
      // eslint-disable-next-line no-nested-ternary
      index === 0
        ? [value, null, null]
        : index === 1
        ? [tempRadioValue?.[0] || options[0]?.value, value, null]
        : [tempRadioValue?.[0] || options[0]?.value, tempRadioValue?.[1] || options[0]?.options[0]?.value, value];
    setTempRadioValue([...newValue.map((v) => v)]);

    // if (!multiple && optionsLayout !== 'tree') {
    //   hide();
    // }
  };

  /**
   * @param value
   * @description 多选点击内容，更新状态
   */
  const checkboxChange = (value) => setTempCheckboxValue(value);

  /**
   * @param value
   * @description 单选内容value
   */
  const radioSingleValue = useCallback((index: number) => tempRadioValue?.[index] || null, [tempRadioValue]);

  /**
   * @param value
   * @description 单选内容节点
   */
  const radioContent = useCallback(
    (index: number) => {
      switch (index) {
        case 0: // fatherLeafs
          return options;
        case 1: // childLeafs
          return tempRadioValue[0] ? childLeafs : options[0]?.options || [];
        case 2: // grandsonLeafs
          return tempRadioValue[1] ? grandsonLeafs : options[0]?.options[0]?.options || [];
        default:
          return [];
      }
    },
    [options, tempRadioValue, childLeafs, grandsonLeafs],
  );

  const radioGroupContent = (index) => (
    <RadioGroup
      defaultValue={defaultValue as TdDropdownItemOptionValueType}
      value={radioSingleValue(index)}
      onChange={(value) => radioChange(value, index)}
      disabled={disabled}
    >
      {(radioContent(index) || []).map((item, index) => (
        <div className={`${name}__cell`} key={index}>
          <Radio value={item.value} disabled={item.disabled}>
            {item.label}
          </Radio>
        </div>
      ))}
    </RadioGroup>
  );
  console.log('defaultValue: ', defaultValue);

  /**
   * @param value
   * @description 多选内容节点
   */
  const checkboxContent = (
    <Checkbox.Group
      disabled={disabled}
      defaultValue={tempCheckboxValue as TdDropdownItemOptionValueType[]}
      onChange={checkboxChange}
    >
      {options.map((item, index) => (
        <div className={`${name}__cell`} key={index}>
          <Checkbox {...item} value={item.value} disabled={item.disabled} label={item.label} />
        </div>
      ))}
    </Checkbox.Group>
  );

  /**
   * 确定
   */
  const handleConfirm = () => {
    console.log('confirm');
    hide();
    clearIndex(null);
  };

  /**
   * 重置
   */
  const handleReset = () => {
    setTempRadioValue([]);
  };

  return withNativeProps(
    props,
    <div
      // style={listSpring}
      className={dropdownItemClassName}
    >
      <div className={`${name}__bd`}>
        {!isTreeLayout && <>{multiple ? checkboxContent : radioGroupContent(0)}</>}
        {isTreeLayout && (
          <>
            {columns.map((item, index) => (
              <div key={index} className={`${name}__tree-group`}>
                {multiple ? checkboxContent : radioGroupContent(index)}
              </div>
            ))}
          </>
        )}
      </div>
      {(multiple || optionsLayout === 'tree') && (
        <div className={`${name}__ft`}>
          <Button type="reset" variant="outline" onClick={handleReset}>
            重置
          </Button>
          <Button theme="primary" disabled={optDisabled} onClick={handleConfirm}>
            确定
          </Button>
        </div>
      )}
    </div>,
  );
};

DropdownItem.defaultProps = dropdownItemDefaultProps;
DropdownItem.displayName = 'DropDownItem';

export default memo(DropdownItem);
