import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-bottom' | 'zoom-in-left'

interface TransitionExtendProps {
  animation?: AnimationName,
  wrapper?: boolean
}

type TransitionProps = TransitionExtendProps & CSSTransitionProps

const Transition: React.FC<TransitionProps> = (props: TransitionProps) => {
  const {
    children,
    animation,
    classNames,
    wrapper,
    ...restProps
  } = props
  return (
    <CSSTransition
      {...restProps}
      classNames={ classNames || animation }
    >
      {wrapper ? (<div>{children}</div>) : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition
