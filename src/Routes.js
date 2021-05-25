import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Add from './components/Admin/Add';
import Edit from './components/Admin/Edit';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Cart from './components/cart/Cart';
import Navbar from './components/Header/Navbar';
import Home from './components/Home/Home';
import AuthContextProvider from './contexts/AuthContext';
import ProductContextProvider from './contexts/ProductsContext';

const Routes = () => {
    return (
        <AuthContextProvider>
            <ProductContextProvider>
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/add" component={Add} />
                        <Route exact path="/edit/:id" component={Edit} />
                    </Switch>
                </BrowserRouter>
            </ProductContextProvider>
        </AuthContextProvider>
    );
};

export default Routes;