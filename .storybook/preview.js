/** 为文档中的组件引入样式 */
import '../src/styles/index.scss'

// 这个方法支持在 FontAwesomeIcon 组件上写 string 格式的 icon 名字
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// fas 是所有 free-solid-svg-icons 类型图标的集合
// 通过 library.add 方法将集合都加入进来
library.add(fas)
/**
 * 装饰 story 的 组件
 * 在这里写的装饰器就是全局的，会应用到每个 story 中
 */
import { storyWrapper } from './decorators'
export const decorators = [storyWrapper]
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
