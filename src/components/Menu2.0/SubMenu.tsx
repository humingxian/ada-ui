import React, { useContext } from 'react'
import classNames from 'classnames'
import { IMenuItemProps } from './MenuItem'
import { MenuContext } from './Menu'
export interface ISubMenuProps {
  index?: number | string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

const SubMenu: React.FC<ISubMenuProps> = (props: ISubMenuProps) => {
  const context = useContext(MenuContext)
  const { index, title, className, children } = props
  const classes = classNames('ada-menu-item ada-submenu-item', className, {
    'ada-submenu-item-active': context.index === index
  })
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return childElement
      } else {
        console.warn('Warning: Menu has a child which is not a MenuItem component')
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
      <div className='ada-submenu-title'>{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
