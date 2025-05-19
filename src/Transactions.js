import React, { useState } from "react";

const Transactions = ({ transactions }) => {
  const [expandedTransaction, setExpandedTransaction] = useState(null);

  const toggleTransactionDetails = (hash) => {
    setExpandedTransaction(expandedTransaction === hash ? null : hash);
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#1e1e1e",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        color: "#f0f0f0",
        height: "100%",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "12px", color: "#f39c12" }}>Recent Bitcoin Transactions</h2>
      <div style={{ overflowX: "auto", marginTop: "12px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "8px",
            overflow: "hidden",
            color: "#f0f0f0",
            fontSize: "0.9rem",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#333", color: "#fff", textAlign: "center" }}>
              <th style={{ padding: "15px", width: "50%" }}>Transaction Hash</th>
              <th style={{ padding: "15px", width: "25%" }}>Size (bytes)</th>
              <th style={{ padding: "15px", width: "25%" }}>Total Value (BTC)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <React.Fragment key={tx.hash}>
                <tr
                  onClick={() => toggleTransactionDetails(tx.hash)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: expandedTransaction === tx.hash ? "#3a3a3a" : "#1e1e1e",
                    textAlign: "center",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <td style={{ padding: "15px" }}>{tx.hash.slice(0, 15)}...</td>
                  <td style={{ padding: "15px" }}>{tx.size}</td>
                  <td style={{ padding: "15px" }}>
                    {(tx.out.reduce((acc, output) => acc + output.value, 0) / 100000000).toFixed(4)} BTC
                  </td>
                </tr>
                {expandedTransaction === tx.hash && (
                  <tr>
                    <td
                      colSpan="3"
                      style={{
                        padding: "15px 20px",
                        backgroundColor: "#333",
                        color: "#f0f0f0",
                        fontSize: "0.9rem",
                      }}
                    >
                      <div>
                        <strong>Full Hash:</strong> {tx.hash}
                      </div>
                      <div>
                        <strong>Size:</strong> {tx.size} bytes
                      </div>
                      <div>
                        <strong>Inputs:</strong> {tx.inputs.length}
                      </div>
                      <div>
                        <strong>Outputs:</strong> {tx.out.length}
                      </div>
                      <div>
                        <strong>Total Value:</strong>{" "}
                        {(tx.out.reduce((acc, output) => acc + output.value, 0) / 100000000).toFixed(4)} BTC
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;