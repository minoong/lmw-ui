// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ConfirmContextProvider, useConfirm } from '../src'

const customRender = (ui: React.ReactNode) => {
 return render(<ConfirmContextProvider>{ui}</ConfirmContextProvider>)
}

function Wrapper() {
 const { isYield, message, ask, confirm } = useConfirm()

 return (
  <div>
   <h1>{isYield ? 'ok' : 'no'}</h1>
   <div>{message && message}</div>
   <button
    type='button'
    onClick={async () => {
     await ask('confirm')
    }}
   >
    버튼
   </button>
   <button type='button' onClick={confirm}>
    확인
   </button>
  </div>
 )
}

describe('UseConfirm', () => {
 test('it works', () => {
  customRender(<Wrapper />)
  const scoopsSubtotal = screen.getByText('no')
  expect(scoopsSubtotal).toHaveTextContent('no')

  fireEvent.click(screen.getByText('버튼'))
  expect(screen.getByText('confirm')).toHaveTextContent('confirm')
  expect(screen.getByText('ok')).toHaveTextContent('ok')
  fireEvent.click(screen.getByText('확인'))
  expect(screen.getByText('no')).toHaveTextContent('no')
 })
})
