import { mockDataCrypto } from '@/data/constant';
import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import { ProfileProvider } from '../contexts/ProfileContext'; // Adjust path as per your project structure
// import '../styles/globals.css'; // Adjust path as per your project structure

const wsMarket = new WebSocket('ws://localhost:8081/');

function MyApp({ Component, pageProps }) {
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [profileData, setProfileData] = useState({
    porto: [],
    order: [],
  });
  const [marketData, setMarketData] = useState(mockDataCrypto)

  const checkerBuy = (orderBuyData, marketNowData) => {
    for (let i = 0; i < orderBuyData.length; i += 1) {
      const marketPrice = marketNowData.find((row) => row.symbol === orderBuyData[i].symbol)

      if (marketPrice && marketPrice.price && marketPrice.price <= orderBuyData[i].price) {
        // new come to porto
        const newPorto = {
          symbol: marketPrice.symbol,
          price: marketPrice.price,
          volume: orderBuyData[i].volume
        }

        // check exist in porto
        const newDataPorto = profileData;
        const isExistInPorto = newDataPorto.porto.findIndex((row) => row.symbol === newPorto.symbol)

        // if exist in porto
        if (isExistInPorto >= 0) {
          // create new volume and avg price
          const totalVolume = parseFloat(newDataPorto.porto[isExistInPorto].volume) + parseFloat(newPorto.volume);
          const totalOldPrice = parseFloat(newDataPorto.porto[isExistInPorto].volume) * parseFloat(newDataPorto.porto[isExistInPorto].price)
          const totalNewPrice = parseFloat(newPorto.volume) * parseFloat(newPorto.price)
          const newPrice = (totalOldPrice + totalNewPrice) / totalVolume

          // set new data porto
          newDataPorto.porto[isExistInPorto] = {
            ...newDataPorto.porto[isExistInPorto],
            volume: totalVolume,
            price: newPrice
          }
        } else {
          // just push to porto data
          newDataPorto.porto.push(newPorto)
        }

        // change status in order to done after finish
        const statusIndex = newDataPorto.order.findIndex((row) => row.time === orderBuyData[i].time);
        if (statusIndex >= 0) {
          newDataPorto.order[statusIndex].status = 'DONE'
          newDataPorto.order[statusIndex].price_done = newPorto.price;
        }

        setSnackBarMessage(
          <Alert severity='success'>
            {`Buy Done ${newDataPorto.order[statusIndex].symbol} - Vol(${newDataPorto.order[statusIndex].volume}) Price(Rp ${newDataPorto.order[statusIndex].price_done})`}
          </Alert>
        )
       
        // set to the state
        setProfileData(newDataPorto)
      }
    }
  }

  const checkerSell = (orderSellData, marketNowData) => {
    for (let i = 0; i < orderSellData.length; i += 1) {
      const marketPrice = marketNowData.find((row) => row.symbol === orderSellData[i].symbol)

      if (marketPrice && marketPrice.price && marketPrice.price >= orderSellData[i].price) {
        // new come to porto
        const newPorto = {
          symbol: marketPrice.symbol,
          price: orderSellData[i].price,
          volume: orderSellData[i].volume
        }

        // check exist in porto
        const newDataPorto = profileData;
        const isExistInPorto = newDataPorto.porto.findIndex((row) => row.symbol === newPorto.symbol)

        // if exist in porto
        if (isExistInPorto >= 0) {
          // create new volume and avg price
          const totalVolume = parseFloat(newDataPorto.porto[isExistInPorto].volume) - parseFloat(newPorto.volume);

          // set new data porto
          newDataPorto.porto[isExistInPorto] = {
            ...newDataPorto.porto[isExistInPorto],
            volume: totalVolume,
          }
        }

        // change status in order to done after finish
        const statusIndex = newDataPorto.order.findIndex((row) => row.time === orderSellData[i].time);
        if (statusIndex >= 0) {
          newDataPorto.order[statusIndex].status = 'DONE'
          newDataPorto.order[statusIndex].price_done = newPorto.price;
        }

        setSnackBarMessage(
          <Alert severity='success'>
            {`Sell Done ${newDataPorto.order[statusIndex].symbol} - Vol(${newDataPorto.order[statusIndex].volume}) Price(Rp ${newDataPorto.order[statusIndex].price_done})`}
          </Alert>
        )
       
        // set to the state
        setProfileData(newDataPorto)
      }
    }
  }


  useEffect(() => {
    wsMarket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (
        profileData.order && profileData.order.length && profileData.order.length > 0 &&
        profileData.order.filter((row) => row.status === 'NEW').length > 0
      ) {
        const newDataBuy = profileData.order.filter((row) => row.status === 'NEW' && row.command === 'BUY');
        const newDataSell = profileData.order.filter((row) => row.status === 'NEW' && row.command === 'SELL');

        if (newDataBuy.length > 0) {
          checkerBuy(newDataBuy, response)
        }

        if (newDataSell.length > 0) {
          checkerSell(newDataSell, response)
        }
      }
      setMarketData(response);
    };

    return () => {
      wsMarket.close();
    };
  }, [])

  const handleMessage = (paramMessage) => {
    setSnackBarMessage(paramMessage)
  }

  console.log('profileData', profileData)
  return (
    <>
      <Component
        {...pageProps}
        profileData={profileData}
        marketData={marketData}
        setNotifMessage={handleMessage}
        setProfileData={setProfileData}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!snackBarMessage}
        autoHideDuration={5000}
        onClose={() => setSnackBarMessage('')}
        message={snackBarMessage}
      />
    </>
  );
}

export default MyApp;