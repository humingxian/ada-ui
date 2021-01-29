import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IIconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IIconProps> = (props: IIconProps) => {
  const { className, theme, ...restProps } = props
  const classes = classNames('ada-icon', className, {
    [`ada-icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
}

export default Icon
