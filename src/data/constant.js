import DOGE from './../assets/DOGE.png';
import SHIB from './../assets/SHIB.png';
import USDT from './../assets/USDT.png';
import BNB from './../assets/BNB.png';
import BTC from './../assets/BTC.png';
import XRP from './../assets/XRP.png';
import PEPE from './../assets/PEPE.png';
import CEL from './../assets/CEL.png';
import SOL from './../assets/SOL.png';
import ETH from './../assets/ETH.png';
import dayjs from 'dayjs';

export const mockDataCrypto = [
  {
    symbol: 'USDT',
    label: 'USDT/IDR',
    name: 'USDT',
    price: 16200,
    logo: USDT,
  },
  {
    symbol: 'BNB',
    label: 'BNB/IDR',
    name: 'BNB',
    price: 9300000,
    logo: BNB,
  },
  {
    symbol: 'PEPE',
    label: 'PEPE/IDR',
    name: 'PEPE',
    price: 0.190522,
    logo: PEPE,
  },
  {
    symbol: 'BTC',
    label: 'BTC/IDR',
    name: 'Bitcoin',
    price: 1044500000,
    logo: BTC,
  },
  {
    symbol: 'CEL',
    label: 'CEL/IDR',
    name: 'Celcius',
    price: 5546,
    logo: CEL,
  },
  {
    symbol: 'XRP',
    label: 'XRP/IDR',
    name: 'Ripple',
    price: 9509,
    logo: XRP,
  },
  {
    symbol: 'ETH',
    label: 'ETH/IDR',
    name: 'Ethereum',
    price: 55177000,
    logo: ETH,
  },
  {
    symbol: 'SOL',
    label: 'SOL/IDR',
    name: 'Solana',
    price: 2550250,
    logo: SOL,
  },
  {
    symbol: 'DOGE',
    label: 'DOGE/IDR',
    name: 'Dogecoin',
    price: 1969,
    logo: DOGE
  },
  {
    symbol: 'SHIB',
    label: 'SHIB/IDR',
    name: 'Shiba Inu',
    price: 0.301806,
    logo: SHIB
  },
];

export const chartOptions = (title) => ({
  chart: {
    height: 350,
    type: 'candlestick',
  },
  title: {
    text: title || 'CandleStick Chart - Category X-axis',
    align: 'left'
  },
  annotations: {
    xaxis: [
      {
        x: 'Jan 04 14:00',
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            fontSize: '12px',
            color: '#fff',
            background: '#00E396'
          },
          orientation: 'horizontal',
          offsetY: 7,
          text: 'Annotation Test'
        }
      }
    ]
  },
  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: 'category',
    labels: {
      formatter: function (val) {
        return dayjs(val).format('DD-MM-YYYY')
      }
    }
  },
  yaxis: {
    tooltip: {
      enabled: true
    }
  }
});


