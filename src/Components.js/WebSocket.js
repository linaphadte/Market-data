import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
    const [candles, setCandles] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@kline_1m');

        ws.onopen = () => {
            console.log('Connected to Binance WebSocket for ethusdt at 1m interval.');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const candlestickData = message.k;

            if (candlestickData) {
                const newCandle = {
                    open: parseFloat(candlestickData.o),
                    close: parseFloat(candlestickData.c),
                    high: parseFloat(candlestickData.h),
                    low: parseFloat(candlestickData.l),
                    volume: parseFloat(candlestickData.v),
                    timestamp: new Date(candlestickData.t),
                };

                console.log(`New Candle - Open: ${newCandle.open}, Close: ${newCandle.close}, High: ${newCandle.high}, Low: ${newCandle.low}, Volume: ${newCandle.volume}`);

                
                setCandles((prevCandles) => [...prevCandles, newCandle]);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <h2>Candlestick Data</h2>
            <ul>
                {candles.map((candle, index) => (
                    <li key={index}>
                        Open: {candle.open}, Close: {candle.close}, High: {candle.high}, Low: {candle.low}, Volume: {candle.volume}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketComponent;
