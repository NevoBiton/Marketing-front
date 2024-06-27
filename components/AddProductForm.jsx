import React from 'react'
import "../styles/add-product-form.css"
import InputComponent from './Input'

function AddProductForm(props) {

    return (
        <form className='add-product-form' onSubmit={props.addProduct}>

            <h1>Add Producta</h1>

            <div className='form-label-and-input'>
                <label htmlFor="name">Name :</label>
                <InputComponent
                    type={"text"}
                    placeholder={"Name"}
                    ref={props.nameRef}
                    id={"name"}
                    required={"required"}
                />
            </div>

            <div className='form-label-and-input'>
                <label htmlFor="price">Price :</label>
                <InputComponent
                    type={"number"}
                    placeholder={"Price"}
                    ref={props.priceRef}
                    id={"price"}
                    required={"required"}
                />
            </div>

            <div className='form-label-and-input'>   <label htmlFor="quantity">Quantity :</label>
                <InputComponent
                    type={"number"}
                    placeholder={"Quantity"}
                    ref={props.quantityRef}
                    id={"quantity"}
                    required={"required"}
                />
            </div>

            <div className='form-label-and-input'>
                <label htmlFor="category">Category :</label>
                <InputComponent
                    type={"text"}
                    placeholder={"Category"}
                    ref={props.categoryRef}
                    id={"category"}
                    required={"required"}
                />
            </div>

            <InputComponent
                type={"submit"}
                className={"form-submit-button"}
            />
        </form>
    )
}

export default AddProductForm