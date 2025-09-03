'use client';
import React from 'react';
import Nav from './Nav';

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

        return <div className='container-fluid'>
            <Nav />
            <main>{this.props.children}</main>
        </div>
    }
}