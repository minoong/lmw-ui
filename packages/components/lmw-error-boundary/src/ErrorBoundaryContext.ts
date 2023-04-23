import { createContext } from 'react'

export type ErrorBoundaryContextType = {
 didCatch: boolean
 error: any
 resetErrorBoundary: (...args: any[]) => void
}

export const ErrorBoundaryContext =
 createContext<ErrorBoundaryContextType | null>(null)

export function assertErrorBoundaryContext(
 value: any,
): value is ErrorBoundaryContextType {
 if (
  value === null ||
  typeof value.didCatch !== 'boolean' ||
  typeof value.resetErrorBoundary !== 'function'
 ) {
  throw new Error('ErrorBoundaryContext not found')
 }

 return true
}
