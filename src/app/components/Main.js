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
        this.updateUsername = this.updateUsername.bind(this);
    }

    updateUsername() {
        this.setState({ // to update state we use this.setState, whenever state updates, component rerender
            username: "Abhimanyu",
            address: "Mumbai"
        })
    }

    render() { // Class Component lifecycle
        console.log("Render - 2");
        console.log(this.state);

        return <div className='container-fluid'>
            <Nav /> {/* The Nav is the part of Main Component */}
            <h1>This is Main Component</h1>
            <h1>State username is {this.state.username}</h1>
            <button onClick={this.updateUsername}>Update username</button>
            <div>{this.props.children}</div> {/* The Page Content is rendered here */}
        </div>
    }
}