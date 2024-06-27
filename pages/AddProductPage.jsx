import React, { useEffect, useRef, useState } from 'react'
import AddProductForm from '../components/AddProductForm'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '../components/SnackBar';


const PRODUCTS_URL = "http://localhost:3000/api/product"

function AddProductPage() {

    const [snackbar, setSnackbar] = useState({ message: '', type: '', visible: false });
    async function showSnackbar(message, type) {
        setSnackbar({ message, type, visible: true });
    }

    useEffect(() => {

    }, []);

    const navigate = useNavigate()

    const nameRef = useRef();
    const priceRef = useRef(null);
    const categoryRef = useRef(null);
    const quantityRef = useRef(null);

    async function addProduct(ev) {
        ev.preventDefault();
        try {
            const newProduct = {
                name: nameRef.current.value,
                price: priceRef.current.value,
                quantity: quantityRef.current.value,
                category: categoryRef.current.value
            };
            await addProductToDataBase(newProduct);
            showSnackbar('Product Added', 'success');
            setTimeout(() => { navigate('/product') }, 600)

        } catch (error) {
            console.log("Error adding post:", error);
        }
    }

    async function addProductToDataBase(product) {
        try {
            const res = await axios.post(PRODUCTS_URL, product);
            console.log("Product added:", res.data);
        } catch (error) {
            console.error("Error adding Product:", error);
        }
    }

    return (
        <div>
            <AddProductForm
                addProduct={addProduct}
                nameRef={nameRef}
                priceRef={priceRef}
                categoryRef={categoryRef}
                quantityRef={quantityRef}
            />
            <Snackbar message={snackbar.message} type={snackbar.type} visible={snackbar.visible} />

        </div>
    )
}

export default AddProductPage