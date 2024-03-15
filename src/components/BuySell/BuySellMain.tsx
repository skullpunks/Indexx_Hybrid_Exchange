import '../IndexxScan/IndexxScan.css';
import './BuySell.css';
// import chartIcon from "../../assets/arts/chartIcon.svg";
// import chartHiddenIcon from "../../assets/arts/ChartHiddenIcon.svg";

//import { DownOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
// import { Button, InputNumber, Tag } from 'antd';
import { useContext, useEffect, useState } from 'react';
import BuySellCreate from './BuySellCreate';
import BuySellIntro from './BuySellIntro';
import logo from '../../assets/arts/exchange logo_green 5.svg';
import hivelogo from '../../assets/BSheader/hive exchange.png';
import etf from '../../assets/BSheader/ETF_DM.png';
import etf_light from '../../assets/BSheader/ETF_LM.png';
import token from '../../assets/BSheader/token.svg';
import stock_token from '../../assets/BSheader/stock tiken.png';
import wallstreet from '../../assets/arts/wall street icon 3 1.svg';
// import BuySellSelect from './BuySellSelect';
import BSConfirmConvert from './BSConfirmConvert';
import BSConvertInProgress from './BSConvertInProgress';
import BSConvertInProgressProcessing from './BSConvertInProgressProcessing';
import BSSellConfirmConvert from './BSSellConfirmConvert';
import BSSellInprogress from './BSSellInprogress';
import BSTractionHistory from './BSTractionHistory';
// import { Route, Routes } from 'react-router-dom';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import BinanceGraph from '../Graphs/BinanceGraph';
import BitcoinGraph from '../Graphs/BitcoinGraph';
import EthereumGraph from '../Graphs/EthereumGraph';
import DogecoinGraph from '../Graphs/DogecoinGraph';
import RippleGraph from '../Graphs/RippleGraph';
import USDCGraph from '../Graphs/USDCGraph';
import USDTGraph from '../Graphs/USDTGraph';
import FTTGraph from '../Graphs/FTTGraph';
import BCHGraph from '../Graphs/BCHGraph';
import DOTGraph from '../Graphs/DOTGraph';
import MATICGraph from '../Graphs/MATICGraph';
import Indexx500Graph from '../Graphs/Indexx500Graph';
import IndexxCryptoGraph from '../Graphs/IndexxCrypto';
import IndexxExchangeGraph from '../Graphs/IndexxExchange';
import IndexxPhoenixGraph from '../Graphs/IndexxPhoenixGraph';
import IndexxUSDPGraph from '../Graphs/IndexxUSDPGraph';
import LitecoinGraph from '../Graphs/LitecoinGraph';
import BSBuyInProgress from './BSBuyInProgress';
import BSConfirmPurchase from './BSConfirmPurchase';
// import BuySellGetStarted from './BuySellGetStarted';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import BinanceMarket from '../MarketAbout/BinanceMarket';
import BitcoinMarket from '../MarketAbout/BitcoinMarket';
import Indexx500Market from '../MarketAbout/Indexx500Market';
import IndexxCryptoMarket from '../MarketAbout/IndexxCryptoMarket';
import IndexxPhoenixMarket from '../MarketAbout/IndexxPhoenixMarket';
import IndexxUSDPMarket from '../MarketAbout/IndexxUSDPMarket';
import IndexxExchangeMarket from '../MarketAbout/IndexxExchangeMarket';
import LitecoinMarket from '../MarketAbout/LitecoinMarket';
import EthereumMarket from '../MarketAbout/EthereumMarket';
import FTTTokenMarket from '../MarketAbout/FTTTokenMarket';
import AmazonStockTokenMarket from '../MarketAbout/AmazonStockTokenMarket';
import AppleStockTokenMarket from '../MarketAbout/AppleStockTokenMarket';
import MicrosoftStockTokenMarket from '../MarketAbout/MicrosoftStockTokenMarket';
import GoogleStockTokenMarket from '../MarketAbout/GoogleStockTokenMarket';
import BroadcomStockTokenMarket from '../MarketAbout/BroadcomStockTokenMarket';
import TelsaStockTokenMarket from '../MarketAbout/TelsaStockTokenMarket';
import MetaStockTokenMarket from '../MarketAbout/MetaStockTokenMarket';
import PespiCoStockTokenMarket from '../MarketAbout/PespiCoStockTokenMarket';
import NvidiaStockTokenMarket from '../MarketAbout/NividaStockTokenMarket';
import SNP500StockTokenMarket from '../MarketAbout/SNP500StockTokenMarket';
import EqStocksETF from '../MarketAbout/EqStocksETF';
import CryptoCapETF from '../MarketAbout/CryptoCapETF';
import AlphaCryptoETF from '../MarketAbout/AlphaCryptoETF';
import IndexxFocusETF from '../MarketAbout/IndexxFocusETF';
import TokenBlendETF from '../MarketAbout/TokenBlendETF';
import SolanaMarket from '../MarketAbout/SolanaMarket';
import TronMarket from '../MarketAbout/TronMarket';
import ChainLinkMarket from '../MarketAbout/ChainLinkMarket';
import DaiMarket from '../MarketAbout/DaiMarket';
import PolygonMarket from '../MarketAbout/PolygonMarket';
import PolkadotMarket from '../MarketAbout/PolkadotMarket';
import BitcoinCashMarket from '../MarketAbout/BitcoinCashMarket';
import ToncoinMarket from '../MarketAbout/ToncoinMarket';
import ShibMarket from '../MarketAbout/ShibMarket';
import TrueUSDMarket from '../MarketAbout/TrueUSDMarket';
import LEOMarket from '../MarketAbout/LEOMarket';
import DogecoinMarket from '../MarketAbout/DogecoinMarket';
import RippleMarket from '../MarketAbout/RippleMarket';
import USDCMarket from '../MarketAbout/USDCMarket';
import TUSDMarket from '../MarketAbout/USDTMarket';
import IndexxAMZNGraph from '../Graphs/IndexxAMZNGraph';
import SolanaGraph from '../Graphs/SolanaGraph';
import TronGraph from '../Graphs/TronGraph';
import ChainLinkGraph from '../Graphs/ChainLinkGraph';
import DaiGraph from '../Graphs/DaiGraph';
import ToncoinGraph from '../Graphs/ToncoinGraph';
import ShibGraph from '../Graphs/ShibGraph';
import LEOGraph from '../Graphs/LEOGraph';
import TrueUSDGraph from '../Graphs/TrueUSDGraph';
import IndexxGOOGLGraph from '../Graphs/IndexxGOOGLGraph';
import IndexxAPPLGraph from '../Graphs/IndexxAPPLGraph';
import IndexxMETAGraph from '../Graphs/IndexxMETAGraph';
import IndexxMSFTGraph from '../Graphs/IndexxMSFTGraph';
import IndexxNVDAGraph from '../Graphs/IndexxNVDAGraph';
import IndexxPEPGraph from '../Graphs/IndexxPEPGraph';
import IndexxTLSAGraph from '../Graphs/IndexxTSLAGraph';
import IndexxBCMGraph from '../Graphs/IndexxBCMGraph';
import IndexxSP500Graph from '../Graphs/IndexxSP500Graph';
import IndexxEQSTKETFGraph from '../Graphs/IndexxEQSTKETFGraph';
import IndexxALCRYPETFGraph from '../Graphs/IndexxALCRYPETFGraph';
import IndexxTOBETFGraph from '../Graphs/IndexxTOBETFGraph';
import IndexxINDXXFETFGraph from '../Graphs/IndexxINDXXFETFGraph';
import IndexxCRYC10ETFGraph from '../Graphs/IndexxCRYC10ETFGraph';
import TabExample from './BSHeader/TabExample';
import { baseWSURL } from '../../services/api';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
// import { BSProvider } from '../../utils/SwapContext';
import in500Light from '../../assets/exchange_coins_images/in500_white.png';
import in500Dark from '../../assets/exchange_coins_images/in500_Black.png';

