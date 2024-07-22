import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import { mockDataCrypto } from './../data/constant';
import Image from 'next/image';
import Layout from '@/components/Layout';
import Chart from '@/components/Chart';
import { getStockData } from './api/services';
import { mockBTC } from '@/data/chart';
import { Alert, Snackbar } from '@mui/material';
import { useRouter } from 'next/router';
import Price from '@/components/Price';

const Home = ({ marketData }) => {
  const stockSymbol = 'BTC';
  const history = useRouter();
  const [stockData, setStockData] = useState([]);
  const [snackbarToggle, setSnackbarToggle] = useState('');

  const fetchStockData = async () => {
    const newData = await getStockData(stockSymbol);

    if(newData && !newData['Error Message'] && newData['Meta Data']) {
      setStockData(newData)
    } else {
      setStockData(mockBTC)
      setSnackbarToggle('We are using API Free so there is limited access and the graph show mock data, thank you')
    }
  }

  useEffect(() => {
    fetchStockData()
  }, [])

  const handleClose = () => {
    setSnackbarToggle('')
  }

  const handleGoToOrderPage = (symbolParam) => {
    history.push(`/order/${symbolParam}`)
  }

  return (
    <Layout>
      
      <div className='home-top-crypto'>
        {
          mockDataCrypto.map((row, index) => (
            <button
              key={row.symbol}
              className='crypto-card'
              onClick={() => handleGoToOrderPage(row.symbol)}
            >
              <Image src={row.logo} alt={row.symbol} width={50} height={50} />
              <div style={{ fontWeight: 800, fontSize: 20 }}>{row.label}</div>
              <div
                className='crypto-price'
              >
                <Price price={row.price} priceChange={((marketData[index] && marketData[index].price) || row.price)} />
              </div>
            </button>
          ))
        }
      </div>

      <Chart symbol={stockSymbol} data={stockData} />
      
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!snackbarToggle}
        autoHideDuration={5000}
        onClose={handleClose}
        message={
          <Alert severity="warning">
            {snackbarToggle}
          </Alert>
        }
      />
      
    </Layout>
  );
};

export default Home;