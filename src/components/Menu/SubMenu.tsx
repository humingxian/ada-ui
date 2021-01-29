import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { IMenuItemProps } from './MenuItem'
import { MenuContext, TIndex } from './Menu'
import Icon from '../Icon/Icon'
import { CSSTransition } from 'react-transition-group'
import Transition from '../Transition/Transition'
export interface ISubMenuProps {
  index?: number | string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

const SubMenu: React.FC<ISubMenuProps> = (props: ISubMenuProps) => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext)
  const mode = context.mode
  const defaultOpenSubMenus = context.defaultOpenSubMenus as Array<TIndex>
  const isOpen = index && mode ? defaultOpenSubMenus.includes(index) : false
  const [menuOpen, setMenuOpen] = useState(isOpen)
  const classes = classNames('ada-menu-item ada-submenu-item', className, {
    'ada-submenu-item-active': context.index === index,
    'ada-submenu-item-opened': menuOpen,
    'ada-submenu-item-vertical': context.mode === 'vertical'
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }
  let iTimer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(iTimer)
    e.preventDefault()
    iTimer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('ada-submenu', {
      'ada-submenu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        const itemIndex = childElement.props.index
        return React.cloneElement(childElement, {
          index: itemIndex !== undefined ? itemIndex : `${index}-${i}`
        })
      } else {
        console.warn('Warning: Menu has a child which is not a MenuItem component')
      }
    })
    return (
      <Transition
        in={menuOpen}
        timeout={200}
        animation='zoom-in-top'
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='ada-submenu-title' {...clickEvents}>
        {title}
        <Icon icon='angle-down' className='arrow-icon' />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
