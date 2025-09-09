'use client'
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function ProductUpdate() {
    // Object Destructuring
    const { id } = useParams();
    const router = useRouter();
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [product, setProduct] = useState({
        "productName": "",
        "productCode": "",
        "releaseDate": "",
        "description": "",
        "price": "",
        "starRating": "",
        "imageUrl": ""
    }); // product is object, setProduct is a method

    useEffect(() => {
        if (!id) return;

        fetch(`${apiURL}/${id}`, {
            method: "GET"
        }) // built in promise which we use to create APIs
            .then(response => response.json()) // json data type
            .then(data => {
                setProduct(data);
            }).catch(error => {
                console.log(error)
            })
    }, [])

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

    const handleSubmit = async (e) => {
        alert('You have clicked on Submit Button ...');
        e.preventDefault(); // stop page refresh
        console.log({ product });
        /*
            Do API call and store this information inside database
            We can use fetch method for making API calls
        */

        const res = await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (!res) {
            throw new Error('Failed to update product');
        }

        const createdProduct = await res.json();
        router.push('/products'); // Register to products page 
    }

    return (<>
        <div>Update Product, Product id is {id}</div>
        <form onSubmit={handleSubmit} className="col-xxl-4 mt-4">
            Enter Product Name <input type="text" name="productName" className="form-control" placeholder="Enter Product name" value={product.productName} onChange={handleChange} />

            Enter Product Code <input type="text" name="productCode" className="form-control" placeholder="Enter Product code" value={product.productCode} onChange={handleChange} />

            Date <input type="date" name="releaseDate" className="form-control" value={product.releaseDate} onChange={handleChange} />

            Enter Description <input type="text" name="description" className="form-control" placeholder="Enter Description" value={product.description} onChange={handleChange} />

            Price <input type="text" name="price" className="form-control" placeholder="Enter Price" value={product.price} onChange={handleChange} />

            Rating <input type="number" name="starRating" className="form-control" value={product.starRating} onChange={handleChange} />

            Image Url <input type="text" name="imageUrl" className="form-control" placeholder="Enter ImageUrl" value={product.imageUrl} onChange={handleChange} />

            <input type="submit" className="btn btn-outline-primary mt-2" value="Update Product" />
        </form>
    </>);
}

export default ProductUpdate;