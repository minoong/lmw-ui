import type { Meta } from '@storybook/react'
import { VirtualScroll } from '../src/VirtualScroll'
import { useState } from 'react'

const length = 9000

function Wrapper() {
 const [y, setY] = useState<number>(0)

 return (
  <div>
   <h1>total items : {length.toLocaleString()}</h1>
   <div
    style={{ height: '500px', minHeight: '500px', overflow: 'auto' }}
    onScroll={(e) => setY(e.currentTarget.scrollTop)}
   >
    <VirtualScroll height={500} itemHeight={20} offsetY={y} gap={2}>
     {Array(length)
      .fill(null)
      .map((_, idx) => (
       <div
        key={idx}
        style={{
         height: '20px',
         textAlign: 'center',
         fontWeight: 700,
         color: '#666',
         border: '1px solid #333',
        }}
       >
        #{idx} - item
       </div>
      ))}
    </VirtualScroll>
   </div>
  </div>
 )
}

const meta = {
 title: 'Components/VirtualScroll',
 component: VirtualScroll,
 tags: ['autodocs'],
} satisfies Meta<typeof VirtualScroll>

export default meta

export const Primary = {
 render: () => <Wrapper />,
}
