import React from 'react'
import { render, RenderResult, cleanup } from '@testing-library/react'
import fireEvent from '@testing-library/user-event'

import Menu, { IMenuProps } from './Menu'
import MenuItem from './MenuItem'

const testProps: IMenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: IMenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}

const generateMenu = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

describe('测试菜单和子菜单组件:', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-ada-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('通过默认的props渲染出正确的菜单和子菜单', () => {
    expect(menuElement).toBeInTheDocument()
    expect(activeElement).toHaveClass('ada-menu-item ada-menu-item-active')
    expect(disabledElement).toHaveClass('ada-menu-item ada-menu-item-disabled')
  })
  it('点击子菜单应该会改变active和调用回调方法', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('ada-menu-item-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('ada-menu-item-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('通过 mode=vertical 渲染出竖向的菜单', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-ada-menu')
    expect(menuElement).toHaveClass('ada-menu-vertical')
  })
})
