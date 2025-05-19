import React, { useState, useEffect, useRef } from "react";
import Transactions from "./Transactions";
import BitcoinBlockDetails from "./BitcoinBlockDetails";
import BitcoinPriceChart from "./BitcoinPriceChart";
import BitcoinNetworkStats from "./BitcoinNetworkStats";
import "./Dashboard.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]); // Last 10 transactions
  const [blockDetails, setBlockDetails] = useState(null); // Latest block details
  const [blockHistory, setBlockHistory] = useState([]); // Block history
  const [networkStats, setNetworkStats] = useState({ mempoolSize: 0, txRate: 0 });
  const [priceHistory, setPriceHistory] = useState([]); // Historical and live price data
  const ws = useRef(null);

  // Helper function to add a new transaction and limit history
  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev.slice(0, 9)]);
  };

  // Helper function to add a new block to the history
  const addBlock = (block) => {
    setBlockDetails(block); // Set as the latest block
    setBlockHistory((prev) => [block, ...prev.slice(0, 4)]); // Keep last 5 blocks in history
  };

  useEffect(() => {
    // WebSocket initialization
    ws.current = new WebSocket("wss://ws.blockchain.info/inv");

    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ op: "unconfirmed_sub" })); // Subscribe to unconfirmed transactions
      ws.current.send(JSON.stringify({ op: "blocks_sub" })); // Subscribe to new blocks
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.op === "utx") {
        // Handle transaction data
        const transaction = message.x;
        addTransaction(transaction);
      } else if (message.op === "block") {
        // Handle block data
        const blockData = {
          hash: message.x.hash,
          height: message.x.height,
          time: new Date(message.x.time * 1000).toLocaleString(),
          txCount: message.x.txIndexes.length,
          totalBTCSent: message.x.totalBTCSent,
          estimatedBTCSent: message.x.estimatedBTCSent,
          reward: message.x.reward,
          size: message.x.size,
          version: message.x.version,
          mrklRoot: message.x.mrklRoot,
          nonce: message.x.nonce,
        };

        addBlock(blockData);

        // Update network stats
        setNetworkStats((prev) => ({
          ...prev,
          mempoolSize: prev.mempoolSize + message.x.txIndexes.length,
        }));
      }
    };

    // Cleanup WebSocket on component unmount
    return () => {
      ws.current.close();
    };
  }, []);

  // Fetch historical price data
  const fetchHistoricalPrices = async () => {
    try {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/historical/close.json?currency=USD"
      );
      const data = await response.json();
      const historicalPrices = Object.entries(data.bpi).map(([date, value]) => ({
        time: new Date(date).toISOString(),
        value,
      }));
      setPriceHistory(historicalPrices);
    } catch (error) {
      console.error("Failed to fetch historical prices:", error);
    }
  };

  // Merge live price updates with historical prices
  const fetchLivePrice = async () => {
    try {
      const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice/BTC.json");
      const data = await response.json();
      const livePrice = {
        time: new Date().toISOString(),
        value: data.bpi.USD.rate_float,
      };
      setPriceHistory((prev) => [...prev, livePrice].slice(-10));
    } catch (error) {
      console.error("Failed to fetch live price:", error);
    }
  };

  useEffect(() => {
    fetchHistoricalPrices();

    const interval = setInterval(fetchLivePrice, 60000); // Fetch live price every minute
    fetchLivePrice(); // Initial fetch

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <BitcoinPriceChart priceHistory={priceHistory} setPriceHistory={setPriceHistory} />
        <BitcoinBlockDetails blockDetails={blockDetails} blockHistory={blockHistory} />
        <Transactions transactions={transactions} />
        <BitcoinNetworkStats networkStats={networkStats} />
      </div>
    </div>
  );
};

export default Dashboard;