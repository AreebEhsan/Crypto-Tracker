import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label
} from "recharts";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinChart = ({ symbol, market }) => {
  const [histData, setHistData] = useState(null);

  useEffect(() => {
    const getCoinHist = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&e=${market}&limit=30&api_key=${API_KEY}`
        );
        const json = await response.json();
        setHistData(json.Data.Data);
      } catch (error) {
        console.error("Failed to fetch historical data:", error);
      }
    };

    getCoinHist();
  }, [symbol, market]);

  // Function to clean and format the historical data
  const cleanData = (data) => {
    return data.map((item, index) => {
      const date = new Date(item.time * 1000); // Convert seconds to milliseconds
      return {
        time: date.toLocaleDateString("en-US"),
        "open price": item.open,
      };
    }).reverse(); // Reverse to display oldest to newest
  };

  return (
    <div>
      {histData ? (
        <div>
          <h2>30-Day Price Data for {symbol}</h2>
          <LineChart
            width={1300}
            height={400}
            data={cleanData(histData)}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <Line
              type="monotone"
              dataKey="open price"
              stroke="#8884d8"
              activeDot={{ r: 5 }}
            />
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="time" interval={2} angle={20} dx={20}>
              <Label value="Date" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis
              label={{
                value: "Price (USD)",
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
              }}
            />
            <Tooltip />
          </LineChart>
        </div>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default CoinChart;
