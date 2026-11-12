import React, { memo } from 'react'
import { RevealWrapper } from 'next-reveal'

interface Props {
  children: React.ReactNode
  origin?: 'top' | 'right' | 'bottom' | 'left'
  distance?: string
}

const FadeInVisible: React.FunctionComponent<Props> = ({ children, origin, distance }: Props) => {
  return (
    <RevealWrapper
      className="load-hidden"
      distance={distance || '100%'}
      opacity={0}
      easing="cubic-bezier(0.1, 0.6, 0.5, 1)"
      origin={origin || 'bottom'}
      viewOffset={{ top: 0, right: 0, bottom: -60, left: 0 }}
    >
      {children}
    </RevealWrapper>
  )
}

FadeInVisible.defaultProps = {}

export default memo(FadeInVisible)
