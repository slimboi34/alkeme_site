import React from 'react';

function CurrencyDropdown({ data, selectedCurrency, setSelectedCurrency, resetPriceHistory }) {
  const handleChange = (event) => {
    setSelectedCurrency(event.target.value);
    resetPriceHistory();
  };

  return (
    <div style={styles.dropdownContainer}>
      <label htmlFor="currencySelect" style={styles.label}>Select Cryptocurrency:</label>
      <select
        id="currencySelect"
        onChange={handleChange}
        value={selectedCurrency}
        style={styles.select}
      >
        <option value="" disabled>Select a currency</option>
        {Object.keys(data).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

const styles = {
  dropdownContainer: { marginBottom: '20px', textAlign: 'center' },
  label: { fontSize: '16px', fontWeight: 'bold' },
  select: { width: '100%', maxWidth: '400px', padding: '10px', marginTop: '10px' },
};

export default CurrencyDropdown;