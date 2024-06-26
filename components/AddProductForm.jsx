import React from 'react'
import "../styles/form.css"

function AddProductForm(props) {
    return (
        <form onSubmit={props.addProduct} style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="name">Name :</label>
            <input required ref={props.nameRef} type="text" id='title' />

            <label htmlFor="price">Price :</label>
            <input ref={props.priceRef} type="number" id='price' required />

            <label htmlFor="quantity">Quantity :</label>
            <input ref={props.quantityRef} type="number" id='quantity' required />

            <label htmlFor="category">Category :</label>
            <input ref={props.categoryRef} type="text" id='category' required />

            <input type="submit" />
        </form>
    )
}

export default AddProductForm