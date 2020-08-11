import React from 'react'
import { render } from '@testing-library/react'
import Button from './Button'

test('我的第一个 react 组件测试案列', () => {
  const wrapper = render(<Button>nice</Button>)
  const element = wrapper.queryByText('nice')
  expect(element).toBeTruthy()
  expect(element).toBeInTheDocument()
})

describe('test Button component', () => {
  test('应该渲染一个默认的 button', () => {
    const wrapper = render(<Button>nice</Button>)
    const element = wrapper.getByText('nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  })

  test('应该渲染一个传入各种 props 的 button', () => {
    const wrapper = render(<Button>nice</Button>)
    const element = wrapper.getByText('nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  })

  test('当设置 btnType 为 link 并且 href 有值时应该渲染一个a链接', () => {
    const wrapper = render(<Button btnType='link' href='www.baidu.com'>baidu.com</Button>)
    const element = wrapper.getByText('baidu.com')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveAttribute('href')
  })

  test('当设置 disabled 为 true 时应该渲染一个 disabled 的 button', () => {
    const wrapper = render(<Button disabled={true}>nice</Button>)
    const element = wrapper.getByText('nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toBeDisabled()
  })
})