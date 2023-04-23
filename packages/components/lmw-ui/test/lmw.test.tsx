import React, { useState } from 'react'
import { Button } from '../src/Button'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

const Test = () => {
 const [count, setCount] = useState(0)

 return <Button label={String(count)} onClick={() => setCount(count + 1)} />
}

test('loads and displays greeting', async () => {
 // ARRANGE
 render(<Test />)

 const button = screen.getByRole('button', { name: '0' })

 expect(button).toHaveTextContent('0')

 // ACT
 await act(async () => {
  await userEvent.click(screen.getByRole('button'))
 })
 await act(async () => {
  await userEvent.click(screen.getByRole('button'))
 })
 //  fireEvent.click(button)

 // ASSERT
 expect(button).toHaveTextContent('2')
})
