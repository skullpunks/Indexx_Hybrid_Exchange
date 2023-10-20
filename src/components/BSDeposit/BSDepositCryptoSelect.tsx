import React, { useEffect, useState } from 'react';

import {
  ArrowRightOutlined,
  CopyOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { Button, Input, Popover, Select, Table } from 'antd';
// import bsDollar from "../../assets/arts/bsDollar.svg";
// import QRCodeIcon from "../../assets/arts/QRCodeIcon.svg";
// import IN500 from "../../assets/token-icons/33.png";
import OpenNotification from '../OpenNotification/OpenNotification';

import copyIcon from '../../assets/arts/copyIcon.svg';
import { Link, useNavigate } from 'react-router-dom';
import initialTokens from '../../utils/Tokens.json';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import useCopyToClipboard from '../../utils/useCopyToClipboard';
import {
  decodeJWT,
  transactionList,
  getUserWallets,
  checkAndUpdateDeposit,
  getFTTCoreWalletDetails,
} from '../../services/api';
import { ColumnsType } from 'antd/lib/table';
import { QRCodeCanvas } from 'qrcode.react';
import { CheckCircleFilled } from '@ant-design/icons';
import ShortenText from '../../utils/ShortenText';

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

export const BSDepositCryptoSelect = () => {
  const [loadings, setLoadings] = useState<boolean>(false);
  const navigate = useNavigate();
  const [network, setNetwork] = useState('');
  const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
  // const { Option } = Select;
  const [txList, setTxList] = useState() as any;
  const [usersWallets, setUsersWallets] = useState() as any;
  const [singleWallet, setSingleWallet] = useState() as any;
  const [depositHash, setDepositHash] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('INEX');

  const [copiedValue, copy] = useCopyToClipboard();


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
          {ShortenText(record.txId, 0, 20) + '...'}
          <span>
            {/* <Tooltip title="Copied to Clipboard" >
              &nbsp;
            </Tooltip> */}
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
          {ShortenText(record.to, 0, 20) + '...'}
          <span>
            <CopyOutlined
              className="padding-lr-1x hover_icon"
              onClick={() => copy(record.to)}
            />
            {/* <LinkOutlined /> */}
          </span>
        </span>
      ),
      responsive: ['sm'],
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const decodedToken: any = decodeJWT(String(token)) as any;

    transactionList(decodedToken?.email).then((res) => {
      let finalArr = res.data.filter(
        (x: any) => x.transactionType === 'DEPOSIT_CYRPTO'
      );

      setTxList(finalArr);
    });
    getUserWallets(decodedToken?.email).then((res) => {

      setUsersWallets(res.data);
    });
  }, []);

  const handleChange = async (value: string) => {
    setNetwork(value);

    if (selectedCoin === 'FTT') {
      if (value === 'ETH') {
        //alert(value);
        const coreFTTWallet = await getFTTCoreWalletDetails();

        setSingleWallet(coreFTTWallet);
      } else {
        alert('Please select ETH network for FTT Deposit');
      }
    } else if (
      selectedCoin === 'ETH' ||
      selectedCoin === 'LTC' ||
      selectedCoin === 'BTC'
    ) {
      const userWallet = usersWallets.filter(
        (x: any) => x.coinSymbol === value
      );
      setSingleWallet(userWallet[0]);
    } else {
      const userWallet = usersWallets.filter(
        (x: any) => x.coinSymbol === value
      );
      if (value === 'ETH') {

        alert(`Please select BNB network for ${selectedCoin} Deposit`);
      } else {
        setSingleWallet(userWallet[0]);
      }
    }
  };

  const handleChangeCurrency = (value: string) => {
    let getRequiredCoin = initialTokens.find((x: any) => x.address === value);
    const userWallet = usersWallets.filter(
      (x: any) => x.coinSymbol === getRequiredCoin?.title
    );

    setSelectedCoin(String(getRequiredCoin?.title));
    setSingleWallet(userWallet[0]);
    //qrcode(userWallet[0].coinWalletAddress);
    if (setBSvalue && BSvalue) {
      setBSvalue({ ...BSvalue, fromToken: value });
    }
  };

  const updateDepositTx = async (e: React.FormEvent<HTMLInputElement>) => {
    let testVal: string = '';
    if (e.currentTarget != null) {
      testVal = e?.currentTarget?.value;
      setDepositHash(String(testVal));
    }
  };

  const submitDepositRequest = async () => {
    setLoadings(true);
    const token = localStorage.getItem('access_token');
    const decodedToken: any = decodeJWT(String(token)) as any;


    const res = await checkAndUpdateDeposit(
      decodedToken.email,
      depositHash,
      String(selectedCoin),
      String(network)
    );

    if (res.status === 200) {
      setLoadings(false);
      OpenNotification('success', 'Your Deposit is successfully');
    } else {
      setLoadings(false);
      OpenNotification('error', res.data.message);
    }
  };


  const content = (value: string, network: string, address: string) => (
    <div className="popover_container " style={{}}>
      <div className="font_13x text-center brand_color">
        Scan the code on the withdrawal page of the trading platform APP or
        wallet APP
      </div>
      <div className="text-center margin-tb-2x">
        <QRCodeCanvas id="qrCode" value={address} size={200} level={'H'} />
      </div>
      <ul className="brand_color disc_ul">
        <li>Send only {value} to this deposit address.</li>
        <li>Ensure the network is {network}.</li>
        <li>Do not send NFTs to this address.</li>
        <Link to="" className="popover_container_link">
          Learn how to deposit NFTs
        </Link>
      </ul>
    </div>
  );

  return (
    <div className="scan-container bs_main wd_container">
      <div className="d-flex w_fiat flex-justify-between flex-align-center d_crypto_Container">
        <div className="d-flex flex-align-center top_heading">
          <span
            onClick={() => navigate('/indexx-exchange/buy-sell/deposit-crypto')}
          >
            Deposit Crypto
          </span>
        </div>
        <div className="crypto_con_button">
          <Button
            danger
            className="danger_disabled"
            onClick={() => navigate('/indexx-exchange/buy-sell/deposit-fiat')}
          >
            Deposit Fiat
            <ArrowRightOutlined />
          </Button>
        </div>
      </div>

      <div className="card responsive_container bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x responsive_container deposit-select">
        <h1 className="font_20x padding-t-2x padding-b-1x">Select Coin</h1>
        <div className="">
          <label>Currency</label>
          <Select
            className="width-100"
            onChange={handleChangeCurrency}
            value={BSvalue?.fromToken}
          >
            {initialTokens
              .filter(
                (x: any) =>
                  x.title === 'BNB' ||
                  x.title === 'ETH' ||
                  x.title === 'IN500' ||
                  x.title === 'INEX' ||
                  x.title === 'INXC' ||
                  x.title === 'IUSD+' ||
                  x.title === 'FTT' ||
                  x.title === 'DOGE' ||
                  x.title === 'XRP'
              )
              .map((token) => {
                return (
                  <Select.Option
                    key={token.address}
                    value={token.address}
                    className="common__token d-flex bs_token_container"
                    data-address={token.address}
                  >
                    <div className="d-flex bs_token_num">
                      <img
                        src={
                          require(`../../assets/token-icons/${token.image}.png`)
                            .default
                        }
                        alt="IN500"
                        width="38"
                        height="38"
                      />
                      <div className=" padding-l-1x d-flex flex-align-center">
                        {token.title}{' '}
                        <span
                          style={{ color: 'rgba(95, 95, 95, 0.5)' }}
                          className="margin-l-0_5x"
                        >
                          {token.subTitle}
                        </span>{' '}
                      </div>
                    </div>
                  </Select.Option>
                );
              })}
          </Select>
          {/* <div className='select_container d-flex flex-justify-between flex-align-center' style={{ paddingLeft: 10 }}>

            <div className='d-flex'><img src={IN500} alt="IN500" width="38" height="38" /><div className='font_20x padding-l-1x d-flex flex-align-center'>IN500 <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">Indexx 500</span> </div></div>
            <CaretDownOutlined />

          </div> */}
          <br />
          <h1 className="font_20x padding-t-2x">Deposit to</h1>
          <div className="padding-t-1x">
            <label>Network</label>

            <Select className="width-100" onChange={handleChange}>
              <Select.Option value="BSC">
                <div className="font_20x">
                  BSC{' '}
                  <span style={{ color: 'rgba(95, 95, 95, 0.5)' }}>
                    Binance Smart Chain (BEP20)
                  </span>{' '}
                </div>
              </Select.Option>
              {/* <Option value="BTC"><div className='font_20x'>BTC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Bitcoin</span> </div></Option> */}
              <Select.Option value="BNB">
                <div className="font_20x">
                  BNB{' '}
                  <span style={{ color: 'rgba(95, 95, 95, 0.5)' }}>
                    Binance Beacon Chain (BEP2)
                  </span>{' '}
                </div>
              </Select.Option>
              <Select.Option value="ETH">
                <div className="font_20x">
                  ETH{' '}
                  <span style={{ color: 'rgba(95, 95, 95, 0.5)' }}>
                    Ethereum
                  </span>{' '}
                </div>
              </Select.Option>
              <Select.Option value="XRP">
                <div className="font_20x">
                  XRP{' '}
                  <span style={{ color: 'rgba(95, 95, 95, 0.5)' }}>
                    Ripple
                  </span>{' '}
                </div>
              </Select.Option>
              <Select.Option value="DOGE">
                <div className="font_20x">
                  DOGE{' '}
                  <span style={{ color: 'rgba(95, 95, 95, 0.5)' }}>
                    Dogecoin
                  </span>{' '}
                </div>
              </Select.Option>
              {/* <Option value="LTC"><div className='font_20x'>LTC <span style={{ color: "rgba(95, 95, 95, 0.5)" }}>Litecoin</span> </div></Option> */}
            </Select>

          </div>
          {network && (
            <div className="sensitive_data margin-t-2x">
              <div>Address</div>
              <div>

                {selectedCoin !== 'FTT'
                  ? singleWallet?.coinWalletAddress
                  : singleWallet?.coinAddress}
                <img
                  src={copyIcon}
                  alt="copy icon"
                  width="21"
                  height="11"
                  className="padding-l-1x cursor-pointer"
                  style={{ marginBottom: "5px" }}
                  onClick={() => copy(singleWallet?.coinWalletAddress)}
                />
              </div>
              <div className="margin-t-2x d-flex flex-align-center ">
                <div>
                  Click to scan QR Code
                </div>
                {selectedCoin === 'FTT' ? (
                  <Popover
                    placement="bottom"
                    content={content(
                      singleWallet?.coinSymbol,
                      singleWallet?.coinNetwork,
                      singleWallet?.coinAddress
                    )}
                    trigger="click"
                  >
                    <QrcodeOutlined className="padding-l-1x" />
                  </Popover>
                ) : (
                  <Popover
                    placement="bottom"
                    content={content(
                      singleWallet?.coinSymbol,
                      singleWallet?.coinNetwork,
                      singleWallet?.coinWalletAddress
                    )}
                    trigger="click"
                  >
                    <QrcodeOutlined className="padding-l-1x" />
                  </Popover>
                )}
              </div>

              <div className='d-flex flex-justify-between flex_buttons margin-t-2x "'>
                <div className="w_50">
                  <div className="brand_opacity_5">Expected arrival </div>
                  <div>3 network confirmations </div>
                </div>
                <div className="w_50">
                  <div className="brand_opacity_5">Expected unlock</div>
                  <div>
                    {' '}
                    <span className="text_link">2</span> network confirmations
                  </div>
                </div>
              </div>
              <div className="d-flex flex-justify-between padding-t-1x">
                <div className="w_50">
                  <div className="brand_opacity_5"> Minimum deposit </div>
                  <div>0.0001 {singleWallet?.coinSymbol} </div>
                </div>
                <div className="w_50">
                  <div className="brand_opacity_5">Selected wallet</div>
                  <div>
                    {' '}
                    Funding Wallet
                    {/* <span className="text_link"> <Link className='text_link' to="/indexx-exchange/buy-sell/deposit-crypto/deposit-wallet">Change</Link></span> */}
                  </div>
                </div>
              </div>

              <ul className="margin-t-2x disc_ul">
                <li>
                  Send only {singleWallet?.coinSymbol} to this deposit address.
                </li>
                <li>
                  Ensure the network is{' '}
                  <span className="text_link">
                    {singleWallet?.coinNetwork}.
                  </span>
                </li>
                <li>Do not send NFTs to this address.</li>
              </ul>
            </div>
          )}
        </div>
        <br></br>
        <div>
          <Input
            onChange={updateDepositTx}
            size={'middle'}
            style={{ width: '100%', marginBottom: '10px' }}
            placeholder="Enter Deposit Transaction Hash"
          />

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
            disabled={!depositHash || depositHash.length > 66}
            loading={loadings}
            onClick={() => submitDepositRequest()}
          >
            Submit Deposit Transaction Hash
          </Button>
        </div>
      </div>
      <div className="w_fiat pt-5">
        <h1 className="font_48x font_40x padding-b-1x">Recent Deposit</h1>
        <div className="recent_deposit_container border-1x padding-2x ">
          <Table
            columns={columns}
            dataSource={txList}
            className="transaction_crypto_history"
          />
          {/* <div className='d-flex d_crypto_status'><div className='d-flex'><img src={bsDollar} alt="bsDollar" width="38" height="38" /><div className='font_20x padding-l-1x'>0.07 BNB</div></div><Button danger className='margin-l-2x'>Completed</Button></div>
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

export default BSDepositCryptoSelect;
