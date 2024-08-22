import React, { useState } from 'react';
import "./Filter.css"
import { FormLabel, Radio } from '@mui/material';


const Sidebar = () => {


    const filterData = [
        {
            filterType: "Location",
            array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
        },
        {
            filterType: "Industry",
            array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
        },
        {
            filterType: "Salary",
            array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
        },
    ]

    return (
        <>
            <div className="filter">

                <h2>Filter Jobs</h2>
                <hr />

                <div>
                    {filterData.map((data, index) => (
                        <div key={`filter-${index}`} className='cardDiv'>
                            <h3 className='filterName'>{data.filterType}</h3> {/* Corrected typo here */}
                            {data.array.map((item, idx) => {
                                const itemId = `id-${index}-${idx}-${item}`; // Ensure uniqueness by combining index, idx, and item
                                return (
                                    <div key={itemId} className='radioDiv'>
                                        <Radio value={item} id={itemId} />
                                        <FormLabel htmlFor={itemId}>{item}</FormLabel>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
};

export default Sidebar;
