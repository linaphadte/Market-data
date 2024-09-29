
# Binance Market Data Project

## Overview

The Binance Market Data project is a real-time cryptocurrency market data visualization application built with React and Bootstrap as CSS library. It connects to the Binance WebSocket API to display live candlestick chart data for selected cryptocurrency pairs and time interval. 


## Features

- Live candlestick charts for cryptocurrency pairs (e.g., ETH/USDT, BNB/USDT, DOT/USDT).
- WebSocket connection to fetch real-time market data.
- Responsive design for a seamless user experience.
- Easy navigation between different cryptocurrency pairs.
- Data visualization using Chart.js.

## Dependencies

The project relies on the following packages:

- **Bootstrap**: `^5.3.3` - CSS framework for responsive design.
- **Chart.js**: `^4.4.4` - Charting library for visualizing data.
- **chartjs-adapter-date-fns**: `^3.0.0` - Adapter for time scales in Chart.js using date-fns.
- **chartjs-chart-financial**: `^0.2.1` - Financial chart types extension for Chart.js.
- **react-chartjs-2**: `^5.2.0` - React wrapper for Chart.js.
- **socket.io-client**: `^4.8.0` - Enables real-time communication via WebSockets.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/binance-market-data.git
   cd binance-market-data

2. Install the dependencies:
   ```bash
   npm install

3. Start the application:
   ```bash
   npm start

4. Open your browser and navigate to http://localhost:3000 to view the application.

