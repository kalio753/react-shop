import { Offcanvas, Stack } from "react-bootstrap"
import { useCart } from "../context/CartContext"
import CartItem from "./CartItem"
import storeItems from "../data/items.json"
import formatCurrency from "../utils/formatCurrency"

type ShoppingCartProps = {
    isOpen: boolean
}

function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useCart()
    const total = storeItems.reduce((acc, item) => {
        let quantity = cartItems.find((i) => i.id === item.id)?.quantity || 0

        return acc + item.price * quantity
    }, 0)

    return (
        <Offcanvas
            show={isOpen && cartItems.length > 0}
            placement="end"
            onHide={closeCart}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total: {formatCurrency(total)}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShoppingCart
