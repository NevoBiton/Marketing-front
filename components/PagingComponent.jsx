import React from 'react'
import Button from './Button'
import InputComponent from './Input'
import { ArrowLeft, ArrowRight } from 'lucide-react';

function PagingComponent(props) {

    if (!props.data) {
        return (
            <p></p>
        )
    }

    if (props.data.length < 1) {
        return (
            <p></p>
        )
    }

    return (
        <div className='paging-buttons'>
            <div className='in-stoke-wrapper'>
                <label htmlFor="inStock">Just in Stock :</label>
                <InputComponent
                    id='inStock'
                    name='inStock'
                    type="checkbox"
                    checked={props.searchParams.get("inStock") === "true"}
                    value={props.searchParams.get("inStock") === "true"}
                    onChange={props.handleFilterChange}
                /></div>
            <div><p>Page {props.currentPage} of {props.totalPages}</p></div><Button onClick={() => { props.handlePagination(-1) }}><ArrowLeft /></Button><Button onClick={() => { props.handlePagination(1) }}><ArrowRight /></Button>
        </div>
    )
}

export default PagingComponent