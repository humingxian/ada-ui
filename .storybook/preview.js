
import '../src/styles/index.scss'

// 装饰 story 的 组件
import { CenterDecorator } from './decorators'
export const decorators = [CenterDecorator]
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
