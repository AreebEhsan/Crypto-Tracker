// Components/CoinDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinChart from "./CoinChart";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
  const { symbol } = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      try {
        const details = await fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        const description = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`
        );

        const detailsJson = await details.json();
        const descripJson = await description.json();

        setFullDetails({
          numbers: detailsJson.DISPLAY[symbol]?.USD,
          textData: descripJson.Data[symbol],
        });
      } catch (error) {
        console.error("Failed to fetch coin details:", error);
      }
    };

    getCoinDetail();
  }, [symbol]);

  if (!fullDetails) return <p>Loading...</p>;

  return (
    <div>
      <h1>{fullDetails.textData.FullName}</h1>
      <img
        className="images"
        src={`https://www.cryptocompare.com${fullDetails.numbers.IMAGEURL}`}
        alt={`Icon for ${symbol} coin`}
      />
      <div>{fullDetails.textData.Description}</div>
      <br />
      <div>Algorithm: {fullDetails.textData.Algorithm}</div>
      <table>
        <tbody>
          <tr>
            <th>Launch Date</th>
            <td>{fullDetails.textData.AssetLaunchDate || "N/A"}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>
              <a
                href={fullDetails.textData.AssetWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {fullDetails.textData.AssetWebsiteUrl || "N/A"}
              </a>
            </td>
          </tr>
          <tr>
            <th>Market Cap</th>
            <td>{fullDetails.numbers.MKTCAP || "N/A"}</td>
          </tr>
          <tr>
            <th>Volume</th>
            <td>{fullDetails.numbers.VOLUME24HOURTO || "N/A"}</td>
          </tr>
          <tr>
            <th>Today's Open Price</th>
            <td>{fullDetails.numbers.OPENDAY || "N/A"}</td>
          </tr>
          <tr>
            <th>Highest Price Today</th>
            <td>{fullDetails.numbers.HIGHDAY || "N/A"}</td>
          </tr>
          <tr>
            <th>Lowest Price Today</th>
            <td>{fullDetails.numbers.LOWDAY || "N/A"}</td>
          </tr>
          <tr>
            <th>Change from Previous Day</th>
            <td>{fullDetails.numbers.CHANGEDAY || "N/A"}</td>
          </tr>
        </tbody>
      </table>

      {/* Add CoinChart component here, passing symbol and market */}
      <CoinChart
        symbol={symbol}
        market={fullDetails.numbers.MARKET || "CCCAGG"} // Default to "CCCAGG" if market is unavailable
      />
    </div>
  );
};

export default CoinDetail;
