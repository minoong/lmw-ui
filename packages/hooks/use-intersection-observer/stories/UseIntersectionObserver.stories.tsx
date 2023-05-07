import { Meta, StoryObj } from '@storybook/react'
import { IntersectionOptions, useIntersectionObserver } from '../src/index'
import React, { CSSProperties } from 'react'

type Props = IntersectionOptions & {
 style?: CSSProperties
 className?: string
 lazy?: boolean
 inlineRef?: boolean
}

type Story = StoryObj<Props>

export default {
 title: 'hooks/useIntersectionObserver',
 parameters: {
  controls: {
   expanded: true,
  },
 },
 argTypes: {
  threshold: {
   control: {
    type: 'range',
    min: 0,
    max: 1,
    step: 0.05,
   },
   description: '0 ~ 1의 값을 넣어보세요!',
  },
  onChange: {
   action: 'InView',
   description:
    'onChange(inView: boolean, entry: IntersectionObserverEntry): void',
  },
 },
 args: {
  threshold: 0.5,
 },
 render: HooksRender,
} satisfies Meta<Props>

function HooksRender(props: Props) {
 const { ref, inView } = useIntersectionObserver({
  threshold: props.threshold,
  onChange: props.onChange,
 })

 return (
  <div>
   <div
    style={{
     height: '500px',
     lineHeight: '500px',
     fontSize: '5rem',
     textAlign: 'center',
     background: '#1261c4',
     fontWeight: 700,
    }}
   >
    Scroll Down
   </div>
   <div
    ref={ref}
    style={{
     height: '500px',
     backgroundColor: inView ? '#0061d8' : '#c84a31',
     border: '5px solid #242424',
     lineHeight: '500px',
     fontSize: '5rem',
     fontWeight: 700,
     textAlign: 'center',
     transition: 'all 0.5s',
    }}
   >
    {inView ? 'inView' : ''}
   </div>
   <div
    style={{
     height: '500px',
     lineHeight: '500px',
     fontSize: '5rem',
     textAlign: 'center',
     background: '#1261c4',
     fontWeight: 700,
    }}
   >
    Scroll Up
   </div>
  </div>
 )
}

export const Basic: Story = {
 args: {},
}
