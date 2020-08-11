import React from 'react'
import Button from './components/Button/Button'
import Alert from './components/Alert/Alert'

function App () {
  return (
    <main>
      <Button btnType='primary' autoFocus={true}>normal-primary</Button>
      <Button size='sm' onClick={e => { e.preventDefault(); alert(123) }}>small</Button>
      <Button btnType='danger' size='lg'>large-danger</Button>
      <Button disabled={ true }>disabled</Button>
      <Button btnType='link' href='http://www.baidu.com' target='_blank'>link-baidu.com</Button>
      <Button btnType='link' href='http://www.baidu.com' disabled={true}>link-baidu.com</Button>
      <hr/>
      <Alert message='正在开发 alert 组件' />
      <Alert title='温馨提示' message='正在开发 alert 组件' type='success' />
      <Alert title='温馨提示' message={(<img width='10px' height='10px' alt='6666' />)} type='warning' />
      <Alert title='温馨提示' message='警告' type='danger' closeable={false} showIcon={false} />
    </main>
  )
}

export default App
