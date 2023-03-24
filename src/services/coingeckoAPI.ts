import axios from "axios";

const baseURL = "https://api.coingecko.com/api/v3";

interface DataType {
  key: React.Key;
  Favourite: boolean;
  Name: string;
  Price: any;
  Change: any;
  DailyChange: any;
  DailyHigh: any;
  DailyLow: any;
  Volume: any;
  MarketCap: any;
  HighPrice: any;
  LowPrice: any;
  Symbol: any;
  BTCPrice: any;
  imageURL: any;
  isExternal: boolean
}

export async function top100Coins() {
  try {
    const response = await axios.get(
      `${baseURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=104&page=1&sparkline=false`
    );
    const formatedData = await buildCoinsJSONarray(response.data);
    return formatedData;
  } catch (err) {
    return err;
  }
}

async function buildCoinsJSONarray(arr: any) {
  try {
    let JSONarr: Array<DataType> = [];
    let BTCValue = arr.find((x: any) => x.name === "Bitcoin");
    let BTCPrice = BTCValue.current_price;
    for (let index = 0; index < arr.length; index++) {
      if (
        arr[index].name === "Bitcoin" ||
        arr[index].name === "Ethereum" ||
        arr[index].name === "BNB" ||
        arr[index].name === "Litecoin"
      ) {
      } else {
        const element = arr[index];
        JSONarr.push({
          key: index,
          Favourite: false,
          Name: element.name,
          Price: element.current_price,
          Change: element.price_change_percentage_24h,
          DailyChange: element.price_change_24h,
          DailyHigh: element.high_24h,
          DailyLow: element.low_24h,
          Volume: element.total_volume,
          MarketCap: element.market_cap,
          HighPrice: element.high_24h,
          LowPrice: element.low_24h,
          Symbol: element.symbol,
          BTCPrice: element.current_price / BTCPrice,
          imageURL: element.image,
          isExternal: true
        });
      }
    }
    return JSONarr;
  } catch (err) {
    return err;
  }
}
