import { React, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetchProducts';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import "../styles/products-feed.css"

const PRODUCTS_URL = "http://localhost:3000/api/product"

function ProductFeedPage() {

    const { data, error, loading, setData } = useFetch(PRODUCTS_URL);

    // const location = useLocation()

    async function deleteProduct(productId) {
        try {
            await deleteProductFromDataBase(productId);
            const newProductsList = data.filter((product) => product.id !== productId);
            setData(newProductsList);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    async function deleteProductFromDataBase(productId) {
        try {
            const res = await axios.delete(`${PRODUCTS_URL}/${productId}`)
            console.log("Product removed:", res.data);
        } catch (error) {
            console.error("Error Delete Product from DB:", error);
        }
    }

    useEffect(() => {

    }, [])

    return (
        <>
            <div className='main-wrapper'>
                <h1>Products</h1>
                <ul className='products-list'>
                    {data?.map(product => (
                        <li className='product-item' key={product.id}>
                            <div>
                                <p><b>Product</b> : {product.name}</p>
                                <p><b>Price</b> : ${product.price}</p>
                            </div>
                            <div>
                                <p><NavLink to={`/product/${product.id}`}><button>Info</button></NavLink></p>
                                <button onClick={() => { deleteProduct(product.id) }}>Delete</button>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ProductFeedPage