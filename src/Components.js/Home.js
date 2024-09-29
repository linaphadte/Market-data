import React, { useState, useEffect } from 'react';
import CandlestickChart from './CandlestickChart';

const SYMBOLS = {
    1: 'ethusdt',
    2: 'bnbusdt',
    3: 'dotusdt'
};

function Home() {
    const [symbol, setSymbol] = useState('ethusdt');
    const [timeInterval, setTimeInterval] = useState('1m');
    const [chartData, setChartData] = useState([]);

    const handleSymbolChange = (e) => {
        const selectedSymbol = SYMBOLS[e.target.value] || 'ethusdt';
        setSymbol(selectedSymbol);
        restoreChartData(selectedSymbol, timeInterval);
    };

    const restoreChartData = (symbol, timeInterval) => {
        const storedData = localStorage.getItem(`${symbol}-${timeInterval}`);
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setChartData(Array.isArray(parsedData) ? parsedData : []);
            } catch (error) {
                console.error('Error parsing stored data:', error);
                setChartData([]);
            }
        } else {
            setChartData([]);
        }
    };

    const updateChartData = (newData) => {
        setChartData((prevData) => {
            const updatedData = [...prevData, newData];
            localStorage.setItem(`${symbol}-${timeInterval}`, JSON.stringify(updatedData));
            return updatedData;
        });
    };

    return (
        <div className='row m-5'>
            <div className='col-8'>
                <h1>Binance Market Data</h1>
            </div>
            <div className='col-4'>
                <select className="form-select" onChange={handleSymbolChange} aria-label="Default select example">
                    <option disabled>Cryptocurrency</option>
                    <option value="1">ETH/USDT</option>
                    <option value="2">BNB/USDT</option>
                    <option value="3">DOT/USDT</option>
                </select>
            </div>

            <CandlestickChart symbol={symbol} timeInterval={timeInterval} chartData={chartData} updateChartData={updateChartData} />

            <div className='text-center'>
                <h4>Time Interval</h4>
                <div className="btn-group gap-3" role="group" aria-label="Basic radio toggle button group">
                    <button onClick={() => setTimeInterval('1m')} className={`btn btn-outline-primary ${timeInterval === '1m' ? 'active' : ''}`}>1 min</button>
                    <button onClick={() => setTimeInterval('3m')} className={`btn btn-outline-primary ${timeInterval === '3m' ? 'active' : ''}`}>3 min</button>
                    <button onClick={() => setTimeInterval('5m')} className={`btn btn-outline-primary ${timeInterval === '5m' ? 'active' : ''}`}>5 min</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
