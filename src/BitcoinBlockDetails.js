import React from "react";

function BitcoinBlockDetails({ blockDetails, blockHistory }) {
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
      <h3 style={{ color: "#f39c12", textAlign: "center" }}>Bitcoin Block Details</h3>

      {blockDetails ? (
        <div>
          <h4>Latest Block</h4>
          <div style={{ fontSize: "0.9rem" }}>
            <p><strong>Hash:</strong> {blockDetails.hash}</p>
            <p><strong>Height:</strong> {blockDetails.height}</p>
            <p><strong>Time:</strong> {blockDetails.time}</p>
            <p><strong>Transaction Count:</strong> {blockDetails.txCount}</p>
            <p><strong>Total BTC Sent:</strong> {blockDetails.totalBTCSent} Satoshi</p>
            <p><strong>Estimated BTC Sent:</strong> {blockDetails.estimatedBTCSent} Satoshi</p>
            <p><strong>Reward:</strong> {blockDetails.reward} Satoshi</p>
            <p><strong>Size:</strong> {blockDetails.size} Bytes</p>
            <p><strong>Version:</strong> {blockDetails.version}</p>
            <p><strong>Merkle Root:</strong> {blockDetails.mrklRoot}</p>
            <p><strong>Nonce:</strong> {blockDetails.nonce}</p>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No block data available yet.</p>
      )}

      {blockHistory.length > 0 && (
        <div>
          <h4>Block History</h4>
          {blockHistory.map((block, index) => (
            <div
              key={block.hash}
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#333",
                borderRadius: "8px",
              }}
            >
              <p><strong>Hash:</strong> {block.hash}</p>
              <p><strong>Height:</strong> {block.height}</p>
              <p><strong>Time:</strong> {block.time}</p>
              <p><strong>Transaction Count:</strong> {block.txCount}</p>
              <p><strong>Total BTC Sent:</strong> {block.totalBTCSent} Satoshi</p>
              <p><strong>Estimated BTC Sent:</strong> {block.estimatedBTCSent} Satoshi</p>
              <p><strong>Reward:</strong> {block.reward} Satoshi</p>
              <p><strong>Size:</strong> {block.size} Bytes</p>
              <p><strong>Version:</strong> {block.version}</p>
              <p><strong>Merkle Root:</strong> {block.mrklRoot}</p>
              <p><strong>Nonce:</strong> {block.nonce}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BitcoinBlockDetails;