import { useEffect, useState } from 'react';
import { ArrowRightOutlined, CopyOutlined } from '@ant-design/icons';
import {
  Button,
  Select,
  Table,
  RadioChangeEvent,
  Radio,
  Space,
  theme,
} from 'antd';
import OpenNotification from '../OpenNotification/OpenNotification';
import { Typography } from 'antd';
import initialTokens from '../../utils/Tokens.json';
// import QRCodeIcon from "../../assets/arts/QRCodeIcon.svg";
import AddressIcon from '../../assets/arts/AddressIcon.svg';
import {
  decodeJWT,
  transactionList,
  getUserWallets,
  getMinAndMaxOrderValues,
  createCryptoWithdraw,
} from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import Web3 from 'web3';
import useCopyToClipboard from '../../utils/useCopyToClipboard';
import ShortenText from '../../utils/ShortenText';
import { useTheme } from '@mui/material';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const { Text } = Typography;

export const BSWithdarwCryptoContent = () => {
  const navigate = useNavigate();
  const [network, setNetwork] = useState<any>();
  const [value, setValue] = useState('funding');
  const [txList, setTxList] = useState() as any;
  const [usersWallets, setUsersWallets] = useState() as any;
  const [coinNetwork, setCoinNetwork] = useState() as any;
  const [singleWallet, setSingleWallet] = useState() as any;
  const [selectedCoin, setSelectedCoin] = useState('');
  const [receiveAmountt, setReceiveAmount] = useState('');
  const [selectedCoinObj, setSelectedCoinObj] = useState({
    address: '0xf58e5644a650C0e4db0d6831664CF1Cb6A3B005A',
    title: '', // Add any other properties you need
  });
  const [isWalletAddrValid, setIsWalletAddrValid] = useState(true);
  const [, copy] = useCopyToClipboard();
  const [loadings, setLoadings] = useState<boolean>(false);
  // const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
  const [values, setValues] = useState() as any;
  const [finalAmount, setFinalAmount] = useState() as any;
  const [walletAddress, setWalletAddre] = useState('');
  //const [max, setMax] = useState();
  const [email, setEmail] = useState('');
  const theme = useTheme();
  const categorizeTokens = (tokens: any) => {
    return {
      Stocks: tokens.filter((token: any) => token.isStock),
      ETFs: tokens.filter((token: any) => token.isETF),
      Cryptos: tokens.filter((token: any) => !token.isStock && !token.isETF),
    };
  };

  const categorizedTokens = categorizeTokens(initialTokens);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const decodedToken: any = decodeJWT(String(token)) as any;
    setEmail(decodedToken.email);
    transactionList(decodedToken?.email).then((res) => {
      let finalArr = res.data.filter(
        (x: any) => x.transactionType === 'WITHDRAW_CYRPTO'
      );

      setTxList(finalArr);
    });
    getUserWallets(decodedToken?.email).then((res) => {
      setUsersWallets(res.data);
    });
    getMinAndMaxOrderValues(String('IN500'), 'WITHDRAW_CRYPTO').then((res) => {
      setValues(res);
    });
  }, []);

  interface DataType {
    to: string;
    txId: string;
    key: string;
    time: string;
    type: string;
    wallet: string;
    currencyRef: string;
    amount: number;
    destination: string;
    txid: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Time Type',
      render: (record) => (
        <React.Fragment>
          {record.modified}
          <br />
          {record.modified}
        </React.Fragment>
      ),
      responsive: ['xs'],
    },
    {
      title: 'Amount',
      render: (record) => (
        <React.Fragment>
          {record.amount}

          {record.currencyRef}
        </React.Fragment>
      ),
      responsive: ['xs'],
    },
    {
      title: 'Time',
      dataIndex: 'modified',
      key: 'modified',
      render: (text) => <span>{text}</span>,
      responsive: ['sm'],
    },
    {
      title: 'Asset',
      dataIndex: 'currencyRef',
      key: 'currencyRef',
      render: (text) => <span>{text}</span>,
      responsive: ['sm'],
    },
    {
      title: 'Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      responsive: ['sm'],
    },
    {
      title: 'Deposit Wallet',
      dataIndex: 'walletType',
      key: 'walletType',
      render: (text) => <span>{text}</span>,
      responsive: ['sm'],
    },
    // {
    //   title: 'Asset',
    //   key: 'currencyRef',
    //   dataIndex: 'asset',
    //   responsive: ["sm"],
    // },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      responsive: ['sm'],
    },
    {
      title: 'Transaction Hash',
      key: 'txId',
      render: (_, record) => (
        <span>
          {/* {record.txId} */}
          {record.txId.length > 20
            ? ShortenText(record.txId, 0, 20) + '...'
            : record.txId}
          <span>
            {/* <Tooltip title="Click to copy"><CopyOutlined className='padding-lr-1x hover_icon' /> </Tooltip> */}
            <CopyOutlined
              className="padding-lr-1x hover_icon"
              onClick={() => copy(record.txId)}
            />
            {/* <LinkOutlined /> */}
          </span>
        </span>
      ),
      responsive: ['sm'],
    },
    {
      title: 'Destination',
      key: 'to',
      render: (_, record) => (
        <span>
          {/* {record.to} */}
          {record.to.length > 20
            ? ShortenText(record.to, 0, 20) + '...'
            : record.to}
          <span>
            {/* <CopyOutlined className='padding-lr-1x' /> <LinkOutlined /> */}
            <CopyOutlined
              className="padding-lr-1x hover_icon"
              onClick={() => copy(record.to)}
            />
          </span>
        </span>
      ),
      responsive: ['sm'],
    },
  ];

  // const minMaxArr = [
  //   {
  //     "BTC": { min: 0.001, max: 1 }
  //   },
  //   {
  //     "ETH": { min: 0.001, max: 1 }
  //   },
  //   {
  //     "LTC": { min: 0.001, max: 1 }
  //   },
  //   {
  //     "IN500": { min: 50, max: 5000 }
  //   },
  //   {
  //     "INEX": { min: 50, max: 5000 }
  //   },
  //   {
  //     "IUSD+": { min: 50, max: 5000 }
  //   },
  //   {
  //     "INXC": { min: 50, max: 5000 }
  //   },
  //   {
  //     "BNB": { min: 0.001, max: 1 }
  //   }
  // ]

  const { Option } = Select;

  // const handleChange = (value: string) => {
  //   setNetwork(value)
  //
  // };

  // const checkWalletAddress = async (address: string) => {
  //   const res = web3.utils.checkAddressChecksum(address);

  //   setIsWalletAddrValid(res);
  // };

  // const checkWalletAddress = async (address: string, currency: string) => {
  //   let isValid = false;

  //   if (currency === 'ETH') {
  //     isValid = web3.utils.isAddress(address);
  //   } else if (currency === 'BTC') {
  //     try {
  //       bitcoin.address.toOutputScript(address, bitcoin.networks.bitcoin);
  //       isValid = true;
  //     } catch (error) {
  //       isValid = false;
  //     }
  //   }

  //   setIsWalletAddrValid(isValid);
  // };

  const checkWalletAddress = async (address: string, currency: string) => {
    let isValid = false;
  
    if (currency === 'BTC') {
      // Regex for Bitcoin addresses (both legacy & SegWit formats)
      const btcRegex = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
      isValid = btcRegex.test(address);
    } else {
      // Validate Ethereum address
      isValid = web3.utils.isAddress(address);
    }
  
    setIsWalletAddrValid(isValid);
  };
  


  const onChangeReceiveAmt = (e: any) => {
    // if (e.currentTarget.value) {

    let val = e.currentTarget.value;
    setReceiveAmount(val + '');
    setNetwork('');
    setFinalAmount(parseFloat(val) - 0.0005);
    if (val < 0.001) {
      setFinalAmount(0.0005);
    }
    // }
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const onChageAdd = (e: any) => {
    let val = e.currentTarget.value;

    setWalletAddre(val);
    checkWalletAddress(val, selectedCoin);
  };

  const handleChangeCurrency = async (value: string) => {
    let getRequiredCoin = initialTokens.find((x: any) => x.address === value);
    const userWallet = usersWallets.filter(
      (x: any) => x.coinSymbol === getRequiredCoin?.title
    );
    console.log(getRequiredCoin);

    setSelectedCoinObj(
      getRequiredCoin || ({} as { address: string; title: string })
    ); // Specify the type here
    setSelectedCoin(getRequiredCoin?.title || ''); // Set the title if needed
    setSingleWallet(userWallet[0]);
    if (getRequiredCoin?.title === 'INEX') {
      setCoinNetwork(getRequiredCoin?.chain);
      const userWallet = usersWallets.filter(
        (x: any) =>
          x.coinSymbol === getRequiredCoin?.title &&
          x.coinNetwork === getRequiredCoin?.chain
      );
      console.log('userWallet', userWallet);
      setSingleWallet(userWallet[0]);
    }
    let res = await getMinAndMaxOrderValues(
      String(getRequiredCoin?.title),
      'WITHDRAW_CRYPTO'
    );

    setValues(res);
  };

  const withdrawFiat = async () => {
    const token = localStorage.getItem('access_token');
    const decodedToken: any = decodeJWT(String(token)) as any;
    let reqObj = {
      amount: Number(finalAmount),
      currencyRef: selectedCoin,
      destination: network,
      transactionType: 'WITHDRAW_CRYPTO',
      walletType: 'WALLET',
      userId: decodedToken?.email,
    };

    let res = await createCryptoWithdraw(
      decodedToken?.email,
      Number(finalAmount),
      walletAddress,
      selectedCoin
    );

    if (res.status === 200) {
      alert('Withdrawal request submitted successfully');
    } else {
      alert('Something went wrong');
    }
  };

  const withdrawCrypto = async () => {
    setLoadings(true);

    let res = await createCryptoWithdraw(
      email,
      Number(finalAmount),
      walletAddress,
      selectedCoin,
      coinNetwork
    );
    if (res.status === 200) {
      let txs = await transactionList(email);
      let message =
        'Withdraw Successfull. Transaction Id: ' + res.data.data.hash;

      OpenNotification('success', message);
      let finalArr = txs.data.filter(
        (x: any) => x.transactionType === 'WITHDRAW_CYRPTO'
      );

      setTxList(finalArr);
      setLoadings(false);
    } else {
      setLoadings(false);
      OpenNotification(
        'error',
        'Failed to withdraw. Please try again or contact support'
      );
    }
  };
  //   const updateVal = (e: React.FormEvent<HTMLInputElement>) => {
  //     let testVal: string = "";
  //     if (e.currentTarget != null) {
  //         testVal = e?.currentTarget?.value;
  //
  //         setFinalAmount(testVal);

  //     }
  // }

  return (
    <div className="scan-container bs_main wd_container">
      <div className="d-flex w_fiat flex-justify-between flex-align-center d_crypto_Container">
        <div className="d-flex flex-align-center top_heading">
          <span style={{ color: theme.palette.text.primary }}>
            Withdraw Crypto
          </span>
        </div>
        <div className="crypto_con_button">
          <Button
            danger
            className="danger_disabled"
            onClick={() => navigate('/withdraw-add-information')}
            style={{
              color: theme.palette.text.primary,
              background: theme.palette.divider,
            }}
          >
            Withdraw Fiat
            <ArrowRightOutlined />
          </Button>
        </div>
      </div>

      <div
        className="card bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x responsive_container deposit-select"
        style={{ background: theme.palette.divider }}
      >
        <h1 className="font_20x padding-t-2x padding-b-1x">
          <span style={{ color: theme.palette.text.primary }}>Select Coin</span>
        </h1>
        <div className="">
          <label style={{ color: theme.palette.text.primary }}>Currency</label>
          <div className=" d-flex flex-justify-between flex-align-center">
            <Select
              dropdownStyle={{
                width: '300px',
                maxHeight: '400px',
                overflow: 'auto',
              }}
              className="width-100"
              onChange={handleChangeCurrency}
              defaultValue="Select a Coin to Withdraw"
              value={selectedCoinObj?.address} // Use the address property as the value
            >
              {initialTokens
                .filter(
                  // (token) => token.title !== 'SOL' && token.title !== 'MATIC' && token.title !== 'DOT' &&
                  //   token.title !== 'SOL' && token.title !== 'LTC' && token.title !== 'DOGE' && token.title !== 'XRP'
                  (token) =>
                    token.title === 'INEX' ||
                    token.title === 'INXC' ||
                    token.title === 'IN500' ||
                    token.title === 'IUSD+' ||
                    token.title === 'WIBS'
                )
                .map((token, index) => {
                  return (
                    <Option
                      key={index}
                      value={token.address}
                      type="link"
                      className="common__token d-flex bs_token_container"
                      data-address={token.address}
                    >
                      <div className="d-flex">
                        <img
                          src={
                            require(`../../assets/token-icons/${token.image}.png`)
                              .default
                          }
                          alt="IN500"
                          width={
                            ['INEX', 'IN500', 'INXC', 'IUSD'].some((str) =>
                              token.image.includes(str)
                            )
                              ? '42'
                              : '42'
                          }
                          height="35"
                        />
                        <div className="font_20x padding-l-1x d-flex flex-align-center">
                          {token.title}{' '}
                          <span
                            style={{ color: 'rgba(95, 95, 95, 0.5)' }}
                            className="margin-l-0_5x"
                          >
                            {token.subTitle}
                          </span>{' '}
                        </div>
                      </div>
                    </Option>
                  );
                })}
            </Select>

            {/* <div className='d-flex'><img src={IN500} alt="IN500" width="38"   /><div className='font_20x padding-l-1x d-flex flex-align-center'>IN500 <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">Indexx 500</span> </div></div> */}
            {/* <CaretDownOutlined /> */}

            {/* <RightOutlined /> */}
          </div>
          <br />
          <h1 className="font_20x padding-t-2x">
            <span style={{ color: theme.palette.text.primary }}>Send to</span>
          </h1>
          <div className="padding-t-1x">
            <label style={{ color: theme.palette.text.primary }}>Address</label>
            <br />
            <div
              className="select_container d-flex flex-justify-between flex-align-center"
              style={{ paddingLeft: 10 }}
            >
              <input
                type="text"
                placeholder="Enter address"
                className="width-100 font_20x outline-none"
                style={{ border: 'none' }}
                onChange={onChageAdd}
                maxLength={42}
              />
              <img src={AddressIcon} alt="AddressIcon" />
            </div>
            <span>
              {isWalletAddrValid ? (
                ''
              ) : (
                <Text style={{ color: theme.palette.text.primary }}>
                  Invalid Wallet Address
                </Text>
              )}
            </span>
          </div>
          <div className="padding-t-1x">
            <label style={{ color: theme.palette.text.primary }}>Amount</label>
            <br />
            <div
              className="select_container d-flex flex-justify-between flex-align-center"
              style={{ paddingLeft: 10 }}
            >
              <input
                type="number"
                placeholder="Enter Amount"
                className="width-100 font_23x outline-none"
                style={{ border: 'none' }}
                value={receiveAmountt}
                onChange={onChangeReceiveAmt}
              />
              <div className="d-flex">
                <span className="padding-l-1x">{selectedCoin}</span>
              </div>
            </div>
          </div>
          {/* <div className='padding-t-2x'>
            <label>Network</label>


            <Select className='width-100' onChange={handleChange} placeholder="Select withdrawal network" >
              <Option value="BSC"><div className='font_20x'>BSC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Binance Smart Chain (BEP20)</span> </div></Option> */}
          {/* <Option value="BTC"><div className='font_20x'>BTC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Bitcoin</span> </div></Option> */}
          {/* <Option value="BNB"><div className='font_20x'>BNB <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Binance Beacon Chanin (BEP2)</span> </div></Option> */}
          {/* <Option value="ETH"><div className='font_20x'>ETH <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Ethereum</span> </div></Option> */}
          {/* <Option value="LTC"><div className='font_20x'>LTC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Litecoin</span> </div></Option> */}
          {/* </Select>
          </div> */}
          {network && (
            <>
              <div className="padding-t-1x">
                <label style={{ color: theme.palette.text.primary }}>
                  Amount
                </label>
                <br />
                <div
                  className="select_container d-flex flex-justify-between flex-align-center"
                  style={{ paddingLeft: 10 }}
                >
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    className="width-100 font_23x outline-none"
                    style={{ border: 'none' }}
                    value={receiveAmountt}
                    onChange={onChangeReceiveAmt}
                  />
                  <div className="d-flex">
                    <span
                      className="border-r-1x padding-r-1x text_link"
                      style={{ color: theme.palette.text.primary }}
                    >
                      MAX
                    </span>
                    <span
                      className="padding-l-1x"
                      style={{ color: theme.palette.text.primary }}
                    >
                      {selectedCoin}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <Radio.Group
                  onChange={onChange}
                  value={value}
                  className="orange margin-t-2x font_15x"
                >
                  <Space direction="vertical">
                    <Radio
                      value="funding"
                      className="orange margin-t-2x font_15x d-flex"
                    >
                      <span className="d-flex flex-align-center">
                        <span
                          style={{
                            minWidth: 200,
                            color: theme.palette.text.primary,
                          }}
                        >
                          Asset Wallet
                        </span>
                      </span>
                    </Radio>
                  </Space>
                </Radio.Group>
                <label
                  className="margin-t-2x d-flex"
                  style={{ color: theme.palette.text.primary }}
                >
                  Receive amount
                </label>
                <div className="d-flex flex-justify-between ">
                  <div className="w_50 ">
                    <div
                      className="font_weight_800"
                      style={{ color: theme.palette.text.primary }}
                    >
                      ({finalAmount}){selectedCoin}
                    </div>
                    <div style={{ color: theme.palette.text.primary }}>
                      {values?.fees} Fee
                    </div>
                  </div>
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
                    onClick={() => withdrawFiat()}
                    loading={loadings}
                  >
                    {' '}
                    Withdraw
                  </Button>
                </div>
              </div>
            </>
          )}
          {!network && (
            <div className="sensitive_data margin-t-2x">
              <div className='d-flex flex-justify-between flex_buttons margin-t-2x "'>
                <div className="w_50">
                  <div
                    className="brand_opacity_5"
                    style={{ color: theme.palette.text.primary }}
                  >
                    {selectedCoin} Balance{' '}
                  </div>
                  <div style={{ color: theme.palette.text.primary }}>
                    {singleWallet?.coinBalance} {selectedCoin}{' '}
                  </div>
                </div>

                <div className="w_50">
                  <div
                    className="brand_opacity_5"
                    style={{ color: theme.palette.text.primary }}
                  >
                    {' '}
                    Asset Wallet{' '}
                  </div>
                  <div style={{ color: theme.palette.text.primary }}>
                    {' '}
                    {selectedCoin}
                  </div>
                </div>
              </div>

              <div className="d-flex flex-justify-between padding-t-1x">
                <div className="w_50">
                  <div
                    className="brand_opacity_5"
                    style={{ color: theme.palette.text.primary }}
                  >
                    Minimum withrawal{' '}
                  </div>
                  <div>
                    {' '}
                    {values?.min} {selectedCoin}{' '}
                  </div>
                </div>

                <div className="w_50">
                  <div
                    className="brand_opacity_5"
                    style={{ color: theme.palette.text.primary }}
                  >
                    Maximum withrawal{' '}
                  </div>
                  <div style={{ color: theme.palette.text.primary }}>
                    {' '}
                    {values?.max} {selectedCoin}{' '}
                  </div>
                </div>
              </div>

              <div className="d-flex flex-justify-between padding-t-1x">
                <div className="w_50">
                  <div
                    className="brand_opacity_5"
                    style={{ color: theme.palette.text.primary }}
                  >
                    Network Fee
                  </div>
                  <div style={{ color: theme.palette.text.primary }}>
                    {' '}
                    0.0005 {selectedCoin}
                  </div>
                </div>
                <div className="w_50 ">
                  <div
                    className="brand_opacity_5"
                    style={{ color: theme.palette.text.primary }}
                  >
                    Final Recieve Amount
                  </div>
                  <div
                    className="font_weight_800"
                    style={{ color: theme.palette.text.primary }}
                  >
                    {finalAmount} {selectedCoin}
                  </div>
                </div>
              </div>
              <br></br>
              {parseFloat(finalAmount) <=
                parseFloat(singleWallet?.coinBalance) &&
                parseFloat(receiveAmountt) >= values?.min &&
                parseFloat(receiveAmountt) <= values?.max && (
                  <div className="d-flex flex-justify-between ">
                    {/* //<Button type="primary" onClick={() => withdrawFiat()} disabled>Withdraw</Button> */}
                    <Button
                      type="primary"
                      disabled={!isWalletAddrValid}
                      onClick={() => withdrawCrypto()}
                      loading={loadings}
                    >
                      Withdraw
                    </Button>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
      {/* <div className='w_fiat padding-t-2x border-b-1x'>
        <h1 className='font_48x font_40x padding-b-1x padding-t-3x'>Recent Withdrawals</h1>
        <Button type="primary">Crypto Address</Button>
        {/* <div className='recent_deposit_container border-1x padding-2x'>

          <div className='d-flex'><img src={bsDollar} alt="bsDollar" width="30" height="30" /><div className='font_20x padding-l-1x'>0.07 BNB</div><Button danger className='margin-l-2x'>Completed</Button></div>
          <div className='d-flex flex-justify-between padding-t-1x'>
            <div>
              <div className='font_15x'>2022-10-03</div>
              <div className='font_15x'><span className='brand_opacity_5'>Deposit</span> wallet Funding Wallet</div>
            </div>
            <div className='font_15x'><span className='brand_opacity_5'>Network</span> BSC</div>
            <div className='font_15x'><span className='brand_opacity_5'>Address</span> 0x56092d7daffc1691662e7383c8ebc5f75247ca19<LinkOutlined className='margin-l-0_5x brand_opacity_5' /><img src={copyIcon} alt="QRCodeIcon" width="11" height="11" className='margin-l-0_5x' /></div>
            <div className='font_15x'><span className='brand_opacity_5'>TxID</span> 0x56092d7daffc....19<LinkOutlined className='margin-l-0_5x brand_opacity_5' /><img src={copyIcon} alt="QRCodeIcon" width="11" height="11" className='margin-l-0_5x' /></div>
          </div>

        </div> 
      </div> */}

      <div className="w_fiat pt-5">
        <h1 className="font_48x font_40x padding-b-1x">
          <span style={{ color: theme.palette.text.primary }}>
            Recent Withdrawal
          </span>
        </h1>
        <div className="recent_deposit_container border-1x padding-2x ">
          <Table
            columns={columns}
            dataSource={txList}
            className="transaction_crypto_history"
          />
          {/* <div className='d-flex d_crypto_status'><div className='d-flex'><img src={bsDollar} alt="bsDollar" width="38"   /><div className='font_20x padding-l-1x'>0.07 BNB</div></div><Button danger className='margin-l-2x'>Completed</Button></div>
          <div className='d-flex flex-justify-between padding-t-1x responsive_recent_deposits '>

            <div className='d-flex '><div className='wallet_funding'>
              <div className='font_15x'>2022-10-03</div>
              <div className='font_15x '><span className='brand_opacity_5'>Deposit</span> wallet Funding Wallet</div>
            </div>
              <div className='font_15x padding-l-2x padding-b-2x'><span className='brand_opacity_5'>Network</span> BSC</div></div>
            <div className='font_15x'><span className='brand_opacity_5 '>Address</span> 0x56092d7daffc1691662e7383c8ebc5f75247ca19<LinkOutlined className='margin-l-0_5x brand_opacity_5' /><img src={copyIcon} alt="QRCodeIcon" width="11" height="11" className='margin-l-0_5x' /></div>
            <div className='font_15x'><span className='brand_opacity_5 '>TxID</span> 0x56092d7daffc....19<LinkOutlined className='margin-l-0_5x brand_opacity_5' /><img src={copyIcon} alt="QRCodeIcon" width="11" height="11" className='margin-l-0_5x' /></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BSWithdarwCryptoContent;
