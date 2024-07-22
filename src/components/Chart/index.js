import React, { useMemo } from 'react';
import { chartOptions } from '@/data/constant';
import dynamic from 'next/dynamic';
import { formatChartData } from '@/utils';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Chart = ({ symbol, data }) => {
  const chartFormattedData = useMemo(() => formatChartData(data), [data])

  return (
    <div style={{ color: 'black', backgroundColor: 'white', margin: 20 }}>
      {
        (typeof window !== 'undefined') &&
        <ReactApexChart
          options={chartOptions(`${symbol} Chart`)}
          series={
            [
              {
                data: chartFormattedData
              }
            ]
          }
          type="candlestick"
          height={350}
        />
      }
    </div>
  )
}


export default React.memo(Chart);