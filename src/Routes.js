import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import Home from './components/Home/Home';
import ProductContextProvider from './contexts/ProductsContext';

const Routes = () => {
    return (
        <ProductContextProvider>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        </ProductContextProvider>
    );
};

export default Routes;