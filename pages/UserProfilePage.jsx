import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../src/contexts/UserContext";
import axios from 'axios';
import RenderProductComponent from '../components/RenderProductComponent';
import "../styles/user-profile.css"
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const PRODUCTS_USER_URL = "http://localhost:3000/api/product/user";
const productsPerPage = 6;

function UserProfilePage() {

    const { loggedInUser } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!loggedInUser) return;

        const source = axios.CancelToken.source();

        async function fetchData() {
            try {
                const { data: { total, products } } = await axios.get(`${PRODUCTS_USER_URL}/${loggedInUser._id}`, {
                    cancelToken: source.token,
                    params: {
                        page: currentPage,
                        limit: productsPerPage
                    }
                });

                setTotalProducts(total);
                setData(products);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    console.error("Error fetching products:", error);
                }
            }
        }

        fetchData();

        return () => {
            source.cancel("Operation canceled by the user.");
        };
    }, [loggedInUser, currentPage]);

    function handlePagination(change) {
        const newPage = currentPage + change;
        if (newPage > Math.ceil(totalProducts / productsPerPage) || newPage < 1) {
            return;
        }
        setCurrentPage(newPage);
    }

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h2>Hello {loggedInUser.username}!</h2>
                <p><strong>First name:</strong> {loggedInUser.firstName}</p>
                <p><strong>Last name:</strong> {loggedInUser.lastName}</p>
            </div>
            <div className="products-section">
                <h3>Your Products :</h3>
                <div>
                    {data.length > 0 && (
                        <div className="pagination-controls">
                            <p>Page {currentPage} of {totalPages}</p>
                            <div className='buttons-wrapper'>
                                <Button onClick={() => { handlePagination(-1) }}><ArrowLeft /></Button>
                                <Button onClick={() => { handlePagination(1) }}><ArrowRight /></Button>
                            </div>
                        </div>
                    )}
                    <RenderProductComponent data={data} />
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage

