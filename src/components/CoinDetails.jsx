import React, { useEffect, useState } from 'react'
import { Baseurl } from './baseUrl'
import Loader from './Loader'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi"
import { IoPulseOutline } from "react-icons/io5"
import CoinChart from './CoinChart'

const CoinDetails = () => {
  const [coin, setCoin] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const [currency, setCurrency] = useState('inr')
  const currencySymbol = currency === 'inr' ? '₹' : '$'
  const profit = coin.market_data?.price_change_percentage_24h > 0
  
  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/coins/${id}`)
        setCoin(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    getCoin()
  }, [id])

  return (
    <>
      {loading ? <Loader /> : 
        <div className='flex flex-col items-center bg-gray-900 p-8 text-gray-100'>
          <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg text-center'>
            <div className='flex justify-center mb-4'>
              <button onClick={() => setCurrency('inr')} className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 mx-2">INR</button>
              <button onClick={() => setCurrency('usd')} className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 mx-2">USD</button>
            </div>
            <div className="text-gray-400 text-sm mb-4">
              {coin.last_updated}
            </div>
            <div className="mb-4">
              <img height={"150px"} src={coin.image.large} alt={coin.name} className="rounded-full mx-auto" />
            </div>
            <div className="text-2xl font-bold mb-4">
              {coin.name}
            </div>
            <div className="text-xl mb-4">
              {currencySymbol} {coin.market_data.current_price[currency]}
            </div>
            <div className={`flex items-center justify-center text-xl mb-4 ${profit ? 'text-green-500' : 'text-red-500'}`}>
              {profit ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
              {coin.market_data.price_change_percentage_24h}%
            </div>
            <div className='flex items-center justify-center text-xl mb-4'>
              <IoPulseOutline className="text-orange-500" />
              #{coin.market_cap_rank}
            </div>
            <div className='mt-4 text-gray-300 text-justify'>
              <p>{coin.description['en'].split('.')[0]}</p>
            </div>
          </div>
          <CoinChart currency={currency} />
        </div>
      }
    </>
  )
}

export default CoinDetails
