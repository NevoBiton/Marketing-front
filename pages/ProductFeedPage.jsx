import { React, useState, useEffect, useMemo } from 'react';
import useFetch from '../hooks/useFetchProducts';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/products-feed.css"
import Button from '../components/Button';
import Snackbar from '../components/SnackBar';
import SearchBar from '../components/SearchBar';



const PRODUCTS_URL = "http://localhost:3000/api/product"

function ProductFeedPage() {

    function handlePagination(ev) {
        const value = ev.target.value
        searchParams.set("page", value)
        setSearchParams(searchParams)
    }

    function handleFilterChange(ev) {
        const inputName = ev.target.name

        if (ev.target.type === "checkbox") {
            const isChecked = ev.target.checked
            console.log(ev.target.checked);
            searchParams.set(inputName, isChecked)
        } else {
            const value = ev.target.value
            console.log(value);
            searchParams.set(inputName, value)
        }
        setSearchParams(searchParams)
    }
    const [searchParams, setSearchParams] = useSearchParams();
    const options = {
        params: {
            name: searchParams.get("name"),
            minPrice: searchParams.get("minPrice"),
            page: searchParams.get("page"),
            inStock: searchParams.get("inStock")
        }
    }

    const { data, error, loading, setData } = useFetch(PRODUCTS_URL, options);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(PRODUCTS_URL, options);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();

    }, [searchParams]);

    const [snackbar, setSnackbar] = useState({ message: '', type: '', visible: false });
    async function showSnackbar(message, type) {
        setSnackbar({ message, type, visible: true });
    }

    async function deleteProduct(productId) {
        try {
            await deleteProductFromDataBase(productId);
            const newProductsList = data.filter((product) => product._id !== productId);
            showSnackbar("Product Deleted", "error")
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

    return (
        <>
            <div className='main-wrapper'>
                {/* <SearchBar /> */}
                <div>
                    <label htmlFor="name">Search by name :</label>
                    <input
                        id='name'
                        name='name'
                        type="text"
                        value={searchParams.get("name") || ""}
                        onChange={handleFilterChange}

                    />
                    <label htmlFor="name">Min price :</label>
                    <input
                        id='minPrice'
                        name='minPrice'
                        type="number"
                        value={searchParams.get("minPrice") || ""}
                        onChange={handleFilterChange}

                    />
                    <label htmlFor="inStock">Just in Stock :</label>
                    <input
                        id='inStock'
                        name='inStock'
                        type="checkbox"
                        value={searchParams.get("inStock") === "true"}
                        onChange={handleFilterChange}
                    />
                    <label htmlFor="name">Page number :</label>
                    <input
                        id='page'
                        name='page'
                        min={1}
                        type="number"
                        value={searchParams.get("page") || "1"}
                        onChange={handlePagination}

                    />

                </div>
                <h1>Products</h1>
                <ul className='products-list'>
                    {data?.map(product => (
                        <li key={product._id} className='product-item'>
                            <div className='product-item-titles'>
                                <p><b>Product</b> : {product.name}</p>
                                <p><b>Price</b> : ${product.price}</p>
                            </div>
                            <div className='product-item-buttons'>
                                <p><NavLink to={`/product/${product._id}`}><Button>Info</Button></NavLink></p>
                                <Button onClick={() => { deleteProduct(product._id) }}>Delete</Button>
                            </div>

                        </li>
                    ))}
                </ul>
                <Snackbar message={snackbar.message} type={snackbar.type} visible={snackbar.visible} />
            </div>
        </>
    )
}

export default ProductFeedPage