import inexExchangeLight from '../../assets/exchange_coins_images/inex_white.png';
import inexExchangeDark from '../../assets/exchange_coins_images/INEX_Black.png';

import iusdLight from '../../assets/exchange_coins_images/iusd+_white.png';
import iusdDark from '../../assets/exchange_coins_images/iusd+_black.png';

import inxcLight from '../../assets/exchange_coins_images/inxc_white.png';
import inxcDark from '../../assets/exchange_coins_images/inxc_black.png';

interface Props {
  setStatus: (value: string | ((prevVar: string) => string)) => void;
}
let graphs: any = {
  BitcoinGraph: BitcoinGraph,
  Indexx500Graph: Indexx500Graph,
  EthereumGraph: EthereumGraph,
  IndexxCrypto: IndexxCryptoGraph,
  IndexxUSDPGraph: IndexxUSDPGraph,
  BinanceGraph: BinanceGraph,
  DogecoinGraph: DogecoinGraph,
  RippleGraph: RippleGraph,
  USDCGraph: USDCGraph,
  USDTGraph: USDTGraph,
  TrueUSDGraph: TrueUSDGraph,
  LEOGraph: LEOGraph,
  TronGraph: TronGraph,
  BCHGraph: BCHGraph,
  MATICGraph: MATICGraph,
  DOTGraph: DOTGraph,
  SolanaGraph: SolanaGraph,
  ChainLinkGraph: ChainLinkGraph,
  DaiGraph: DaiGraph,
  ToncoinGraph: ToncoinGraph,
  ShibGraph: ShibGraph,
  LitecoinGraph: LitecoinGraph,
  IndexxExchange: IndexxExchangeGraph,
  IndexxExchangePolygon: IndexxExchangeGraph,
  IndexxPhoenixGraph: IndexxPhoenixGraph,
  FTTGraph: FTTGraph,
  IndexxAMZNGraph: IndexxAMZNGraph,
  IndexxBCMGraph: IndexxBCMGraph,
  IndexxSP500Graph: IndexxSP500Graph,
  IndexxGOOGLGraph: IndexxGOOGLGraph,
  IndexxAPPLGraph: IndexxAPPLGraph,
  IndexxMETAGraph: IndexxMETAGraph,
  IndexxMSFTGraph: IndexxMSFTGraph,
  IndexxNVDAGraph: IndexxNVDAGraph,
  IndexxPEPGraph: IndexxPEPGraph,
  IndexxTLSAGraph: IndexxTLSAGraph,
  IndexxEQSTKETFGraph: IndexxEQSTKETFGraph,
  IndexxALCRYPETFGraph: IndexxALCRYPETFGraph,
  IndexxCRYC10ETFGraph: IndexxCRYC10ETFGraph,
  IndexxINDXXFETFGraph: IndexxINDXXFETFGraph,
  IndexxTOBETFGraph: IndexxTOBETFGraph,
};

