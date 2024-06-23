import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/product-detail.css"

const PRODUCTS_URL = "http://localhost:3000/api/product"

function ProductDetailsPage() {

    const [product, setProduct] = useState(null);
    const { productId } = useParams();
    const navigate = useNavigate();

    function handleGoBack() {
        navigate(-1)
    }

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(`${PRODUCTS_URL}/${productId}`);
                setProduct(res.data)
            } catch (error) {
                console.log(err);
            }
        }
        getData()
    }), [productId];

    if (!product) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div className="product-card">
                <h2 className="product-title">Product title: {product.name}</h2>
                <div className="product-info">
                    <p>Price : ${product.price}</p>
                    <p>Category : {product.category}</p>
                </div>
                <div className="product-buttons">
                    <button onClick={() => { handleGoBack() }}>Back</button>

                </div>
            </div>
        )
    }
}

export default ProductDetailsPage