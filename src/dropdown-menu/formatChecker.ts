import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
/**
 * value、defaultValue 格式校验
 */
export const formatChecker = (props) => {
  if (props.show) {
    if (props.multiple && !isArray(props.value) && !isArray(props.defaultValue)) {
      console.error('DropdownMenu: multiple=true, but value or defaultValue is not an array');
      return false;
    }
    if (
      !props.multiple &&
      !isString(props.value) &&
      !isNumber(props.value) &&
      !isString(props.defaultValue) &&
      !isNumber(props.defaultValue)
    ) {
      console.error('DropdownMenu: multiple=false, but value or defaultValue is not a string or a number');
      return false;
    }
    return true;
  }
};
