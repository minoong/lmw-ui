import { useMemo } from 'react'
import { useConfirmContext } from './ConfirmContext'

export function useConfirm() {
 const { message, setMessage, resolve, setResolve } = useConfirmContext()

 const isYield = useMemo(() => message !== null, [message])

 const ask = async (msg: React.ReactNode): Promise<boolean> => {
  return new Promise((resolve) => {
   setMessage?.(msg)
   setResolve?.(() => (value: boolean) => resolve(value))
  })
 }

 const confirm = () => {
  resolve?.(true)
  setMessage?.(null)
 }
 const deny = () => {
  resolve?.(false)
  setMessage?.(null)
 }

 return { message, isYield, ask, confirm, deny }
}
