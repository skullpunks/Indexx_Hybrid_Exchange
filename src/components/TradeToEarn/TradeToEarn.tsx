import { Card, Image, Button, Input } from 'antd';
import { Divider } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import exgcoin from '../../assets/arts/exgcoin.png';
import logo from '../../assets/arts/logo.png';
// import exglady from "../../assets/arts/exglady.png";
import exghands from '../../assets/arts/exghands.png';
import red2 from '../../assets/red2.png';
import red from '../../assets/red.png';
import redv from '../../assets/vector.png';
import tradetoearnlogo from '../../assets/arts/tradetoearnlogo.png';
import Footer from '../Footer/Footer';
import {
  decodeJWT,
  getUserRewardDetails,
  withdrawINEX,
  updateRewardsWallet,
} from '../../services/api';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import OpenNotification from '../OpenNotification/OpenNotification';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

const { Text } = Typography;

const TradeToEarn = () => {
  const navigate = useNavigate();
  const navigateUser = (path: any) => {
    window.localStorage.setItem('redirect', window.location.pathname);
    navigate(path);
  };
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [userRewardDetails, setUserRewardDetails] = useState() as any;
  const [isWalletAddrValid, setIsWalletAddrValid] = useState(true);
  const [email, setEmail] = useState('');
  const [showTxText, setShowTxTest] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [loadings, setLoadings] = useState<boolean>(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const updateWalletAddress = async () => {
    const access_token = String(localStorage.getItem('access_token'));
    const decoded: any = decodeJWT(access_token);
    setEmail(decoded.email);
    const res = await updateRewardsWallet(decoded.email, walletAddress);
    
    if (res.status === 200) {
      await getUserDetails();
    } else {
      
    }
  };

  const getUserDetails = async () => {
    const access_token = String(localStorage.getItem('access_token'));
    if (access_token !== undefined) {
      const decoded: any = decodeJWT(access_token);
      const res = await getUserRewardDetails(decoded.email);
      setEmail(decoded.email);
      
      if (res.data !== undefined || res.data === null) {
        setUserRewardDetails(res.data);
        setAmount(res.data?.rewardTokenBalanceInUSD);
      }
    } else {
    }
  };

  const updateVal = async (e: React.FormEvent<HTMLInputElement>) => {
    let testVal: string = '';
    if (e.currentTarget != null) {
      testVal = e?.currentTarget?.value;
      setWalletAddress(testVal);
      checkWalletAddress(testVal);
    }
  };

  const updateAmount = async (e: React.FormEvent<HTMLInputElement>) => {
    let testVal: string = '';
    if (e.currentTarget != null) {
      testVal = e?.currentTarget?.value;
      setWithdrawAmount(Number(testVal));
    }
  };

  const checkWalletAddress = async (address: string) => {
    const res = web3.utils.checkAddressChecksum(address);
    
    setIsWalletAddrValid(res);
  };

  const withdrawMyINEX = async () => {
    
    
    setLoadings(true);

    let res = await withdrawINEX(email, withdrawAmount);
    
    if (res.data.txData.status === 200) {
      setLoadings(false);
      OpenNotification('success', 'Rewards successsfully withdraw, Tx: ' + res.data.txData.data.transactionHash);
      setShowTxTest(true);
      setTxHash(res.data.txData.data.transactionHash);
      
      
    } else {
      setLoadings(false);
      OpenNotification('error', 'Failed to Rewards. Please check balance and try agrain after sometime');
    }
  };

  return (
    <>
      <div className="scan-container trade-to-earn flex-direction-column ">
        <br />
        <br />
        <br />

        {window.localStorage.getItem('user') ? (
          <>
            <Image
              src={tradetoearnlogo}
              style={{ marginBottom: 30 }}
              width={'full'}
              preview={false}
            ></Image>

            <p
              className="card__title"
              style={{
                color: '#5F5F5F',
                fontSize: '50px',
                lineHeight: '1em',
                margin: -19,
              }}
            >
              Trade To Earn{' '}
            </p>
            <p style={{ marginLeft: 320 }}>&trade;</p>
            <br></br>
            <Card>
              <h2
                className="centered"
                style={{ marginBottom: 0, color: '#5F5F5F', fontSize: '30px' }}
              >
                Withdraw Earnings
              </h2>
              <Divider />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={exgcoin}
                  style={{ marginBottom: 5 }}
                  width={120}
                  preview={false}
                ></Image>
              </div>
              <h2
                className="d-flex justify-content-center"
                style={{ marginBottom: 10, color: '#5F5F5F', fontSize: '25px' }}
              >
                indexx Exchange (INEX)
              </h2>
              <h1
                style={{
                  display: 'flex',
                  marginTop: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: '20%',
                  color: '#5F5F5F',
                  fontSize: '90px',
                }}
              >
                {userRewardDetails?.rewardTokenBalanceInUSD > 0 ||
                userRewardDetails?.rewardTokenBalanceInUSD !== undefined
                  ? '$' +
                    Math.floor(
                      (userRewardDetails?.rewardTokenBalanceInUSD * 100) / 100
                    )
                  : '$' + 0}{' '}
              </h1>
              <br />
              <Input
                // value={Math.floor((totalBalanceInUSD * 100)) / 100}
                onChange={updateAmount}
                value={withdrawAmount}
                size={'middle'}
                style={{ width: '100%', marginBottom: '10px' }}
                placeholder="Enter Amount to Withdraw"
              />
              <Text
                className="centered"
                style={{ marginBottom: 0, color: '#5F5F5F', fontSize: '15px' }}
              >
                Minimum limit:$1000
              </Text>
              <Text
                className="centered"
                style={{ marginBottom: 0, color: '#5F5F5F', fontSize: '20px' }}
              >
                1 INEX = 0.1 USD
              </Text>
              <Text
                className="centered"
                style={{ marginBottom: 0, color: '#5F5F5F', fontSize: '20px' }}
              >
                Earning Percentage = 10%
              </Text>
              <br /> <br></br>
              <span className="d-flex justify-content-center">
                <Button
                  danger
                  type="primary"
                  block
                  shape="round"
                  size="large"
                  className="btn_xl d-flex justify-content-center"
                  style={{
                    height: '55px',
                    borderRadius: '5px',
                    width: '100%',
                  }}
                  disabled={
                    !withdrawAmount ||
                    withdrawAmount < 1000 ||
                    withdrawAmount > userRewardDetails?.rewardTokenBalanceInUSD
                  }
                  loading={loadings}
                  onClick={() => withdrawMyINEX()}
                >
                  Withdraw Tokens
                </Button>
              </span>
              {/* { showTxText && 
                  <span>
                    <h3> Tokens are withdraw successsfully. Your recent withdrawal transaction hash is {txHash}</h3>
                  </span>
                } */}
              {userRewardDetails?.rewardTokenAddress === '' ? (
                <Input.Group compact style={{ paddingTop: '40px' }}>
                  <Input
                    size={'middle'}
                    style={{ width: '100%', marginBottom: '10px' }}
                    placeholder="Enter Wallet Address"
                    onChange={updateVal}
                    maxLength={42}
                  />
                  <span>
                    {isWalletAddrValid ? (
                      ''
                    ) : (
                      <Text>Invalid Wallet Address</Text>
                    )}
                  </span>
                  <Button
                    danger
                    type="primary"
                    block
                    shape="round"
                    size="large"
                    className="btn_xl"
                    style={{
                      height: '55px',
                      borderRadius: '5px',
                    }}
                    onClick={() => updateWalletAddress()} //0x68A62a16d381fd8C11F092b3Eea68845C3Db721E
                    disabled={
                      !walletAddress ||
                      walletAddress.length < 42 ||
                      !isWalletAddrValid
                    }
                  >
                    Submit Wallet Address
                  </Button>
                </Input.Group>
              ) : (
                <Input.Group compact style={{ paddingTop: '40px' }}>
                  <Input
                    size={'middle'}
                    style={{ width: '100%', marginBottom: '10px' }}
                    placeholder="Enter Wallet Address"
                    onChange={updateVal}
                    value={userRewardDetails?.rewardTokenAddress || ''}
                    maxLength={42}
                  />
                  <span>
                    {isWalletAddrValid ? (
                      ''
                    ) : (
                      <Text>Invalid Wallet Address</Text>
                    )}
                  </span>
                  <span className="d-flex justify-content-center">
                    <Button
                      danger
                      type="primary"
                      block
                      shape="round"
                      size="large"
                      className="btn_xl"
                      style={{
                        height: '55px',
                        borderRadius: '5px',
                        width: '100%',
                      }}
                      onClick={() => updateWalletAddress()}
                      disabled={
                        !userRewardDetails?.rewardTokenAddress ||
                        userRewardDetails?.rewardTokenAddress.length < 42 ||
                        !isWalletAddrValid
                      }
                    >
                      Update Wallet Address
                    </Button>
                  </span>
                </Input.Group>
              )}
              <br />
            </Card>
          </>
        ) : (
          <div className="text-center" style={{ maxWidth: 370 }}>
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
                  color: '#5F5F5F',
                  fontSize: '55px',
                  lineHeight: '1em',
                }}
              >
                Trade To Earn{' '}
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
                navigateUser('/indexx-exchange/buy-sell/get-started')
              }
            >
              Sign up
            </Button>{' '}
            <br />
            <br />
            <Button
              danger
              type="primary"
              shape="round"
              size="large"
              className="btn_xl btn-primary"
              onClick={() => navigateUser('/indexx-exchange/buy-sell/login')}
            >
              Log In
            </Button>{' '}
            {/* <Link to="/indexx-exchange/buy-sell/login" className=" orange text-success" style={{ width: 80 }}>Log In</Link> */}
          </div>
        )}

        <Image
          preview={false}
          src={exghands}
          style={{
            paddingTop: 100,
            display: 'flex',
            justifyContent: 'center',
            width: 400,
            alignItems: 'center',
          }}
        ></Image>

        <Card
          className="d-flex justify-content-center"
          style={{
            marginTop: 40,
            width: 1008,
            height: 400,
            textAlign: 'left',
            justifyContent: 'center',
          }}
        >
          <span
            className="d-flex justify-content-center"
            style={{ textAlign: 'center' }}
          >
            <Image
              preview={false}
              className="mx-auto d-block"
              src={red}
            ></Image>
          </span>

          <Text
            className="d-flex justify-content-center"
            style={{ color: '#5F5F5F', fontSize: 32, marginBottom: 10 }}
          >
            How to Earn?
            <br />
          </Text>
          <Text style={{ color: '#5F5F5F', fontSize: 20 }}>
            1. Please make sure that your trade to earn is unlocked in the task
            center before you start getting rewards.
            <br />
            2. You will be awarded up to 30% of the transaction value you have
            done in either Buy,Sell or Convert.
            <br />
            3. The limit of withdrawal from trade to earn is set to a minimum of
            50$.
            <br />
            4. The transaction must include one of the Indexx tokens to get your
            reward added to the wallet.
            <br />
            5. The reward will automatically be added in your wallet.
            <br />
          </Text>
        </Card>

        <Card
          className="d-flex justify-content-center"
          style={{
            marginTop: 40,
            width: 1008,
            height: 450,
            textAlign: 'left',
            justifyContent: 'center',
          }}
        >
          <span
            className="d-flex justify-content-center"
            style={{ textAlign: 'center' }}
          >
            <Image
              preview={false}
              className="mx-auto d-block"
              src={red2}
            ></Image>
          </span>

          <Text
            className="d-flex justify-content-center"
            style={{ color: '#5F5F5F', fontSize: 32, marginBottom: 10 }}
          >
            How much can I be rewarded?
            <br />
          </Text>
          <Text style={{ color: '#5F5F5F', fontSize: 20 }}>
            ‍Every day, you’ll be rewarded from a pool of INDEXX tokens based
            upon the proportion of your trading volume to the total trading
            volume for the day. See an example for a single day below.
            <span className="d-flex justify-content-center">
              <Image
                preview={false}
                src={redv}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}
              ></Image>
            </span>
          </Text>
        </Card>
        {/* <Image preview={false} src={no1} style={{ display: 'flex', justifyContent: 'center', width: 500, alignItems: 'center' }}></Image> */}
        {/* <Image preview={false} src={no2} style={{ display: 'flex', justifyContent: 'center', width: 500, alignItems: 'center' }}></Image>
        <Image preview={false} src={no3} style={{ paddingLeft: 10, display: 'flex', justifyContent: 'center', width: 480, alignItems: 'center' }}></Image> */}
      </div>

      <Footer></Footer>
    </>
  );
};

export default TradeToEarn;
