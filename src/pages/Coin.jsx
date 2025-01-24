import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header/Header'
import Loader from '../components/Common/Loader/Loader'
import axios from 'axios'
import { coinObject } from '../functions/ConvertObject'
import List from '../components/Dashboard/List/List'
import CoinInfo from '../components/Coin/CoinInfo/CoinInfo'
import { getCoinData } from '../functions/GetCoinData'
import { getCoinPrices } from '../functions/GetCoinPrices'
import LineChart from '../components/Coin/LineChart/LineChart'
import { convertDate } from '../functions/ConvertDate'
import SelectDays from '../components/Coin/SelectDays/SelectDays'
import { settingChartData } from '../functions/SettingChartData'
import PriceType from '../components/Coin/PriceType/PriceType'

const CoinPage = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [coinData, setCoinData] = useState()
    const [days, setDays] = useState(60)
    const [chartData, setChartData] = useState({}) 
    const [priceType, setPriceType] = useState('prices');

    useEffect(() => {
        if (id) {
            getData()
        }
    }, [id])

    async function getData() {
        const data = await getCoinData(id)

        if (data) {
            coinObject(setCoinData, data)
            const prices = await getCoinPrices(id, days, priceType)
            if (prices.length > 0) {
                settingChartData(setChartData, prices)
                setIsLoading(false)
            }
        }
    }

    const handleDaysChange = async (event) => {
        setIsLoading(true)
        setDays(event.target.value);
        const prices = await getCoinPrices(id, event.target.value, priceType)
        if (prices.length > 0) {
            settingChartData(setChartData, prices)
            setIsLoading(false)
        }
    };

    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true)
        setPriceType(newType);
        const prices = await getCoinPrices(id, days, newType)
        if (prices.length > 0) {
            settingChartData(setChartData, prices)
            setIsLoading(false)
        }
    };

    return (
        <div>
            <Header />
            {isLoading ? <Loader /> : < >
                <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
                    <List coin={coinData} />
                </div>
                <div className='grey-wrapper'>
                    <SelectDays days={days} handleDaysChange={handleDaysChange} />
                    <PriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
                    <LineChart chartData={chartData} priceType={priceType} />
                </div>
                <CoinInfo heading={coinData.name} desc={coinData.desc} />
            </>
            }
        </div>
    )
}

export default CoinPage
