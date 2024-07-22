import { formatPrice } from '@/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowCircleUp';
import './index.css'
import { useMemo } from 'react'

const Price = ({ price, priceChange }) => {
  const isItUp = useMemo(() => parseFloat(priceChange) > parseFloat(price), [price, priceChange])
  const percentageChange = useMemo(() => ((parseFloat(priceChange) - parseFloat(price)) * 100 / parseFloat(price)).toFixed(2), [price, priceChange])

  return (
    <div
      className={
        `price ${isItUp ? 'crypto-price-up' : 'crypto-price-down'}`
      }
    >
      <span>{formatPrice(parseFloat(priceChange))}</span>
      {
        isItUp ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      }
      {`(${percentageChange.includes('-') ? '' : '+'}${percentageChange}%)`}
    </div>
  )
}

export default Price