import axios from "axios";

let baseURL = "";

// if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//   baseURL = "http://localhost:3000";
// } else {
//   baseURL = "http://18.183.187.118:3000";
// }

baseURL = "http://18.183.187.118:3000";
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
