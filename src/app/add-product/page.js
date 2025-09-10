'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import '../home.scss';
import styles from '../home2.module.scss';
import Star from "./star.component";

function AddProduct(props) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    // Array Destructuring in ES6
    const [product, setProduct] = useState({
        "productName": "",
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

    const handleSubmit = async (e) => {
        alert('You have clicked on Submit Button ...');
        e.preventDefault(); // stop page refresh
        console.log({ product });
        /*
            Do API call and store this information inside database
            We can use fetch method for making API calls
        */

        const res = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (!res) {
            throw new Error('Failed to add product');
        }

        const createdProduct = await res.json();
        router.push('/products'); // Register to products page 
    }

    const handleChange = (e) => {
        // alert('Input is changing ...');
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        /*
            Update product based on onchange value
        */

        setProduct((prev) => ({ // to update product, update state
            ...prev,
            [name]: value
        }))

    }

    return <>
        <div>This is Add Product Functional Component</div>

        <button type="button" className="btn btn-primary">Button 1</button>
        <button type="button" className="btn btn-outline-primary">Button 2</button>

        <div className="container">CSS example using scss
            <h1>Hello SCSS in Next.js</h1>
            <p>This is styles using scss</p>
        </div>

        <div className={styles.container2}>CSS example using scss - Module
            <h1>Hello SCSS in Next.js</h1>
            <p>This is styles using scss</p>
        </div>

        <Star />

        <form onSubmit={handleSubmit} className="col-xxl-4 mt-4">
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