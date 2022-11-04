import { Card, Image, Button, Input } from 'antd'
import { Divider } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import exgcoin from "../../assets/arts/exgcoin.png";
import logo from "../../assets/arts/logo.png";
// import exglady from "../../assets/arts/exglady.png";
import exghands from "../../assets/arts/exghands.png";

import no1 from "../../assets/arts/no1.png";
import no2 from "../../assets/arts/no2.png";
import no3 from "../../assets/arts/no3.png";

import Footer from '../Footer/Footer';
import { decodeJWT, getUserRewards, getUserWallets } from '../../services/api';
import { useEffect, useState } from 'react';

const { Text } = Typography;

const TradeToEarn = () => {
  const navigate = useNavigate();
  let [totalBalanceInUSD, settotalBalanceInUSD] = useState(0);
  const navigateUser = (path: any) => {
    window.localStorage.setItem("redirect", window.location.pathname);
    navigate(path);
  }

  let totalTokensBalInUSD = 0;
  let access_token = String(localStorage.getItem("access_token"));
  let decoded: any = decodeJWT(access_token);
  // onChange =>()= {
  // let userWallets = await getUserWallets(decoded.email);
  // // }
  useEffect(() => {
    const access_token = String(localStorage.getItem("access_token"));
    const decoded: any = decodeJWT(access_token);
    getUserWallets(decoded.email);
  }, []);

  // getUserWallets(decoded.email).then((userWallets) => {
  //     let data = userWallets.data;
  //     userWallets.data.map((wallet: any) => {
  //         totalBalanceInUSD += parseFloat(wallet.coinWalletBalanceInUSD);
  //     })
  //     console.log("data", data);
  // })

  getUserRewards(decoded.email).then((userRewards) => {
    console.log("userRewards", userRewards);
    settotalBalanceInUSD(userRewards.data.rewardTokenBalanceInUSD);
    console.log("totalTokensBalInUSD", totalTokensBalInUSD);
  })

  return (
    <>
      <div className='scan-container trade-to-earn flex-direction-column '>
        <br /><br /><br />




        {
          window.localStorage.getItem("user") ?
            <>
              <p className='card__title' style={{ color: "#5F5F5F", fontSize: "50px", lineHeight: "1em", margin: -19 }}>Trade To Earn </p>
              <p style={{ marginLeft: 320 }}>&trade;</p>
              <br></br>
              <Card>
                <h2 className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "30px" }}>Withdraw Earnings</h2>
                <Divider />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                }}>
                  <Image src={exgcoin} style={{marginBottom:5}} width={120} preview={false}></Image>

                </div>
                <h2 className='centered' style={{ marginBottom: 10, color: "#5F5F5F", fontSize: "25px" }}>indexx Exchange (INEX)</h2>
                <h1 style={{ display: 'flex', marginTop: 0, justifyContent: 'center', alignItems: 'center', opacity: "20%", color: "#5F5F5F", fontSize: "90px" }}>${Math.floor((totalBalanceInUSD * 100) / 100 )}</h1><br/>
                <Text className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "15px" }}>Minimum limit:100$</Text>
                <Text className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "20px" }}>1 USD = 0.1 INEX</Text>
                <Text className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "20px" }}>Earning Percentage = 30%</Text>
                <br /> <br></br>
                <Button danger type="primary" block shape="round" size="large" className="btn_xl" style={{
                  height: "55px",
                  borderRadius: "5px",

                }}>Withdraw Tokens</Button>

                <br /><br />

                <Input.Group compact style={{ paddingTop: "40px" }}>
                  <Input size={"middle"} style={{ width: '100%', marginBottom: "10px" }} defaultValue="Enter Wallet Address" />
                  <Button danger type="primary" block shape="round" size="large" className="btn_xl" style={{
                    height: "55px", borderRadius: "5px",
                  }}>Submit Wallet Address</Button>
                </Input.Group>
                <br />
              </Card>
            </>
            :
            <div className='text-center' style={{ maxWidth: 370 }}>
              <img src={logo} alt="logo" width="150" />
              <p className='pt-5 pb-5 '>
                <span className='card__title d-inline-block' style={{ color: "#5F5F5F", fontSize: "55px", lineHeight: "1em" }}>Trade To Earn </span>
                <sub style={{}}>&trade;</sub>
              </p>
              <Button type="primary" shape="round" size="large" className="btn_xl btn-primary" onClick={() => navigateUser("/indexx-exchange/buy-sell/get-started")}>Sign up</Button> <br /><br />
              <Button type="primary" shape="round" size="large" className="btn_xl btn-primary" onClick={() => navigateUser("/indexx-exchange/buy-sell/login")}>Log In</Button> <br /><br />
              {/* <Link to="/indexx-exchange/buy-sell/login" className=" orange text-success" style={{ width: 80 }}>Log In</Link> */}

            </div>

        }


        <Image preview={false} src={exghands} style={{ paddingTop: 100, display: 'flex', justifyContent: 'center', width: 400, alignItems: 'center' }}></Image>
        <Image preview={false} src={no1} style={{ display: 'flex', justifyContent: 'center', width: 500, alignItems: 'center' }}></Image>
        <Image preview={false} src={no2} style={{ display: 'flex', justifyContent: 'center', width: 500, alignItems: 'center' }}></Image>
        <Image preview={false} src={no3} style={{ paddingLeft: 10, display: 'flex', justifyContent: 'center', width: 480, alignItems: 'center' }}></Image>

      </div>

      <Footer></Footer>
    </>


  )
}

export default TradeToEarn