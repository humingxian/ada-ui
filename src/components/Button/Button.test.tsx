import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './Button'

const defaultProps: ButtonProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

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
    const wrapper = render(<Button {...defaultProps}>nice</Button>)
    const element = wrapper.getByText('nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })

  test('当设置 btnType 为 link 并且 href 有值时应该渲染一个a链接', () => {
    const wrapper = render(<Button btnType='link' href='www.baidu.com'>baidu.com</Button>)
    const element = wrapper.getByText('baidu.com')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveAttribute('href')
    expect(element).toHaveClass('btn btn-link')
  })

  test('当设置 disabled 为 true 时应该渲染一个 disabled 的 button', () => {
    const wrapper = render(<Button {...disabledProps}>nice</Button>)
    const element = wrapper.getByText('nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toBeDisabled()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
