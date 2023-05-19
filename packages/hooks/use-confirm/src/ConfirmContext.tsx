import React, {
 Dispatch,
 SetStateAction,
 createContext,
 useContext,
 useState,
} from 'react'

export type ConfirmContextType = {
 message: React.ReactNode | null
 resolve?: (value: boolean) => void
 setMessage?: React.Dispatch<React.SetStateAction<React.ReactNode | null>>
 setResolve?: React.Dispatch<React.SetStateAction<(value: boolean) => void>>
}

type ConfirmContextProviderProps = {
 children?: React.ReactNode
}

export const ConfirmContext = createContext<ConfirmContextType | undefined>(
 undefined,
)

export function ConfirmContextProvider({
 children,
}: ConfirmContextProviderProps) {
 const [message, setMessage] = useState<React.ReactNode>(null)
 const [resolve, setResolve] = useState<((value: boolean) => void) | null>(null)

 return (
  <ConfirmContext.Provider
   value={{
    message,
    setMessage,
    resolve: resolve as ((value: boolean) => void) | undefined,
    setResolve: setResolve as Dispatch<
     SetStateAction<(value: boolean) => void>
    >,
   }}
  >
   {children}
  </ConfirmContext.Provider>
 )
}

export function useConfirmContext() {
 const context = useContext(ConfirmContext)

 if (!context) {
  throw new Error('ConfirmContextProvider not found')
 }

 return context!
}
