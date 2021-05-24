import React, { useReducer } from 'react';
import axios from 'axios';
import { API } from '../helpers/constants';
import { calcSubPrice, calcTotalPrice, getCountProductsInCart } from '../helpers/calcPrice';


export const productsContext = React.createContext()

const INIT_STATE = {
    products: [],
    paginatedPages: 1,
    cart: {},
    cartLength: 0
}

const reducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case "GET_PRODUCTS": 
            return {
                ...state, 
                products: action.payload.data,
                paginatedPages: Math.ceil(action.payload.headers["x-total-count"] / 6)
            }
        case "GET_CART": 
            return { ...state, cart: action.payload}
        case "CHANGE_CART_COUNT": 
            return { ...state, cartLength: action.payload}
        default: return state
    }
}

const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getProducts = async (history) => {
        const search = new URLSearchParams(history.location.search)
        search.set('_limit', 6)
        history.push(`${history.location.pathname}?${search.toString()}`)
        const res = await axios.get(`${API}/products${window.location.search}`)
        // console.log(res)
        dispatch({
            type: "GET_PRODUCTS",
            payload: res
        })
    }


    const addProductInCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }

        let newProduct = {
            item: product,
            count: 1,
            subPrice: 0
        }

        let filteredCart = cart.products.filter(elem => elem.item.id === product.id)
        console.log(filteredCart, 'to chto est')
        if(filteredCart.length > 0){
            cart.products = cart.products.filter(elem => elem.item.id !== product.id) // delete while you tapped it second time
            console.log(cart.products, 'if chast, dlya chego eto')
        }else {
            cart.products.push(newProduct)
            console.log(cart.products, 'eto else')
        }
        newProduct.subPrice = calcSubPrice(newProduct)  
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))

        dispatch({  //NEED TO CALC ITS LENGTH ICON AMOUTN LATTER
            type: "CHANGE_CART_COUNT",
            payload: cart.products.length
        })
    }

    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(!cart){  
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }

    const changeProductCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.products = cart.products.map(elem => {
            if(elem.item.id === id){
                elem.count = count
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }

    const checkProductIncart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newCart = cart.products.filter(elem => elem.item.id === id)
        return newCart.length > 0 ? true : false
    }


    return (
        <productsContext.Provider
            value={{
                products: state.products,
                paginatedPages: state.paginatedPages,
                cart: state.cart,
                cartLength: state.cartLength,
                getProducts,
                addProductInCart,
                getCart,
                changeProductCount,
                checkProductIncart
            }}
        >
            {children}
        </productsContext.Provider>
    )
}

export default ProductContextProvider;


// let cart = {
//     products:[
//         {
//             item: product,
//             count: 5,
//             subPrice
//         }
//     ],
//     totalPrice: 125
// }