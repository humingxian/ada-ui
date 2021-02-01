import React, { ReactElement, InputHTMLAttributes } from 'react'
// import classes from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
type TInputSize = 'lg' | 'md' | 'sm'
export interface IInputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: TInputSize;
  icon?: IconProp;
  prepand?: string | ReactElement;
  append?: string | ReactElement;
}

export const Input: React.FC<IInputProps> = (props: IInputProps) => {
  return (<input />)
}

Input.displayName = 'Input'

export default Input
