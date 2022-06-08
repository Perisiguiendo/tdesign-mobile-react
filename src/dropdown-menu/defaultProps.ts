/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import identity from 'lodash/identity';
import { TdDropdownMenuProps, TdDropdownItemProps } from './type';

export const dropdownMenuDefaultProps: TdDropdownMenuProps = {
  closeOnClickOverlay: true,
  duration: 200,
  showOverlay: true,
};

export const dropdownItemDefaultProps: TdDropdownItemProps = {
  disabled: false,
  multiple: false,
  options: [],
  optionsColumns: 1,
  optionsLayout: 'columns',
  value: undefined,
  onChange: identity,
};
