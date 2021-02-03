import React, { FC, ReactNode, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/Icon'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
type TInputSize = 'lg' | 'md' | 'sm'
/**
 * Omit 可以忽略或移除接口中的属性
 * 忽略了 InputHTMLAttributes 中已有的 size 属性 并返回新的 interface
 * Omit<InputHTMLAttributes<HTMLElement>, 'size'>
 */
export interface IInputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 是否禁用 */
  disabled?: boolean;
  /** 组件的大小 */
  size?: TInputSize;
  /** icon */
  icon?: IconProp;
  /** 是否可以一键清除 */
  clearable?: boolean;
  /** 前缀 */
  prepand?: string | ReactNode;
  /** 前缀类名 */
  prepandClass?: string;
  /** 后缀 */
  append?: string | ReactNode;
  /** 后缀类名 */
  appendClass?: string;
}

export const Input: FC<IInputProps> = (props: IInputProps) => {
  // 取出 props
  const { disabled, size, icon, prepand, prepandClass, append, appendClass, clearable, ...restProps } = props

  const classes = classNames('ada-input', {
    'ada-input-disabled': disabled,
    [`ada-input-${size}`]: size
  })
  const beforeClasses = classNames('ada-input-prepand', prepandClass)
  const afterClasses = classNames('ada-input-append', appendClass)
  return (
    <section className={classes}>
      {
        prepand &&
        <section className={beforeClasses}>{prepand}</section>
      }
      <section className='ada-input-content'>
        <input className='ada-input-el' {...restProps} />
        {
          icon && <Icon icon={icon} className='ada-input-icon' />
        }
        {
          clearable && <Icon icon='times-circle' className='ada-input-clear' />
        }
      </section>
      {
        append &&
        <section className={afterClasses}>{append}</section>
      }
    </section>
  )
}

Input.displayName = 'Input'

Input.defaultProps = {
  size: 'md',
  clearable: true
}

export default Input
