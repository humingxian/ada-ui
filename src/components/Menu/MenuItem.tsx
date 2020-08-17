import React, { useContext } from 'react'
import classNames from 'classnames'
import { menuContext } from './Menu'

export interface IMenuItemProps {
  index: string;
  className?: string;
  style?: React.CSSProperties,
  children?: React.ReactNode,
  disabled?: boolean;
}

const MenuItem: React.FC<IMenuItemProps> = props => {
  const { index, className, disabled, children, style } = props
  const context = useContext(menuContext)
  const classes = classNames('ada-menu-item', className, {
    'ada-menu-item-disabeld': disabled,
    'ada-menu-item-active': context.index === index
  })
  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

export default MenuItem
