import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import SentimentCard from "./SentimentCard";
import StockExplainer from "./StockExplainer";
const Summary = () => {
   const [sentimentData, setSentimentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  const handleSearch = async (ticker) => {
     setLoading(true);

    try {
      const res = await axios.get(
        `https://project2-frjx.onrender.com/allNews/${ticker}`
      );

      console.log(res.data);
      setSentimentData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  axios
    .get("https://project2-frjx.onrender.com/user", {
      withCredentials: true,
    })
    .then((res) => {
      setUser(res.data.username);
      console.log(res.data.username);
    });
}, []);
  return (
    <>
      <div className="username">
        <h6>Hi, {user}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>31.43k</span>{" "}
            </p>
            <p>
              Investment <span>29.88k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
      {/* <div>
        <SearchBar onSearch={handleSearch} />
      {loading ? <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div> : <SentimentCard data={sentimentData} />}
      {sentimentData?.headlines && <HeadlinesList headlines={sentimentData.headlines} />} 
       </div> */}
       <div>
          <StockExplainer/>
       </div>
    </>
  );
};

export default Summary;
