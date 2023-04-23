import {
 Component,
 ErrorInfo,
 PropsWithChildren,
 PropsWithRef,
 ReactElement,
 createElement,
 isValidElement,
} from 'react'
import { ErrorBoundaryProps, FallbackProps } from './types'
import { ErrorBoundaryContext } from './ErrorBoundaryContext'

type ErrorBoundaryState = { didCatch: boolean; error: any }

const initialState: ErrorBoundaryState = {
 didCatch: false,
 error: null,
}

export class ErrorBoundary extends Component<
 PropsWithRef<PropsWithChildren<ErrorBoundaryProps>>,
 ErrorBoundaryState
> {
 state = initialState

 static getDerivedStateFromError(error: Error) {
  return { didCatch: true, error }
 }

 resetErrorBoundary = (...args: any[]) => {
  const { error } = this.state

  if (error !== null) {
   this.props.onReset?.({
    args,
    reason: 'imperative api',
   })

   this.setState(initialState)
  }
 }

 componentDidCatch(error: Error, info: ErrorInfo) {
  this.props.onError?.(error, info)
 }

 componentDidUpdate(
  prevProps: ErrorBoundaryProps,
  prevState: ErrorBoundaryState,
 ) {
  const { didCatch } = this.state
  const { resetKeys } = this.props

  if (
   didCatch &&
   prevState.error !== null &&
   hasArrayChanged(prevProps.resetKeys, resetKeys)
  ) {
   this.props.onReset?.({
    next: resetKeys,
    prev: prevProps.resetKeys,
    reason: 'keys',
   })

   this.setState(initialState)
  }
 }

 render() {
  const { children, fallbackRender, FallbackComponent, fallback } = this.props
  const { didCatch, error } = this.state

  let childToRender = children

  if (didCatch) {
   const props: FallbackProps = {
    error,
    resetErrorBoundary: this.resetErrorBoundary,
   }

   if (isValidElement(fallback)) {
    childToRender = fallback
   } else if (typeof fallbackRender === 'function') {
    childToRender = fallbackRender(props)
   } else if (FallbackComponent) {
    childToRender = createElement(FallbackComponent, props)
   } else {
    throw new Error(
     'requires either a fallback, fallbackRender, or FallbackComponent prop',
    )
   }
  }

  return createElement(
   ErrorBoundaryContext.Provider,
   {
    value: {
     didCatch,
     error,
     resetErrorBoundary: this.resetErrorBoundary,
    },
   },
   childToRender,
  ) as ReactElement
 }
}

function hasArrayChanged(a: any[] = [], b: any[] = []) {
 return (
  a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))
 )
}
