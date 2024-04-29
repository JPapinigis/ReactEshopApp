import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import CatalogView from "./components/CatalogView.jsx";
import MainLayoutView from "./components/MainLayoutView.jsx";
import ProductDetailView from "./components/ProductDetailView.jsx";
import CartView from "./components/CartView.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayoutView />}>
            <Route index element={<CatalogView />} />
            <Route path={'/product/:id'} element={<ProductDetailView />} />
            <Route path={'/cart'} element={<CartView />} />
        </Route>
    )
)

const App = () => {
    return (
        <span className="app h-full h- bg-gray-700">
            <RouterProvider router={router} />
        </span>
    )
}
export default App

