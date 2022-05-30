import React, { createContext, CSSProperties, forwardRef, ReactNode, Ref, useContext, useRef } from 'react';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import { TdRadioProps } from './type';
import RadioGroup from './RadioGroup';
import { radioDefaultProps } from './defaultProps';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';

export interface RadioProps extends TdRadioProps, NativeProps {
  ref?: Ref<HTMLDivElement>;
}

export interface RadioContextValue {
  inject: (props: RadioProps) => RadioProps;
}
export const RadioContext = createContext<RadioContextValue>(null);

const getLimitRow = (row: number): CSSProperties => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: row,
  whiteSpace: 'normal',
  wordBreak: 'break-word',
  textOverflow: 'ellipsis',
});

const Radio = forwardRef((_props: RadioProps, ref: Ref<HTMLDivElement>) => {
  const inputRef = useRef();
  const context = useContext(RadioContext);
  const props = context ? context.inject(_props) : _props;
  const { classPrefix } = useConfig();
  const radioName = `${classPrefix}-radio`;

  const {
    align,
    allowUncheck,
    checked,
    defaultChecked,
    children,
    content,
    contentDisabled,
    disabled,
    icon,
    label,
    maxContentRow,
    maxLabelRow,
    name,
    value,
    onChange,
  } = props;

  const [radioChecked, setRadioChecked] = useDefault(checked, defaultChecked, onChange);

  const switchRadioChecked = (area?: string) => {
    if (disabled) {
      return;
    }
    if (area === 'content' && contentDisabled) {
      return;
    }
    if (radioChecked && !allowUncheck) {
      return;
    }
    console.log('radioChecked: ', radioChecked);
    setRadioChecked(!radioChecked, { e: inputRef.current });
  };

  const renderIcon = () => {
    let iconName = '';
    let iconNode: ReactNode;
    if (icon === 'fill-circle') {
      iconName = radioChecked ? 'check-circle-filled' : 'circle';
    } else if (icon === 'stroke-line' && radioChecked) {
      iconName = 'check';
    } else if (Array.isArray(icon)) {
      if (radioChecked) {
        [iconNode] = icon;
      } else {
        [, iconNode] = icon;
      }
    }
    if (iconNode) return <>{iconNode}</>;
    return (
      <Icon
        className={classNames(`${classPrefix}-icon`, {
          [`${radioName}__checked__disable-icon`]: disabled,
        })}
        name={iconName}
      />
    );
  };

  const labelStyle = {
    ...getLimitRow(maxLabelRow),
    color: disabled ? '#dcdcdc' : 'inherit',
  };

  const input = (
    <input
      type="radio"
      readOnly
      name={name}
      ref={inputRef}
      // @ts-ignore
      value={value}
      disabled={disabled}
      className={classNames(`${radioName}__former`)}
      checked={radioChecked}
      onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}
      onChange={(e) => {
        console.log('e: ', e);
        setRadioChecked(e.currentTarget.checked, { e });
      }}
    />
  );

  return withNativeProps(
    _props,
    <div
      className={classNames(`${radioName}`, {
        [`${classPrefix}-is-disabled`]: disabled,
        [`${classPrefix}-is-checked`]: value,
      })}
      ref={ref}
    >
      <div className={`${radioName}__content-wrap`}>
        {align === 'left' && (
          <span className={`${radioName}__icon-wrap`} onClick={() => switchRadioChecked()}>
            {input}
            {renderIcon()}
          </span>
        )}
        {(label || content || children) && (
          <div className={`${radioName}__label-wrap`}>
            {label && (
              <span
                className={`${radioName}content-title`}
                style={labelStyle}
                onClick={() => switchRadioChecked('content')}
              >
                {label}
              </span>
            )}
            {(content || children) && (
              <div
                className={`${radioName}__content-inner`}
                onClick={() => {
                  switchRadioChecked('content');
                }}
                style={getLimitRow(maxContentRow)}
              >
                {content || children}
              </div>
            )}
          </div>
        )}
        {align === 'right' && (
          <span
            className={`${radioName}__icon-wrap ${radioName}__icon-right-wrap`}
            onClick={() => switchRadioChecked()}
          >
            {input}
            {renderIcon()}
          </span>
        )}
      </div>
    </div>,
  );
});

Radio.defaultProps = radioDefaultProps;
Radio.displayName = 'Radio';

export default forwardRefWithStatics(
  (props: RadioProps, ref: Ref<HTMLDivElement>) => <Radio ref={ref} {...props}></Radio>,
  { Group: RadioGroup },
);
