import React, { useContext, useMemo, Ref, forwardRef, CSSProperties } from 'react';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
import { TdCheckboxProps } from './type';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import CheckboxGroup from './CheckboxGroup';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { checkboxDefaultProps } from './defaultProps';

export interface CheckProps extends TdCheckboxProps, NativeProps {
  ref: Ref<HTMLLabelElement>;
}

enum ALIGN {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface CheckContextValue {
  inject: (props: CheckProps) => CheckProps;
}

export const CheckContext = React.createContext<CheckContextValue>(null);

const getLimitRowStyle = (row: number): CSSProperties => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: row,
});

const Checkbox = forwardRef((_props: CheckProps, ref: Ref<HTMLInputElement>) => {
  const context = useContext(CheckContext);
  const props = context ? context.inject(_props) : _props;
  const { classPrefix } = useConfig();
  const prefixName = `${classPrefix}-checkbox`;
  const {
    name,
    align,
    content,
    children,
    disabled,
    indeterminate,
    label,
    onChange,
    checked,
    defaultChecked,
    readonly,
    value,
    maxLabelRow,
    maxContentRow,
    icon,
    contentDisabled,
  } = props;
  const [internalChecked, setInternalChecked] = useDefault(checked, defaultChecked, onChange);
  const alignStyle: CSSProperties = {
    flexDirection: align === ALIGN.LEFT ? 'row' : 'row-reverse',
  };
  const checkboxClassName = classNames(`${prefixName}`, {
    [`${classPrefix}-is-checked`]: internalChecked,
    [`${classPrefix}-is-disabled`]: disabled,
  });
  const iconName = useMemo(() => {
    if (indeterminate) {
      return 'minus-circle-filled';
    }
    if (internalChecked) {
      return 'check-circle-filled';
    }
    return 'circle';
  }, [indeterminate, internalChecked]);
  const renderIcon = () => {
    if (Array.isArray(icon)) {
      if (internalChecked) {
        return icon[0];
      }
      return icon[1];
    }
    return (
      <Icon
        name={iconName}
        className={classNames(`${classPrefix}-icon`, {
          [`${prefixName}__checked__disable-icon`]: disabled || !internalChecked,
        })}
      />
    );
  };
  const labelStyle: CSSProperties = {
    color: disabled ? '#dcdcdc' : 'inherit',
    ...getLimitRowStyle(maxLabelRow),
  };
  const handleClick = (e) => {
    if (contentDisabled) {
      e.preventDefault();
    }
  };
  return withNativeProps(
    props,
    <label style={alignStyle} onClick={handleClick}>
      <div className={checkboxClassName}>
        <div className={`${prefixName}__content-wrap`}>
          <span className={`${prefixName}__icon-left`}>
            <input
              readOnly={readonly}
              value={value}
              ref={ref}
              type="checkbox"
              name={name}
              className={`${prefixName}__original-left`}
              disabled={disabled}
              checked={internalChecked}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setInternalChecked(e.currentTarget.checked, { e });
              }}
            />
            {renderIcon()}
          </span>
          <span className={`${prefixName}__label`}>
            <span style={labelStyle}>{label}</span>
            {(children || content) && (
              <div className={`${classPrefix}-cell__description`} style={getLimitRowStyle(maxContentRow)}>
                {children || content}
              </div>
            )}
          </span>
        </div>
      </div>
    </label>,
  );
});

Checkbox.defaultProps = checkboxDefaultProps;
Checkbox.displayName = 'Checkbox';

export default forwardRefWithStatics(
  (props: TdCheckboxProps, ref: Ref<HTMLInputElement>) => <Checkbox ref={ref} {...props} />,
  { Group: CheckboxGroup },
);
