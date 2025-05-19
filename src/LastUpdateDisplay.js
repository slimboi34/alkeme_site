import React from 'react';

function LastUpdateDisplay({ lastUpdate }) {
  return (
    <div style={styles.container}>
      <span style={styles.text}>Last Updated: {lastUpdate || 'Loading...'}</span>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', marginBottom: '15px' },
  text: { fontSize: '14px', color: '#666' },
};

export default LastUpdateDisplay;