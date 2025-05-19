// CryptoOverview.js
import React, { useState, useEffect } from 'react';
import 'chart.js/auto';

const CryptoOverview = () => {
  const [data, setData] = useState({});
  const [lastUpdate, setLastUpdate] = useState(null);
  const [filter, setFilter] = useState('top');
  const [previousData, setPreviousData] = useState({});

  useEffect(() => {
    const socket = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setPreviousData(data);
      setData((prevData) => ({
        ...prevData,
        ...newData,
      }));
      setLastUpdate(new Date().toLocaleTimeString());
    };

    socket.onclose = () => console.log('WebSocket connection closed');
    socket.onerror = (error) => console.error('WebSocket error:', error);

    return () => socket.close();
  }, [data]);

  const filteredData = Object.entries(data)
    .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]))
    .slice(0, filter === 'top' ? 10 : Object.entries(data).length);


  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div style={{
    padding: '30px',
    backgroundColor: '#1e1e1e',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    color: '#f0f0f0',
    height: '100%', // Ensure it takes full height within the flex container
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#f39c12' }}>Crypto Overview</h2>
      
      <p style={{ textAlign: 'center', color: '#bbb' }}>
        Last Update: <span style={{ fontWeight: 'bold', color: '#fff' }}>{lastUpdate}</span>
      </p>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label htmlFor="filter" style={{ marginRight: '10px', color: '#f0f0f0' }}>Show:</label>
        <select id="filter" value={filter} onChange={handleFilterChange} style={{ padding: '8px', backgroundColor: '#1f1f1f', color: '#f0f0f0', border: '1px solid #444', borderRadius: '5px' }}>
          <option value="top">Top 10 Cryptocurrencies</option>
          <option value="all">All Cryptocurrencies</option>
        </select>
      </div>

      <div style={{ width: '100%', margin: '50px 0' }}>
      </div>

      <div style={{ overflowX: 'auto', marginTop: '20px' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          borderRadius: '8px',
          overflow: 'hidden',
          color: '#f0f0f0',
          fontSize: '0.9rem',
        }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
              <th style={{ padding: '15px', width: '50%' }}>Name</th>
              <th style={{ padding: '15px', width: '50%' }}>Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(([name, price], index) => {
              const previousPrice = parseFloat(previousData[name] || 0);
              const currentPrice = parseFloat(price);
              const rowColor = currentPrice > previousPrice ? '#1a3f1b' : currentPrice < previousPrice ? '#3f1a1a' : '#1e1e1e';
              
              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor: rowColor,
                    textAlign: 'center',
                    transition: 'background-color 0.3s',
                    cursor: 'pointer',
                  }}
                >
                  <td style={{ padding: '15px' }}>{name}</td>
                  <td style={{ padding: '15px' }}>{currentPrice.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoOverview;