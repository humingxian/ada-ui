import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { menuContext } from './Menu'
import { IMenuItemProps } from './MenuItem'

export interface ISubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode
}

const SubMenu: React.FC<ISubMenuProps> = ({ index, title, className, children }: ISubMenuProps) => {
  const context = useContext(menuContext)
  const mode = context.mode
  const defaultOpenSubMenus = context.defaultOpenSubMenus as Array<string>
  const classes = classNames('ada-menu-item ada-submenu-item', className, {
    'ada-submenu-item-active': context.index === index
  })
  const isOpen = index && mode === 'vertical' ? defaultOpenSubMenus.includes(index) : false
  const [menuOpen, setMenuOpen] = useState<boolean>(isOpen)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }

  const clickEvent = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const mouseEvent = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('ada-submenu', {
      'ada-submenu-opend': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type
      const subMenuItemIndex = childElement.props.index
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: subMenuItemIndex !== null && subMenuItemIndex !== undefined ? `${subMenuItemIndex}` : `${index}-${i}`
        })
      } else {
        console.warn('Warning: submenu has a child which is not a MenuItem')
      }
    })
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...mouseEvent}>
      <div className="ada-submenu-title" {...clickEvent}>{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
