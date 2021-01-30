/** 为文档中的组件引入样式 */
import '../src/styles/index.scss'
/**
 * 装饰 story 的 组件
 * 在这里写的装饰器就是全局的，会应用到每个 story 中
 */
import { storyWrapper } from './decorators'
export const decorators = [storyWrapper]
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
