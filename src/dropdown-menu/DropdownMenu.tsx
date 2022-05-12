import React, { memo, useState, useRef, ReactElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { useBoolean } from 'ahooks';
import { Overlay } from 'tdesign-mobile-react';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { TdDropdownMenuProps } from './type';
import { dropdownMenuDefaultProps } from './defaultProps';
import useConfig from '../_util/useConfig';
import usePopupCssTransition from './hooks/usePopupCssTransition';

export type DropdownMenuProps = TdDropdownMenuProps & NativeProps;

const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const { zIndex, showOverlay, activeColor, closeOnClickOverlay, duration } = props;

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-dropdown`;
  const menuName = `${name}-menu`;
  const itemName = `${name}-item`;
  const [top, setTop] = useState<number>(0);

  const [visible, { setTrue, setFalse }] = useBoolean(false);

  const maskRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const [curIndex, setCurIndex] = useState<number>(null);

  const maskCssTransitionState = usePopupCssTransition({ contentRef: maskRef, classPrefix: 'fade' });

  const newChildren = React.Children.map(props.children, (item) => item);
  console.log('newChildren: ', newChildren);

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

  const handleOverlayClick = () => {
    if (closeOnClickOverlay) {
      setFalse();
      setCurIndex(null);
    }
  };

  const zIndexComputed = visible ? zIndex || 10001 : 999;

  return withNativeProps(
    props,
    <div className={menuName}>
      <CSSTransition in={visible} timeout={duration} appear {...maskCssTransitionState.props}>
        <div ref={maskRef} className={`${itemName}`} style={{ display: 'none' }}>
          <Overlay visible={showOverlay && visible} onOverlayClick={handleOverlayClick} />
        </div>
      </CSSTransition>
      <div id="container" ref={menuRef} className={`${menuName}__bar`} style={{ zIndex: zIndexComputed }}>
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
        <div
          className={classnames(`${name}-item`, {
            't-is-expanded': visible,
          })}
          style={{ top }}
        >
          {items}
        </div>
      )}
    </div>,
  );
};

DropdownMenu.defaultProps = dropdownMenuDefaultProps;
DropdownMenu.displayName = 'DropDownMenu';

export default memo(DropdownMenu);
