import React, { memo, useRef, useState, useCallback, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { RadioGroup, Radio, Checkbox, Button } from 'tdesign-mobile-react';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { TdDropdownItemProps } from './type';
import { dropdownItemDefaultProps } from './defaultProps';
import useConfig from '../_util/useConfig';
import usePopupCssTransition from './hooks/usePopupCssTransition';
// import { formatChecker } from './formatChecker';

export interface DropdownItemProps extends TdDropdownItemProps, NativeProps {
  show: boolean;
  duration: number;
}

const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const { show, multiple, disabled, optionsColumns, options, defaultValue, value, onChange, duration, optionsLayout } =
    props;
  console.log('multiple: ', multiple);

  console.log('options: ', options);
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-dropdown-item`;

  const columns = new Array(optionsColumns || 1).fill(0);

  const contentRef = useRef<HTMLDivElement>(null);

  const cssTransitionState = usePopupCssTransition({ contentRef });

  const [isTreeLayout] = useState(optionsLayout === 'tree');

  const radioGroupContent = (
    <RadioGroup>
      {options.map((item, index) => (
        <div className={`${name}__cell`} key={index}>
          <Radio value={item.value}>{item.label}</Radio>
        </div>
      ))}
    </RadioGroup>
  );

  const checkboxContent = (
    <Checkbox.Group>
      {options.map((item, index) => (
        <div className={`${name}__cell`} key={index}>
          <Checkbox value={item.value} content={item.label} />
        </div>
      ))}
    </Checkbox.Group>
  );

  const fatherItems = useMemo(() => {
    if (multiple && isTreeLayout) {
      return options.map((item) => ({
        value: item.value,
        label: item.label,
      }));
    }
    return [];
  }, [multiple, isTreeLayout, options]);

  return withNativeProps(
    props,
    <CSSTransition in={show} timeout={duration} appear {...cssTransitionState.props}>
      <div
        className={classnames(
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
        )}
      >
        <div className={`${name}__bd`}>
          {!isTreeLayout && <>{multiple ? checkboxContent : radioGroupContent}</>}
          {isTreeLayout && (
            <>
              {columns.map((item, index) => (
                <div key={index} className={`${name}__tree-group`}>
                  {multiple ? checkboxContent : radioGroupContent}
                </div>
              ))}
            </>
          )}
        </div>
        {(multiple || optionsLayout === 'tree') && (
          <div className={`${name}__ft`}>
            <Button type="reset" variant="outline">
              重置
            </Button>
            <Button theme="primary">确定</Button>
          </div>
        )}
      </div>
    </CSSTransition>,
  );
};

DropdownItem.defaultProps = dropdownItemDefaultProps;
DropdownItem.displayName = 'DropDownItem';

export default memo(DropdownItem);
