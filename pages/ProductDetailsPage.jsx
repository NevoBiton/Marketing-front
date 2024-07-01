import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/product-detail.css"
import Button from '../components/Button';
import { useContext } from 'react';
import { UserContext } from '../src/contexts/UserContext';

const PRODUCTS_URL = "http://localhost:3000/api/product"
const PRODUCTS_PROTECTED_URL = "http://localhost:3000/api/protected"



function ProductDetailsPage() {
    const { loggedInUser } = useContext(UserContext);

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

    async function deleteProduct(productId) {
        try {
            await deleteProductFromDataBase(productId);
            console.log("Deleted");
            handleGoBack()
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    async function deleteProductFromDataBase(productId) {
        try {
            const res = await axios.delete(`${PRODUCTS_PROTECTED_URL}/${productId}`)
            console.log("Product removed:", res.data);
        } catch (error) {
            console.error("Error Delete Product from DB:", error);
        }
    }

    if (!product) {
        return (
            <div>Loading...</div>
        )
    } else {
        const categoriesString = product.categories.map(category => category.charAt(0).toUpperCase() + category.slice(1)).join(', ');
        return (
            <div className="product-card">

                <div className="product-info">
                    <h2 className="product-title">Product title: {product.name}</h2>
                    <p>Price : ${product.price}</p>
                    <p>Quantity : {product.quantity}</p>
                    <p>Categories : {categoriesString}</p>
                    <p>Seller ID : {product.user}</p>

                </div>
                <div className="product-buttons">
                    <Button onClick={() => { handleGoBack() }}>Back</Button>
                    {loggedInUser && loggedInUser._id === product.user && (
                        <Button className="delete-button" onClick={() => { deleteProduct(product._id) }}>Delete</Button>
                    )}
                    {/* <Button className="delete-button" onClick={() => { deleteProduct(product._id) }}>Delete</Button> */}
                </div>
            </div>
        )
    }
}

export default ProductDetailsPage