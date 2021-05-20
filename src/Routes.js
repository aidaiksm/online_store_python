import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
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
                    </Switch>
                </BrowserRouter>
            </ProductContextProvider>
        </AuthContextProvider>
    );
};

export default Routes;