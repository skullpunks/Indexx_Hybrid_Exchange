import axios from 'axios';
import decode from 'jwt-decode';
import * as crypto from 'crypto';
export let baseAPIURL = '';
export let baseCEXURL = '';
export let baseDEXURL = '';
export let baseURL = '';
export let baseHiveURL = '';
export let baseWSURL = '';
export let baseWalletURL = '';
export let baseShopURL = '';
export let baseXnftURL = '';
export let baseMktplaceURL = '';
export let baseLottoUrl = '';
//export const secretKey = process.env.YOUR_SECRET_KEY || "123456Indexx2023";
export const secretKey =
  process.env.YOUR_SECRET_KEY === undefined
    ? '123456Indexx2023'
    : process.env.YOUR_SECRET_KEY;
const secret = 'appSecretKey';
const rounds = 9921;
const keySize = 32;
const algorithm = 'aes-256-cbc';
const salt = crypto.createHash('sha1').update(secret).digest('hex');
export let baseAcademyUrl = '';
 if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
  baseAPIURL = 'https://api.indexx.ai';
  baseCEXURL = 'https://cex.indexx.ai';
  baseDEXURL = 'https://dex.indexx.ai';
  baseURL = 'https://indexx.ai';
  baseHiveURL = 'https://hive.indexx.ai';
  baseWSURL = 'https://wallstreet.indexx.ai';
  baseWalletURL = 'https://wallet.indexx.ai';
  //baseWalletURL = 'http://localhost:3001';
  baseLottoUrl = 'https://lotto.indexx.ai';
  baseLottoUrl = 'http://localhost:3000';
  baseShopURL = 'https://shop.indexx.ai';
  baseXnftURL = 'https://xnft.indexx.ai';
  baseMktplaceURL = 'https://xnftmarketplace.indexx.ai';
  baseAcademyUrl = 'https://academy.indexx.ai';
  //baseAPIURL = 'http://localhost:5000';
} else {
  baseCEXURL = 'https://cex.indexx.ai';
  baseDEXURL = 'https://dex.indexx.ai';
  baseAPIURL = 'https://api.indexx.ai';
  baseURL = 'https://indexx.ai';
  baseHiveURL = 'https://hive.indexx.ai';
  baseWSURL = 'https://wallstreet.indexx.ai';
  baseWalletURL = 'https://wallet.indexx.ai';
  baseLottoUrl = 'https://lotto.indexx.ai';
  baseShopURL = 'https://shop.indexx.ai';
  baseXnftURL = 'https://xnft.indexx.ai';
  baseMktplaceURL = 'https://xnftmarketplace.indexx.ai';
  baseAcademyUrl = 'https://academy.indexx.ai';
}

const API = axios.create({
  baseURL: baseAPIURL,
});

export default baseAPIURL;

function getFromLocalStorage(key: any) {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }

  const parsedItem = JSON.parse(item);
  const now = new Date().getTime();

  // Check if the cached item is still valid
  if (now > parsedItem.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return parsedItem.data;
}

