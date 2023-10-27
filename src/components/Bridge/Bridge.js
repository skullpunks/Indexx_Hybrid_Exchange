import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import wallet from "../../assets/Bridge/Wallet.png"
import hive_exch from "../../assets/Bridge/hive-exchange.png"
import academy from "../../assets/Bridge/xacademy for LM.svg"
import academy_dark from "../../assets/Bridge/xacademy for DM.svg"
import academylogo from "../../assets/Bridge/logo (1) (1).png"
import academylogo_dark from "../../assets/Bridge/logo (1) (2).png"
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
            <img src={wallet} alt='' style={{width:"70px"}} onClick={handlewallet}/>
            <div className='fw-bold font_20x' style={{marginTop:"40px"}}>
            Wallet 
            </div>
        </Box>
        <Box className="d-flex flex-direction-column justify-content-center align-items-center">
            <img src={userLogged === "normal" ? exchange : hive_exch} alt='' style={{width:"200px"}}/>
            <div className='fw-bold font_20x' style={{marginTop:"20px"}}>
            {userLogged === "normal" ? "Indexx Exchange" : "Hive Exchange"} 
            </div>
        </Box>
        <Box className="d-flex flex-direction-column justify-content-center align-items-center">
            {theme === "dark" ?
            <img src={academy_dark} alt=''  style={{width:"70px"}} onClick={handleAcad}/>
              :
            <img src={academy} alt=''  style={{width:"70px"}} onClick={handleAcad}/>
            }
            {theme === "dark" ?
            <img src={academylogo_dark} alt=''  style={{marginTop:"50px", height:"29px"}}/>
              :
              <img src={academylogo} alt=''  style={{marginTop:"50px", height:"29px"}}/>
            }
        </Box>
      </Box>
    </div>
  )
}

export default Bridge