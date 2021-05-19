import React, { useReducer } from 'react';
import axios from 'axios';
import { API } from '../helpers/constants';

export const productsContext = React.createContext()

const INIT_STATE = {
    products: [],
}

const reducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case "GET_PRODUCTS": 
            return {
                ...state, 
                products: action.payload
            }
        default: return state
    }
}

const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getProducts = async () => {
        const { data } = await axios.get(`${API}/products`)
        // console.log(data)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }


    return (
        <productsContext.Provider
            value={{
                products: state.products,
                getProducts,
            }}
        >
            {children}
        </productsContext.Provider>
    )
}

export default ProductContextProvider;