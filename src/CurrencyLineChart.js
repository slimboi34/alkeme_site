import React from 'react';
import { Line } from 'react-chartjs-2';

function CurrencyLineChart({ selectedCurrency, priceHistory }) {
  if (!selectedCurrency) {
    return <p>Select a cryptocurrency to see its price history.</p>;
  }

  const chartLabels = priceHistory.map((_, index) => `Point ${index + 1}`);
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: `${selectedCurrency} Price (USD)`,
        data: priceHistory,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      {priceHistory.length > 0 ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>Loading price history for {selectedCurrency}...</p>
      )}
    </div>
  );
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    tooltip: {
      callbacks: {
        label: (context) => `Price: $${context.raw.toFixed(2)}`,
      },
    },
  },
  scales: {
    x: { title: { display: true, text: 'Data Points' } },
    y: { title: { display: true, text: 'Price (USD)' } },
  },
};

export default CurrencyLineChart;