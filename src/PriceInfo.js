import React, { useEffect, useState } from 'react';
import CurrencyLineChart from './CurrencyLineChart';
import Top20BarChart from './Top20BarChart';
import CurrencyDropdown from './CurrencyDropdown';
import LastUpdateDisplay from './LastUpdateDisplay';
import CryptoOverview from './CryptoOverview';

function PriceInfo() {
  const [data, setData] = useState({});
  const [lastUpdate, setLastUpdate] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [priceHistory, setPriceHistory] = useState([]);
  const [top20Currencies, setTop20Currencies] = useState([]);
  const [loading, setLoading] = useState(true);

  // WebSocket connection
  useEffect(() => {
    const socket = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData((prevData) => ({ ...prevData, ...newData }));
      setLastUpdate(new Date().toLocaleTimeString());
      setLoading(false);

      if (selectedCurrency && newData[selectedCurrency]) {
        setPriceHistory((prevHistory) => [...prevHistory, parseFloat(newData[selectedCurrency])]);
      }
    };

    socket.onclose = () => console.log('WebSocket connection closed');
    socket.onerror = (error) => console.error('WebSocket error:', error);

    return () => socket.close();
  }, [selectedCurrency]);

  // Update top 20 currencies
  useEffect(() => {
    const sortedData = Object.entries(data)
      .sort(([, a], [, b]) => parseFloat(b) - parseFloat(a))
      .slice(0, 20)
      .map(([key, value]) => [key, parseFloat(value)]);
    setTop20Currencies(Object.fromEntries(sortedData));
  }, [data]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Cryptocurrency Price Tracker</h2>
      <LastUpdateDisplay lastUpdate={lastUpdate} />
      <CurrencyDropdown
        data={data}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        resetPriceHistory={() => setPriceHistory([])}
      />
      <CurrencyLineChart
        selectedCurrency={selectedCurrency}
        priceHistory={priceHistory}
      />
      <Top20BarChart top20Currencies={top20Currencies} />
      <CryptoOverview/>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: 'auto', padding: '20px' },
  header: { textAlign: 'center', marginBottom: '20px', fontSize: '24px' },
};

export default PriceInfo;