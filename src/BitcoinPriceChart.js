import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";

function BitcoinPriceChart({ priceHistory, setPriceHistory }) {
  useEffect(() => {
    const fetchLivePrice = async () => {
      try {
        const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice/BTC.json");
        const data = await response.json();
        const timestamp = new Date().toISOString(); // Current time as ISO string
        setPriceHistory((prev) => [
          ...prev,
          { time: timestamp, value: data.bpi.USD.rate_float },
        ].slice(-10)); // Keep last 10 data points
      } catch (error) {
        console.error("Failed to fetch live price:", error);
      }
    };

    const interval = setInterval(fetchLivePrice, 60000); // Fetch live price every minute
    fetchLivePrice(); // Initial fetch

    return () => clearInterval(interval);
  }, [setPriceHistory]);

  const chartData = {
    labels: priceHistory.map((entry) => {
      const date = new Date(entry.time);
      return date.toLocaleString(); // Format timestamps for the x-axis
    }),
    datasets: [
      {
        label: "BTC Price (USD)",
        data: priceHistory.map((entry) => entry.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => `Price: $${context.raw.toFixed(2)}`,
          title: (context) => new Date(context[0].label).toLocaleString(),
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#1e1e1e",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ color: "#f39c12", textAlign: "center" }}>BTC Price Chart</h3>
      {priceHistory.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p style={{ color: "#f0f0f0", textAlign: "center" }}>Loading price chart...</p>
      )}
    </div>
  );
}

export default BitcoinPriceChart;