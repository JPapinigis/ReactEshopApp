import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from "../store.jsx";


const SelectedProduct = () => {
    const dispatch = useDispatch();
    // Select the product from the Redux store
    const selectedProduct = useSelector(state => state.selectedProduct);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    // Render the selected product
    return (
        <div className="bg-gray-700">
            {selectedProduct ? (
                <div data-cy="productDetails-card" className="rounded-lg shadow-lg bg-blue-300 p-10 flex mt-50">
                    <div className="mr-10">
                        <img src={ selectedProduct.thumbnail } alt=""/>
                    </div>
                    <div className="flex flex-col">
                        <p>Brand: {selectedProduct.brand}</p>
                        <p>Description: {selectedProduct.description}</p>
                        <h2 className="text-xl font-extrabold">Price: {selectedProduct.price}€</h2>
                        <div className="mt-2">
                            <Link
                                to='/cart'
                                onClick={() => handleAddToCart(selectedProduct)}
                                className="text-blue-300 bg-gray-700 border border-gray-800 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            >Add to cart</Link>
                        </div>
                        <div className="mt-auto">
                            <Link
                                to='/'
                                className="text-blue-300 bg-gray-700 border border-gray-800 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            >Back to catalog</Link>
                        </div>
                    </div>


                </div>
            ) : (
                <p>No product selected</p>
            )}
        </div>
    );
};

export default SelectedProduct;
