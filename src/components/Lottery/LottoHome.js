import React from "react";
import Box from "../Lottery/Components/Box"
// import Section2 from "../components/Section2";
import Section3 from "../Lottery/Components/Section3";

import {  Grid, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import img from '../../assets/lottery/log.png';
import home_page_logo from '../../assets/lottery/top.png';
import down from '../../assets/lottery/down.svg';
import lotback from "../../assets/lottery/Group120.png";
// import DisplayMessage from "../components/DisplayMessage";
import image2 from "../../assets/lottery/whale4.png"
const LottoHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("Oops!");
  const [msg, setMsg] = useState("");
  const [time, setTime] = useState({
    timeBetween: '',
    minutes: '30',
    hours: '2',
    days: '4',
  });

  // const calcTime = async () => {
  //   let currentTime, targetTime;
  //   let timeBetween, minutes, hours, days;

  //   try {
  //     currentTime = await indexxFortuneLottery.viewCurTime();
  //     const lotteryId = localStorage.getItem('lotteryId');
  //     targetTime = await indexxFortuneLottery.viewLottery(lotteryId);
  //     targetTime = parseInt(targetTime[2].toString(), 10);
  //     timeBetween = targetTime - currentTime;
  //     days = Math.floor(timeBetween / (3600 * 24));
  //     timeBetween = timeBetween % (24 * 3600);
  //     hours = Math.floor(timeBetween / (60 * 60));
  //     timeBetween %= 3600;
  //     minutes = Math.floor(timeBetween / 60);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   if (minutes < 0) {
  //     minutes = hours = days = 0;
  //   }
  //   setTime({
  //     timeBetween: timeBetween,
  //     minutes: minutes,
  //     hours: hours,
  //     days: days,
  //   });
  // };

  // const handleSwitch = async () => {
  //   try {
  //     let x = await switchNetwork();
  //     console.log("LL: ", x);
  //     if (x === 0) {
  //       setMsg("We are currently available on BSC test network only. Kindly switch to Binance Smart Chain (BSC) test network.");
  //       setTitle("Oops!");
  //       setIsModalOpen(true);
  //       x = await switchNetwork();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (indexxFortuneLottery.signer) {
  //       calcTime();
  //     }
  //     handleSwitch();
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [indexxFortuneLottery.signer]);

  return (
    <div className="" style={{marginTop:200}}>
      <div>
        <div className="text-center pb-6 pt-20 mt-10">
          <img alt="img" className="img-fluid" src={home_page_logo} style={{marginBottom:200 }} />
        </div>
      

        <div className="text-center textColor">
      <div className="grid justify-items-center w-[550px]">
        <div
          className="text-center"
          style={{
            backgroundImage: `url(${lotback})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: 700,
            height: 190,
            margin: 'auto',
            scale: 0.7,
            color: 'white !important', // Add !important to override previous styles
          }}
        >
          <Typography variant="h3" fontSize="40px" textAlign="center" style={{ marginTop: '5px', color: 'white !important' }}>
            Next Draw Remaining Time
          </Typography>
          <div className="d-flex justify-content-center">
            {/* Days */}
            <Typography variant="h3" fontSize="2.5rem" style={{ fontWeight: 'bold', letterSpacing: '1px', color: 'white !important' }}>
              {time.days}
              <div className="text-xs font-normal">Days</div>
            </Typography>

            {/* Separator */}
            <Typography variant="h3" fontSize="2.5rem" style={{ color: 'white !important', paddingTop: '3px', margin: '0 1rem' }}>
              :
            </Typography>

            {/* Hours */}
            <Typography variant="h3" fontSize="2.5rem" style={{ fontWeight: 'bold', letterSpacing: '1px', color: 'white !important' }}>
              {time.hours}
              <div className="text-xs font-normal">Hours</div>
            </Typography>

            {/* Separator */}
            <Typography variant="h3" fontSize="2.5rem" style={{ color: 'white !important', paddingTop: '3px', margin: '0 1rem' }}>
              :
            </Typography>

            {/* Minutes */}
            <Typography variant="h3" fontSize="2.5rem" style={{ fontWeight: 'bold', letterSpacing: '1px', color: 'white !important' }}>
              {time.minutes}
              <div className="text-xs font-normal">Minutes</div>
            </Typography>
          </div>
        </div>
      </div>
    </div>

        <Box  />
        
{/* 
       
<Section3 indexxFortuneLottery={indexxFortuneLottery} /> */}
<Section3  />

<div className="d-flex justify-content-center">
  <img src={down} alt="img" className="img-fluid"  />
</div>
      </div>
      {/* <DisplayMessage title={title} isVisible={isModalOpen} message={msg} onClose={() => setIsModalOpen(false)} /> */}
    </div>
  );
};

export default LottoHome;
