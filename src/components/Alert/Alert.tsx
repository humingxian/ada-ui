import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { spawn } from 'child_process'

export type alertType = 'success' | 'default' | 'warning' | 'danger'

interface AlertProps {
  // 标题
  title?: string,
  // 类型
  type?: alertType,
  // 提示
  message: string | React.ReactNode,
  // 是否展示icon
  showIcon?: boolean,
  // className
  className?: string,
  // 是否允许关闭
  closeable?: boolean,
  // 关闭方法
  onClose?: () => void
}
export const Alert: FC<AlertProps> = (props) => {
  const [closed, setClosed] = useState<boolean>(false)
  const {
    title,
    type,
    message,
    className,
    showIcon,
    onClose,
    closeable
  } = props
  const classes = classNames('alert', className, {
    [`alert-${type}`]: type,
    'alert-width-message': message
  })

  const handleClose = () => {
    setClosed(true)
    onClose && onClose()
  }

  return (
    <React.Fragment>
      {
        !closed &&
        <div className={classes}>
          {
            title && 
            <span className='alert-title'>
              {showIcon && <span className='alert-icon'>(图标)</span>}{title}
            </span>
          }
          <span className='alert-message'>{message}</span>
          {
            closeable && (
              <span className='alert-close' onClick={handleClose}>
                关闭
              </span>
            )
          }
        </div>
      }
    </React.Fragment>
  )
}

Alert.defaultProps = {
  showIcon: true,
  type: 'default',
  closeable: true
}

export default Alert
