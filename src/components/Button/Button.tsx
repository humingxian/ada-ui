import React from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'

export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string,
  /** 设置Button的禁用 */
  disabled?: boolean,
  /** 设置Button的尺寸 */
  size?: ButtonSize,
  /** 设置Button的类型 */
  btnType?: ButtonType
  children?: React.ReactNode,
  href?: string
}

const Button: React.FC<BaseButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    size,
    children,
    href
  } = props
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: (btnType === 'link') && disabled
  })
  if (btnType === 'link' && href) {
    return (
      <a href={href} className={classes}>{ children }</a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button
