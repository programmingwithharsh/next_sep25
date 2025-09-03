'use client';
import React from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import Title from './Title';
import Welcome from './Welcome';
import CoreBootstrap from '../core-bootstrap/CoreBootstrap';

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
        const x = 2;
        const username = "Mayank"; // string
        const interests = ["Playing Badminton", "Television", "Work for Client", "Coding"]; // Array
        const birth = { // object
            place: "Agra",
            year: 2000
        };

        return <div className='container-fluid'>
            <CoreBootstrap />
            <div className='mt-2'>
                <div className='alert alert-primary'>This is Main Class Component 2 + 2 is {2 + 2} </div>
                <div className='header mb-2'>Username is {this.state.username}</div>
                <button className='btn btn-primary' onClick={this.updateUsername}>Update Username</button>
                <AddProduct title="This is Title" />
                <ProductList />
                <Title x={x} username={username} interests={interests} birth={birth} />
                <Welcome />
            </div>
        </div>
    }
}