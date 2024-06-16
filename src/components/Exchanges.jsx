import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { Baseurl } from './baseUrl';
import Loader from './Loader';

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    const getExchangesData = async () => {
      const { data } = await axios.get(`${Baseurl}/exchanges`);
      console.log(data);
      setExchanges(data);
      setLoading(false);
    };
    getExchangesData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className='mt-20 px-4'>
            {exchanges.map((item, i) => (
              <div
                key={i}
                className='flex items-center justify-evenly mt-20 text-xl font-bold bg-gray-800 p-4 rounded-lg shadow-lg text-white'
              >
                <div className='flex-shrink-0'>
                  <img
                    className='h-20 w-20 rounded-full'
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className='w-28 text-center'>{item.name}</div>
                <div className='w-28 text-center'>{item.trade_volume_24h_btc.toFixed(0)}</div>
                <div className='w-28 text-center'>{item.trust_score_rank}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Exchanges;
