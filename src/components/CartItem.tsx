import { Button, Stack } from "react-bootstrap"
import { useCart } from "../context/CartContext"
import storeItems from "../data/items.json"
import formatCurrency from "../utils/formatCurrency"

type CartItemProps = {
    id: number
    quantity: number
}

function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart, decreaseQuantity, increaseQuantity } = useCart()
    const item = storeItems.find((i) => i.id === id)

    if (item === null || item === undefined) return null

    return (
        <Stack
            direction="horizontal"
            gap={2}
            className="d-flex align-items-center"
        >
            <img
                src={item.imgUrl}
                style={{ width: 125, height: 88, objectFit: "cover" }}
                alt=""
            />
            <div
                className="d-flex justify-content-between align-items-center"
                style={{ flex: 1 }}
            >
                <div style={{ fontSize: 18 }}>
                    <div>
                        {item.name}
                        {quantity > 1 && (
                            <span
                                className="text-muted"
                                style={{ fontSize: 14 }}
                            >
                                {" "}
                                x {quantity}
                            </span>
                        )}
                    </div>
                    <div className="text-muted" style={{ fontSize: 14 }}>
                        {formatCurrency(item.price)}
                    </div>
                    <div
                        className="d-flex justify-content-between align-items-center mt-3"
                        style={{ flex: 1 }}
                    >
                        <Button
                            onClick={() => decreaseQuantity(item.id)}
                            size="sm"
                            variant="outline-secondary"
                        >
                            -
                        </Button>
                        <div className="me-2 ms-2">{quantity}</div>
                        <Button
                            onClick={() => increaseQuantity(item.id)}
                            size="sm"
                            variant="outline-secondary"
                        >
                            +
                        </Button>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <span>{formatCurrency(quantity * item.price)}</span>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => removeFromCart(item.id)}
                    >
                        x
                    </Button>
                </div>
            </div>
        </Stack>
    )
}

export default CartItem
