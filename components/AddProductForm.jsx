import React from 'react'

function AddProductForm(props) {
    return (
        <form style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="name">Name :</label>
            <input ref={props.nameRef} type="text" id='title' required />

            <label htmlFor="price">Price :</label>
            <input ref={props.priceRef} type="number" id='price' required />

            <label htmlFor="category">Category :</label>
            <input ref={props.categoryRef} type="text" id='category' required />

            <input onClick={props.addProduct} type="submit" />
        </form>
    )
}

export default AddProductForm