import Chart from "@/components/Chart";
import Layout from "@/components/Layout";
import { Alert, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, Snackbar, Tab, Tabs } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { getStockData } from "../api/services";
import { useRouter } from "next/router";
import { mockBTC } from "@/data/chart";
import { mockDataCrypto } from "@/data/constant";
import './index.css';
import Price from "@/components/Price";
import Image from "next/image";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import dayjs from "dayjs";

const OrderPage = ({ profileData, marketData, setNotifMessage, setProfileData }) => {
  const router = useRouter();
  const stockSymbol = router.query.id || 'BTC';
  const [stockData, setStockData] = useState(null);
  
  const [tabPanel, setTabPanel] = useState(0);
  const [price, setPrice] = useState('');
  const [volume, setVolume] = useState('');

  const mockData = useMemo(() => {
    const stockCryptoData = mockDataCrypto.filter(row => row.symbol === stockSymbol)
    return stockCryptoData
  }, [stockSymbol]);

  const cryptoData = useMemo(() => {
    const stockCryptoData = marketData.filter(row => row.symbol === stockSymbol)
    return stockCryptoData
  }, [stockSymbol, marketData]);

  const fetchStockData = async () => {
    const newData = await getStockData(stockSymbol);

    if(newData && !newData['Error Message'] && newData['Meta Data']) {
      setStockData(newData)
    } else {
      setStockData(mockBTC)
      setNotifMessage(
        <Alert severity="warning">
          We are using API Free so there is limited access and the graph show mock data, thank you
        </Alert>
      )
    }
  }

  useEffect(() => {
    fetchStockData()
  }, [])

  const handleBackToHome = () => {
    router.push('/')
  }

  const handleChangeTab = (event, newValue) => {
    setTabPanel(newValue);
  };

  const handleChangeNumber = (event, setValue) => {
    const value = event.target && event.target.value.trim();

    if (!isNaN(value)) {
      setValue(value)
    }

  }

  const handleOrder = () => {
    if (!price || price == '0') {
      setNotifMessage(
        <Alert severity="error">
          Please input Price
        </Alert>
      )
    } else if (!volume || volume == '0') {
      setNotifMessage(
        <Alert severity="error">
          Please input Volume
        </Alert>
      )
    } else {
      const newDataOrder = profileData.order || []
      const dataPorto = profileData.porto || []

      let flagOrder = true;

      if (tabPanel === 1) {
        if (dataPorto.length === 0) {
          flagOrder = false;
        } else {
          const findPortoIndex = dataPorto.findIndex((row) => row.symbol === stockSymbol);
          const checkVolume = newDataOrder.filter((row) => row.symbol === stockSymbol && row.status === 'NEW').reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
          );

          if (findPortoIndex >= 0) {
            if (dataPorto[findPortoIndex].volume < parseFloat(volume) + parseFloat(checkVolume)) {
              flagOrder = false
            }
          } else {
            flagOrder = false
          }
        }
      }

      if (flagOrder) {
        newDataOrder.push({
          symbol: stockSymbol,
          price: price,
          volume: volume,
          status: 'NEW',
          command: tabPanel === 0 ? 'BUY' : 'SELL',
          time: dayjs(new Date().toLocaleString()).format('DD/MM/YYYY HH:mm:ss')
        })

        setProfileData({
          ...profileData,
          order: newDataOrder,
        })

        setNotifMessage(
          <Alert severity="warning">
            {`${tabPanel === 0 ? 'BUY' : 'SELL'} Order ${stockSymbol} - Vol(${volume}) Price(Rp ${price})`}
          </Alert>
        )
      } else {
        setNotifMessage(
          <Alert severity="error">
            Not Enough Volume
          </Alert>
        )
      }
    }
  }

  return (
    <Layout>
      <div className="stock-header">
        {
          mockData && mockData[0] ?
            <div className="stock-title">
              <Image src={mockData[0].logo} alt={mockData[0].symbol} width={75} height={75} />
              <div>{mockData[0].label}</div>
              {`-`}
              {
                cryptoData && cryptoData.length > 0 &&
                <Price price={mockData[0].price} priceChange={((cryptoData[0] && cryptoData[0].price) || mockData[0].price)} />
              }
            </div>
            :
            <div style={{padding: '20px'}}>Data Not Found</div>
        }

        <Button onClick={handleBackToHome} color="primary" size="large" variant="contained" startIcon={<ArrowCircleLeftIcon />}>
          Back
        </Button>

      </div>
      
      {
        mockData && mockData[0] &&
        <div className="stock-order">
          <div style={{ width: '60%', minWidth: '300px' }}>
            {stockData && mockData && mockData[0] && <Chart symbol={stockSymbol} data={stockData} />}
          </div>

          <div style={{ maxWidth: '35%', minWidth: '300px', padding: '20px' }}>
            <Paper
              elevation={12}
              style={{
                padding: '20px'
              }}
            >
              <Tabs value={tabPanel} onChange={handleChangeTab} aria-label="basic tabs example">
                <Tab label="Buy" value={0} />
                <Tab label="Sell" value={1} />
              </Tabs>
              
              <div style={{ marginTop: '20px' }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">{tabPanel === 0 ? 'Buy ' : 'Sell '} Price</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-price"
                    startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                    label="Buy Price"
                    onChange={(e) => handleChangeNumber(e, setPrice)}
                    value={price}
                  />
                </FormControl>

                <FormControl fullWidth style={{ marginTop: '10px' }}>
                  <InputLabel htmlFor="outlined-adornment-amount">Volume</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-volume"
                    label="Volume"
                    onChange={(e) => handleChangeNumber(e, setVolume)}
                    value={volume}
                  />
                </FormControl>

                <Button
                  style={{ marginTop: '10px' }}
                  variant="contained"
                  onClick={handleOrder}
                >
                  {tabPanel === 0 ? 'Buy ' : 'Sell '}
                </Button>
              </div>
              
              
            </Paper>
          </div>
        </div>
      }
    </Layout>
  )
}

export default OrderPage