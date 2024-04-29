import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"; // Import redux-thunk middleware
// Define action types
const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const SELECT_PRODUCT = 'SELECT_PRODUCT';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Define action creators
export const fetchProducts = () => {
    return (dispatch) => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: FETCH_PRODUCTS,
                    payload: json.products
                });
            });
    };
};

export const selectProduct = (product) => {
    return {
        type: SELECT_PRODUCT,
        payload: product
    };
};

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product
    };
};

export const removeFromCart = (product) => {
    return {
        type: REMOVE_FROM_CART,
        payload: product
    };
};

// Define initial state
const initialState = {
    products: [],
    cart: []
};

// Define reducer
const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case SELECT_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload
            };
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item !== action.payload)
            };
        default:
            return state;
    }
};

// Create store
const store = createStore(productsReducer, applyMiddleware(thunk));

export default store;
