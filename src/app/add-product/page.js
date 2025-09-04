'use client'

import { useState } from "react";

function AddProduct(props) {
    // Array Destructuring in ES6
    const [product, setProduct] = useState({
        "productName": "Hammer",
        "productCode": "",
        "releaseDate": "",
        "description": "",
        "price": "",
        "starRating": "",
        "imageUrl": ""
    }); // product is object, setProduct is a method

    /*
        In class component | In Functional Component 
        this.state         | useState hooks
        this.setState({})  | setProduct method we can use to update name
    */

    const handleSubmit = (e) => {
        alert('You have clicked on Submit Button ...');
        e.preventDefault(); // stop page refresh
        setProduct(e.target[0].value);
    }

    const handleChange = (e) => {
        // alert('Input is changing ...');
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        /*
            Update product based on onchange value
        */
        setProduct((prev) => ({ // to update product
            ...prev,
            [name]: name === 'price' || name === 'starRating' ? parseInt(value) || '' : value
        }))
    }

    return <>
        <div>This is Add Product Functional Component</div>

        <button type="button" className="btn btn-primary">Button 1</button>
        <button type="button" className="btn btn-outline-primary">Button 2</button>

        <form onSubmit={handleSubmit} className="col-xxl-4">
            Enter Product Name <input type="text" name="productName" className="form-control" placeholder="Enter Product name" value={product.productName} onChange={handleChange} />

            Enter Product Code <input type="text" name="productCode" className="form-control" placeholder="Enter Product code" value={product.productCode} onChange={handleChange} />

            Date <input type="date" name="releaseDate" className="form-control" value={product.releaseDate} onChange={handleChange} />

            Enter Description <input type="text" name="description" className="form-control" placeholder="Enter Description" value={product.description} onChange={handleChange} />

            Price <input type="text" name="price" className="form-control" placeholder="Enter Price" value={product.price} onChange={handleChange} />

            Rating <input type="number" name="starRating" className="form-control" value={product.starRating} onChange={handleChange} />

            Image Url <input type="text" name="imageUrl" className="form-control" placeholder="Enter ImageUrl" value={product.imageUrl} onChange={handleChange} />

            <input type="submit" className="btn btn-outline-primary mt-2" value="Add Product" />
        </form>
    </>
}

export default AddProduct;