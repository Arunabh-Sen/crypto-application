import React from 'react'
import "./styles.css"
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Grid = ({ coin }) => {
    return (
        <Link to={`/coin/${coin.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.95 }}
                className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`}>
                <div className='info-flex'>
                    <img src={coin.image} className='coin-logo' />
                    <div className='name-col'>
                        <p className='coin-symbol'>{coin.symbol}</p>
                        <p className='coin-name'>{coin.name}</p>
                    </div>
                </div>
                {coin.price_change_percentage_24h > 0 ? (
                    <div className='chip-flex'>
                        <div className='price-chip'>
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                        <div className='icon-chip'>
                            <TrendingUpRoundedIcon />
                        </div>
                    </div>
                ) : (
                    <div className='chip-flex'>
                        <div className='price-chip chip-red'>
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                        <div className='icon-chip chip-red'>
                            <TrendingDownRoundedIcon />
                        </div>
                    </div>
                )}
                <div className='info-container'>
                    <h3 className='coin-price' style={{ color: coin.price_change_percentage_24h < 0 ? "var(--red)" : "#5b8a56" }}>₹ {coin.current_price.toLocaleString('en-IN')}</h3>
                    <p className='total-volume'>Total Volume: {coin.total_volume.toLocaleString('en-IN')}</p>
                    <p className='total-volume'>Market Cap: ₹ {coin.market_cap.toLocaleString('en-IN')}</p>
                </div>
            </motion.div>
        </Link>
    )
}

export default Grid