export const createApexLineChartData = rawData => {
  const apexChartOptionsWithData = {
    ...apexLineChartOptions,
    series: [
      {
        name: 'Count',
        data: rawData.seriesData
      }
    ],
    xaxis: {
      categories: rawData.categoriesData,
      labels: {
        rotate: 0 // this x-axis labels from overlapping each other
      }
    }
  }
  return apexChartOptionsWithData
}

const apexLineChartOptions = {
  // see https://apexcharts.com/docs --> Options
  chart: {
    type: 'line',
    width: '100%',
    height: '100%',
    fontFamily: 'Roboto'
  }
}
