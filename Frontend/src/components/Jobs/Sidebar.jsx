import React, { useState } from 'react';
import "./Filter.css"
import { FormLabel, Radio } from '@mui/material';


const Sidebar = () => {


    const filterData = [
        {
            fitlerType: "Location",
            array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
        },
        {
            fitlerType: "Industry",
            array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
        },
        {
            fitlerType: "Salary",
            array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
        },
    ]

    return (
        <>
            <div className="filter">

                <h2>Filter Jobs</h2>
                <hr />

                <div>
                    <h1 className='cardDiv'>{filterData.fitlerType}</h1>
                    {filterData.map((data, index) => (
                        <div key={`filter-${index}`} className='cardDiv'>
                            <h3 className='filterName'>{data.filterType}</h3>
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
