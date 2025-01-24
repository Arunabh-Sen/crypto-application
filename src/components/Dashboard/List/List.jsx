import React from 'react'
import './styles.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { convertNumberToINR } from '../../../functions/ConvertNumber';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const List = ({ coin }) => {
    return (
        <motion.tr
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className='list-row mobile mobile-view'>
            <Tooltip title="Coin Logo">
                <td className='td-image mobile-view'>
                    <Link to={`/coin/${coin.id}`}>
                        <img src={coin.image} className='coin-logo' alt={coin.name} />
                    </Link>
                </td>
            </Tooltip>
            <Tooltip title="Coin Info" placement='bottom-start'>
                <td>
                    <Link to={`/coin/${coin.id}`} className='name-col mobile-view'>
                        <p className='coin-symbol mobile-view'>{coin.symbol}</p>
                        <p className='coin-name mobile-view'>{coin.name}</p>
                    </Link>
                </td>
            </Tooltip>
            <Tooltip title="Price Change In 24Hrs" placement='bottom-start'>
                {coin.price_change_percentage_24h !== undefined ? (
                    coin.price_change_percentage_24h > 0 ? (
                        <td className='chip-flex mobile-view'>
                            <div className='price-chip mobile-view'>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </div>
                            <div className='icon-chip td-icon mobile-view'>
                                <TrendingUpRoundedIcon />
                            </div>
                        </td>
                    ) : (
                        <td className='chip-flex mobile-view'>
                            <div className='price-chip chip-red mobile-view'>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </div>
                            <div className='icon-chip chip-red td-icon mobile-view'>
                                <TrendingDownRoundedIcon />
                            </div>
                        </td>
                    )
                ) : (
                    <td className='chip-flex mobile-view'>
                        <div className='price-chip chip-gray mobile-view'>N/A</div>
                    </td>
                )}
            </Tooltip>
            <Tooltip title="Current Price">
                <td>
                    <h3 className='coin-price td-center-align mobile-view' style={{ color: coin.price_change_percentage_24h < 0 ? "var(--red)" : "#5b8a56" }}>
                        ₹ {coin.current_price?.toLocaleString('en-IN') || 'N/A'}
                    </h3>
                </td>
            </Tooltip>
            <Tooltip title="Total Volume" placement='bottom-end'>
                <td>
                    <p className='total-volume td-right-align td-total-volume mobile-view'>{coin.total_volume?.toLocaleString('en-IN') || 'N/A'}</p>
                </td>
            </Tooltip>
            <Tooltip title="Market Cap" placement='bottom-end'>
                <td className='desktop-td-mkt mobile-view'>
                    <p className='total-volume td-right-align td-market-cap mobile-view'>₹ {coin.market_cap?.toLocaleString('en-IN') || 'N/A'}</p>
                </td>
            </Tooltip>
            <Tooltip title="Market Cap" placement='bottom-end'>
                <td className='mobile-td-mkt mobile-view'>
                    <p className='total-volume td-right-align td-market-cap mobile-view'>₹ {convertNumberToINR(coin.market_cap)}</p>
                </td>
            </Tooltip>
        </motion.tr>
    )
}

export default List;
