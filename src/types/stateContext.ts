import { type ReactNode } from "react"

export interface StateContextType {
  showCart: boolean,
  cartItems: any[],
  totalPrice: number,
  totalQty: number,
  qty: number,
  incQty: () => void,
  decQty: () => void,
}

export interface ChildrenType {
  children: ReactNode
}