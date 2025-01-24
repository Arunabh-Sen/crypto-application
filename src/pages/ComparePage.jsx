import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header/Header'
import SelectCoins from '../components/Compare/SelectCoins/SelectCoins'
import SelectDays from '../components/Coin/SelectDays/SelectDays'
import { coinObject } from '../functions/ConvertObject'
import { settingChartData } from '../functions/SettingChartData'
import { getCoinData } from '../functions/GetCoinData'
import { getCoinPrices } from '../functions/GetCoinPrices'
import Loader from '../components/Common/Loader/Loader'
import List from '../components/Dashboard/List/List'
import CoinInfo from '../components/Coin/CoinInfo/CoinInfo'
import LineChart from '../components/Coin/LineChart/LineChart'
import TogglePriceType from '../components/Coin/PriceType/PriceType'

const ComparePage = () => {
    const [crypto1, setCrypto1] = useState("bitcoin")
    const [crypto2, setCrypto2] = useState("ethereum")
    const [days, setDays] = useState(30)
    const [crypto1Data, setCrypto1Data] = useState({})
    const [crypto2Data, setCrypto2Data] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [priceType, setPriceType] = useState("prices")
    const [chartData, setChartData] = useState({})

    async function handleDaysChange(event) {
        setIsLoading(true)
        const selectedDays = event.target.value;
        setDays(selectedDays)
        const prices1 = await getCoinPrices(crypto1, selectedDays, priceType)
        const prices2 = await getCoinPrices(crypto2, selectedDays, priceType)
        settingChartData(setChartData, prices1, prices2)
        setIsLoading(false)
    }
    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true)
        setPriceType(newType);
        const prices1 = await getCoinPrices(crypto1, days, newType)
        const prices2 = await getCoinPrices(crypto2, days, newType)
        settingChartData(setChartData, prices1, prices2)
        setIsLoading(false)
    };

    useEffect(() => {
        getData()
    }, [crypto1, crypto2, days]) // added dependencies for automatic refresh

    async function getData() {
        setIsLoading(true)
        const data1 = await getCoinData(crypto1)
        const data2 = await getCoinData(crypto2)
        if (data1) {
            coinObject(setCrypto1Data, data1)
        }
        if (data2) {
            coinObject(setCrypto2Data, data2)
        }
        if (data1 && data2) {
            const prices1 = await getCoinPrices(crypto1, days, priceType)
            const prices2 = await getCoinPrices(crypto2, days, priceType)
            settingChartData(setChartData, prices1, prices2)
            if (prices1.length > 0 && prices2.length > 0) {
                setIsLoading(false)
            }
        }
    }

    const handleCoinChange = async (event, isCoin2) => {
        setIsLoading(true)
        const selectedCoin = event.target.value
        if (isCoin2) {
            setCrypto2(selectedCoin)
            const data = await getCoinData(selectedCoin)
            coinObject(setCrypto2Data, data)
        } else {
            setCrypto1(selectedCoin)
            const data = await getCoinData(selectedCoin)
            coinObject(setCrypto1Data, data)
        }
    }

    return (
        <div>
            <Header />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className='coins-days-flex'>
                        <SelectCoins crypto1={crypto1} crypto2={crypto2} handleCoinChange={handleCoinChange} />
                        <SelectDays days={days} handleDaysChange={handleDaysChange} noPTag={true} />
                    </div>
                    <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
                        <List coin={crypto1Data} />
                    </div>
                    <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
                        <List coin={crypto2Data} />
                    </div>
                    <div className='grey-wrapper'>
                        <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
                        <LineChart chartData={chartData} priceType={priceType} multiAxis={true} />
                    </div>
                    <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
                    <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
                </>
            )}
        </div>
    )
}

export default ComparePage;
