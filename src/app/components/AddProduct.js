'use client'

import { useState } from "react";

function AddProduct(props) {
    // Array Destructuring in ES6
    const [name, setName] = useState("iPhone"); // name is iPhone, setName is a method

    /*
        In class component | In Functional Component 
        this.state         | useState hooks
        this.setState({})  | setName method we can use to update name
    */

    const handleSubmit = (e) => {
        alert('You have clicked on Submit Button ...');
        e.preventDefault(); // stop page refresh
        setName(e.target[0].value);
    }

    const handleChange = (e) => {
        // alert('Input is changing ...');
        console.log(e.target);
        setName(e.target.value); // Update state
    }

    const updateName = () => {
        setName("Samsung"); // Update state
    }

    return <>
        <div>This is Add Product Functional Component</div>

        <h1>Props is {props.title} </h1>

        <h1>State is {name}</h1>
        <button onClick={updateName}>Update Name</button>
        <form onSubmit={handleSubmit}>
            Enter Product Name <input type="text" placeholder="Enter Product name" value={name} onChange={handleChange} />
            <input type="submit" value="Add Product" />
        </form>
    </>
}

export default AddProduct;