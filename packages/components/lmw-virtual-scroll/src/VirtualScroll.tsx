import React, { Children, PropsWithChildren, useMemo } from 'react'

export interface Props extends PropsWithChildren {
 height: number
 itemHeight: number
 gap?: number
 offsetY: number
 renderAhead?: number
}

function VirtualScroll(props: Props) {
 const {
  height,
  itemHeight,
  gap = 0,
  offsetY,
  renderAhead = 0,
  children,
 } = props

 const childrenLength = Children.toArray(children).length
 const heightWithGap = useMemo(() => itemHeight + gap, [itemHeight, gap])

 const containerHeight = useMemo(
  () => heightWithGap * childrenLength,
  [heightWithGap, childrenLength],
 )
 const startOffset = useMemo(
  () => Math.max(Math.floor(offsetY / heightWithGap) - renderAhead, 0),
  [offsetY, heightWithGap, renderAhead],
 )
 const endOffset = useMemo(
  () =>
   Math.min(
    Math.ceil(height / heightWithGap + startOffset) + renderAhead,
    childrenLength,
   ),
  [height, heightWithGap, startOffset, renderAhead, childrenLength],
 )
 const translateY = useMemo(
  () => Math.max(heightWithGap * startOffset, gap),
  [heightWithGap, startOffset, gap],
 )
 const Jsx = Children.toArray(children).slice(
  Math.max(startOffset, 0),
  Math.min(endOffset + 1, childrenLength),
 )

 return (
  <div
   className='will-change-transform'
   style={{
    willChange: 'transform',
    height: `${containerHeight}px`,
   }}
  >
   <div style={{ transform: `translateY(${translateY}px)` }}>{Jsx}</div>
  </div>
 )
}

export default React.memo(VirtualScroll)
