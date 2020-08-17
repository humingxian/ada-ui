import React, { useContext } from 'react'
import classNames from 'classnames'
import { menuContext } from './Menu'
import { IMenuItemProps } from './MenuItem'

export interface ISubMenuProps {
  index?: number | string;
  title: string;
  className?: string;
  children?: React.ReactNode
}

const SubMenu: React.FC<ISubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(menuContext)
  const classes = classNames('ada-menu-item ada-submenu-item', className, {
    'ada-submenu-item-active': context.index === index
  })

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type
      const { index } = childElement.props
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: index !== null && index !== undefined ? index : i
        })
      } else {
        console.warn('Warning: submenu has a child which is not a MenuItem')
      }
    })
    return (
      <ul className='ada-submenu'>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes}>
      <div className="ada-submenu-title">{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
