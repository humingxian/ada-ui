import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  // 这里有问题，react StrictMode 模式 会导致 react-transition-group 的动画有问题
  // 先主石雕，以后看到解决方法的时候再来处理
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
