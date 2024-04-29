import {Outlet, Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";


const MainLayoutView = () => {
    const cart = useSelector(state => state.cart)
    const location = useLocation()

    return (
        <>
        <header className='bg-blue-300'>
            <div className="cart-items">
                <p>Items in Cart: { cart.length}</p>
                { location.pathname === '/cart' ? (
                    <></>
                ) : (
                    <Link
                        to='/cart'
                        className="text-blue-300 bg-gray-700 border border-gray-800 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                        To cart
                    </Link>
                    )
                }
            </div>
        </header>
        <main className="min-h-screen bg-gray-700">
            <Outlet/>
        </main>
</>
)
}
export default MainLayoutView

