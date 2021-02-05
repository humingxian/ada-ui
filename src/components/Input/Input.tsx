import React, { FC, InputHTMLAttributes, ChangeEvent, FocusEvent, MouseEvent, ReactNode, useState, useRef } from 'react'
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
  /** input 内容变化时的回调函数 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<IInputProps> = (props: IInputProps) => {
  // 取出 props
  const { disabled, size, icon, prepand, prepandClass, append, appendClass, clearable, onChange, style, ...restProps } = props
  const iptRef = useRef<HTMLInputElement>(null)

  // 控制显示清除按钮
  const [showClear, setShowClear] = useState(false)
  const [focused, setFocused] = useState(false)

  const classes = classNames('ada-input', {
    'ada-input-disabled': disabled,
    [`ada-input-${size}`]: size,
    'ada-input-focused': focused
  })
  const beforeClasses = classNames('ada-input-prepand', prepandClass)
  const afterClasses = classNames('ada-input-append', appendClass)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    if (clearable) {
      if (e.target.value === '') {
        setShowClear(false)
      } else {
        setShowClear(true)
      }
    }
    if (onChange) {
      onChange(e)
    }
  }
  const handleMouseEvent = {
    onMouseEnter: (/* e */) => {
      const iptElement = iptRef.current as HTMLInputElement
      if (iptElement.value !== '') {
        setShowClear(true)
      }
    },
    onMouseLeave: (/* e */) => {
      setShowClear(false)
    }
  }

  const handleFocusEvent = {
    onFocus (/* e */) {
      setFocused(true)
    },
    onBlur (e: FocusEvent) {
      setFocused(false)
    }
  }
  const handleClear = (e: MouseEvent<SVGSVGElement>) => {
    e.persist()
    const iptElement = iptRef.current as HTMLInputElement
    iptElement.value = ''
    setShowClear(false)
    iptElement.focus()
    e.preventDefault()
  }
  return (
    <section className={classes} style={style} {...handleMouseEvent}>
      {
        prepand &&
        <section className={beforeClasses}>{prepand}</section>
      }
      <section className='ada-input-content'>
        <input
          {...restProps}
          {...handleFocusEvent}
          disabled={disabled}
          ref={iptRef}
          onChange={handleChange}
          className='ada-input-ipt'
        />
        {
          icon && !(clearable && showClear) &&
          <Icon icon={icon} className='ada-input-icon' />
        }
        {
          (clearable && showClear) &&
          <Icon icon='times-circle' className='ada-input-icon ada-input-clear' onClick={handleClear} />
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
