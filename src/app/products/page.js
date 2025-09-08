'use client'
import defaultProducts from '../../data/Products';
import Link from "next/link";
import { useState, useEffect } from 'react';

function ProductList() { // We can get defaultProducts, later API calls

    const [products, setProducts] = useState([]); // Products is empty array

    useEffect(() => {
        fetch("http://localhost:3000/api/product", {
            method: "GET"
        }) // built in promise which we use to create APIs
            .then(response => response.json()) // json data type
            .then(data => {
                setProducts(data);
            }).catch(error => {
                console.log(error)
            })
    }, [])

    const handleRemove = async (id) => {
        if (!confirm('Are you sure you want to remove it?')) return;

        const res = await fetch(`http://localhost:3000/api/product/${id}`, {
            method: "DELETE"
        })

        if (!res.ok) {
            throw new Error('Failed to delete product');
        }

        setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
    }

    return <div className='mt-4'>
        <h1>Product List</h1>
        <div className='row'>
            {
                products.map((product) => (
                    <div className='col-3 col-xs-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3' key={product._id}>
                        <div className="card">
                            <img src={product.imageUrl} className="card-img-top" alt={product.imageUrl} />
                            <div className="card-body">
                                <h5 className="card-title">{product.productName}</h5>
                                <p className="card-text">{product.productCode}</p>
                                <p className="card-text">{product.releaseDate}</p>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">{product.price}</p>
                                <p className="card-text">{product.starRating}</p>
                                <Link className="btn btn btn-outline-primary m-1" href={`/product-detail/${product.productId}`}>Buy now</Link>
                                <button className='btn btn-danger m-2' onClick={() => handleRemove(product._id)}>Remove</button>
                                <Link className="btn btn btn-outline-primary m-1" href={`/product-update/${product.productId}`}>Update</Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

    </div>
}

export default ProductList;