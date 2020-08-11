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
// 因为 Button 组件可以接受原生的 button 的属性和 a 元素的属性，所以必须a和button的原生属性都要支持
// 联合类型 返回的是 a 或 b 的类型 用 ｜ 表示
// 交叉类型 返回的是 a + b 的总类型 用 & 表示
// React.ButtonHTMLAttributes 是 react 内部提供的原生button元素的接口
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// Partial 是一个类型 他接受一个范型 最后生成的类型其内部的所有属性都是可选的。
// （相当于在每个类型的后面添加了联合类型undefined）
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
export const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    size,
    children,
    href,
    className,
    ...restProps
  } = props
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: (btnType === 'link') && disabled
  })
  if (btnType === 'link' && href) {
    return (
      <a href={href} className={classes} {...restProps}>{ children }</a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button
