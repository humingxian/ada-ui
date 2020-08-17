import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { IMenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string | number) => void;

export interface IMenuProps {
  /** 默认 active 的菜单项的索引值 */
  defaultIndex?: string | number,
  className?: string,
  /** 菜单类型 横向或者纵向 */
  mode?: MenuMode,
  style?: React.CSSProperties,
  /** 点击菜单项触发的回掉函数 */
  onSelect?: SelectCallback,
  children?: React.ReactNode;
}

interface IMenuContext {
  index: string | number;
  onSelect?: SelectCallback;
}

export const menuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<IMenuProps> = props => {
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [currentActive, setActive] = useState<string | number | undefined>(defaultIndex)
  const classes = classNames('ada-menu', className, {
    [`ada-menu-${mode}`]: mode
  })
  const handleClick = (index: string | number) => {
    setActive(index)
    onSelect && onSelect(index)
  }
  const passedContext: IMenuContext = {
    index: currentActive || 0,
    onSelect: handleClick
  }

  // 在这里通过 React.Children 提供的 map 方法可以循环 children（可能是函数, ReactNode, 数组，所以不能用js 提供的 map 循环），
  // 其中 可以通过 child 拿到 一个一个的 子元素，通过 child as React.FunctionComponentElement<IMenuItemProps>
  // 可以让我们拿到这个 child 作为 MenuItem 组件的一些属性。
  const renderChildren = () => {
    return React.Children.map(children, (child, i) => {
      // 把 child 声明成 一个 React 函数式组件 并给它的 prop 声明类型
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type
      const { index } = childElement.props
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index !== null && index !== undefined ? index : i
        })
      } else {
        console.warn('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }
  return (
    <ul style={style} className={classes} data-testid='test-menu'>
      <menuContext.Provider value={passedContext}>
        { renderChildren() }
      </menuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: 0
}

export default Menu
