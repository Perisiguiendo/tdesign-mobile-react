import React, { memo, useRef } from 'react';
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
  const { show, multiple, disabled, optionsColumns, options, defaultValue, value, onChange, duration } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-dropdown-item`;

  const contentRef = useRef<HTMLDivElement>(null);

  const cssTransitionState = usePopupCssTransition({ contentRef });

  return withNativeProps(
    props,
    <CSSTransition in={show} timeout={duration} appear {...cssTransitionState.props}>
      <div
        className={classnames(`${name}__content`, [`${classPrefix}-is-col${optionsColumns}`], {
          [`${classPrefix}-is-single`]: !multiple,
          [`${classPrefix}-is-disabled`]: disabled,
          [`${classPrefix}-is-multi`]: multiple,
        })}
      >
        <div className={`${name}__bd`}>
          {!multiple && (
            <RadioGroup>
              {options.map((item, index) => (
                <Radio key={index} value={item.value}>
                  {item.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
          {multiple && (
            <Checkbox.Group value={value} onChange={() => {}}>
              {options.map((item, index) => (
                <div className={`${name}__cell`} key={index}>
                  <Checkbox value={item.value}>{item.label}</Checkbox>
                </div>
              ))}
            </Checkbox.Group>
          )}
        </div>
        {multiple && (
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
