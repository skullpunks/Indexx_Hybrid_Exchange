import img2 from '../../../assets/lottery/Group 126.png';
import { useNavigate } from 'react-router-dom';
// import Meta from './Modals/Meta';
import { useEffect, useState } from 'react';

import {  Grid, Typography } from '@mui/material';
const Box = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [prizePot, setPrizePot] = useState(101899);
    const navigate = useNavigate();
    // const handleSubmit = async (e) => {

    //     if (account != null) {
    //         localStorage.setItem('account', account)
    //         navigate('/Buy');
    //     } else {
    //         setIsModalOpen(true);
    //     }
    // }
    // const calculatePrizePot = async () => {
    //     // const lotteryId = localStorage.getItem('lotteryId');
    //     let lotteryId = await indexxFortuneLottery.viewCurrentLotteryId();
    //     lotteryId = parseInt(lotteryId.toString(), 10);
    //     let amount = await indexxFortuneLottery.viewLottery(lotteryId);
    //     amount = parseInt(amount[11].toString(), 10);
    //     amount /= 1e18;
    //     console.log("Amount in INEX: ", amount, amount * 0.2);
    //     amount *=0.2 ;
    //     amount=amount.toFixed(2);
    //     console.log("Setting: ", amount);
    //     setPrizePot(amount);
    //     localStorage.setItem('prizePot', amount);
    // }
    // useEffect(() => {
    //     if (indexxFortuneLottery.signer)
    //         calculatePrizePot();


    // })

    return (
        <div className="d-flex justify-content-center">
        <div>
          <div className="d-flex justify-content-center font-normal text-14px" style={{ marginTop: '-30px' }}></div>
  
          <div className="d-flex justify-content-center text-hover">
          <Typography variant="h3" fontSize="40px" textAlign="center" color={'white'} style={{ marginTop: '30px' }}>
           Prize Pot  ~${prizePot}
          </Typography>
            
          </div>
  
          <div className='my-2 d-flex justify-content-center mb-32'>
            <button onClick={() => {}} className='btn btn-binance hover-text-#B16CFF font-weight-medium text-white hover-bg-hover w-40 py-3 md:w-56'>
              Buy Tickets
            </button>
          </div>
  
          <div></div>
  
          <div className='mt-4 d-flex justify-content-center'>
            <img src={img2} alt='tickets' className='img-fluid' style={{  width: '80%',marginBottom:29 }} />
          </div>
  
    
  
          <div className='my-9 d-flex justify-content-center'>
          <button onClick={() => {}} className='btn btn-primary font-weight-medium'>
  Buy Tickets
</button>

          </div>
        </div>
      </div>

    );
}

export default Box;