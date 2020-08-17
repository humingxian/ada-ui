import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'

import Menu, { IMenuProps } from './Menu'
import MenuItem from './MenuItem'

const testProps: IMenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: IMenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: IMenuProps) => {
  return (
    <Menu { ...props }>
      <MenuItem index="0">active</MenuItem>
      <MenuItem index="1" disabled>disabled</MenuItem>
      <MenuItem index="2">xyz</MenuItem>
    </Menu>
  )
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('测试 Menu 和 MenuItem 组件', () => {
  // beforeEach 方法是指在每次调用 test 方法的时候，都会先执行 beforeEach 方法里面的回调
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  test('应该会渲染一个基本的 Menu 组件和 MenuItem 组件 基于默认的 props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('ada-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('ada-menu-item ada-menu-item-active')
    expect(disabledElement).toHaveClass('ada-menu-item ada-menu-item-disabeld')
  })
  test('点击菜单选项应该会改变 active 并且会执行回调函数', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('ada-menu-item ada-menu-item-active')
    expect(activeElement).not.toHaveClass('ada-menu-item ada-menu-item-active')
    // toHaveBeenCalledWith 是指 testProps.onSelect 这个函数被调用了，且调用参数是 "2"
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('ada-menu-item ada-menu-item-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  test('当设置mode为vertical时应该会渲染一个竖型的 Menu 组件', () => {
    // 每次执行 test 方法的时候，jest 会默认先执行 cleanup 方法
    // 但是这里又执行了 render 与之前的 forEach 导致页面有两个 menu 元素，所以在 执行该 test 之前
    // 先去清空一下页面
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('ada-menu-vertical')
  })
})
