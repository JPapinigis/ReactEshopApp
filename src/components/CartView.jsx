import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { removeFromCart } from "../store.jsx";

const CartView = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const total = useSelector( () => {
        return cart.reduce((accumulator, currentItem) => {
            return accumulator + Number(currentItem.price)
        }, 0)
    })

    const formattedTotal = useSelector(() => {
        if (total > 1000) {
            return (total * 0.9).toFixed(2)
        } else {
            return total.toFixed(2)
        }
    })

    return (
        <div>
                <Link
                    to='/'
                    className="text-blue-300 bg-gray-700 border border-gray-800 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4"
                >Back to catalog</Link>
            {cart.length === 0 ? (
                <p className="mt-4 text-blue-300">Your cart is empty</p>
            ) : (
                <div>
                    {cart.map((product, index) => (
                        <div className="item-details rounded-lg shadow-lg bg-blue-300 mt-4" key={index}>
                            <img src={product.thumbnail} alt=""></img>
                            <span>Brand: {product.brand}</span>
                            <span>Category: {product.category}</span>
                            <span>Price: {product.price}€</span>
                            <button
                                onClick={() => handleRemoveFromCart(product)}
                                className="text-blue-300 bg-gray-700 border border-gray-800 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            >Remove</button>
                        </div>
                    ))}
                    {total > 1000 ? (
                        <p className="text-blue-300">Discounted total: { formattedTotal }€</p>
                    ) : (
                        <p className="text-blue-300">Total: { total }€</p>
                    )}
                </div>
            )}
        </div>
    )}
export default CartView
