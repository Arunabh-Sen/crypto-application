import React, { useEffect, useState } from 'react';
import { get100Coins } from '../../../functions/Get100Coins';
import { MenuItem, Select, CircularProgress } from '@mui/material';
import './styles.css';

const SelectCoins = ({ crypto1, crypto2, handleCoinChange }) => {
    const [allCoins, setAllCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const styles = {
        height: "2.5rem",
        color: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3a80e9",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3a80e9",
        },
        "& .MuiSvgIcon-root": {
            color: "var(--white)",
        },
    };

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const myCoins = await get100Coins();
            if (myCoins) {
                setAllCoins(myCoins);
            }
        } catch (error) {
            console.error("Error fetching coins:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='coins-flex'>
            <p>Crypto 1</p>
            {isLoading ? (
                <CircularProgress size={24} color="inherit" />
            ) : (
                <Select
                    sx={styles}
                    value={crypto1}
                    label="Crypto 1"
                    onChange={(event) => handleCoinChange(event, false)}
                >
                    {allCoins && allCoins.length > 0 ? (
                        allCoins
                            .filter((item) => item.id !== crypto2) // Fixed the typo here
                            .map((coin) => (
                                <MenuItem key={coin.id} value={coin.id}>
                                    {coin.name}
                                </MenuItem>
                            ))
                    ) : (
                        <MenuItem value="" disabled>
                            No coins available
                        </MenuItem>
                    )}
                </Select>
            )}
            <p>Crypto 2</p>
            {isLoading ? (
                <CircularProgress size={24} color="inherit" />
            ) : (
                <Select
                    sx={styles}
                    value={crypto2}
                    label="Crypto 2"
                    onChange={(event) => handleCoinChange(event, true)}
                >
                    {allCoins && allCoins.length > 0 ? (
                        allCoins
                            .filter((item) => item.id !== crypto1)
                            .map((coin) => (
                                <MenuItem key={coin.id} value={coin.id}>
                                    {coin.name}
                                </MenuItem>
                            ))
                    ) : (
                        <MenuItem value="" disabled>
                            No coins available
                        </MenuItem>
                    )}
                </Select>
            )}
        </div>
    );
};

export default SelectCoins;
