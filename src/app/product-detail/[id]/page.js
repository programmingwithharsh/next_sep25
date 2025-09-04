'use client'
import { useParams } from "next/navigation";

function ProductDetail() {
    // Object Destructuring
    const { id } = useParams();

    return (<div>
        <h1>This is Product Details Functional Component, Product id is {id}</h1>
    </div>);
}

export default ProductDetail;