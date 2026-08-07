function SentimentCard({ data }) {
  if (!data) return null;

  return (
    <div className="sentiment-card">
      <div className="card-header">
        <h2>{data.ticker}</h2>
        
      </div>
      <div className="price-row">
        <span className="price">${data.currentPrice}</span>
        <span className={data.percentChange >= 0 ? 'positive' : 'negative'}>
          {data.percentChange >= 0 ? '+' : ''}{data.percentChange}%
        </span>
      </div>
      <p className="ai-explanation">{data.explanation}</p>
      {/* <ConfidenceMeter score={data.confidence} /> */}
      <span className="timestamp">
        Updated {new Date(data.generatedAt).toLocaleTimeString()}
      </span>
    </div>
  );
}
export default SentimentCard;