import React, { useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/Icon'

export type alertType = 'success' | 'default' | 'warning' | 'danger'

export interface IAlertProps {
  /** 标题 */
  title?: string,
  /** 类型 */
  type?: alertType,
  /** 提示 */
  message: string | React.ReactNode,
  /** 是否展示icon */
  showIcon?: boolean,
  /** className */
  className?: string,
  /** icon 的 class */
  iconClassName?: string,
  /** 是否允许关闭 */
  closeable?: boolean,
  /** 关闭方法 */
  onClose?: () => void
}
export const Alert: React.FC<IAlertProps> = (props: IAlertProps) => {
  const [closed, setClosed] = useState<boolean>(false)
  const {
    title,
    type,
    message,
    className,
    iconClassName,
    showIcon,
    onClose,
    closeable
  } = props
  const classes = classNames('ada-alert', className, {
    [`ada-alert-${type}`]: type,
    'ada-alert-width-message': message
  })

  const iconClasses = classNames('ada-alert-icon', iconClassName, {
    [`ada-alert-icon-${type}`]: type
  })

  const handleClose = () => {
    setClosed(true)
    if (onClose) {
      onClose()
    }
  }

  return (
    <React.Fragment>
      {
        !closed && (
          <div className={classes} data-testid='test-alert'>
            {
              title &&
              <span className='ada-alert-title'>
                {showIcon && <Icon icon='info-circle' className={iconClasses} />}{title}
              </span>
            }
            <span className='ada-alert-message'>{message}</span>
            {
              closeable && (
                <Icon icon='times-circle' className='ada-alert-close' onClick={handleClose} />
              )
            }
          </div>
        )
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
