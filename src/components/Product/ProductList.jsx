import { Grid } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { productsContext } from '../../contexts/ProductsContext';
import ProductCard from './ProductCard';

const ProductList = () => {
    const { products, getProducts } = useContext(productsContext);

    useEffect(() => {
        getProducts()
    }, [])
    console.log(products)

    return (
        <>
            <Grid container spacing={3}>
                {
                    products ? (
                        products.map((item, index) => (
                            <ProductCard item={item} key={index} />
                        ))
                    ) : ( <h1>Loading...</h1> )
                }

            </Grid>
        </>
    );
};

export default ProductList;