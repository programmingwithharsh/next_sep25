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
        this.state = {
            username: "Supriya",
            address: "Delhi"
        }
    }

    updateUsername = () => {
        this.setState({ // to update state we use this.setState, whenever state updates, component rerender
            username: "Abhimanyu",
            address: "Mumbai"
        })
    }

    render() { // Class Component lifecycle
        console.log("Render - 2");
        console.log(this.state);
        return <div>
            <div>This is Main Class Component 2 + 2 is {2 + 2} </div>
            <div>Username is {this.state.username}</div>
            <button onClick={this.updateUsername}>Update Username</button>
            <AddProduct />
            <ProductList />
            <Title />
            <Welcome />
        </div>
    }
}