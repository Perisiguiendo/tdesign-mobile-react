:: BASE_DOC ::

## API
### DropdownMenu Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
activeColor | String | - | 【讨论中】菜单标题和选项的选中态颜色 | N
closeOnClickOverlay | Boolean | true | 是否在点击遮罩层后关闭菜单 | N
duration | String / Number | 200 | 动画时长 | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
zIndex | Number | - | 菜单栏 z-index 层级 | N

### DropdownItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 类名 | N
style | Object | - | 样式，TS 类型：`React.CSSProperties` | N
disabled | Boolean | false | 是否禁用 | N
label | String | - | 标题 | N
multiple | Boolean | false | 是否多选 | N
options | Array | [] | 选项数据。TS 类型：`Array<TdDropdownItemOption>` `interface TdDropdownItemOption { label: string;disabled: boolean;value: TdDropdownItemOptionValueType; [key: string]: any }`。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/dropdown-menu/type.ts) | N
optionsColumns | String / Number | 1 | 选项分栏（1-3） | N
optionsLayout | String | columns | 选项排列。可选项：columns/tree | N
value | String / Number / Array | undefined | 选中值。TS 类型：`TdDropdownItemOptionValueType | Array<TdDropdownItemOptionValueType> ` `type TdDropdownItemOptionValueType = string | number;`。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/dropdown-menu/type.ts) | N
defaultValue | String / Number / Array | undefined | 选中值。非受控属性。TS 类型：`TdDropdownItemOptionValueType | Array<TdDropdownItemOptionValueType> ` `type TdDropdownItemOptionValueType = string | number;`。[详细类型定义](https://github.com/TDesignOteam/tdesign-mobile-react/tree/develop/src/dropdown-menu/type.ts) | N
onChange | Function |  | TS 类型：`(value: TdDropdownItemOptionValueType | Array<TdDropdownItemOptionValueType>) => void`<br/>值改变时触发 | N
