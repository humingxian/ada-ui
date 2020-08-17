import React, { createContext, useState } from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void;

export interface IMenuProps {
  /** 默认 active 的菜单项的索引值 */
  defaultIndex?: string,
  className?: string,
  /** 菜单类型 横向或者纵向 */
  mode?: MenuMode,
  style?: React.CSSProperties,
  /** 点击菜单项触发的回掉函数 */
  onSelect?: SelectCallback,
  children?: React.ReactNode;
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
}

export const menuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<IMenuProps> = props => {
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('ada-menu', className, {
    [`ada-menu-${mode}`]: mode
  })
  const handleClick = (index: string) => {
    setActive(index)
    onSelect && onSelect(index)
  }
  const passedContext: IMenuContext = {
    index: currentActive || '0',
    onSelect: handleClick
  }
  return (
    <ul style={style} className={classes} data-testid='test-menu'>
      <menuContext.Provider value={passedContext}>
        {children}
      </menuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: '0'
}

export default Menu
