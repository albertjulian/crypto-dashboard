export const formatChartData = (dataAPI) => {
  const formattedData = [];

  // This example data not real one calculation
  if (dataAPI['Weekly Adjusted Time Series']) {
    Object.entries(dataAPI['Weekly Adjusted Time Series']).map(([key, value]) => {
      formattedData.push({
        x: key,
        y: [
          value['1. open'] * 11000 * 1000,
          value['2. high'] * 11000 * 1000,
          value['3. low'] * 11000 * 1000,
          value['4. close'] * 11000 * 1000,
          value['6. volume'],
        ]
      })
    })

    return formattedData.reverse().slice(formattedData.length - 52, formattedData.length);
  } 
  
  return dataAPI
}

export  const formatPrice = (paramPrice) => {
  if (!paramPrice || typeof (paramPrice) !== 'number' || paramPrice < 1)
    return paramPrice;

  return paramPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}