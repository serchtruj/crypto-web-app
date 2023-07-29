const MessariService = require('../services/messariService')

const getAllCryptocurrencies = async (req, res) => {
    const { symbols } = req.params;

    const allCryptocurrencies = symbols.split(',').map((item) => {
        const data = MessariService.getCryptocurrencyData(item)
        return data
    })

    const cryptocurrencyArr = await Promise.all(allCryptocurrencies)

    const cryptocurrencyDestruct = cryptocurrencyArr.map(item => {
        const { generalData, lastYearData, lastMonthData } = item
        const lastYearPrice = lastYearData.data['values'][0][1]
        const lastMonthPrice = lastMonthData.data['values'][0][1]
        const { market_data, marketcap, symbol } = generalData.data
        const lastWeekPrices = lastMonthData.data['values'].slice(-7); // Get the last 7 days' values
        return {
            price_usd: market_data.price_usd,
            percent_change_usd_last_1_hour: market_data.percent_change_usd_last_1_hour,
            percent_change_usd_last_24_hours: market_data.percent_change_usd_last_24_hours,
            real_volume_last_24_hours: market_data.real_volume_last_24_hours,
            current_marketcap_usd: marketcap.current_marketcap_usd,
            symbol,
            lastYearPrice,
            lastMonthPrice,
            lastWeekPrices
        }
    })

    res.send({ status: 'OK', data: cryptocurrencyDestruct });
};

module.exports = {
    getAllCryptocurrencies
}