'use client';
import React from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import Title from './Title';
import Welcome from './Welcome';

export default class Main extends React.Component { // Export Main Component, inherit React class

    constructor() {  // Class Component lifecycle
        super();
        console.log("Constructor - 1");
    }

    render() { // Class Component lifecycle
        console.log("Render - 2");
        return <div>
            <div>This is Main Class Component 2 + 2 is {2 + 2} </div>
            <AddProduct />
            <ProductList />
            <Title />
            <Welcome />
        </div>
    }
}