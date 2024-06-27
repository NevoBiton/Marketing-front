import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/product-detail.css"
import Button from '../components/Button';

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
                console.log(error);
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

                <div className="product-info">
                    <h2 className="product-title">Product title: {product.name}</h2>
                    <p>Price : ${product.price}</p>
                    <p>Category : {product.category}</p>
                    <p>Quantity : {product.quantity}</p>
                </div>
                <div className="product-buttons">
                    <Button onClick={() => { handleGoBack() }}>Back</Button>
                </div>
            </div>
        )
    }
}

export default ProductDetailsPage