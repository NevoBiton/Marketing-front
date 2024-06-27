import React from 'react'
import InputComponent from './Input'
import PriceRangeSlider from './PriceRangeSlider'
import "../styles/components.style.css/search-and-filter.css"

function SearchAndFilterComponent({ searchParams, handleFilterChange, setSearchParams }) {
    return (
        <div className='search-and-filter-wrapper'>
            <PriceRangeSlider
                setSearchParams={setSearchParams}
                searchParams={searchParams}
            />
            <div className='search-and-label'>
                <label htmlFor="name">Search product by name :</label>
                <InputComponent
                    className="feed-search-input"
                    id='name'
                    name='name'
                    type="text"
                    value={searchParams.get("name") || ""}
                    onChange={handleFilterChange}
                />
            </div>
        </div>
    )
}

export default SearchAndFilterComponent