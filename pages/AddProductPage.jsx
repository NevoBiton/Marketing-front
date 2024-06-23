import React, { useEffect, useRef } from 'react'
import AddProductForm from '../components/AddProductForm'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PRODUCTS_URL = "http://localhost:3000/api/product/add"

function AddProductPage() {

    useEffect(() => {

    }, []);

    const navigate = useNavigate()

    const nameRef = useRef();
    const priceRef = useRef(null);
    const categoryRef = useRef(null);

    function makeId(length) {
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async function addProduct(ev) {
        ev.preventDefault();
        try {
            const newProduct = {
                id: makeId(6),
                name: nameRef.current.value,
                price: priceRef.current.value,
                category: categoryRef.current.value
            };
            await addProductToDataBase(newProduct);
            navigate('/product')
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
        <div><AddProductForm
            addProduct={addProduct}
            nameRef={nameRef}
            priceRef={priceRef}
            categoryRef={categoryRef}
        /></div>
    )
}

export default AddProductPage