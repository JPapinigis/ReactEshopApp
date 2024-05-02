import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, selectProduct } from "../store.jsx";

const CatalogView = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    useEffect(() => {
        // Fetch products when the component mounts
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleProductClick = (product) => {
        dispatch(selectProduct(product)); // Dispatch selectProduct action with the selected product
    };

    return (
        <>
            <div className="products-list">
                {products.map(product => (
                    <Link
                        className="product max-w-sm p-6 rounded-lg shadow-lg bg-blue-300"
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={() => handleProductClick(product)}
                    >
                            <img src={product.thumbnail} alt=""></img>
                            <h2 className="text-xl font-extrabold">Brand: {product.brand}</h2>
                            <p>Description: {product.description}</p>
                            <p>Price: {product.price}€</p>
                    </Link>
                ))}
            </div>
        </>
    )
}
export default CatalogView

