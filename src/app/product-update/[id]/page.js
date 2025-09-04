'use client'
import { useParams } from "next/navigation";

function ProductUpdate() {
    // Object Destructuring
    const { id } = useParams();
    return (<>
        <div>Update Product, Product id is {id}</div>
    </>);
}

export default ProductUpdate;