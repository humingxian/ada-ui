import React from 'react'
import { render, RenderResult, cleanup, fireEvent, waitFor } from '@testing-library/react'

import Menu, { IMenuProps } from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

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
      <SubMenu title='submenu'>
        <MenuItem>
          submenu-1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .ada-submenu {
      display: none;
    }
    .ada-submenu.ada-submenu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

describe('测试菜单和子菜单组件:', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-ada-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('通过默认的props渲染出正确的菜单和子菜单', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('ada-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
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
  it('当鼠标划过子菜单时，下拉菜单显示', async () => {
    // 通过添加的 csstransition 组件的 unmountOnExit 会让元素默认不渲染
    // expect(wrapper.queryByText('submenu-1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('submenu')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('submenu-1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('submenu-1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('submenu-1')).not.toBeVisible()
    })
  })
})
