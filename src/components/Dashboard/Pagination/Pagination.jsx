import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './styles.css'

export default function PaginationComponent({ page, handlePageChange }) {

    return (
        <div className='pagination-component'>
            <Pagination count={12} page={page} onChange={(event, value) => handlePageChange(event, value)}
                sx={{
                    "& .MuiPaginationItem-text": {
                        color: "#fff !important",
                        border: "1px solid var(--grey)",
                    },
                    "& .MuiPaginationItem-text:hover": {
                        backgroundColor: "transparent !important",
                    },
                    "& .Mui-selected  ": {
                        backgroundColor: "var(--blue)",
                        borderColor: "var(--blue)",
                    },
                    "& .MuiPaginationItem-ellipsis": {
                        border: "none",
                    },
                }}
            />
        </div>
    );
}