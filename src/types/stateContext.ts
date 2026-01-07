import { type ReactNode } from "react"
import type { Product } from "./sanity"

export interface StateContextType {
  showCart: boolean,
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>,
  cartItems: CartItemType[],
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>,
  totalPrice: number,
  totalQty: number,
  qty: number,
  incQty: () => void,
  decQty: () => void,
  onAdd: (product: Product, quantity: number) => void,
  onRemove: (product: Product) => void,
  toggleCartItemQuantity: (id: string, value: 'inc' | 'dec') => void
}

export interface ChildrenType {
  children: ReactNode
}

export interface CartItemType extends Product {
   quantity: number
}