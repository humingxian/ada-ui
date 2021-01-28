import React, { /* useState */ } from 'react'
// import Button from './components/Button/Button'
// import Alert from './components/Alert/Alert'
import Menu from './components/Menu2.0/Menu'
import MenuItem from './components/Menu2.0/MenuItem'
import SubMenu from './components/Menu2.0/SubMenu'
import Icon from './components/Icon/Icon'
// import Transition from './components/Transition/Transition'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function App () {
  // const [show, setShow] = useState(false)
  return (
    <main style={{ padding: '50px' }}>
      <FontAwesomeIcon icon='coffee' size='2x' />
      <Icon icon='coffee' size='1x' theme='secondary' />
      <hr/>
      <Menu mode='vertical' onSelect={i => alert(i)} defaultOpenSubMenus={[3]}>
        <MenuItem>123</MenuItem>
        <MenuItem disabled>456</MenuItem>
        <MenuItem>789</MenuItem>
        <SubMenu title="test1">
          <MenuItem>hudada</MenuItem>
          <MenuItem>lvlingling</MenuItem>
        </SubMenu>
        <SubMenu title="test2">
          <MenuItem>hudada</MenuItem>
          <MenuItem>lvlingling</MenuItem>
        </SubMenu>
        <SubMenu title="test3">
          <MenuItem>hudada</MenuItem>
          <MenuItem>lvlingling</MenuItem>
        </SubMenu>
      </Menu>
      <Menu defaultIndex={2} onSelect={i => alert(`${i}-hudada`)}>
        <MenuItem>888</MenuItem>
        <MenuItem disabled>999</MenuItem>
        <MenuItem>000</MenuItem>
        <SubMenu title="test">
          <MenuItem>hudada</MenuItem>
          <MenuItem>lvlingling</MenuItem>
        </SubMenu>
      </Menu>
    </main>
  )
}

export default App
