import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header/Header';
import TabsComponent from '../components/Dashboard/Tabs/Tabs';
import axios from 'axios';
import Search from '../components/Dashboard/Search/Search';
import PaginationComponent from '../components/Dashboard/Pagination/Pagination';
import Loader from '../components/Common/Loader/Loader';
import BackToTop from '../components/Common/BackToTop/BackToTop';
import { get100Coins } from '../functions/Get100Coins';

const DashboardPage = () => {
    const [coins, setCoins] = useState([]);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handlePageChange = (event, value) => {
        setPage(value);
        var previousIndex = (value - 1) * 12
        setPaginatedCoins(coins.slice(previousIndex, previousIndex + 12))
    };

    const onSearchChange = (e) => {
        console.log(e.target.value);
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
        || item.symbol.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const myCoins = await get100Coins()
        if (myCoins) {
            setCoins(myCoins);
            setPaginatedCoins(myCoins.slice(0, 12))
            setIsLoading(false)
        }

    }



    return (
        <>
            <Header />
            <BackToTop />
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <Search search={search} onSearchChange={onSearchChange} />
                    <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
                    {!search && (
                        <PaginationComponent page={page} handlePageChange={handlePageChange} />
                    )}
                </div>
            )}
        </>
    );
};

export default DashboardPage;