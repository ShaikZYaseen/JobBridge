import React, { useState } from 'react';
import "./Filter.css"
import { FormLabel, Radio } from '@mui/material';


const Sidebar = ({ isOpen, onClose }) => {


    const fitlerData = [
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
                    <h1 className='cardDiv'>{fitlerData.fitlerType}</h1>
                    {
                        fitlerData.map((data, index) => (
                            <div>
                                <h3 className='filterName'>{data.fitlerType}</h3>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div className='radioDiv'>
                                                <Radio  value={item} id={itemId} />
                                                <FormLabel htmlFor={itemId}>{item}</FormLabel>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Sidebar;
