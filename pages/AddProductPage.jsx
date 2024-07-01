import React, { useEffect, useRef, useState } from 'react'
import AddProductForm from '../components/AddProductForm'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '../components/SnackBar';


const PRODUCTS_URL_PROTECTED = "http://localhost:3000/api/protected"

function AddProductPage() {

    const [snackbar, setSnackbar] = useState({ message: '', type: '', visible: false });
    async function showSnackbar(message, type) {
        setSnackbar({ message, type, visible: true });
    }

    useEffect(() => {

    }, []);

    const navigate = useNavigate()

    async function handleAddProduct(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);

        // Extract form data
        const name = formData.get('name');
        const price = formData.get('price');
        const quantity = formData.get('quantity');
        const categories = [];

        if (formData.get("sport")) {
            categories.push('sport');
        }

        if (formData.get("comedy")) {
            categories.push('comedy');
        }

        const newProduct = {
            name,
            price,
            quantity,
            categories
        };

        console.log("Product Data:", newProduct);

        await addProduct(newProduct)
    }

    async function addProduct(newProduct) {
        try {
            const token = localStorage.getItem('token');

            await axios.post(PRODUCTS_URL_PROTECTED, newProduct, {
                headers: {
                    Authorization: token
                }
            });

            setTimeout(() => navigate('/product'), 600);
            console.log("Product Added!");

        } catch (error) {
            console.error("Error adding product:", error);
        }
    }





    return (
        <div>
            <AddProductForm
                handleAddProduct={handleAddProduct}
            />
            <Snackbar message={snackbar.message} type={snackbar.type} visible={snackbar.visible} />

        </div>
    )
}

export default AddProductPage