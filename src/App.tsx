import React from 'react'
import Button from './components/Button/Button'

function App () {
  return (
    <main>
      <Button btnType='primary' autoFocus={true}>normal-primary</Button>
      <Button size='sm' onClick={e => { e.preventDefault(); alert(123) }}>small</Button>
      <Button btnType='danger' size='lg'>large-danger</Button>
      <Button disabled={ true }>disabled</Button>
      <Button btnType='link' href='http://www.baidu.com' target='_blank'>link-baidu.com</Button>
      <Button btnType='link' href='http://www.baidu.com' disabled={true}>link-baidu.com</Button>
    </main>
  )
}

export default App
