import axios from "axios";
import decode from "jwt-decode";
let baseURL = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
   baseURL = "http://localhost:3000";
  //baseURL = "https://253f-54-250-16-116.ngrok.io";
} else {
  baseURL = "http://54.250.16.116"; //"https://253f-54-250-16-116.ngrok.io";
}

console.log("baseURL", baseURL);

const API = axios.create({
  baseURL: baseURL,
});

export default baseURL;

export const signupAPI = async (
  email: string,
  password: string,
  refferalCode: string
) => {
  try {
    const result = await API.post("/api/v1/inex/user/register", {
      email,
      password,
      refferalCode,
    });
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (signupAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const loginAPI = async (email: string, password: string) => {
  try {
    const result = await API.post("/api/v1/inex/user/login", {
      email,
      password,
    });
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (loginAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const logoutAPI = async () => { };

export const getCountries = async () => {
  try {
    const result = await API.post("/api/v1/inex/getCountries");
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (getCountriesAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getUserWallet = async () => { };

export const verifyPhoneCode = async (code: string) => {
  try {
    const result = await API.post("/api/v1/inex/user/verifyPhoneCode", {
      code,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const verifyEmailCode = async (code: string) => {
  try {
    const result = await API.post("/api/v1/inex/user/verifyEmailCode", {
      code,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getIndexxTokenPrices = async () => {
  try {
    const result = await API.post("/api/v1/inex/basic/indexxcoins");
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getCryptoPrice = async (coin: string) => {
  try {
    const result = await API.post(`api/v1/inex/basic/getPriceByName`, {
      coin: coin
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
}

//https://api.coingecko.com/api/v3/coins/binancecoin/market_chart?vs_currency=USD&days=1&interval=hourly
export const getGraphicalCurrencyData = async (coinId: string, days: string, currency: string = 'USD') => {
  let url = '';
  if (coinId === 'IUSD+') {
    url = `https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=${currency}&days=${days}`;
  } else if (coinId === 'INXC') {
    url = `https://api.coingecko.com/api/v3/coins/uma/market_chart?vs_currency=${currency}&days=${days}`;
  } else if (coinId === 'IN500') {
    url = `https://api.coingecko.com/api/v3/coins/spdr-s-p-500-etf-trust-defichain/market_chart?vs_currency=${currency}&days=${days}`;
  } else if (coinId === 'BTC') {
    url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}`;
  } else if (coinId === 'BNB') {
    url = `https://api.coingecko.com/api/v3/coins/binancecoin/market_chart?vs_currency=${currency}&days=${days}`;
  } else if (coinId === 'ETH') {
    url = `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=${currency}&days=${days}`;
  } else if (coinId === 'LTC') {
    url = `https://api.coingecko.com/api/v3/coins/litecoin/market_chart?vs_currency=${currency}&days=${days}`;
  } else if (coinId === 'BUSD') {
    url = `https://api.coingecko.com/api/v3/coins/binance-usd/market_chart?vs_currency=${currency}&days=${days}`;
  } else if (coinId === 'INEX') {
    url = `https://api.coingecko.com/api/v3/coins/stellar/market_chart?vs_currency=${currency}&days=${days}`;
  }
  let res = await fetch(url);
  console.log(res);
  return res;
}

export function isLoggedIn() {
  return !!getJwtToken();
}

export function getJwtToken() {
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  var token = localStorage.getItem("refresh_token");
  return token;
}

export function storeTokens(tokens: TokenLite) {
  //exact jwt and store in local store as user object
  localStorage.setItem("access_token", tokens.access_token);
  localStorage.setItem("refreshToken", tokens.refresh_token);
}

export function removeTokens() {
  //remove from local store the user object
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export interface TokenLite {
  access_token: string;
  refresh_token: string;
}

export const getWalletBalance = async (email: string, coin: string) => {
  try {
    const result = await API.post("/api/v1/inex/getCountries");
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (getCountriesAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export function decodeJWT(access_token: string) {
  let userObj = decode(access_token);
  return userObj;
}

export const getUserWallets = async (email: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/getUserWallets/${email}`);
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (getUserWallets)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

// export const createBuyOrder = async (basecoin: string, quotecoin: string, amount: number, price: number, email: string) => {
//   try {
//     const result = await API.post("/api/v1/inex/order/buy", {
//       basecoin,
//       quotecoin,
//       amount,
//       price,
//       email
//     });
//     return result.data;
//   } catch (e: any) {
//     console.log("FAILED: unable to perform API request (createBuyOrder)");
//     console.log(e);
//     console.log(e.response.data);
//     return e.response.data;
//   }
// }

export const createSellOrder1 = async (
  basecoin: string,
  quotecoin: string,
  amount: number,
  price: number,
  email: string
) => {
  try {
    const result = await API.post("/api/v1/inex/order/sell", {
      basecoin,
      quotecoin,
      amount,
      price,
      email,
    });
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (createBuyOrder)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createConvertOrder1 = async (
  basecoin: string,
  quotecoin: string,
  amount: number,
  price: number,
  email: string
) => {
  try {
    const result = await API.post("/api/v1/inex/order/convert", {
      basecoin,
      quotecoin,
      amount,
      price,
      email,
    });
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (createBuyOrder)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getAllTransactions = async (email: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/getTransactions/${email}`);
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (getTransactions)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getUserRewards = async (email: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/getUserRewards/${email}`);
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (getUserRewards)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getUserDetails = async (email: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/getUserDetails/${email}`);
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (getUserDetails)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getCoinPriceByName = async (coin: string) => {
  try {
    const result = await API.post(`/api/v1/inex/basic/getcoinprice/${coin}`);
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (getCoinPriceByName)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getAppSettings = async () => {
  try {
    const result = await API.post("/api/v1/inex/basic/appSettings");
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (appSettings)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createBuyOrder = async (
  basecoin: string,
  quotecoin: string,
  amount: number,
  price?: number
) => {
  try {
    const result = await API.post("/api/v1/inex/order/createOrder", {
      currencyOut: basecoin,
      currencyIn: quotecoin,
      amount: amount,
      price: price,
      orderType: "Buy",
      email: localStorage.getItem("user"),
    });
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (createOrder)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createSellOrder = async (
  basecoin: string,
  quotecoin: string,
  amount: number,
  price?: number
) => {
  try {
    const result = await API.post("/api/v1/inex/order/createOrder", {
      currencyOut: quotecoin,
      currencyIn: basecoin,
      amount: amount,
      price: price,
      orderType: "Sell",
      email: localStorage.getItem("user"),
    });
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (createOrder)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const confirmSellOrder = async(emal: string, orderId: string, orderStatus :string, basecoin: string) =>{
  try{
    const result = await API.post("/api/v1/inex/order/updateOrder",{
      email: emal,
      orderId: orderId,
      orderStatus: orderStatus,
      currencyIn: basecoin
    });
    return result.data;
  } 
    catch (e: any) {
      console.log("FAILED: unable to perform API request (createOrder)");
      console.log(e);
      console.log(e.response.data);
      return e.response.data;
    }
}

export const createConvertOrder = async (
  basecoin: string,
  quotecoin: string,
  amount: number,
  price?: number
) => {
  try {
    const result = await API.post("/api/v1/inex/order/createOrder", {
      currencyOut: basecoin,
      currencyIn: quotecoin,
      amount: amount,
      price: price,
      orderType: "Convert",
      email: localStorage.getItem("user"),
    });
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (createOrder)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createStripePaymentIntent = async (amount: number, orderId: string, email: string) => {
  try {
    const result = await API.post("/api/v1/inex/stripe/createPaymentIntent", {
      amount: amount,
      orderId: orderId,
      email: email
    });
    return result.data;
  } catch (e: any) {
    console.log(
      "FAILED: unable to perform API request (createStripePaymentIntent)"
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const oneUSDHelper = async (coinValue: number, coinType: string) => {
  try {
    let oneUSDValue = 0;
    if (coinType === "IN500") {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === "INXC") {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === "IUSD+") {
      oneUSDValue = 1;
    } else if (coinType === "BUSD") {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === "BTC") {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === "ETH") {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === "BNB") {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === "LTC") {
      oneUSDValue = 1 / coinValue;
    } else {
      oneUSDValue = 0;
    }
    return oneUSDValue;
  } catch (err) {
    return 0;
  }
};

export const getMinAndMaxOrderValues = async (coin: string, orderType: string) => {
  try {
    const result = await API.post("/api/v1/inex/basic/orderMinMax", {
      currency: coin,
      orderType: orderType
    });
    return result.data;
  } catch (e: any) {
    console.log(
      "FAILED: unable to perform API request (createStripePaymentIntent)"
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
