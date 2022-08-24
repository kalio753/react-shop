import { Button, Card } from "react-bootstrap"
import { useCart } from "../context/CartContext"
import formatCurrency from "../utils/formatCurrency"

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const {
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCart()
    let quantity = getItemQuantity(id)
    return (
        <Card className="h-100 ">
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200"
                style={{ objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">
                        {formatCurrency(price)}
                    </span>
                </Card.Title>
                <div className="mt-auto mb-auto">
                    {quantity === 0 ? (
                        <Button
                            className="w-100"
                            onClick={() => increaseQuantity(id)}
                        >
                            + Add To Cart
                        </Button>
                    ) : (
                        <div
                            className="d-flex justify-content-between align-items-center me-auto ms-auto"
                            style={{ gap: ".5rem" }}
                        >
                            <div
                                className="d-flex align-items-center"
                                style={{ gap: ".5rem" }}
                            >
                                <Button
                                    onClick={() => decreaseQuantity(id)}
                                    variant="outline-success"
                                >
                                    -
                                </Button>
                                <div>
                                    <span className="fs-3">{quantity}</span> in
                                    cart
                                </div>
                                <Button
                                    onClick={() => increaseQuantity(id)}
                                    variant="outline-success"
                                >
                                    +
                                </Button>
                            </div>
                            <Button
                                onClick={() => removeFromCart(id)}
                                variant="danger"
                                size="sm"
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}

export default StoreItem
