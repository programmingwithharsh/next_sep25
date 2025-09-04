import defaultProducts from '../../data/Products';
import Link from "next/link";

function ProductList() { // We can get defaultProducts, later API calls
    console.log({ defaultProducts });
    return <div className='mt-4'>
        <h1>Product List</h1>
        <div className='row'>
            {
                defaultProducts.map((product) => (
                    <div className='col-3 col-xs-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3' key={product.productId}>
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
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

    </div>
}

export default ProductList;