import React from "react";

function BitcoinNetworkStats({ networkStats }) {
  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#1e1e1e",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        color: "#f0f0f0",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "12px", color: "#f39c12" }}>Network Statistics</h3>
      <ul style={{ listStyleType: "none", padding: 0, fontSize: "0.9rem", lineHeight: "1.5" }}>
        <li>
          <strong>Mempool Size:</strong> {networkStats.mempoolSize || "Loading..."}
        </li>
        <li>
          <strong>Transaction Rate:</strong> {networkStats.txRate || "Loading..."}
        </li>
      </ul>
    </div>
  );
}

export default BitcoinNetworkStats;
