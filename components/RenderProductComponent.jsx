// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import Button from './Button'

// function RenderProductComponent({ data, deleteProduct }) {
//     if (!data) {
//         return (
//             <p>Loading...</p>
//         )
//     }
//     if (data.length < 1) {
//         return (
//             <p className='empty-products-message'>Cannot find products 😟</p>
//         )
//     }
//     return (
//         <>
//             <ul className='products-list'>
//                 {data?.map(product => (
//                     <li key={product._id} className='product-item'>
//                         <div className='product-item-titles'>
//                             <img src="https://dummyimage.com/250x150" alt="" />
//                             <p><b>Product</b> : {product.name}</p>
//                             <p><b>Price</b> : ${product.price}</p>
//                         </div>
//                         <div className='product-item-buttons'>
//                             <p><NavLink to={`/product/${product._id}`}><Button>Details</Button></NavLink></p>
//                             <Button className="delete-button" onClick={() => { deleteProduct(product._id) }}>Delete</Button>
//                         </div>

//                     </li>
//                 ))}
//             </ul>
//         </>
//     )
// }

// export default RenderProductComponent

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';
import { UserContext } from '../src/contexts/UserContext';

function RenderProductComponent({ data, deleteProduct }) {
    const { loggedInUser } = useContext(UserContext);

    if (!data) {
        return (
            <p>Loading...</p>
        );
    }
    if (data.length < 1) {
        return (
            <p className='empty-products-message'>Cannot find products 😟</p>
        );
    }
    return (
        <>
            <ul className='products-list'>
                {data?.map(product => (
                    <li key={product._id} className='product-item'>
                        <div className='product-item-titles'>
                            <img src="https://dummyimage.com/250x150" alt="" />
                            <p><b>Product</b> : {product.name}</p>
                            <p><b>Price</b> : ${product.price}</p>
                        </div>
                        <div className='product-item-buttons'>
                            <p><NavLink to={`/product/${product._id}`}><Button>Details</Button></NavLink></p>
                            {loggedInUser && loggedInUser._id === product.user && (
                                <Button className="delete-button" onClick={() => { deleteProduct(product._id) }}>Delete</Button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default RenderProductComponent;
