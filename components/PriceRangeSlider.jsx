// import React, { useState } from "react";
// import ReactSlider from "react-slider";

// function PriceRangeSlider({ searchParams, setSearchParams }) {
//     const minPriceSearch = searchParams.get("minPrice");
//     const maxPriceSearch = searchParams.get("maxPrice");

//     function updateRange(newValues) {
//         setSearchParams((prev) => {
//             prev.set("minPrice", newValues[0]);
//             prev.set("maxPrice", newValues[1]);
//             return prev;
//         });
//     }
//     const values = [Number(minPriceSearch), Number(maxPriceSearch)];

//     return (
//         <div>
//             <label>
//                 Select Price Range:
//             </label>
//             <ReactSlider
//                 min={0}
//                 max={2000}
//                 step={10}
//                 value={values}
//                 onChange={(newValues) => {
//                     updateRange(newValues);
//                 }}
//                 renderThumb={(props, state, index) => {
//                     const { key, ...restProps } = props; // Destructure key out of props
//                     return (
//                         <div
//                             key={index}
//                             {...restProps}
//                         ></div>
//                     );
//                 }}
//             />
//             <div>
//                 <span>Min: ${values[0]}</span>
//                 <span>Max: ${values[1]}</span>
//             </div>
//         </div>
//     );
// }

// export default PriceRangeSlider;

import React, { useState } from "react";
import ReactSlider from "react-slider";
import "../styles/components.style.css/price-slider.css"

function PriceRangeSlider({ searchParams, setSearchParams }) {
    searchParams.set("maxPrice", searchParams.get("maxPrice") || "2000")
    const minPriceSearch = searchParams.get("minPrice");
    const maxPriceSearch = searchParams.get("maxPrice");

    function updateRange(newValues) {
        searchParams.set("page", "1");
        setSearchParams((prev) => {
            prev.set("minPrice", newValues[0]);
            prev.set("maxPrice", newValues[1]);
            return prev;
        });
    }
    const values = [Number(minPriceSearch), Number(maxPriceSearch)];

    return (
        <div className="price-range-slider">
            <label className="label">Select Price Range:</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                min={0}
                max={2000}
                step={10}
                value={values}
                onChange={(newValues) => {
                    updateRange(newValues);
                }}
                renderThumb={(props, state, index) => {
                    const { key, ...restProps } = props; // Destructure key out of props
                    return (
                        <div
                            key={index}
                            {...restProps}
                            className="thumb"
                        ></div>
                    );
                }}
            />
            <div className="range-values">
                <span className="min-value">Min: ${values[0]}</span>
                <span className="max-value">Max: ${values[1]}</span>
            </div>
        </div>
    );
}

export default PriceRangeSlider;