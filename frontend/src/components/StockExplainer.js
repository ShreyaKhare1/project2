import { useState } from 'react';

function StockExplainer() {
  const [ticker, setTicker] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker.trim()) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch(`http://localhost:3002/explain/${ticker.trim().toUpperCase()}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Something went wrong');
      }

      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>AI Stock Explainer</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter ticker e.g. AAPL"
          style={{ padding: 10, fontSize: 16, width: 200, marginRight: 8 }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: 16 }}>
          {loading ? 'Loading...' : 'Analyze'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Fetching data and generating AI explanation...</p>}

      {data && (
        <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
          <h3>{data.ticker}</h3>
          <p>
            Price: ${data.currentPrice} (
            <span style={{ color: data.percentChange >= 0 ? 'green' : 'red' }}>
              {data.percentChange}%
            </span>
            )
          </p>
          <p>Day range: ${data.dayLow} – ${data.dayHigh}</p>

          <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 6, marginTop: 12 }}>
            <strong>AI Explanation:</strong>
            <p>{data.explanation}</p>
          </div>

          <details style={{ marginTop: 12 }}>
            <summary>Source headlines</summary>
            <ul>
              {data.headlines.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </details>

          <p style={{ fontSize: 12, color: '#888', marginTop: 10 }}>
            Updated {new Date(data.generatedAt).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default StockExplainer;