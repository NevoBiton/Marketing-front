import React from 'react'
import "../styles/add-product-form.css"
import InputComponent from './Input'

function AddProductForm(props) {

    return (
        <form className='add-product-form' onSubmit={props.handleAddProduct}>

            <h1>Add Producta</h1>

            <div className='form-label-and-input'>
                <label htmlFor="name">Name :</label>
                <InputComponent
                    type={"text"}
                    name="name"
                    placeholder={"Name"}
                    id={"name"}
                    required={"required"}
                />
            </div>

            <div className='form-label-and-input'>
                <label htmlFor="price">Price :</label>
                <InputComponent
                    type={"number"}
                    name="price"
                    placeholder={"Price"}
                    id={"price"}
                    required={"required"}
                />
            </div>

            <div className='form-label-and-input'>   <label htmlFor="quantity">Quantity :</label>
                <InputComponent
                    type={"number"}
                    name="quantity"
                    placeholder={"Quantity"}
                    id={"quantity"}
                    required={"required"}
                />
            </div>
            <div>
                <h4>Categories :</h4>
                <div>
                    <label htmlFor="sport">Sport</label>
                    <input type="checkbox" id='sport' name='sport' />
                </div>
                <div>
                    <label htmlFor="comedy">Comedy</label>
                    <input type="checkbox" id='comedy' name='comedy' />
                </div>
            </div>

            <InputComponent
                type={"submit"}
                className={"form-submit-button"}
            />
        </form>
    )
}

export default AddProductForm