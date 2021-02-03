// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

// 这里可以引入测试用例中需要的资源（全局范围）
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// fas 是所有 free-solid-svg-icons 类型图标的集合
// 通过 library.add 方法将集合都加入进来
library.add(fas)
