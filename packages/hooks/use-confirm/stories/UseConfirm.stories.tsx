import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { ConfirmContextProvider, useConfirm } from '../src/index'
import { createPortal } from 'react-dom'

type Props = {
 message: string
}

type Story = StoryObj<Props>

export default {
 title: 'hooks/useConfirm',
 parameters: {
  controls: {
   expanded: true,
  },
 },
 argTypes: {
  message: {
   control: 'text',
   description: 'input confirm message.',
  },
 },
 args: {
  message: 'confirm',
 },
 render: HooksRender,
} satisfies Meta<Props>

function HooksRender({ message }: Props) {
 return (
  <div>
   <ConfirmContextProvider>
    <ConfirmDialog />
    <Confirm message={message} />
   </ConfirmContextProvider>
  </div>
 )
}

function ConfirmDialog() {
 const { confirm, isYield, message, deny } = useConfirm()

 if (!isYield) return null

 return createPortal(
  <dialog open style={{ width: '550px' }}>
   <h4>{message}</h4>
   <hr />
   <button type='button' onClick={deny}>
    취소
   </button>
   <button type='button' onClick={confirm}>
    확인
   </button>
  </dialog>,
  document.body,
 )
}

function Confirm({ message }: Props) {
 const { ask } = useConfirm()

 return (
  <div>
   <button
    style={{ padding: '1rem' }}
    type='button'
    onClick={async () => {
     const ok = await ask(message)
     alert(ok)
    }}
   >
    컨펌
   </button>
  </div>
 )
}

export const Basic: Story = {}
