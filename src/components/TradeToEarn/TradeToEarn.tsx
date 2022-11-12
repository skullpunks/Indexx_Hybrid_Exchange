import { Card, Image, Button, Input, notification } from 'antd'
import { Divider } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CheckCircleFilled } from '@ant-design/icons';

import exgcoin from "../../assets/arts/exgcoin.png";
import logo from "../../assets/arts/logo.png";
// import exglady from "../../assets/arts/exglady.png";
import exghands from "../../assets/arts/exghands.png";

import no1 from "../../assets/arts/no1.png";
import no2 from "../../assets/arts/no2.png";
import no3 from "../../assets/arts/no3.png";
import tradetoearnlogo from "../../assets/arts/tradetoearnlogo.png";
import Footer from '../Footer/Footer';
import { decodeJWT, getUserRewardDetails, withdrawINEX, updateRewardsWallet } from '../../services/api';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const { Text } = Typography;

const TradeToEarn = () => {
  const navigate = useNavigate();
  const navigateUser = (path: any) => {
    window.localStorage.setItem("redirect", window.location.pathname);
    navigate(path);
  }
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [userRewardDetails, setUserRewardDetails] = useState() as any;
  const [isWalletAddrValid, setIsWalletAddrValid] = useState(true);
  const [email, setEmail] = useState('');
  const [showTxText, setShowTxTest] = useState(false);
  const [txHash, setTxHash] = useState('');



  useEffect(() => {
    getUserDetails()
  }, []);


  const updateWalletAddress = async () => {
    const access_token = String(localStorage.getItem("access_token"));
    const decoded: any = decodeJWT(access_token);
    setEmail(decoded.email);
    const res = await updateRewardsWallet(decoded.email, walletAddress);
    console.log(res);
    if (res.status === 200) {
      await getUserDetails();
    } else {
      console.log('err')
    }
  }

  const getUserDetails = async () => {
    const access_token = String(localStorage.getItem("access_token"));
    if (access_token !== undefined) {
      const decoded: any = decodeJWT(access_token);
      const res = await getUserRewardDetails(decoded.email);
      setEmail(decoded.email);
      setUserRewardDetails(res.data);
      console.log(res.data)
      setAmount(res.data.rewardTokenBalanceInUSD);
    } else {

    }
  }

  const updateVal = async (e: React.FormEvent<HTMLInputElement>) => {
    let testVal: string = "";
    if (e.currentTarget != null) {
      testVal = e?.currentTarget?.value;
      setWalletAddress(testVal);
      checkWalletAddress(testVal);
    }
  }

  const updateAmount = async (e: React.FormEvent<HTMLInputElement>) => {
    let testVal: string = "";
    if (e.currentTarget != null) {
      testVal = e?.currentTarget?.value;
      setWithdrawAmount(Number(testVal));
    }
  }

  const checkWalletAddress = async (address: string) => {
    const res = web3.utils.checkAddressChecksum(address)
    console.log(res);
    setIsWalletAddrValid(res);
  }

  const withdrawMyINEX = async () => {
    console.log(withdrawAmount)
    console.log(email)
    let res = await withdrawINEX(email, withdrawAmount);
    console.log(res);
    if (res.status === 200) {
      openNotificationWithIcon('success', res.data.txData.blockHash);
      setShowTxTest(true);
      setTxHash(res.data.txData.blockHash);
      console.log(txHash, amount)
      console.log(showTxText)
    } else {
      openNotificationWithIcon2('error');
    }
  }

  type NotificationType = 'success' | 'info' | 'warning' | 'error';

  const openNotificationWithIcon = (type: NotificationType, txHash: string) => {
    notification[type]({
      message: 'Rewards successsfully withdraw, Tx: ' + txHash,
      description: '',
      icon: <CheckCircleFilled className='text_link' />,
      style: {
        border: "1px solid #F66036",
        boxShadow: "none",
        borderRadius: 5,
        top: 100
      },

    });
  };

  const openNotificationWithIcon2 = (type: NotificationType) => {
    notification[type]({
      message: 'Failed to Rewards. Please check balance and try agrain after sometime',
      description: '',
      icon: <CheckCircleFilled className='text_link' />,
      style: {
        border: "1px solid #F66036",
        boxShadow: "none",
        borderRadius: 5,
        top: 100
      },

    });
  };

  return (
    <>
      <div className='scan-container trade-to-earn flex-direction-column '>
        <br /><br /><br />




        {
          window.localStorage.getItem("user") ?
            <>
             <Image
              src={tradetoearnlogo}
              style={{ marginBottom: 30 }}
              width={"full"}
              preview={false}
            ></Image>

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
                  <Image src={exgcoin} style={{ marginBottom: 5 }} width={120} preview={false}></Image>

                </div>
                <h2 className='centered' style={{ marginBottom: 10, color: "#5F5F5F", fontSize: "25px" }}>indexx Exchange (INEX)</h2>
                <h1 style={{ display: 'flex', marginTop: 0, justifyContent: 'center', alignItems: 'center', opacity: "20%", color: "#5F5F5F", fontSize: "90px" }}>${Math.floor((userRewardDetails?.rewardTokenBalanceInUSD * 100)) / 100}</h1><br />
                <Input
                  // value={Math.floor((totalBalanceInUSD * 100)) / 100}
                  onChange={updateAmount}
                  value={withdrawAmount}
                  size={"middle"} style={{ width: '100%', marginBottom: "10px" }}
                  placeholder="Enter Amount to Withdraw"
                />
                <Text className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "15px" }}>Minimum limit:$1000</Text>
                <Text className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "20px" }}>1 INEX = 0.1 USD</Text>
                <Text className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "20px" }}>Earning Percentage = 30%</Text>
                <br /> <br></br>
                <Button danger type="primary" block shape="round" size="large" className="btn_xl" style={{
                  height: "55px",
                  borderRadius: "5px",
                }}
                  disabled={(!withdrawAmount || withdrawAmount < 1000 || withdrawAmount > userRewardDetails?.rewardTokenBalanceInUSD)}
                  onClick={() => withdrawMyINEX()}
                >Withdraw Tokens</Button>
                {/* { showTxText && 
                  <span>
                    <h3> Tokens are withdraw successsfully. Your recent withdrawal transaction hash is {txHash}</h3>
                  </span>
                } */}

                <br /><br />
                {userRewardDetails?.rewardTokenAddress === "" ?
                  <Input.Group compact style={{ paddingTop: "40px" }}>
                    <Input size={"middle"} style={{ width: '100%', marginBottom: "10px" }} placeholder="Enter Wallet Address" onChange={updateVal} maxLength={42} />
                    <span>
                      {isWalletAddrValid ? "" : <Text >Invalid Wallet Address</Text>}
                    </span>
                    <Button danger type="primary" block shape="round" size="large" className="btn_xl" style={{
                      height: "55px", borderRadius: "5px",
                    }}
                      onClick={() => updateWalletAddress()} //0x68A62a16d381fd8C11F092b3Eea68845C3Db721E
                      disabled={(!walletAddress || walletAddress.length < 42 || !isWalletAddrValid)}
                    >Submit Wallet Address</Button>

                  </Input.Group>
                  :
                  <Input.Group compact style={{ paddingTop: "40px" }}>
                    <Input size={"middle"} style={{ width: '100%', marginBottom: "10px" }} placeholder="Enter Wallet Address" onChange={updateVal} value=
                      {userRewardDetails?.rewardTokenAddress || ''}
                      maxLength={42}
                    />
                    <span>
                      {isWalletAddrValid ? "" : <Text >Invalid Wallet Address</Text>}
                    </span>
                    <Button danger type="primary" block shape="round" size="large" className="btn_xl" style={{
                      height: "55px", borderRadius: "5px",
                    }} onClick={() => updateWalletAddress()}
                      disabled={(!userRewardDetails?.rewardTokenAddress || userRewardDetails?.rewardTokenAddress.length < 42 || !isWalletAddrValid)}
                    >Update Wallet Address</Button>

                  </Input.Group>
                }
                <br />
              </Card>
            </>
            :
            <div className='text-center' style={{ maxWidth: 370 }}>
              {/* <img src={logo} alt="logo" width="150" />
              <p className='pt-5 pb-5 '>
                <span className='card__title d-inline-block' style={{ color: "#5F5F5F", fontSize: "55px", lineHeight: "1em" }}>Trade To Earn </span>
                <sub style={{}}>&trade;</sub>
              </p>
              <Button type="primary" shape="round" size="large" className="btn_xl btn-primary" onClick={() => navigateUser("/indexx-exchange/buy-sell/get-started")}>Sign up</Button> <br /><br />
              <Button type="primary" shape="round" size="large" className="btn_xl btn-primary" onClick={() => navigateUser("/indexx-exchange/buy-sell/login")}>Log In</Button> <br /><br /> */}

              <img src={logo} alt="logo" width="150" />
              <p className="pt-5 pb-5 ">
                <span
                  className="card__title d-inline-block"
                  style={{
                    color: "#5F5F5F",
                    fontSize: "55px",
                    lineHeight: "1em",
                  }}
                >
                  Trade To Earn{" "}
                </span>
                <sub style={{}}>&trade;</sub>
              </p>
              <Button
                danger
                type="primary"
                shape="round"
                size="large"
                className="btn_xl btn-primary"
                onClick={() =>
                  navigateUser("/indexx-exchange/buy-sell/get-started")
                }
              >
                Sign up
              </Button>{" "}
              <br />
              <br />
              <Button
                danger
                type="primary"
                shape="round"
                size="large"
                className="btn_xl btn-primary"
                onClick={() => navigateUser("/indexx-exchange/buy-sell/login")}
              >
                Log In
              </Button>{" "}
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