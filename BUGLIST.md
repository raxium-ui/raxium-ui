[x] v-title 内容为空时 不应该显示
[x] update ark-ui 版本
[x] update zagjs 版本
[x] 自动化版本升级
[x] popover trigger 和 input 组合时, trigger 属性会随 $attr 传透到 <input> 上, 需要还原
[x] 考虑addons中增加 Primitive组件实现 as-child功能
[x] ~~考虑addons swiper暴露出swiper context~~
[x] Checkbox Menu 无障碍无法使用
[x] 考虑增加全局设置 Tooltip, Popover 等组件的theme, 用于设定surface
[x] 考虑增加 Tooltip Popover Hovercard 全局默认positioning设置
[x] Dialog 增加 beforeClose 用于暂停关闭等待回调
[x] 调整显示多个Dialog时的层级
[x] 由于 functional Dialog 创建时, 采用了创建新Vue实例挂载到DOM, 会存在拿不到主(App) Vue Instance绑定的组件/数据, 例如: <i18n-t> 等
[x] Checkbox/Swith 等组件的hiddenInput存在tab后焦点改变导致scoll页面自动scroll
[x] Tabs在切换过程中, 动画使用的是motion-translate-x, 同时存在prev content 和 next content 导致container容器过长,出现scrollbar后消失
[x] 使用方向键切换Tabs过程中: 例如有3个Tab, Tab3 -> Tab1的过程中 tab1的content 会将tab3的content挤到下方后, tab3 content消失, 造成闪烁
[x] v-lazy 没有对src为空字符处理
[x] *.ai.json 应该转为 yaml 形式更适合AI阅读, 并且更新 agents
[x] dialog 要重新确定/计算堆叠情况下的z-index排布, 避免退出动画被遮住 (zagjs patch)
[x] dialog / tooltip 等一系列组件的 z-index 竞争问题
[x] Vue RadioGroup / CheckboxGroup / Select / Tree 值泛型可在消费方模板里推断窄 T
    - 根组件泛型不再使用完整值联合的默认类型，复合导出保留 `typeof Root` 调用签名
    - Select 的 `highlightedValue` 与 model value 泛型分离，同时保留原有 `SelectValueType` 支持范围
    - 类型验收覆盖具名导入、复合导出和全局注册的 `R*` 组件，并纳入 `typecheck`
