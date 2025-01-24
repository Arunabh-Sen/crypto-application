import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './styles.css'

export default function TogglePriceType({ priceType, handlePriceTypeChange }) {
    return (
        <div className='toggle-prices'>
            <ToggleButtonGroup
                value={priceType}
                exclusive
                onChange={handlePriceTypeChange}
                sx={{
                    "& .MuiToggleButtonGroup-grouped": {
                        border: "1px solid var(--blue) !important",
                        color: "var(--blue)",
                        "&.Mui-selected": {
                            backgroundColor: "var(--blue) !important",
                            color: "#fff !important",
                        },
                        "&:hover": {
                            backgroundColor: "rgba(58, 128, 233, 0.1) !important",
                        },
                    },
                    "& .MuiToggleButton-root": {
                        color: "var(--blue)",
                        "&.Mui-selected": {
                            backgroundColor: "var(--blue) !important",
                            color: "#fff !important",
                        },
                        "&:hover": {
                            backgroundColor: "rgba(58, 128, 233, 0.1) !important",
                        },
                    },
                }}
            >
                <ToggleButton className='toggle-btn' value="prices">
                    Price
                </ToggleButton>
                <ToggleButton className='toggle-btn' value="market_caps">
                    Market Cap
                </ToggleButton>
                <ToggleButton className='toggle-btn' value="total_volumes">
                    Total Volume
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}
