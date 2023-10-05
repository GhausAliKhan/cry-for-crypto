import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  fetchCryptoDetails,
  fetchCryptoHistoricalData,
} from '../redux/cryptoSlice';
import '../styles/cryptodetails.css';

const CryptoDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector((state) => state.crypto.selectedDetails);
  const historicalData = useSelector((state) => state.crypto.historicalData);
  const chartRef = useRef(null);

  useEffect(() => {
    Chart.register(...registerables);
    dispatch(fetchCryptoDetails(id));
    dispatch(fetchCryptoHistoricalData(id));

    const currentChartRef = chartRef.current;

    return () => {
      if (currentChartRef) {
        currentChartRef.destroy();
      }
    };
  }, [dispatch, id]);

  const data = {
    labels: historicalData.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Price in USD',
        data: historicalData.map((entry) => entry.priceUsd),
        fill: false,
        backgroundColor: 'rgb(155, 152, 13)',
        borderColor: 'rgba(106, 104, 9, 0.9)',
      },
    ],
  };

  return (
    <div className="cryptoDetail">
      <div className="chartWrapper">
        {historicalData.length > 0 ? (
          <Line data={data} ref={chartRef} />
        ) : (
          'Loading Chart...'
        )}
      </div>
      <div className="chartDetail">
        <h3>
          <strong>Name:</strong>
          <span>{details ? details.name : 'Loading...'}</span>
        </h3>
        <p>
          <strong>Symbol:</strong>
          <span>{details ? details.symbol : 'Loading...'}</span>
        </p>
        <p>
          <strong>Price (USD):</strong>
          <span>
            {details
              ? parseFloat(details.priceUsd).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
              })
              : 'Loading...'}
          </span>
        </p>
        <p>
          <strong>Rank:</strong>
          <span>{details ? details.rank : 'Loading...'}</span>
        </p>
        <p>
          <strong>Market Cap (USD):</strong>
          <span>
            {details
              ? parseFloat(details.marketCapUsd).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })
              : 'Loading...'}
          </span>
        </p>
        <p>
          <strong>24hr Volume (USD):</strong>
          <span>
            {details
              ? parseFloat(details.volumeUsd24Hr).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })
              : 'Loading...'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CryptoDetails;
