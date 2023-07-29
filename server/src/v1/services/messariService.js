const axios = require('axios');

const getCryptocurrencyData = async (symbols) => {
    const MESSARI_API = "https://data.messari.io/api/v1/assets/"
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear()

    let dateFormat = year + "-" + month + "-" + day;
    let oneLessMonthFormat = year + "-" + (month - 1) + "-" + day;
    const generalDataUrl = `${symbols}/metrics?fields=market_data,marketcap,symbol`
    const lastYearDataUrl = `${symbols}/metrics/price/time-series?start=${year - 1}&end=${year}&interval=1w`
    const lastMonthDataUrl = `${symbols}/metrics/price/time-series?start=${oneLessMonthFormat}&end=${dateFormat}&interval=1d`

    try {
        // Call the first API to get general cryptocurrency data
        const generalDataResponse = await axios.get(`${MESSARI_API}${generalDataUrl}`);
        const generalData = generalDataResponse.data;

        // Call the second API to get price data from last year
        const lastYearDataResponse = await axios.get(`${MESSARI_API}${lastYearDataUrl}`);
        const lastYearData = lastYearDataResponse.data;

        // Call the third API to get price data from last month
        const lastMonthDataResponse = await axios.get(`${MESSARI_API}${lastMonthDataUrl}`);
        const lastMonthData = lastMonthDataResponse.data;

        // Combine all the data into a single object or array
        const combinedData = {
            generalData,
            lastYearData,
            lastMonthData,
        };

        return combinedData;
    } catch (error) {
        throw new Error(`Failed to fetch cryptocurrency data from Messari API ${error}`);
    }
};


module.exports = {
    getCryptocurrencyData
};