function setToLocalStorage(key: any, data: any, ttl: any) {
  const now = new Date().getTime();
  const item = {
    data: data,
    expiry: now + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export const getUserShortToken = async (email: string) => {
  try {
    const result = await API.get(`/api/v1/inex/user/createShortToken/${email}`);
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createShortToken)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export async function fetchCryptoData(subTitle: string) {
  const cacheKey = `cryptoData:${subTitle}`;
  const cachedData = getFromLocalStorage(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${subTitle}`
    );
    const data = response.data;

    const currentPrice = data.market_data.current_price.usd;
    const twentyFourHourAgoPrice =
      currentPrice / (1 + data.market_data.price_change_percentage_24h / 100);
    const sevenDaysAgoPrice =
      currentPrice / (1 + data.market_data.price_change_percentage_7d / 100);
    const oneMonthAgoPrice =
      currentPrice / (1 + data.market_data.price_change_percentage_30d / 100);
    const threeMonthsAgoPrice =
      currentPrice / (1 + data.market_data.price_change_percentage_200d / 100);

    const result = {
      marketCapRank: data.market_cap_rank,
      marketCap: data.market_data.market_cap.usd,
      volume: data.market_data.total_volume.usd,
      circulatingSupply: data.market_data.circulating_supply,
      twentyFourhourExchangeRate: twentyFourHourAgoPrice,
      SevenDaysexchangeRate: sevenDaysAgoPrice,
      onemonthExchangeRate: oneMonthAgoPrice,
      threemonthExchangeRate: threeMonthsAgoPrice,
    };

    setToLocalStorage(cacheKey, result, 86400000); // Cache for 24 hours

    return result;
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    return {
      marketCapRank: 'NA',
      marketCap: 'NA',
      volume: 'NA',
      circulatingSupply: 'NA',
      twentyFourhourExchangeRate: 0,
      SevenDaysexchangeRate: 0,
      onemonthExchangeRate: 0,
      threemonthExchangeRate: 0,
    };
  }
}

export function formatReadableDate(isoDate: string) {
  if (!isoDate) {
    return 'N/A';
  }

  const date = new Date(isoDate);

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    return 'N/A';
  }

  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export const signupAPI = async (
  email: string,
  password: string,
  username: string,
  referralCode: string,
  gcode: string = ''
) => {
  try {
    const result = await API.post('/api/v1/inex/user/register', {
      email,
      password,
      username,
      referralCode,
      gcode,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (signupAPI)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
export function formatPhoneNumberToUSFormat(inputString: string) {
  // Remove any non-numeric characters from the input
  const numericInput = inputString.replace(/\D/g, '');

  // Check if the numeric input has a valid length
  if (numericInput.length !== 10) {
    return 'Invalid phone number';
  }

  // Format the numeric input into the US phone number format
  const formattedPhoneNumber = `(${numericInput.slice(
    0,
    3
  )}) ${numericInput.slice(3, 6)}-${numericInput.slice(6)}`;

  return formattedPhoneNumber;
}

export const checkEmail = async (email: string) => {
  try {
    email = email.toLocaleLowerCase();
    const result = await API.post('/api/v1/inex/user/checkemail', {
      email,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const sendOtp = async (email: string) => {
  try {
    const result = await API.post('/api/v1/inex/user/sendOtp', {
      email,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const sendForgotPasswordOtp = async (email: string) => {
  try {
    const result = await API.post('/api/v1/inex/user/sendForgotOtp', {
      email,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const validateOtp = async (email: string, code: string) => {
  try {
    const result = await API.post('/api/v1/inex/user/validateOtp', {
      email,
      code,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const validateForgotOtp = async (email: string, code: string) => {
  try {
    const result = await API.post('/api/v1/inex/user/validateForgotOtp', {
      email,
      code,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const createGiftcard = async (
  amount: number,
  email: string,
  currency: string,
  giftCardUrl: string,
  cardType: string,
  recevierEmail: string
) => {
  try {
    const result = await API.post('/api/v1/inex/user/createGiftcard', {
      email,
      amount,
      currency,
      giftCardUrl,
      cardType,
      recevierEmail,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createGiftcard)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const sendGiftcard = async (
  giftcardVoucher: string,
  senderEmail: string,
  recevierEmail: string,
  senderMessage: string,
  senderName: string,
  selectedImgUrl: string
) => {
  try {
    const result = await API.post('/api/v1/inex/user/sendGiftcard', {
      giftcardVoucher,
      senderEmail,
      recevierEmail,
      senderMessage,
      senderName,
      selectedImgUrl,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (sendGiftcard)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const checkByemail = async (email: string) => {
  try {
    email = email.toLocaleLowerCase();
    const result = await API.post('/api/v1/inex/user/checkByemail', {
      email,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getAllAffiliateUser = async () => {
  try {
    const result = await API.get(`/api/v1/affiliate/getAllaffiliateUsers`);
    const formattedData = result.data.data.map((item: any) => {
      return {
        ...item._doc,
        userData: item.userData,
      };
    });

    return formattedData;
  } catch (err: any) {
    return err.response.data;
  }
};

export const loginAPI = async (email: string, password: string) => {
  try {
    let isEmailProvided = isEmail(email);
    if (isEmailProvided) {
      const result = await API.post('/api/v1/inex/user/login', {
        email,
        password,
      });
      return result.data;
    } else {
      const result = await API.post('/api/v1/inex/user/login', {
        username: email,
        password,
      });
      return result.data;
    }
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (loginAPI)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const loginWithToken = async (signInToken: any) => {
  try {
    const result = await API.post('/api/v1/inex/user/loginWithToken', {
      signInToken,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (loginWithToken)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getCaptainBeeStatics = async (
  username: string,
  isPublicProfile: string = 'no',
  userType: string = 'CaptainBee'
) => {
  try {
    const result = await API.get(
      `/api/v1/affiliate/getAffiliateUserDashbaord/${username}/${isPublicProfile}/${userType}`
    );
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getCaptainBeeByEmail = async (email: string) => {
  try {
    const result = await API.get(
      `/api/v1/affiliate/getAllaffiliateUser/${email}`
    );
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getAllGiftCards = async (email: string) => {
  try {
    const result = await API.get(`/api/v1/inex/user/getAllGiftCard/${email}`);
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getHoneyBeeDataByUsername = async (username: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getHoneyUserDashbaord/${username}`
    );
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getAllUsersLite = async () => {
  try {
    const result = await API.get(`/api/v1/inex/user/getAllUsersLite/`);
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getHiveUsersLite = async () => {
  try {
    const result = await API.get(`/api/v1/inex/user/getHiveUsersLite/`);
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const requestPermissionsByEmail = async (
  captainBeeEmail: string,
  honeyBeeEmail: string,
  requestType: string
) => {
  try {
    const result = await API.post(`/api/v1/inex/user/requestpermssions/`, {
      captainBeeEmail,
      honeyBeeEmail,
      requestType,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const postPublicMessage = async (email: string, message: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/postpublicMessage/`, {
      email,
      message,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getPublicMessages = async (email: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getpublicMessages/${email}`
    );
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const updateCaptainBeeProfile = async (
  email: string,
  username: string,
  updateData: any
) => {
  try {
    const result = await API.post(`/api/v1/affiliate/updateaffiliateuser/`, {
      email,
      username,
      updateData,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const updateHoneyBeeProfile = async (email: string, updateData: any) => {
  try {
    const result = await API.post(`/api/v1/inex/user/updateprofile/`, {
      email,
      updateData,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getHoneyBeePermissions = async (email: string) => {
  try {
    const result = await API.get(`/api/v1/inex/user/getpermissions/${email}`);
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const updatePermissionsByHoneyBee = async (
  email: string,
  convertPermission: any,
  buyPermission: any,
  sellPermission: any
) => {
  try {
    const result = await API.post(`/api/v1/inex/user/updatepermissions/`, {
      email,
      convertPermission,
      buyPermission,
      sellPermission,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const loginHive = async (email: string, password: string) => {
  try {
    let isEmailProvided = isEmail(email);
    if (isEmailProvided) {
      const result = await API.post('/api/v1/inex/user/hivelogin', {
        email,
        password,
      });
      return result.data;
    } else {
      const result = await API.post('/api/v1/inex/user/hivelogin', {
        username: email,
        password,
      });
      return result.data;
    }
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (loginAPI)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
function isEmail(input: string) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(input);
}

const userInput = 'exampleUserInput'; // Replace with the actual user input

if (isEmail(userInput)) {
  console.log('The user provided an email.');
} else {
  console.log('The user provided a username.');
}

export const enableTradeToEarn = async (email: string) => {
  try {
    const result = await API.post('/api/v1/inex/user/enableTradeToEarn', {
      email: email,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (enableTradeToEarn)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const logoutAPI = async () => {};

export const getCountries = async () => {
  try {
    const result = await API.post('/api/v1/inex/getCountries');
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getCountriesAPI)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getUserWallet = async () => {};

export const verifyPhoneCode = async (code: string) => {
  try {
    const result = await API.post('/api/v1/inex/user/verifyPhoneCode', {
      code,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getWalletBalance = async (email: string, coin: string) => {
  try {
    const result = await API.post(
      `/api/v1/inex/user/getBalance/${email}/${coin}`
    );
    if (result.status === 200) return result.data;
    else return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getIndexxTokenPrices = async () => {
  try {
    const result = await API.post('/api/v1/inex/basic/indexxcoins');
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getCryptoPrice = async (coin: string) => {
  try {
    const result = await API.post(`api/v1/inex/basic/getPriceByName`, {
      coin: coin,
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

//https://api.coingecko.com/api/v3/coins/binancecoin/market_chart?vs_currency=USD&days=1&interval=hourly
export const getGraphicalCurrencyData = async (
  coinId: string,
  days: string,
  currency: string = 'USD'
) => {
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
};

export function isLoggedIn() {
  return !!getJwtToken();
}

export function getJwtToken() {
  return localStorage.getItem('access_token');
}

export function getRefreshToken() {
  var token = localStorage.getItem('refresh_token');
  return token;
}

export function storeTokens(tokens: TokenLite) {
  //exact jwt and store in local store as user object
  localStorage.setItem('access_token', tokens.access_token);
  localStorage.setItem('refreshToken', tokens.refresh_token);
}

export function removeTokens() {
  //remove from local store the user object
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export interface TokenLite {
  access_token: string;
  refresh_token: string;
}

export const getAllCountries = async (email: string, coin: string) => {
  try {
    const result = await API.post('/api/v1/inex/getCountries');
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getCountriesAPI)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export function decodeJWT(access_token: string) {
  let userObj: any = decode(access_token);
  return userObj;
}

export const getUserWallets = async (email: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/getUserWallets/${email}`);
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getUserWallets)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getUserDemoWallets = async (email: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/getUserDemoWallets/${email}`);
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getUserDemoWallets)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getSmartCryptoPackages = async () => {
  try {
    const result = await API.get(`/api/v1/inex/basic/getsmartpackages`);
    if (result.status === 200) return result.data;
    else return result.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const getUserInvestments = async (email: string) => {
  try {
    const result = await API.get(`/api/v1/inex/user/totalInvestment/${email}`);
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (totalInvestment)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getDemoUserInvestments = async (email: string) => {
  try {
    const result = await API.get(`/api/v1/inex/user/totalDemoInvestment/${email}`);
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (totalDemoInvestment)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getUserTransactionHistory = async (
  email: string,
  fromDate?: string,
  toDate?: string,
  transactionType?: string,
  currency?: string
) => {
  try {
    // Construct the query parameters dynamically
    const queryParams: string[] = [];
    if (fromDate) queryParams.push(`fromDate=${encodeURIComponent(fromDate)}`);
    if (toDate) queryParams.push(`toDate=${encodeURIComponent(toDate)}`);
    if (transactionType)
      queryParams.push(
        `transactionType=${encodeURIComponent(transactionType)}`
      );
    if (currency) queryParams.push(`currency=${encodeURIComponent(currency)}`);

    // Join the query parameters into a single string
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

    // Construct the full URL
    const url = `/api/v1/inex/user/transactions-report/${email}${queryString}`;

    const result = await API.get(url);
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (getUserTransactionHistory)'
    );
    console.log(e);
    console.log(e.response?.data);
    return e.response?.data;
  }
};

export const getAllGiftCard = async (email: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/getAllGiftCard/${email}`);
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getAllGiftCard)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const checkAndUpdateDeposit = async (
  email: string,
  txHash: string,
  coin: string,
  coinNetwork: string
) => {
  try {
    const result = await API.post(`/api/v1/inex/transaction/createTx`, {
      email,
      txHash,
      coin,
      coinNetwork,
    });
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (checkAndUpdateDeposit)'
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getUserOrders = async (email: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/getUserOrders/${email}`);
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getUserOrders)');
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
    const result = await API.post('/api/v1/inex/order/sell', {
      basecoin,
      quotecoin,
      amount,
      price,
      email,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createBuyOrder)');
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
    const result = await API.post('/api/v1/inex/order/convert', {
      basecoin,
      quotecoin,
      amount,
      price,
      email,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createBuyOrder)');
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
    console.log('FAILED: unable to perform API request (getTransactions)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getReportTransactions = async (
  email: string,
  dateFilter: string,
  assetType: string,
  transactionType: string
) => {
  try {
    const result = await axios.post(
      `/api/v1/inex/user/transactions-report/${email}`,
      {
        dateFilter,
        assetType,
        transactionType,
      }
    );
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (getReportTransactions)'
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getUserRewardDetails = async (email: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getUserRewardDetails/${email}`
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getUserRewards)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const updateRewardsWallet = async (
  email: string,
  walletAddr: string
) => {
  try {
    const result = await API.post(`/api/v1/inex/user/updateRewardsWallet`, {
      email: email,
      rewardWalletAddress: walletAddr,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (updateRewardsWallet)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const changePassword = async (
  email: string,
  newPassword: string,
  oldPassword: string
) => {
  try {
    const result = await API.post(`/api/v1/inex/user/changePassword`, {
      email: email,
      newPassword: newPassword,
      oldPassword: oldPassword,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (changePassword)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/forgotPassword`, {
      email: email,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (forgotPassword)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const resetPassword = async (email: string, password: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/resetPassword`, {
      email: email,
      password: password,
      code: '123',
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (resetPassword)');
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
    console.log('FAILED: unable to perform API request (getUserDetails)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getAllRefferedDetails = async (email: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getAllRefferedUsers/${email}`
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getAllRefferedUsers)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const signupWithGoogle = async (tokenResponse: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/register/google`, {
      googleToken: tokenResponse,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getUserDetails)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const loginWithGoogle = async (tokenResponse: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/login/google`, {
      googleToken: tokenResponse,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getUserDetails)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getHoneyUserDetails = async (email: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getHoneyUserDetails/${email}`
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getHoneyUserDetails)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getReferredUserDetails = async (email: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getReferredUserDetails/${email}`
    );
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (getReferredUserDetails)'
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getCoinPriceByName = async (
  coin: string,
  type: string = 'Buy'
) => {
  if (coin === 'INEX-ETHEREUM' || coin === 'INEX-POLYGON') {
    coin = 'INEX';
  }
  try {
    const result = await API.post(`/api/v1/inex/basic/getcoinprice/${coin}`, {
      type: type,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getCoinPriceByName)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createMonthlyINEXsubscription = async (
  email: string,
  currencyIn: string,
  currencyOut: string,
  amount: string,
  outAmount: string,
  orderType: string
) => {
  try {
    const result = await API.post(
      `/api/v1/inex/order/createMonthlyINEXsubscription`,
      {
        email: email,
        currencyIn: currencyIn,
        currencyOut: currencyOut,
        amount: amount,
        outAmount: outAmount,
        orderType: orderType,
      }
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getCoinPriceByName)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createMonthlyHoneyBeeINEXsubscription = async (
  email: string,
  currencyIn: string,
  currencyOut: string,
  amount: string,
  outAmount: string,
  orderType: string
) => {
  try {
    const result = await API.post(
      `/api/v1/inex/order/createMonthlyHoneyBeeINEXsubscription`,
      {
        email: email,
        currencyIn: currencyIn,
        currencyOut: currencyOut,
        amount: amount,
        outAmount: outAmount,
        orderType: orderType,
      }
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getCoinPriceByName)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const cancelMonthlyINEXsubscription = async (
  email: string,
  subscriptionId: string,
  reason: string
) => {
  try {
    const result = await API.post(
      `/api/v1/inex/order/cancelMonthlyINEXsubscription`,
      {
        email: email,
        subscriptionId: subscriptionId,
        reason: reason,
      }
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getCoinPriceByName)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getAppSettings = async () => {
  try {
    const result = await API.post('/api/v1/inex/basic/appSettings');
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (appSettings)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const marketsData = async () => {
  try {
    const result = await API.get('/api/v1/inex/basic/marketPrice');
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (marketPrice)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const hotTokenData = async () => {
  try {
    const result = await API.get('/api/v1/inex/basic/hotTokens');
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (hotTokens)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const newListingData = async () => {
  try {
    const result = await API.get('/api/v1/inex/basic/newListing');
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (newListing)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const hotStockTokenData = async () => {
  try {
    const result = await API.get('/api/v1/inex/basic/hotStockTokens');
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (hotStockTokens)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const hotETFTokenData = async () => {
  try {
    const result = await API.get('/api/v1/inex/basic/hotETFTokens');
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (hotETFTokens)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const stockMarketsData = async (symbol: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/basic/stockmarketPrice/${symbol}`
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (marketPrice)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const stockMarketsDataWithHistory = async (symbol: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/basic/stockmarketPriceWithHistory/${symbol}`
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (marketPrice)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const updateFavCurrencies = async (email: string, currency: string) => {
  try {
    const result = await API.post('/api/v1/inex/basic/updateFavCurrencies', {
      email: email,
      currency: currency,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (updateFavCurrencies)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const shareGreetingCard = async (
  email: string,
  receiverName: string,
  receiverEmail: string,
  greetingWords: string,
  userType: string,
  greetingCode: string,
  greetingCardImageUrl: string
) => {
  try {
    const result = await API.post('/api/v1/affiliate/shareGreetingCard', {
      receiverName,
      receiverEmail,
      email,
      greetingWords,
      userType,
      greetingCode,
      greetingCardImageUrl,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (shareGreetingCard)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createBuyOrder = async (
  basecoin: string,
  quotecoin: string,
  amount: number,
  outAmount: number,
  price?: number,
  email?: string,
  isHoneyBeeOrder: boolean = false,
  paymentType: string = 'paypal'
) => {
  try {
    const result = await API.post('/api/v1/inex/order/createOrder', {
      currencyOut: basecoin,
      currencyIn: quotecoin,
      amount: amount,
      price: price,
      orderType: 'Buy',
      outAmount: outAmount,
      email: email ? email : localStorage.getItem('user'),
      isHoneyBeeOrder: isHoneyBeeOrder,
      paymentType,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createOrder)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createBuyOrderForSmartCrypto = async (
  planName: string,
  planManagedBy: string,
  amount: number,
  price?: number,
  email?: string,
  isHoneyBeeOrder: boolean = false,
  paymentType: string = 'paypal'
) => {
  try {
    const result = await API.post(
      '/api/v1/inex/order/createOrderForSmartCrypto',
      {
        planName: planName,
        planManagedBy: planManagedBy,
        amount: amount,
        price: price,
        orderType: 'SmartCryptoBuy',
        email: email ? email : localStorage.getItem('user'),
        isHoneyBeeOrder: isHoneyBeeOrder,
        paymentType,
      }
    );
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (createOrderForSmartCrypto)'
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createFreeTrailOrder = async (
  planName: string,
  planManagedBy: string,
  amount: number,
  price?: number,
  email?: string,
  isHoneyBeeOrder: boolean = false,
  paymentType: string = 'paypal'
) => {
  try {
    const result = await API.post(
      '/api/v1/inex/order/createFreeTrailOrder',
      {
        planName: planName,
        planManagedBy: planManagedBy,
        amount: amount,
        price: price,
        orderType: 'SmartCryptoBuy',
        email: email ? email : localStorage.getItem('user'),
        isHoneyBeeOrder: isHoneyBeeOrder,
        paymentType,
      }
    );
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (createFreeTrailOrder)'
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createOrderForSmartCryptoFreeTrailUpdation = async (
  planName: string,
  planManagedBy: string,
  amount: number,
  price?: number,
  email?: string,
  isHoneyBeeOrder: boolean = false,
  paymentType: string = 'paypal'
) => {
  try {
    const result = await API.post(
      '/api/v1/inex/order/createOrderForSmartCryptoFreeTrailUpdation',
      {
        planName: planName,
        planManagedBy: planManagedBy,
        amount: amount,
        price: price,
        orderType: 'SmartCryptoFreeTrialConvert',
        email: email ? email : localStorage.getItem('user'),
        isHoneyBeeOrder: isHoneyBeeOrder,
        paymentType,
      }
    );
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (createOrderForSmartCryptoFreeTrailUpdation)'
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const insertNewSmartCryptoPlan = async (
  portfolioName: string, // Updated field name to match server expectations
  managedBy: string, // Updated field name to match server expectations
  totalInvestment: number = 0, // Matches server field
  cryptocurrencies: Array<{ name: string; percentage: number; token: string }>, // Array of cryptocurrency data
  createdDate: string, // ISO string for the creation date
  description?: string, // Optional field
  title?: string, // Optional field
  subTitle?: string, // Optional field
  email?: string
) => {
  try {
    const result = await API.post(
      '/api/v1/inex/admin/addsmartcryptoportfolio',
      {
        portfolioName, // Updated field name
        totalInvestment, // Matches server field
        cryptocurrencies, // Array of cryptocurrencies
        createdDate, // ISO format date
        description, // Optional description
        title, // Optional title
        subTitle, // Optional subtitle
        managedBy, // Updated field name
        email: email || localStorage.getItem('user'), // Default to localStorage if email is not provided
      }
    );
    return result.data;
  } catch (e: any) {
    console.error(
      'FAILED: unable to perform API request (insertNewSmartCryptoPlan)'
    );
    console.error(e);
    console.error(e.response?.data);
    return e.response?.data;
  }
};

interface CryptocurrencyRow {
  id: string; // Coin identifier (e.g., 'ChainLink')
  coin: string; // Coin symbol (e.g., 'LINK')
  amount: number; // Amount of the coin
  staking_balance: number; // Staking balance of the coin
  coin_price: number; // Price of the coin
  todayPNL: {
    value: string; // Profit and loss value as a string
    percentage: string; // Profit and loss percentage as a string
    isPositive: boolean; // Whether the PNL is positive or negative
  };
  coinNetwork: string; // Network associated with the coin (e.g., 'Binance Smart Chain')
  hasSmartCryptoNote: boolean; // Indicates if there's a Smart Crypto note
  notes: string; // Additional notes related to the coin
  priority: number; // Priority of the coin
}

interface CryptoCategoryData {
  category: string; // Category name (e.g., 'Smart Crypto x-Blue Wave')
  rows: CryptocurrencyRow[]; // Array of cryptocurrency data
}

export const switchPlanSmartCryptoPlan = async (
  currentNewPlanName: string,
  newPortfolioName: string, // Updated field name to match server expectations
  managedBy: string, // Updated field name to match server expectations
  exitingCryptocurrencies: CryptoCategoryData, // Array of cryptocurrency data
  email?: string
) => {
  try {
    const result = await API.post('/api/v1/inex/order/switchsmartcryptoPlan', {
      currentPortfolioName: currentNewPlanName,
      planName: newPortfolioName,
      exitingCryptocurrencies, // Array of cryptocurrencies
      managedBy, // Updated field name
      email: email || localStorage.getItem('user'), // Default to localStorage if email is not provided
    });
    return result.data;
  } catch (e: any) {
    console.error(
      'FAILED: unable to perform API request (switchPlanSmartCryptoPlan)'
    );
    console.error(e);
    console.error(e.response?.data);
    return e.response?.data;
  }
};

export const sellPlanSmartCryptoPlan = async (
  currentPortfolioName: string,
  managedBy: string, // Updated field name to match server expectations
  exitingCryptocurrencies: CryptoCategoryData, // Array of cryptocurrency data
  email?: string
) => {
  try {
    const result = await API.post('/api/v1/inex/order/sellSmartCrypoPlan', {
      currentPortfolioName,
      exitingCryptocurrencies, // Array of cryptocurrencies
      managedBy, // Updated field name
      email: email || localStorage.getItem('user'), // Default to localStorage if email is not provided
    });
    return result.data;
  } catch (e: any) {
    console.error('FAILED: unable to perform API request (sellSmartCrypoPlan)');
    console.error(e);
    console.error(e.response?.data);
    return e.response?.data;
  }
};

export const createFiatDepositForOrder = async (
  email: string,
  orderId: string,
  fromDetails: any,
  toDetails: any,
  paymentReceiptUrl: string
) => {
  try {
    const result = await API.post(
      '/api/v1/inex/transaction/createFiatDepositForOrder',
      {
        email,
        orderId,
        fromDetails,
        toDetails,
        paymentReceiptUrl,
      }
    );
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (createFiatDepositForOrder)'
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createINEXBuyOrder = async (
  basecoin: string,
  quotecoin: string,
  amount: number,
  outAmount: number,
  price?: number,
  email?: string,
  isHoneyBeeOrder: boolean = false
) => {
  try {
    const result = await API.post('/api/v1/inex/order/createMonthlyINEXOrder', {
      currencyOut: basecoin,
      currencyIn: quotecoin,
      amount: amount,
      price: price,
      orderType: 'Buy',
      outAmount: outAmount,
      email: email ? email : localStorage.getItem('user'),
      isHoneyBeeOrder: isHoneyBeeOrder,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createOrder)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createMonthlyINEXOrderNonPaypal = async (
  basecoin: string,
  quotecoin: string,
  amount: number,
  outAmount: number,
  paymentMethodUsed: string,
  price?: number,
  email?: string,
  isHoneyBeeOrder: boolean = false
) => {
  try {
    const result = await API.post(
      '/api/v1/inex/order/createMonthlyINEXsubscriptionnonpaypal',
      {
        currencyOut: basecoin,
        currencyIn: quotecoin,
        amount: amount,
        price: price,
        orderType: 'MonthlyINEXBuy',
        outAmount: outAmount,
        email: email ? email : localStorage.getItem('user'),
        isHoneyBeeOrder: isHoneyBeeOrder,
        paymentMethodUsed: paymentMethodUsed,
      }
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createOrder)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createPowerPackOrder = async (
  purchasedProduct: string,
  paymentMethodUsed: string,
  amount: number,
  powerPackAmountInNumber: number,
  powerPackAmount: number,
  discountCode: string,
  email?: string
) => {
  try {
    const result = await API.post('/api/v1/inex/order/createPowerPackOrder', {
      purchasedProduct: purchasedProduct,
      powerPackAmount: powerPackAmount,
      amount: amount,
      powerPackAmountInNumber: powerPackAmountInNumber,
      paymentMethodUsed: paymentMethodUsed,
      discountCode: discountCode,
      email: email ? email : localStorage.getItem('user'),
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createPowerPackOrder)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const redeemGiftCard = async (voucher: string, email?: string) => {
  try {
    const result = await API.post('/api/v1/inex/user/redeemCoupon', {
      voucher: voucher,
      email: email ? email : localStorage.getItem('email'),
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (redeemGiftCard)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const validateGiftCard = async (voucher: string) => {
  try {
    const result = await API.post('/api/v1/inex/user/validateVoucher', {
      voucher: voucher,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (validateGiftCard)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getDiscountCode = async (
  discountCode: string,
  packName: string
) => {
  try {
    const result = await API.get(
      `/api/v1/inex/order/validateDiscountCode/${discountCode}/${packName}`
    );
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (getCoreWalletDetails)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const createSellOrder = async (
  basecoin: string,
  quotecoin: string,
  amount: number,
  outAmount: number,
  price?: number,
  email?: string,
  isHoneyBeeOrder: boolean = false
) => {
  try {
    const result = await API.post('/api/v1/inex/order/createOrder', {
      currencyOut: quotecoin,
      currencyIn: basecoin,
      amount: amount,
      outAmount: outAmount,
      price: price,
      orderType: 'Sell',
      email: email ? email : localStorage.getItem('user'),
      isHoneyBeeOrder: isHoneyBeeOrder,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createOrder)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const confirmSellOrder = async (
  emal: string,
  orderId: string,
  orderStatus: string,
  basecoin: string
) => {
  try {
    const result = await API.post('/api/v1/inex/order/updateOrder', {
      email: emal,
      orderId: orderId,
      orderStatus: orderStatus,
      currencyIn: basecoin,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createOrder)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createConvertOrder = async (
  basecoin: string,
  quotecoin: string,
  amount: number,
  outAmount: number,
  price?: number,
  email?: string,
  isHoneyBeeOrder: boolean = false
) => {
  try {
    const result = await API.post('/api/v1/inex/order/createOrder', {
      currencyOut: quotecoin,
      currencyIn: basecoin,
      amount: amount,
      price: price,
      outAmount: outAmount,
      orderType: 'Convert',
      email: email ? email : localStorage.getItem('user'),
      isHoneyBeeOrder: isHoneyBeeOrder,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createOrder)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const confirmConvertOrder = async (
  emal: string,
  orderId: string,
  orderStatus: string = 'Completed',
  basecoin: string = 'IN500'
) => {
  try {
    const result = await API.post('/api/v1/inex/order/processCovert', {
      email: emal,
      orderId: orderId,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createOrder)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getCoreWalletDetails = async (coin: string) => {
  try {
    const result = await API.get(`/api/v1/inex/wallet/core/${coin}`);
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (getCoreWalletDetails)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const getFTTCoreWalletDetails = async () => {
  try {
    const result = await API.get(`/api/v1/inex/wallet/core/wallet/FTT`);
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (getCoreWalletDetails)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const createStripePaymentIntent = async (
  amount: number,
  orderId: string,
  email: string
) => {
  try {
    const result = await API.post('/api/v1/inex/stripe/createPaymentIntent', {
      amount: amount,
      orderId: orderId,
      email: email,
    });
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (createStripePaymentIntent)'
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
export const geolocationData = async () => {
  try {
    const res = await axios.get('https://geolocation-db.com/json/');
    return res;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (geolocationData)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const oneUSDHelper = async (coinValue: number, coinType: string) => {
  try {
    let oneUSDValue = 0;
    if (coinType === 'IN500') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'WIBS') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'INXC') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'IUSD+') {
      oneUSDValue = 1;
    } else if (coinType === 'BUSD') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'XRP') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'DOGE') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'USDC') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'USDT') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'SOL') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'TRX') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'BTC') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'LEO') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'TUSD') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'ETH') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'TON') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'DAI') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'BNB') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'LTC') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'MATIC') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'DOT') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'BCH') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'INEX') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'AMZN') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'AAPL') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'APPL') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'GOOGL') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'MSFT') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'META') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'PEP') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'TELA') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'TSLA') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'BCH') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'SNP500') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'NVDA') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'EQSTK') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'CRYC10') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'ALCRYP') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'INDXXF') {
      oneUSDValue = 1 / coinValue;
    } else if (coinType === 'TOB') {
      oneUSDValue = 1 / coinValue;
    } else {
      oneUSDValue = 0.1;
    }
    return oneUSDValue;
  } catch (err) {
    return 0;
  }
};

export const getMinAndMaxOrderValues = async (
  coin: string,
  orderType: string
) => {
  try {
    const result = await API.post('/api/v1/inex/basic/orderMinMax', {
      currency: coin,
      orderType: orderType,
    });
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (createStripePaymentIntent)'
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createBug = async (
  email: string,
  description: string,
  bugfiles: any
) => {
  try {
    const result = await API.post('/api/v1/inex/user/createBug', {
      email,
      description,
      bugfiles,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createBug)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getUserCreatedBugs = async (email: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getUserCreatedBugs/${email}`
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getUserCreatedBugs)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getTaskCenterDetails = async (email: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getTaskCenterDetails/${email}`
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getTaskCenterDetails)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getUserCompletedOrder = async (email: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getUserCompletedOrders/${email}`
    );
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (getUserCompletedOrder)'
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const withdrawINEX = async (email: string, amount: number) => {
  try {
    const result = await API.post('/api/v1/inex/user/withdrawRewards', {
      email: email,
      amount: amount,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (withdrawINEX)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const transactionList = async (email: string, type: string = 'FIAT') => {
  try {
    const result = await API.post(
      `/api/v1/inex/user/getTransactions/${email}`,
      {
        type: type,
      }
    );
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (transactionList)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const stakingList = async (email: string) => {
  try {
    const result = await API.get(`/api/v1/inex/user/getStakedCoins/${email}`);
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (stakingList)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const smartAPY = async (email: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getSmartApyInvestmens/${email}`
    );
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (smartAPY)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const withdrawSmartAPY = async (email: string, smartApyId: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/withdrawSmartApy`, {
      email: email,
      smartApyId: smartApyId,
    });
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (withdrawSmartAPY)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const reinvestSmartAPY = async (email: string, smartApyId: string) => {
  try {
    const result = await API.post(`/api/v1/inex/user/reinvestSmartApy`, {
      email: email,
      smartApyId: smartApyId,
    });
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (reinvestSmartAPY)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const commissionList = async (email: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getCommissionHistory/${email}`
    );
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (transactionList)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const validateUserEmail = async (email: string) => {
  try {
    const result = await API.get(`/api/v1/inex/user/getUserByEmail/${email}`);
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (validateUserEmail)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const validateUsername = async (username: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getUserByUsername/${username}`
    );
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (validateUsername)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const redeemValue = async (voucher: string, email: string) => {
  try {
    const result = await API.post(
      `/api/v1/xnft/giftcards/validateStockVoucher`,
      {
        voucher: voucher,
        email: email,
      }
    );
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (transactionList)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const redeemStockCoupon = async (voucher: string, email: string) => {
  try {
    const result = await API.post(`/api/v1/xnft/giftcards/redeemStockCoupon`, {
      voucher: voucher,
      email: email,
    });
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (transactionList)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const stakeCoin = async (
  email: string,
  amount: number,
  coin: string,
  type: string,
  percentage: number
) => {
  try {
    const result = await API.post(`/api/v1/inex/user/stakecoin`, {
      email: email,
      amount: amount,
      coin: coin,
      type: type,
      percentage: percentage,
    });
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (stakeCoin)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const createBuyOrderForSmartAPY = async (
  coin: string,
  type: string,
  percentage: number,
  duration: string,
  amount: number,
  email?: string,
  isHoneyBeeOrder: boolean = false,
  paymentType: string = 'paypal'
) => {
  try {
    const result = await API.post('/api/v1/inex/order/createOrderForSmartAPY', {
      coin: coin,
      type: type,
      percentage: percentage,
      duration: duration,
      amount: amount,
      orderType: 'SmartAPY',
      email: email ? email : localStorage.getItem('user'),
      isHoneyBeeOrder: isHoneyBeeOrder,
      paymentType,
      yieldValue: (amount * (1 + percentage)) / 100,
    });
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (createBuyOrderForSmartAPY)'
    );
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const calculateStakeReward = async (
  amount: number = 0,
  coin: string,
  type: string,
  percentage: number
) => {
  try {
    const result = await API.post(`/api/v1/inex/user/calculateStake`, {
      amount: amount,
      coin: coin,
      type: type,
      percentage: percentage,
    });
    return result.data;
  } catch (err: any) {
    console.log('FAILED: unable to perform API request (calculateStake)');
    console.log(err);
    console.log(err.response.data);
    return err.response.data;
  }
};

export const createFiatWithdraw = async (
  email: string,
  coin: string = 'USD',
  beneficiaryName: string,
  accountNumber: string,
  bankName: string,
  routingNumber: string,
  swiftCode: string,
  addressLine1: string,
  city: string,
  state: string,
  country: string,
  zipCode: string,
  amount: string
) => {
  try {
    const result = await API.post(
      '/api/v1/inex/transaction/createFiatWithdraw',
      {
        email: email,
        amount: amount,
        beneficiaryName: beneficiaryName,
        accountNumber: accountNumber,
        bankName: bankName,
        routingNumber: routingNumber,
        swiftCode: swiftCode,
        addressLine1: addressLine1,
        city: city,
        state: state,
        country: country,
        zipCode: zipCode,
        coin: coin,
      }
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createFiatWithdraw)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createCryptoWithdraw = async (
  email: string,
  amount: number,
  address: string,
  coin: string = 'USD',
  coinNetwork: string = ''
) => {
  try {
    const result = await API.post(
      '/api/v1/inex/transaction/createCryptoWithdraw',
      {
        email: email,
        amount: amount,
        address: address,
        coin: coin,
        coinNetwork: coinNetwork,
      }
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createCryptoWithdraw)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createFiatDeposit = async (
  email: string,
  amount: number,
  txHash: any,
  coin: string = 'USD'
) => {
  try {
    const result = await API.post(
      '/api/v1/inex/transaction/createFiatDeposit',
      {
        email: email,
        amount: amount,
        txHash: txHash,
        coin: coin,
      }
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createFiatWithdraw)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createSendTxByUsername = async (
  toUsername: string,
  amount: number,
  fromEmail: string,
  coin: string = 'USD',
  network: string = ''
) => {
  try {
    const result = await API.post('/api/v1/inex/transaction/sendTxByUsername', {
      toUsername: toUsername,
      amount: amount,
      fromEmail: fromEmail,
      coin: coin,
      network: network,
    });
    return result.data;
  } catch (e: any) {
    console.log(
      'FAILED: unable to perform API request (createSendTxByUsername)'
    );
    return e.response.data;
  }
};

export const createSendTxByEmail = async (
  toEmail: string,
  amount: number,
  fromEmail: string,
  coin: string,
  network: string = ''
) => {
  try {
    const result = await API.post('/api/v1/inex/transaction/sendTxByEmail', {
      toEmail: toEmail,
      amount: amount,
      fromEmail: fromEmail,
      coin: coin,
      network: network,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (createSendTxByEmail)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const resendEmailCode = async (email: string) => {
  try {
    const result = await API.post('/api/v1/inex/user/resendEmailCode', {
      email: email,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (resendEmailCode)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const validateEmail = async (email: string, code: string) => {
  try {
    const result = await API.post('/api/v1/inex/user/validateEmail', {
      email: email,
      code: code,
    });
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (validateEmail)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getOrderDetails = async (email: string, orderId: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getUserOrder/${email}/${orderId}`
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getOrderDetails)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getPaypalOrder = async (token: string) => {
  try {
    const result = await API.get(`/api/v1/inex/user/getPaypalOrder/${token}`);
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getPaypalOrder)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getPaypalSubscription = async (subscriptionId: string) => {
  try {
    const result = await API.get(
      `/api/v1/inex/user/getPaypalSubscription/${subscriptionId}`
    );
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getPaypalOrder)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const createPaypalOrder = async (token: string) => {
  try {
    const result = await API.get(`/api/v1/inex/user/createPayment/${token}`);
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getPaypalOrder)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const getIndexxMediumBlogs = async () => {
  try {
    const result = await API.get('/api/v1/inex/basic/indexxBlogs');
    return result.data;
  } catch (e: any) {
    console.log('FAILED: unable to perform API request (getIndexxMediumBlogs)');
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

// Encrypt a string
// export function encrypt0(text: string) {
//   let iv = crypto.randomBytes(16);
//   console.log('secretKey', secretKey);
//   console.log('text', text);
//   let secretKey1 = crypto.randomBytes(32).toString('hex');

//   const cipher = crypto.createCipheriv('aes-256-ccm', secretKey1, iv);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return encrypted;
// }

export function encrypt(text: string) {
  const iv = crypto.randomBytes(16); // Initialization vector
  const secretKey = crypto.randomBytes(32); // Generate a 256-bit key

  // Convert Buffer to Uint8Array to match the expected BinaryLike type
  const ivUint8Array = new Uint8Array(iv);
  const secretKeyUint8Array = new Uint8Array(secretKey);

  // Use 'aes-256-gcm' instead of 'aes-256-ccm'
  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    secretKeyUint8Array,
    ivUint8Array
  );

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Include authentication tag to ensure the integrity of the encrypted data
  const authTag = cipher.getAuthTag().toString('hex');

  return {
    encryptedData: encrypted,
    iv: iv.toString('hex'),
    authTag,
  };
}

//const Cryptr = require('cryptr');

// Encrypt a string
// export function encrypt(text) {
//   const iv = crypto.randomBytes(16);
//   const key = crypto.pbkdf2Sync(secret, salt, rounds, keySize, 'sha512');
//   const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return iv.toString('base64') + ':' + encrypted;
// }

// Decrypt an encrypted string
// export function decrypt(encryptedText) {
//   const textParts = encryptedText.split(':');
//   const iv = Buffer.from(textParts.shift(), 'base64');
//   const encryptedData = Buffer.from(textParts.join(':'), 'hex');
//   const key = crypto.pbkdf2Sync(secret, salt, rounds, keySize, 'sha512');
//   const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
//   let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }
