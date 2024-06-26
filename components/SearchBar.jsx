import React from 'react'

function SearchBar() {
    return (
        <div>
            <label htmlFor="searchbar">Search :</label>
            <input type="text" />
            <label htmlFor="">Only in stock</label>
            <input type="checkbox" />
        </div>

    )
}

export default SearchBar