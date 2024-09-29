import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';


Chart.register(...registerables, CandlestickController, CandlestickElement);

const CandlestickChart = ({ symbol, timeInterval, chartData, updateChartData }) => {
    const canvasRef = useRef(null);
    const [chart, setChart] = useState(null);
    const [socket, setSocket] = useState(null);

    const connectSocket = () => {
        const socketUrl = `wss://stream.binance.com:9443/ws/${symbol}@kline_${timeInterval}`;
        const newSocket = new WebSocket(socketUrl);

        newSocket.onopen = () => {
            console.log(`Connected to Binance WebSocket for ${symbol} at ${timeInterval} interval.`);
        };

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const kline = data.k;
            if (kline) {
                const newCandle = {
                    time: kline.t, 
                    open: parseFloat(kline.o), 
                    high: parseFloat(kline.h), 
                    low: parseFloat(kline.l), 
                    close: parseFloat(kline.c), 
                };

                updateChartData(newCandle); 
            }
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return newSocket;
    };

    useEffect(() => {
        
        if (socket) {
            socket.close();
        }

        const newSocket = connectSocket();
        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.close(); 
            }
        };
    }, [symbol, timeInterval]); 

    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');

        if (chart) {
            chart.destroy(); 
        }

        const newChart = new Chart(ctx, {
            type: 'candlestick', 
            data: {
                datasets: [{
                    label: symbol,
                    data: chartData.map(candle => ({
                        x: new Date(candle.time), 
                        o: candle.open,
                        h: candle.high,
                        l: candle.low,
                        c: candle.close,
                    })),
                    color: {
                        up: 'rgba(0, 255, 0, 0.7)', 
                        down: 'rgba(255, 0, 0, 0.7)', 
                        border: 'rgba(0, 0, 0, 0.7)', 
                    },
                }],
            },
            options: {
                responsive: true, 
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute', 
                        },
                        title: {
                            display: true,
                            text: 'Time', 
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price', 
                        },
                    },
                },
            },
        });

        setChart(newChart);

        return () => {
            if (newChart) {
                newChart.destroy(); // Clean up the chart instance
            }
        };
    }, [symbol, timeInterval, chartData]); // Re-render chart when data changes

    return <canvas ref={canvasRef} id="candlestickChart" width="800" height="400"></canvas>;
};

export default CandlestickChart;
