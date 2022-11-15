let dates = [];
let prices = [];
let latestPrice = 0;

async function plotGraph(_idCanvas, _apiurl, _idPrice) {
    await getData(_apiurl)
    const labels = dates;

    const data = {
        labels: labels,
        datasets: [{
            label: 'USD',
            backgroundColor: '#84cfc7',
            borderColor: '#84cfc7',
            data: prices,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: true
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            },
            maintainAspectRatio: false
        }
    }


    const myChart = await new Chart(
        document.getElementById(_idCanvas),
        config
    );
    dates = [];
    prices = [];


    document.getElementById(_idPrice).innerHTML = latestPrice;



}
async function getData(btcURL) {
    const response = await fetch(btcURL)
    const data = await response.json();
    const pair = data.prices;
    Object.values(pair).forEach(_pair => {
        dates.push(new Date(_pair[0]).toLocaleString("en-US", { dateStyle: "medium" }));
        prices.push(_pair[1].toFixed(2));
        const latestPair = pair[30];
        latestPrice = latestPair[1].toFixed(2);

    })
}

plotGraph("btcLine", "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily", "btcPrice");