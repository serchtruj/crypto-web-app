import React, { useEffect, useState } from 'react';
import createWebSocket from './socket';
import axios from 'axios'

const App = () => {
  const [tickerData, setTickerData] = useState([
    {
      price: "Not available",
      symbol: "ETHUSDT"
    },
    {
      price: "Not available",
      symbol: "BTCUSDT"
    },
    {
      price: "Not available",
      symbol: "ADAUSDT"
    }
  ]);
  const [websocketError, setWebsocketError] = useState(false);

  useEffect(() => {
    const socket = createWebSocket(
      (data) => {
        const receivedData = JSON.parse(data);
        setTickerData((prevData) => {
          const newData = [...prevData];
          const existingIndex = newData.findIndex(
            (crypto) => crypto.symbol === receivedData.symbol
          );
          if (existingIndex !== -1) {
            newData[existingIndex] = receivedData;
          } else {
            newData.push(receivedData);
          }
          return newData;
        });
      },
      (err) => {
        setWebsocketError(err);
      }
    );

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/cryptocurrencies/btc,eth,ada', {
      'Content-Type': 'application/json'
    })
      .then(res => {
        const receivedData = res.data.data;
        setTickerData(prevData => {
          const newData = [...prevData]
          return receivedData.map((item) => {
            const existCryptoData = newData.filter(cryp => cryp.symbol.includes(item.symbol))
            return {
              ...item,
              ...existCryptoData
            }
          })
        })
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [])

  return (
    <div>
      {websocketError ? (
        <p>Error: WebSocket connection failed. Please check your network settings and try again.</p>
      ) : (
        <ul>
          {tickerData.map(item => {
            return (<li key={item.symbol}>
              <h1>{item.symbol}</h1>
              <p>Symbol: {item.symbol}</p>
              <p>Price: {item.price}</p>
            </li>)
          })}
        </ul>
      )}
    </div>
  );
};


export default App;