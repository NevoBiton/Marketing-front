import { React, useState, useEffect, useMemo, useRef } from 'react';
import useFetch from '../hooks/useFetchProducts';
import { useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/products-feed.css"
import Snackbar from '../components/SnackBar';
import PagingComponent from '../components/PagingComponent';
import SearchAndFilterComponent from '../components/SearchAndFilterComponent';
import RenderProductComponent from '../components/RenderProductComponent';



const PRODUCTS_URL = "http://localhost:3000/api/product"
const PRODUCTS_PROTECTED_URL = "http://localhost:3000/api/protected"

const productsPerPage = 6

function ProductFeedPage() {

    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalProducts, setTotalProducts] = useState(0);

    function handleFilterChange(ev) {
        searchParams.set("page", "1");
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

    const currentPage = parseInt(searchParams.get("page") || "1");
    let totalPages = Math.ceil(totalProducts / productsPerPage);

    function handlePagination(change) {
        const newPage = currentPage + change;

        if (newPage > totalPages) {
            return;
        }
        if (newPage >= 1) {
            searchParams.set("page", newPage.toString());
            setSearchParams(searchParams);
        }
    }

    const options = {
        params: {
            name: searchParams.get("name"),
            minPrice: searchParams.get("minPrice"),
            maxPrice: searchParams.get("maxPrice"),
            page: searchParams.get("page"),
            inStock: searchParams.get("inStock")
        }
    }

    const { data, setLoading, setData } = useFetch(PRODUCTS_URL, options);


    useEffect(() => {

        setLoading(true);

        const source = axios.CancelToken.source();

        async function fetchData() {
            try {
                const [response, countRes] = await Promise.all([
                    axios.get(PRODUCTS_URL, {
                        cancelToken: source.token,
                        params: searchParams
                    }),
                    axios.get(`${PRODUCTS_URL}/count`, {
                        cancelToken: source.token,
                        params: searchParams
                    })
                ]);

                setTotalProducts(countRes.data.count);
                setData(response.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    console.error("Error fetching products:", error);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        return () => {
            source.cancel("Operation canceled by the user.");
        };
    }, [searchParams, setData, setLoading, data]);



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

        const token = localStorage.getItem('token');
        try {
            const res = await axios.delete(`${PRODUCTS_PROTECTED_URL}/${productId}`, {
                headers: {
                    Authorization: token
                }
            }
            )
            console.log("Product removed:", res.data);
        } catch (error) {
            console.error("Error Delete Product from DB:", error);
        }
    }



    return (
        <>
            <div className='main-wrapper'>
                <SearchAndFilterComponent
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    handleFilterChange={handleFilterChange}
                />
                <h1>Products</h1>
                <PagingComponent
                    data={data}
                    searchParams={searchParams}
                    handleFilterChange={handleFilterChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePagination={handlePagination}
                />
                <RenderProductComponent
                    data={data}
                    deleteProduct={deleteProduct} />
                <Snackbar message={snackbar.message} type={snackbar.type} visible={snackbar.visible} />
            </div>
        </>
    )
}

export default ProductFeedPage