import { createContext, ReactNode, useContext, useState } from "react"
import ShoppingCart from "../components/ShoppingCart"
import useLocalStorage from "../hooks/useLocalStorage"

type CartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type CartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const CartContext = createContext({} as CartContext)

export function useCart() {
    return useContext(CartContext)
}

export default function CartProvider({ children }: CartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
    )
    const cartQuantity = cartItems.reduce(
        (acc: number, item: CartItem) => item.quantity + acc,
        0
    )

    const openCart = () => {
        setIsOpen(true)
    }

    const closeCart = () => {
        setIsOpen(false)
    }

    const getItemQuantity = (id: number) => {
        return cartItems.find((item) => item.id === id)?.quantity || 0
    }

    const increaseQuantity = (id: number) => {
        setCartItems((curItems) => {
            if (curItems.find((item) => item.id === id) == null) {
                return [...curItems, { id, quantity: 1 }]
            } else {
                return curItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseQuantity = (id: number) => {
        setCartItems((curItems) => {
            if (curItems.find((item) => item.id === id)?.quantity === 1) {
                return curItems.filter((item) => item.id !== id)
            } else {
                return curItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems((curItems) => {
            return curItems.filter((item) => item.id !== id)
        })
    }

    return (
        <CartContext.Provider
            value={{
                getItemQuantity,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity,
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </CartContext.Provider>
    )
}
