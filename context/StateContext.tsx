import { createContext, useContext, useState } from 'react'
import type { CartItemType, ChildrenType, StateContextType } from '../src/types/stateContext'
import type { Product } from '../src/types/sanity';
import toast from 'react-hot-toast';

const Context = createContext<StateContextType | null>(null);

export const StateContext = ({ children }: ChildrenType ) => {
  const [showCart, setShowCart] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [totalQty, setTotalQty] = useState<number>(0)
  const [qty, setQty] = useState<number>(1)

  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems?.find((item) => item._id === product._id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQty((prevQuantity) => prevQuantity + quantity)

    if(!checkProductInCart) {
      setCartItems([...cartItems, {
        ...product,
        quantity: quantity
      }])
    } else {
      const updateCartItems: CartItemType[] = cartItems?.map(cartProduct => {
        return cartProduct._id === product._id 
          ? {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
          : cartProduct
      })

      setCartItems(updateCartItems)
    }
    
    toast.success(`${qty} ${product.name} added to the cart!`)
  }

  const onRemove = (product: Product) =>  {
    const foundProduct = cartItems.find((item) => item._id === product._id)
    if(!foundProduct) return;

    setCartItems(cartItems.filter(item => item._id !== product._id))

    setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity)
    setTotalQty(prevTotalQty => prevTotalQty - foundProduct.quantity)
  }

  const toggleCartItemQuantity = (id: string, value: 'inc' | 'dec') => {
    let foundProduct: CartItemType | undefined
    let index
    foundProduct = cartItems.find((item) => item._id === id)
    if(!foundProduct) return;

    index = cartItems.findIndex((product) => product._id === id)

    if(value === 'inc') {
      setCartItems(cartItems.map(item =>
        item._id === id
          ? {...item, quantity: item.quantity + 1}
          : item
      ))
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setQty((prevQty) => prevQty + 1)
    } else if(value === 'dec') {
      if(foundProduct.quantity > 1){
        setCartItems(cartItems.map(item =>
          item._id === id
            ? {...item, quantity: item.quantity - 1}
            : item
        ))
        console.log("💓foundProduct looks like this", foundProduct, " 👸 ...and the fellow foundProduct.price princess: ", foundProduct.price)
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setQty((prevQty) => prevQty - 1)
      }
    }
  }
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
      setShowCart,
      cartItems,
      setCartItems,
      totalPrice,
      totalQty,
      qty,
      incQty,
      decQty,
      onAdd,
      onRemove,
      toggleCartItemQuantity
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