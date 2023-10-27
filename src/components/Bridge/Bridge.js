import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import wallet from "../../assets/Bridge/Wallet.png"
import walletlogo from "../../assets/Bridge/Wallet logo Light 2.png"
import hive_exch from "../../assets/Bridge/hive-exchange.png"
import hive_exchlogo from "../../assets/Bridge/hive-exch logo.png"
import academy from "../../assets/Bridge/academy.png"
import academylogo from "../../assets/Bridge/acad-logo.png"
import exchange from "../../assets/Bridge/exchange.png"
import exchangelogo from "../../assets/Bridge/exch-logo.png"
import { baseAcademyUrl, baseWalletURL, decodeJWT } from '../../services/api';

const Bridge = () => {
  const [userLogged, setUserLogged] = useState('normal'); // Set the user's type

  useEffect(() => {
    const user = localStorage.getItem("userlogged") !== undefined ? setUserLogged(String(localStorage.getItem("userlogged"))) : setUserLogged('normal');

  }, [])

  const handleAcad = () => {
    let access_token = String(localStorage.getItem("access_token"));
    let decoded = decodeJWT(access_token);
    const userEmail = decoded.email;
    const userKey = localStorage.getItem("userkey");
    const userType = localStorage.getItem("userType");
    console.log("userEmail", userEmail);
    console.log("userKey", userKey);

    const url = `${baseAcademyUrl}/authentication/?useremail=${userEmail}&userkey=${userKey}&usertype=${userType}`;
    window.location.href = `${url}`;
  }

  const handlewallet = () => {
    let access_token = String(localStorage.getItem("access_token"));
    console.log("access", access_token);
    debugger;
    if (access_token) {
      let decoded = decodeJWT(access_token);
      const userEmail = decoded.email;
      const userKey = String(localStorage.getItem("userkey"));
      const userType = localStorage.getItem("userType");
      const userpassword = localStorage.getItem("userpass");
      console.log("userEmail", userEmail);
      console.log("userKey", userKey);
      console.log("userpassword", userpassword);
      const walletUrl = `${baseWalletURL}/login/sign-in/?useremail=${userEmail}&userkey=${userpassword}&usertype=${userType}`;
      window.location.href = `${walletUrl}`;
    }
  }

  return (
    <div style={{ paddingTop: "200px" }}>
      <div className='d-flex justify-content-center font_30x'>
        Please select Destination
      </div>
      <Box className="d-flex justify-content-center" sx={{
        gap: 14,
        mt: 10,
        alignItems: "flex-end"
      }}>
        <Box className="d-flex flex-direction-column justify-content-center align-items-center">
          <img src={wallet} alt='' style={{ width: "70px" }} onClick={handlewallet} />
          <img src={walletlogo} alt='' style={{ marginTop: "40px" }} />
        </Box>
        <Box className="d-flex flex-direction-column justify-content-center align-items-center">
          <img src={userLogged === "normal" ? exchange : hive_exch} alt='' style={{ width: "200px" }} />
          <img src={userLogged === "normal" ? exchangelogo : hive_exchlogo} alt='' style={{ marginTop: "20px" }} />
        </Box>
        <Box className="d-flex flex-direction-column justify-content-center align-items-center">
          <img src={academy} alt='' style={{ width: "70px" }} onClick={handleAcad} />
          <img src={academylogo} alt='' style={{ marginTop: "50px" }} />
        </Box>
      </Box>
    </div>
  )
}

export default Bridge