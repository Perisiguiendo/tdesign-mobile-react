import React, { memo, useState, useRef, ReactElement } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import classnames from 'classnames';
import { useBoolean } from 'ahooks';
import { Overlay } from 'tdesign-mobile-react';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { TdDropdownMenuProps } from './type';
import { dropdownMenuDefaultProps } from './defaultProps';
import useConfig from '../_util/useConfig';

export type DropdownMenuProps = TdDropdownMenuProps & NativeProps;

const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const { zIndex, showOverlay, activeColor, closeOnClickOverlay, duration } = props;
  /**
   * 菜单栏index
   */
  const [curIndex, setCurIndex] = useState<number>(null);
  /**
   * 下拉框绝对高度
   */
  const [top, setTop] = useState<number>(0);
  /**
   * 遮罩层状态
   */
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  /**
   * 当前菜单栏的层级
   */
  const zIndexComputed = visible ? zIndex || 10001 : 999;

  const maskRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-dropdown`;
  const menuName = `${name}-menu`;
  const itemName = `${name}-item`;

  // 蒙层动画
  const maskSpring = useSpring({
    opacity: visible ? 1 : 0,
    config: {
      duration: Number(+duration),
    },
    onStart: () => {
      console.log('onStart: ');
      // setTrue();
    },
    onRest: () => {
      console.log('onRest: ');
      // setFalse();
    },
  });

  /**
   * 下拉层动画
   */
  const { o } = useSpring({
    from: { o: 0 },
    o: top,
    config: {
      duration: 120000,
    },
    onStart: () => {
      console.log('onStart: ');
      // setTrue();
    },
    onRest: () => {
      console.log('onRest: ');
      // setFalse();
    },
  });

  /**
   * 子元素
   */
  const newChildren = React.Children.map(props.children, (item) =>
    React.cloneElement(item, { hide: setFalse, clearIndex: setCurIndex, duration, visible }),
  );
  const items = newChildren.filter((item: ReactElement, index) => index === curIndex);
  /**
   * 设置当前选中的index
   * 点击菜单后，再去获取菜单元素的top值，然后设置到expand中
   */
  const handleItemClick = (index: number) => {
    if (index === curIndex) {
      setFalse();
    } else {
      const top = menuRef?.current?.getBoundingClientRect()?.top || 0;
      if (top) {
        setTop(Number(top) + 48);
      }
      setTrue();
    }
    setCurIndex(index === curIndex ? null : index);
  };
  /**
   * 点击遮罩层
   */
  const handleOverlayClick = () => {
    if (closeOnClickOverlay) {
      setFalse();
      setCurIndex(null);
    }
  };

  return withNativeProps(
    props,
    <div className={menuName}>
      <animated.div style={maskSpring}>
        <div ref={maskRef} className={`${itemName}`}>
          <Overlay visible={showOverlay && visible} onOverlayClick={handleOverlayClick} />
        </div>
      </animated.div>
      <div
        id="container"
        ref={menuRef}
        className={`${menuName}__bar`}
        style={{ zIndex: curIndex !== null ? zIndexComputed : 1 }}
      >
        {newChildren.map((item: ReactElement, index) => (
          <div
            key={index}
            className={classnames(`${menuName}__item`, {
              't-is-active': index === curIndex,
            })}
            onClick={() => handleItemClick(index)}
            style={{ color: index === curIndex ? activeColor : '' }}
          >
            <div className={`${menuName}__title`}>{item.props?.label || ''}</div>
          </div>
        ))}
      </div>
      {visible && (
        <animated.div
          style={{
            height: o.to((o) => `calc(100vh - ${o}px`),
            transform: `translate(0px, ${top}px)`,
            maxHeight: `calc(100vh - ${top}px)`,
          }}
          className={classnames(`${name}-item`, {
            't-is-expanded': visible,
          })}
        >
          {items}
        </animated.div>
      )}
    </div>,
  );
};

DropdownMenu.defaultProps = dropdownMenuDefaultProps;
DropdownMenu.displayName = 'DropDownMenu';

export default memo(DropdownMenu);
