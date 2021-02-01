import React, { useState } from 'react'
import Button from './components/Button/Button'
import Alert from './components/Alert/Alert'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
import Icon from './components/Icon/Icon'
import Transition from './components/Transition/Transition'

// 这个方法支持在 FontAwesomeIcon 组件上写 string 格式的 icon 名字
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
// fas 是所有 free-solid-svg-icons 类型图标的集合
// 通过 library.add 方法将集合都加入进来
library.add(fas)

function App () {
  const [show, setShow] = useState(false)
  return (
    <main style={{ padding: '50px' }}>
      <FontAwesomeIcon icon='coffee' size='2x' />
      <Icon icon='arrow-down' size='2x' theme='primary' />
      <hr/>
      <Alert message='test' />
      <hr/>
      <Menu onSelect={i => alert(`${i}-hudada`)}>
        <MenuItem>888</MenuItem>
        <MenuItem disabled>999</MenuItem>
        <SubMenu title="test">
          <MenuItem>hudada</MenuItem>
          <MenuItem>lvlingling</MenuItem>
        </SubMenu>
      </Menu>
      <hr/>
      <Button onClick={() => setShow(!show)}>toggle</Button>
      <hr/>
      <Transition in={show} timeout={300} animation="zoom-in-left">
        <div>
          <p>1 hus hush uhsu hu hhu hu hu </p>
          <p>1 hus hush uhsu hu hhu hu hu </p>
          <p>1 hus hush uhsu hu hhu hu hu </p>
          <p>1 hus hush uhsu hu hhu hu hu </p>
          <p>1 hus hush uhsu hu hhu hu hu </p>
          <p>1 hus hush uhsu hu hhu hu hu </p>
        </div>
      </Transition>
      <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
        <Button>哈哈</Button>
      </Transition>
    </main>
  )
}

export default App
