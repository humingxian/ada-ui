import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
export interface IMenuItemProps {
  index?: number | string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const MenuItem: React.FC<IMenuItemProps> = (props: IMenuItemProps) => {
  const { index, disabled, className, style, children } = props
  const context = useContext(MenuContext)
  const classes = classNames('ada-menu-item', className, {
    'ada-menu-item-disabled': disabled,
    'ada-menu-item-active': context.index === index
  })

  const handleClick = () => {
    if (context.onSelect && !disabled && index !== undefined) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
