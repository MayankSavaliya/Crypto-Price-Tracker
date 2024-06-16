import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Baseurl } from './baseUrl'
import { useParams } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loader from './Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ currency }) => {
  const [chartData, setChartData] = useState([])
  const { id } = useParams()
  const [days, setDays] = useState(1)

  const CoinChartData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
      setChartData(data.prices)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    CoinChartData()
  }, [currency, id, days])

  const myData = {
    labels: chartData.map((value) => {
      const date = new Date(value[0])
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
          : `${date.getHours()} : ${date.getMinutes()} AM`
      return days === 1 ? time : date.toLocaleDateString()
    }),
    datasets: [
      {
        label: `Price in Past ${days} Days in ${currency}`,
        data: chartData.map((value) => value[1]),
        borderColor: 'orange',
        borderWidth: 3
      }
    ]
  }

  return (
    <>
      {chartData.length === 0 ? (<Loader />) : (
        <div className="flex flex-col items-center mt-20 w-full max-w-3xl p-8 bg-gray-800 rounded-lg shadow-lg">
          <Line
            data={myData}
            options={{
              elements: {
                point: {
                  radius: 1,
                }
              }
            }}
            className="w-full"
          />
          <div className="flex justify-center mt-8 space-x-4">
            <button onClick={() => setDays(1)} className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600">24 Hours</button>
            <button onClick={() => setDays(30)} className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600">1 Month</button>
            <button onClick={() => setDays(365)} className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600">1 Year</button>
          </div>
        </div>
      )}
    </>
  )
}

export default CoinChart
