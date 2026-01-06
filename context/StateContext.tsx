import { createContext, useContext, useState } from 'react'
import type { ChildrenType, StateContextType } from '../src/types/stateContext'

const Context = createContext<StateContextType | null>(null);

export const StateContext = ({ children }: ChildrenType ) => {
  const [showCart, setShowCart] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [totalQty, setTotalQty] = useState<number>(0)
  const [qty, setQty] = useState<number>(1)

  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }
  const decQty = () => {
    setQty((prevQty) => {
      return prevQty === 1 ? 1 : prevQty - 1
    })
  }

  return (
    <Context.Provider value={{
      showCart,
      cartItems,
      totalPrice,
      totalQty,
      qty,
      incQty,
      decQty
    }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => {
  const context = useContext(Context)
  if(!context) throw new Error("👩🏻‍⚕️useStateContext must be used withing a StateContext Provider")

  return context
}