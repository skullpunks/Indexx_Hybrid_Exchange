import axios from "axios";
import decode from 'jwt-decode';
let baseURL = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3000";
} else {
  baseURL = "https://67b7-54-250-16-116.ngrok.io";
}

console.log('baseURL', baseURL);

const API = axios.create({
  baseURL: baseURL,
});


export const signupAPI = async (email: string, password: string, refferalCode: string) => {
  try {
    const result = await API.post("/api/v1/inex/user/register", {
      email,
      password,
      refferalCode
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
  try{
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
}

export const logoutAPI = async () => {
}

export const getCountries = async () => {
  try {
    const result = await API.get("/api/v1/inex/getCountries");
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (getCountriesAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
}

export const getUserWallet = async () => {
}

export const verifyPhoneCode = async (code: string) => {
  try {
    const result = await API.post("/api/v1/inex/user/verifyPhoneCode", {
      code
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
}

export const verifyEmailCode = async(code :string) => {
  try {
    const result = await API.post("/api/v1/inex/user/verifyEmailCode", {
      code
    });
    return result.data;
  } catch (e: any) {
    return e.response.data;
  }
}

export const getIndexxTokenPrices = async () => {
  try{
    const result = await API.get("api/v1/inex/price/indexx");
    return result.data;
  } catch(e: any) {
    return e.response.data;
  }
}

export function isLoggedIn() {
  return !!getJwtToken();
}

export function getJwtToken() {
  return localStorage.getItem("access_token");
}

export function etRefreshToken() {
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

export const getWalletBalance = async (email: string, coin:string) => {
  try {
    const result = await API.get("/api/v1/inex/getCountries");
    return result.data;
  } catch (e: any) {
    console.log("FAILED: unable to perform API request (getCountriesAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
}

export function decodeJWT(access_token: string) {
  let userObj = decode(access_token);
  return userObj;
}