let markets: any = {
  BitcoinGraph: BitcoinMarket,
  Indexx500Graph: Indexx500Market,
  EthereumGraph: EthereumMarket,
  IndexxCrypto: IndexxCryptoMarket,
  IndexxUSDPGraph: IndexxUSDPMarket,
  BinanceGraph: BinanceMarket,
  RippleGraph: RippleMarket,
  DogecoinGraph: DogecoinMarket,
  USDCGraph: USDCMarket,
  USDTGraph: TUSDMarket,
  TronGraph: TronMarket,
  BCHGraph: BitcoinCashMarket,
  MATICGraph: PolygonMarket,
  DOTGraph: PolkadotMarket,
  TrueUSDGraph: TrueUSDMarket,
  LEOGraph: LEOMarket,
  SolanaGraph: SolanaMarket,
  ChainLinkGraph: ChainLinkMarket,
  DaiGraph: DaiMarket,
  ToncoinGraph: ToncoinMarket,
  ShibGraph: ShibMarket,
  LitecoinGraph: LitecoinMarket,
  IndexxExchange: IndexxExchangeMarket,
  IndexxExchangePolygon: IndexxExchangeMarket,
  IndexxPhoenixGraph: IndexxPhoenixMarket,
  FTTGraph: FTTTokenMarket,
  IndexxAMZNGraph: AmazonStockTokenMarket,
  IndexxBCMGraph: BroadcomStockTokenMarket,
  IndexxSP500Graph: SNP500StockTokenMarket,
  IndexxGOOGLGraph: GoogleStockTokenMarket,
  IndexxAPPLGraph: AppleStockTokenMarket,
  IndexxMETAGraph: MetaStockTokenMarket,
  IndexxMSFTGraph: MicrosoftStockTokenMarket,
  IndexxNVDAGraph: NvidiaStockTokenMarket,
  IndexxPEPGraph: PespiCoStockTokenMarket,
  IndexxTLSAGraph: TelsaStockTokenMarket,
  IndexxEQSTKETFGraph: EqStocksETF,
  IndexxALCRYPETFGraph: AlphaCryptoETF,
  IndexxCRYC10ETFGraph: CryptoCapETF,
  IndexxINDXXFETFGraph: IndexxFocusETF,
  IndexxTOBETFGraph: TokenBlendETF,
};
const BuySellMain: React.FC<Props> = ({ setStatus }) => {
  // const [status, setStatus] = useState("");
  const [toggleChart, setToggleChart] = useState(true);
  const [screenName, setScreenName] = useState('');
  const [hasEmail, setHasEmail] = useState(false);
  const { BSvalue } = useContext(BSContext) as BSContextType;

  const [graphImage, setGraphImage] = useState('');
  const [graphImageSrc, setGraphImageSrc] = useState<any>();
  const [isGraphImage, setIsGraphImage] = useState(true);

  useEffect(() => {
    if (BSvalue && BSvalue.fromGraph) {
      if (BSvalue.fromGraph === 'IndexxCrypto') {
        setIsGraphImage(true);
        setGraphImage('inxc');
      } else if (BSvalue.fromGraph === 'Indexx500Graph') {
        setIsGraphImage(true);
        setGraphImage('in500');
      } else if (
        BSvalue.fromGraph === 'IndexxExchangePolygon' ||
        BSvalue.fromGraph === 'IndexxExchange'
      ) {
        setIsGraphImage(true);
        setGraphImage('inexExchange');
      } else if (BSvalue.fromGraph === 'IndexxUSDPGraph') {
        setIsGraphImage(true);
        setGraphImage('iusd');
      } else {
        setIsGraphImage(false);
        setGraphImage('');
      }
    }
  }, [BSvalue]);

  let ChartCoin: any = Indexx500Graph;
  let MarketCoin: any = Indexx500Market;
  if (BSvalue && BSvalue.fromGraph && graphs) {
    ChartCoin = graphs[BSvalue.fromGraph];
    MarketCoin = markets[BSvalue.fromGraph];
  }

  const themes = useTheme();
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    const userId = localStorage.getItem('user');
    if (userId !== undefined && userId !== null) {
      setHasEmail(true);
    }
  }, [hasEmail]);

  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'light'
  );

  useEffect(() => {
    if (graphImage) {
      if (graphImage === 'inxc') {
        if (theme === 'dark') {
          setGraphImageSrc(inxcDark);
        } else {
          setGraphImageSrc(inxcLight);
        }
      } else if (graphImage === 'in500') {
        if (theme === 'dark') {
          setGraphImageSrc(in500Dark);
        } else {
          setGraphImageSrc(in500Light);
        }
      } else if (graphImage === 'inexExchange') {
        if (theme === 'dark') {
          setGraphImageSrc(inexExchangeDark);
        } else {
          setGraphImageSrc(inexExchangeLight);
        }
      } else if (graphImage === 'iusd') {
        if (theme === 'dark') {
          setGraphImageSrc(iusdDark);
        } else {
          setGraphImageSrc(iusdLight);
        }
      }
    }
  }, [graphImage, theme]);
  useEffect(() => {
    const handleStorageChange = (event: any) => {
      console.log(event);
      setTheme(event.currentTarget.localStorage.selectedTheme);
      if (window.location.pathname.includes('for-honeybee')) {
        setTheme('light');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // const tabKeyMap = {
  //   all: 0,
  //   token: 1,
  //   stock: 2,
  //   powerpack: 3,
  // };

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedSubTab, setSelectedSubTab] = useState(0);

  const handleETFTabChange = (event: any, newValue: number) => {
    setSelectedSubTab(newValue);
  };
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const [params] = useSearchParams();

  useEffect(() => {
    const tabname = String(params.get('tab'));

    if (tabname === 'sttoken') {
      setSelectedTab(2);
      setSelectedSubTab(0);
    } else if (tabname === 'etf') {
      setSelectedTab(2);
      setSelectedSubTab(1);
    } else {
      setSelectedTab(0);
      setSelectedSubTab(0);
    }
  }, []);

  return (
    <div className="swap_container">
      <TabExample
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
        selectedSubTab={selectedSubTab}
        handleETFTabChange={handleETFTabChange}
      />
      <span style={{ textAlign: 'center' }}>
        {localStorage.getItem('userlogged') === 'normal' ? (
          <p
            style={{
              marginTop: `${isMobile ? '180px' : '220px'}`,
              fontSize: `${isMobile ? '20px' : '40px'}`,
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                marginRight: `${isMobile ? '10px' : '20px'}`,
                width: `${isMobile ? '40px' : '64px'}`,
              }}
            />
            Indexx Exchange
            {selectedTab === 1 && (
              <>
                {' '}
                -
                <img
                  src={token}
                  alt="logo"
                  style={{
                    marginLeft: '10px',
                    marginTop: '-10px',
                    width: `${isMobile ? '40px' : '64px'}`,
                  }}
                />{' '}
                Tokens
              </>
            )}
            {selectedTab === 2 && (
              <>
                {selectedSubTab === 0 && (
                  <>
                    {' '}
                    -
                    <a href={baseWSURL}>
                      <img
                        src={wallstreet}
                        alt="logo"
                        style={{
                          marginLeft: '10px',
                          width: `${isMobile ? '80px' : '114px'}`,
                        }}
                        className="walls"
                      />
                    </a>
                    <img
                      src={stock_token}
                      alt="logo"
                      style={{
                        marginLeft: '-1px',
                        marginRight: '10px',
                        width: `${isMobile ? '45px' : '64px'}`,
                      }}
                    />{' '}
                    Stock Tokens
                  </>
                )}

                {selectedSubTab === 1 && (
                  <>
                    {' '}
                    -
                    <a href={baseWSURL}>
                      <img
                        src={wallstreet}
                        alt="logo"
                        style={{
                          marginLeft: '10px',
                          width: `${isMobile ? '80px' : '114px'}`,
                        }}
                        className="walls"
                      />
                    </a>
                    <img
                      src={theme === 'dark' ? etf : etf_light}
                      alt="logo"
                      style={{
                        marginLeft: '0px',
                        marginRight: '10px',
                        width: `${isMobile ? '45px' : '64px'}`,
                      }}
                    />
                  </>
                )}
              </>
            )}
          </p>
        ) : (
          <p
            style={{
              marginTop: `${
                (window.location.pathname.includes('for-honeybee') ||
                  (localStorage.getItem('userType') === 'CaptainBee' &&
                    localStorage.getItem('haspp') === 'false')) === true
                  ? `${isMobile ? '250px' : '300px'}`
                  : `${isMobile ? '180px' : '280px'}`
              }`,
              fontSize: `${isMobile ? '20px' : '40px'}`,
            }}
          >
            <img
              src={hivelogo}
              alt="logo"
              style={{
                marginRight: `${isMobile ? '10px' : '20px'}`,
                width: `${isMobile ? '40px' : '64px'}`,
              }}
            />
            Hive Exchange
            {selectedTab === 1 && (
              <>
                {' '}
                -
                <img
                  src={token}
                  alt="logo"
                  style={{
                    marginLeft: '10px',
                    marginTop: '-10px',
                    width: `${isMobile ? '40px' : '64px'}`,
                  }}
                />{' '}
                Tokens
              </>
            )}
            {selectedTab === 2 && (
              <>
                {selectedSubTab === 0 && (
                  <>
                    {' '}
                    -
                    <a href={baseWSURL}>
                      <img
                        src={wallstreet}
                        alt="logo"
                        style={{
                          marginLeft: '10px',
                          width: `${isMobile ? '80px' : '114px'}`,
                        }}
                        className="walls"
                      />
                    </a>
                    <img
                      src={stock_token}
                      alt="logo"
                      style={{
                        marginLeft: '-1px',
                        marginRight: '10px',
                        width: `${isMobile ? '45px' : '64px'}`,
                      }}
                    />{' '}
                    Stock Tokens
                  </>
                )}

                {selectedSubTab === 1 && (
                  <>
                    {' '}
                    -
                    <a href={baseWSURL}>
                      <img
                        src={wallstreet}
                        alt="logo"
                        style={{
                          marginLeft: '10px',
                          width: `${isMobile ? '80px' : '114px'}`,
                        }}
                        className="walls"
                      />
                    </a>
                    <img
                      src={theme === 'dark' ? etf : etf_light}
                      alt="logo"
                      style={{
                        marginLeft: '0px',
                        marginRight: '10px',
                        width: `${isMobile ? '45px' : '64px'}`,
                      }}
                    />
                  </>
                )}
              </>
            )}
          </p>
        )}
        <p style={{ fontSize: 15, marginTop: '10px' }}>
          {hasEmail
            ? 'Get started to easily trade and earn crypto and stocks'
            : 'Sign up to easily trade and earn crypto and stocks'}
        </p>
      </span>

      <div
        className="scan-container flex-align-stretch bs_main with-graph"
        style={{ marginTop: -140 }}
      >
        <div
          style={{
            maxWidth: '900px',
            flex: 1,
            minHeight: '450px',
            background: theme === 'dark' ? 'black' : 'white',
            border: '1px solid lightgrey',
          }}
        >
          {isGraphImage ? (
            <img src={graphImageSrc} style={{ width: '100%' }} />
          ) : (
            toggleChart && <ChartCoin />
          )}
        </div>

        {/* */}

        {/* {screenName === "" && <BuySellIntro setScreenName={setScreenName} />} */}
        {/* {screenName === "select" && <BuySellSelect setScreenName={setScreenName} />} */}
        {/* {screenName === "confirmPurchase" && <BSConfirmPurchase setScreenName={setScreenName} />} */}
        {/* {screenName === "BSBuyInProgress" && <BSBuyInProgress setScreenName={setScreenName} />} */}
        {/* {screenName === "create" && <BuySellCreate setScreenName={setScreenName} />} */}
        {/* {screenName === "confirmConvert" && <BSConfirmConvert setScreenName={setScreenName} />} */}
        {/* {screenName === "BSConvertInProgress" && <BSConvertInProgress setScreenName={setScreenName} />} */}
        {/* {screenName === "BSConvertInProgressProcessing" && <BSConvertInProgressProcessing setScreenName={setScreenName} />} */}
        {/* {screenName === "BSTractionHistory" && <BSTractionHistory setScreenName={setScreenName} setToggleChart={setToggleChart} />} */}
        {/* {screenName === "BSSellConfirmConvert" && <BSSellConfirmConvert setScreenName={setScreenName} />} */}
        {/* {screenName === "BSSellInprogress" && <BSSellInprogress setScreenName={setScreenName} />} */}
        <Routes>
          <Route
            path=""
            element={
              <BuySellIntro
                setScreenName={setScreenName}
                tokenType={selectedTab}
                subtokenType={selectedSubTab}
              />
            }
          />
          <Route
            path="confirm-purchase"
            element={<BSConfirmPurchase setScreenName={setScreenName} />}
          />
          <Route
            path="buy-in-progress"
            element={<BSBuyInProgress setScreenName={setScreenName} />}
          />
          <Route
            path="create"
            element={<BuySellCreate setScreenName={setScreenName} />}
          />
          <Route
            path="confirm-convert"
            element={<BSConfirmConvert setScreenName={setScreenName} />}
          />
          <Route
            path="convert-in-progress"
            element={<BSConvertInProgress setScreenName={setScreenName} />}
          />
          <Route
            path="confirm-convert/:id"
            element={<BSConfirmConvert setScreenName={setScreenName} />}
          />
          <Route
            path="convert-in-progress/:id"
            element={<BSConvertInProgress setScreenName={setScreenName} />}
          />
          <Route
            path="convert-in-progress-process"
            element={
              <BSConvertInProgressProcessing setScreenName={setScreenName} />
            }
          />
          <Route
            path="traction-history"
            element={
              <BSTractionHistory
                setScreenName={setScreenName}
                setToggleChart={setToggleChart}
              />
            }
          />
          <Route
            path="sell-confirm-convert"
            element={<BSSellConfirmConvert setScreenName={setScreenName} />}
          />
          <Route
            path="sell-in-progress"
            element={<BSSellInprogress setScreenName={setScreenName} />}
          />
          <Route
            path="sell-confirm-convert/:id"
            element={<BSSellConfirmConvert setScreenName={setScreenName} />}
          />
          <Route
            path="sell-in-progress/:id"
            element={<BSSellInprogress setScreenName={setScreenName} />}
          />
        </Routes>
      </div>
      {/* <div
        className="d-flex justify-content-center"
        style={{ marginBottom: 200 }}
      >
        <div className="coll">
          <Collapse
            ghost={true}
            accordion
            style={{

              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              color: '#5f5f5f',
            }}
          >
            <Panel
              showArrow={false}
              style={{ backgroundColor: 'white', fontSize: 30, color: '' }}
              header="Market"
              key="1"
            >
              <Divider style={{ marginTop: -20 }}></Divider>
              <p style={{ fontSize: 10 }}>
                <div className="row">
                  <div className="col" style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>Market Cap</p>
                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>$156.6B</p> <br />

                    <br />
                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>Market Cap</p>
                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>Not enough data</p><br />

                    <br />
                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>PRICE CHANGE (24H)</p>
                    <p style={{ fontSize: 10, color: 'red' }}>+1.74%</p><br />
                  </div>
                  <div className="col" style={{ textAlign: 'left' }}>

                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>VOLUME (24H)</p>
                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>$6.4B</p><br />

                    <br />
                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>POPULARITY</p>
                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>#1</p><br />

                    <br />
                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>PRICE CHANGE (7D)</p>
                    <p style={{ fontSize: 10, color: 'red' }}>+0.61%</p><br />
                  </div>
                  <div className="col" style={{ textAlign: 'left' }}>


                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>CIRCULATING SUPPLY</p>
                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>112.6M INEX</p><br />

                    <br />
                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>ALL TIME HIGH</p>
                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>$3.8 M</p><br />



                  </div>
                  <div className="col" style={{ textAlign: 'left' }}>

                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>TYPICAL HOLD TIME</p>
                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>120 days</p><br />

                    <br />
                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>PRICE CHANGE (1H)</p>
                    <p style={{ fontSize: 10, color: 'red' }}>-0.06%</p><br />
                  </div>
                </div>
              </p>
            </Panel>
            <Divider></Divider>
            <Panel
              showArrow={false}
              style={{
                backgroundColor: 'white',
                fontSize: 30,
                color: '#5F5F5F',
              }}
              header="About"
              key="2"
            ><Divider style={{ marginTop: -20 }}></Divider>
              <div style={{ textAlign: 'left', color: '#5F5F5F' }}>
                <Image preview={false} style={{ marginBottom: 10 }} src={ca}></Image><br />
                <p style={{ fontSize: 20 }}>Indexx Exchange </p>
                <p style={{ fontSize: 15, lineHeight: 2 }}>
                  Indexx.ai’s Utility and Reward Token. It will be needed to
                  participate in all derivatives like Daily Fortune, Casino and
                  Games. The price is low at the moment but has the highest
                  potential to increase value because of its characteristics,
                  demand and need. Today is the best time to hoard Indexx
                  Exchange since it is only $0.10/INEX and it is predicted to
                  increase its value within 3 - 6 months time.
                </p>
                <br />

                <p style={{ fontSize: 20 }}>How It Works </p>
                <p style={{ fontSize: 15, lineHeight: 2 }}>
                  Indexx Exchange-based apps are built using “smart contracts.”
                  Smart contracts, like regular paper contracts, establish the
                  terms of an arrangement between parties. But unlike an
                  old-fashioned contract, smart contracts automatically execute
                  when the terms are met without the need for either
                  participating party to know who is on the other side of the
                  deal — and without the need for any kind of intermediary.
                </p>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div> */}

      <MarketCoin />

      {screenName === '' ||
      screenName === 'select' ||
      screenName === 'create' ? (
        <></>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BuySellMain;
