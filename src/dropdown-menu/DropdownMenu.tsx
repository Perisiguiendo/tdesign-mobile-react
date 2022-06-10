import React, { memo, useState, useRef, ReactElement, useMemo } from 'react';
import { useSpring, animated } from '@react-spring/web';
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
   * 下拉框距离顶部的高度
   */
  const [top, setTop] = useState<number>(0);
  /**
   * 遮罩层状态
   */
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  /**
   * 当前菜单栏的层级
   */
  // const zIndexComputed = visible ? zIndex || 10001 : 999;
  // const [zIndexComputed, setZIndexComputed] = useState(999);

  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-dropdown`;
  const menuName = `${name}-menu`;

  /**
   * 下拉层动画
   */
  const { height } = useSpring({
    from: { height: 0 },
    height: top,
    config: {
      duration: Number(+duration),
    },
    onStart: () => {
      console.log('onStart: ');
      height.set(0);
    },
    onRest: () => {
      console.log('onRest: ');
      height.set(top);
    },
  });

  /**
   * 子元素
   */
  const newChildren = React.Children.map(props.children, (item: ReactElement) =>
    React.cloneElement(item, { hide: setFalse, clearIndex: setCurIndex, duration, visible }),
  );

  /**
   * 设置当前选中的index
   * 点击菜单后，再去获取菜单元素的top值，然后设置到expand中
   */
  const handleItemClick = (index: number) => {
    // setZIndexComputed(zIndex || 1001);
    if (index === curIndex) {
      setFalse();
      // setZIndexComputed(999);
      height.set(0);
    } else {
      const top = menuRef?.current?.getBoundingClientRect()?.top || 0;
      if (top) {
        setTop(Number(top) + 48);
      }
      setTrue();
      const contentHeight = contentRef?.current?.getBoundingClientRect()?.height || 0;
      console.log('contentHeight: ', contentHeight);
    }
    setCurIndex(index === curIndex ? null : index);
  };

  const handleMenuTitle = (label) => {
    console.log('newChildren.length: ', newChildren.length);
    switch (newChildren.length) {
      case 2:
        return label.length > 6 ? label.slice(0, 6).concat('...') : label;
      case 3:
        return label.length > 4 ? label.slice(0, 4).concat('...') : label;
      case 4:
        return label.length > 2 ? label.slice(0, 2).concat('...') : label;
      default:
        return label;
    }
  };

  const menuTitle = useMemo(
    () =>
      newChildren.map((item: ReactElement, index) => (
        <div
          key={index}
          className={classnames(`${menuName}__item`, {
            't-is-active': index === curIndex,
          })}
          style={{
            color: index === curIndex ? activeColor : '',
          }}
          onClick={() => handleItemClick(index)}
        >
          <div className={`${menuName}__title`}>{handleMenuTitle(item.props?.label) || ''}</div>
        </div>
      )),
    [newChildren, activeColor, menuName, curIndex],
  );

  /**
   * 点击遮罩层
   */
  const handleOverlayClick = () => {
    if (closeOnClickOverlay) {
      setFalse();
      setCurIndex(null);
    }
  };

  // .@{prefix}-dropdown-item__tree-group {
  //   flex: 1;
  //   height: 100%;
  //   overflow-y: scroll;
  // }

  return withNativeProps(
    props,
    <div className={menuName}>
      <div
        id="menu"
        ref={menuRef}
        className={`${menuName}__bar`}
        style={{ zIndex: curIndex !== null ? zIndex || 10001 : 999 }}
      >
        {menuTitle}
      </div>
      {visible && <Overlay visible={showOverlay} onOverlayClick={handleOverlayClick} />}
      {visible && (
        <animated.div
          id="content"
          ref={contentRef}
          style={{
            height: height.to((o) => `calc((100vh - ${top}px) * ${o} / ${top})`),
            // transform: `translate(0px, ${top}px)`,
            maxHeight: `calc(100vh - ${top}px)`,
            zIndex: 10001,
          }}
          className={classnames(`${name}-item`, {
            't-is-expanded': visible,
          })}
        >
          {newChildren.filter((item: ReactElement, index) => index === curIndex)}
        </animated.div>
      )}
    </div>,
  );
};

DropdownMenu.defaultProps = dropdownMenuDefaultProps;
DropdownMenu.displayName = 'DropDownMenu';

export default memo(DropdownMenu);
