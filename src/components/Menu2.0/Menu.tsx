import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { IMenuItemProps } from './MenuItem'

export type TIndex = number | string;
export type TMenuMode = 'horizontal' | 'vertical';
export type TSelectCallback = (selectedIndex: TIndex) => void;

export interface IMenuProps {
  defaultIndex?: TIndex;
  className?: string;
  mode?: TMenuMode;
  style?: React.CSSProperties;
  onSelect?: TSelectCallback;
  children?: React.ReactNode;
  defaultOpenSubMenus?: TIndex[]
}
export interface IMenuContext {
  index: TIndex;
  onSelect?: TSelectCallback;
  mode?: TMenuMode;
  defaultOpenSubMenus?: TIndex[]
}

export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<IMenuProps> = (props: IMenuProps) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
  const [currentActive, setCurrentActive] = useState(defaultIndex)
  const classes = classNames('ada-menu', className, {
    [`ada-menu-${mode}`]: mode
  })
  const handleClick = (index: number | string) => {
    setCurrentActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive || 0,
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { index } = childElement.props
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index !== undefined ? index : i
        })
      } else {
        console.warn('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-ada-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
  className: '',
  defaultOpenSubMenus: []
}

export default Menu
