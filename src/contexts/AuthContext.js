import React, { useReducer } from 'react';
import axios from 'axios';
import { API } from '../helpers/constants';

export const authContext = React.createContext()

const INIT_STATE = {
    users: [],
    currentUser: ''
}

const reducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case "GET_USERS": 
            return {
                ...state, 
                users: action.payload
            }
        default: return state
    }
}

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getUsers = async () => {
        const { data } = await axios.get(`${API}/users`)
        dispatch({
            type: "GET_USERS",
            payload: data
        })
    }

    const addUser = async (newUser) => {
        console.log(newUser, 'user')
        try{
            const res = await axios.post(`${API}/users`, newUser)
            return res
        }catch(err){
            console.log(err)
            return err
        }
    }

    return (
        <authContext.Provider value={{
            users: state.users,
            getUsers,
            addUser,
        }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthContextProvider;