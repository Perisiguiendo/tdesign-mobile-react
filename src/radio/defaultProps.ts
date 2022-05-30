/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import identity from 'lodash/identity';
import { TdRadioProps, TdRadioGroupProps } from './type';

export const radioDefaultProps: TdRadioProps = {
  align: 'left',
  allowUncheck: false,
  checked: false,
  contentDisabled: false,
  disabled: undefined,
  icon: 'fill-circle',
  maxContentRow: 5,
  maxLabelRow: 3,
  value: false,
  onChange: identity,
};

export const radioGroupDefaultProps: TdRadioGroupProps = { disabled: undefined, defaultValue: false };
