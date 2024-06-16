import React, { useState, useEffect } from "react";
import { Baseurl } from "./baseUrl.js";
import Loader from "./Loader.jsx";
import axios from "axios";
import Header from "./Header";
import { Link } from "react-router-dom";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState("");
  const currencySymbol = currency === "inr" ? "₹" : "$";

  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const { data } = await axios.get(
          `${Baseurl}/coins/markets?vs_currency=${currency}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCoinsData();
  }, [currency]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="flex justify-center my-8">
            <input
              type="text"
              placeholder="Search Your Coins"
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 pt-6 rounded-md w-72 text-lg bg-gray-800 text-gray-300 placeholder-gray-500"
            />
          </div>
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setCurrency("inr")}
              className="h-8 bg-orange-500 border-none mx-2 w-20 rounded-md text-black font-bold hover:bg-orange-600"
            >
              INR
            </button>
            <button
              onClick={() => setCurrency("usd")}
              className="h-8 bg-orange-500 border-none mx-2 w-20 rounded-md text-black font-bold hover:bg-orange-600"
            >
              USD
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {coins
              .filter((data) => {
                if (data === "") {
                  return data;
                } else if (
                  data.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((coindata, i) => (
                <CoinCard
                  key={i}
                  coindata={coindata}
                  id={coindata.id}
                  currencySymbol={currencySymbol}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

const CoinCard = ({ coindata, currencySymbol, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;
  return (
    <Link
      to={`/coins/${id}`}
      className="no-underline text-white"
    >
      <div className="flex items-center justify-evenly my-8 text-xl font-bold bg-gray-800 p-4 rounded-md shadow-lg">
        <div className="w-20 h-20">
          <img
            src={coindata.image}
            alt={coindata.name}
            className="rounded-full w-full h-full"
          />
        </div>
        <div className="w-28">{coindata.name}</div>
        <div className="w-28">
          {currencySymbol} {coindata.current_price.toFixed(0)}
        </div>
        <div className={`w-28 ${profit ? 'text-green-500' : 'text-red-500'}`}>
          {profit ? "+" : ""}
          {coindata.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>
    </Link>
  );
};

export default Coins;
