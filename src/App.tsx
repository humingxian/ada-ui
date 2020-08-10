import React from 'react'
import Button from './components/Button/Button'

function App () {
  return (
    <div>
      <main>
        <Button btnType={'primary'}>normal-primary</Button>
        <Button size={'sm'}>small</Button>
        <Button btnType={'danger'} size={'lg'}>large-danger</Button>
        <Button disabled={ true }>disabled</Button>
        <Button btnType={'link'} href={'http://www.baidu.com'}>link-baidu.com</Button>
        <Button btnType='link' href={'http://www.baidu.com'} disabled={true}>link-baidu.com</Button>
      </main>
    </div>
  )
}

export default App
