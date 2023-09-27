// import { Button } from 'react-bootstrap';
// import { BellOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
// import { Dropdown } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "./Header.css";
import loaderGif from "../../assets/arts/loaderIcon.gif";
// import Bellicon from "../../assets/arts/Bellicon.png";
// import headerstar from "../../assets/header-icons/Products/CEX.png";
// import headerdex from "../../assets/header-icons/Products/DEX.png";
// import whitetoken from "../../assets/header-icons/Products/IndexxToken.png";

// import earn from "../../assets/header-icons/EarnTab/t2e.png";
// import bank from "../../assets/header-icons/EarnTab/bank.png";
// import vlog from "../../assets/arts/cam.png";
// import about from "../../assets/header-icons/Company/about.png";
// import affiliate from "../../assets/header-icons/Company/affiliate.png";
// import blog from "../../assets/header-icons/Company/blog.png";
// import career from "../../assets/header-icons/Company/career.png";
// import howitworks from "../../assets/header-icons/Company/howitworks.png";
// import hybrid from "../../assets/header-icons/Company/hybrid.png";
// import giftcard from "../../assets/header-icons/Shop/gift card white.png";
// import greetcard from "../../assets/header-icons/Shop/greeting card white.png";
// import redeem from "../../assets/header-icons/Shop/redeem white.png";
// import store from "../../assets/header-icons/Shop/shop.png";
// import walletweb from "../../assets/header-icons/Wallet/wallet web white.png";
// import walletext from "../../assets/header-icons/Wallet/wallet extension white.png";
// import nft from "../../assets/header-icons/Products/nft icon.svg";
// import xusd from "../../assets/header-icons/Products/xusd icon.svg";
// import xnft from "../../assets/header-icons/Products/xnft.png";
// import fortune from "../../assets/header-icons/for.png";

import frame from '../../assets/hive-dashboard/frame.svg';
import beeframe from '../../assets/hive-dashboard/beeframe-2.svg';

import dummy from '../../assets/hive-dashboard/dummy.jpeg';

import { baseURL, baseCEXURL, getCaptainBeeStatics, getHoneyUserDetails,
baseDEXURL,
baseHiveURL,
baseMktplaceURL,
baseShopURL,
baseWSURL,
baseWalletURL,
baseXnftURL
} from "../../services/api";
import DarkMode from "../DarkMode/DarkMode";


const logOutUser = (e: React.MouseEvent<HTMLElement>) => {
  e.preventDefault();
  localStorage.removeItem("user"); //remove one item
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.clear(); //clear all localstorage
  if (window.location.pathname.includes("trade-to-earn"))
    window.location.reload();
  else window.location.href = "/indexx-exchange/buy-sell/login";
};

const Links = [
  { label: "Exchange", value: "buy-sell", url: "/indexx-exchange/buy-sell" },
  { label: "Trade To Earn", value: "trade-to-earn", url: "/indexx-exchange/trade-to-earn" },
  { label: "Markets", value: "markets", url: "/indexx-exchange/markets" },
  { label: "Tokens", value: "tokens", url: "/indexx-exchange/tokens" },
  { label: "Blog", value: "blog", url: "/indexx-exchange/blog" },
  { label: "Vlog", value: "vlog", url: "/indexx-exchange/vlog" },
  { label: "About", value: "about", url: "/indexx-exchange/about" },
  { label: "Careers", value: "careers", url: "/indexx-exchange/careers" },
  { label: "Notifications", value: "notification", url: "/indexx-exchange/notification" },
  { label: "How it Works", value: "how-it-works", url: "/indexx-exchange/how-it-works" },
  { label: "", value: "/", url: "/" },
];

const HeaderNew = () => {
  let title = <>{String(localStorage.getItem("user")).toLowerCase()}</>;
  const [, setIsInsideApp] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [staticsData, setStaticsData] = useState();
  const [honeyBeeData, setHoneyBeeData] = useState();
  const [honeybeeCreateDate, setHoneybeeCreateDate] = useState();
  const [isCaptain, setisCaptain] = useState(false);
  const [userProfile, setUserProfile] = useState();

  let pageName = searchParams.get("page");
  // alert(pageName)
  useEffect(() => {
    if (location) {
      setIsInsideApp(location.pathname.includes("/indexx-exchange/"));
    }
  }, [location]);
  const showText: any = Links.filter((link) =>
    window.location.pathname.includes(link.value)
  ).map((obj) => obj.label);
  // const showUrl: any = Links.filter((link) =>
  //   window.location.pathname.includes(link.value)
  // ).map((obj) => obj.url);
  useEffect(() => {

    (showText[0] !== "") ?
      document.title = `${showText[0]} | indexx.ai`
      :
      (pageName) ?
        document.title = `${pageName} | indexx.ai`
        :
        document.title = "indexx.ai"
  }, [showText, pageName]);
  useEffect(() => {
    const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
    const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;
    
    const user = localStorage.getItem("user") !== undefined ? String(localStorage.getItem("user")) : undefined;

    if (userType === "CaptainBee") {
      setisCaptain(true);

      getCaptainBeeStatics(String(username)).then((data) => {
        
        setUserProfile(data?.data?.affiliateUserProfile?.photoIdFileurl)
        setStaticsData(data.data);
      });
    } else {
      setisCaptain(false);

      
      getHoneyUserDetails(String(user)).then((data) => {
        
        setHoneybeeCreateDate(data.data.accountCreationDate);
        setHoneyBeeData(data?.data?._doc);
        setUserProfile(data?.data?._doc?.profilePic);
      })
    }
  }, [])
  if (
    //window.location.pathname.includes("/") ||
    ((localStorage.getItem("user") === null || localStorage.getItem("user") === undefined)) ||
    window.location.pathname.includes("get-started") ||
    window.location.pathname.includes("login") ||
    window.location.pathname.includes("/indexx-exchange/kyc")
  ) {
    return (
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
        <Container>
          <div className="d-flex logo__holder">
            <Navbar.Brand href={baseURL} className="logo__icon">
              index.ai
            </Navbar.Brand>
          </div>
          <DarkMode />
        </Container>
        <div className="loader" id="loaderLayer">
          {" "}
          <img src={loaderGif} alt="loader" />
        </div>
      </Navbar>
    );
  } else
    return (
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
        <Container style={{ maxWidth: "1360px" }}>
          <div className="d-flex logo__holder">
            <Navbar.Brand href={baseURL} className="logo__icon">
              index.ai
            </Navbar.Brand>
            {/* <Nav.Link as={Link} to={showUrl[0]} href="#" className="logo__text">
              {pageName || showText[0]}
            </Nav.Link> */}
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">


              <NavDropdown title="Platforms" id="basic-nav-dropdown" className="my-menu" renderMenuOnMount={true}>
                <div style={{ width: "200vw" }}>

                  <div style={{ height: "26px", background: "black" }}></div>
                  <div className="d-flex flex-row my-menu main-menu">
                    <div style={{ justifyContent: "center", fontSize: "13px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "18px" }}>
                        Explore Platforms
                      </div>
                      <NavDropdown.Item href={baseCEXURL} className="link-div">
                        <a href={baseCEXURL} className="link-style">
                          Exchange
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="https://fortune.daily.indexx.ai/" className="link-div">
                        <a href="https://fortune.daily.indexx.ai/" className="link-style">
                          Fortune Daily
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseShopURL} className="link-div">
                        <a href={baseShopURL} className="link-style">
                          Shop
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseDEXURL} className="link-div">
                        <a href={baseDEXURL} className="link-style">
                          Swap
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseWSURL} className="link-div">
                        <a href={baseWSURL} className="link-style">
                          Wall Street
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseMktplaceURL} className="link-div">
                        <a href={baseMktplaceURL} className="link-style">
                          Market
                        </a>
                      </NavDropdown.Item>
                    </div>
                    <div style={{ justifyContent: "center", fontSize: "13px", paddingInline: "80px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "23px" }}>
                        Action
                      </div>

                      <NavDropdown.Item href="/indexx-exchange/buy-sell/get-started" className="action-link-div">
                        <a href="/indexx-exchange/buy-sell/get-started" className="action-link-style">
                          Sign Up in Exchange

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/indexx-exchange/buy-sell/login" className="action-link-div">
                        <a href="/indexx-exchange/buy-sell/login" className="action-link-style">
                          Sign In in Exchange
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="https://fortune.daily.indexx.ai/" className="action-link-div">
                        <a href="https://fortune.daily.indexx.ai/" className="action-link-style">
                          Buy Lottery tickets

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseShopURL}/collections/gift-cards-1`} className="action-link-div">
                        <a href={`${baseShopURL}/collections/gift-cards-1`} className="action-link-style">
                          Buy Gift Cards

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseShopURL}/collections/greeting-cards`} className="action-link-div">
                        <a href={`${baseShopURL}/collections/greeting-cards`} className="action-link-style">
                          Buy Greeting Cards

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseShopURL}/collections/indexx-stock-token-tickets`} className="action-link-div">
                        <a href={`${baseShopURL}/collections/indexx-stock-token-tickets`} className="action-link-style">
                          Buy Stock Certificates
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseShopURL}/collections/stock-gift-cards`} className="action-link-div">
                        <a href={`${baseShopURL}/collections/stock-gift-cards`} className="action-link-style">
                          Buy Stock Tokens

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseDEXURL} className="action-link-div">
                        <a href={baseDEXURL} className="action-link-style">
                          Trade in swap

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseWSURL} className="action-link-div">
                        <a href={baseWSURL} className="action-link-style">
                          Walk on Wall Street
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseMktplaceURL}/collections?type=all`} className="action-link-div">
                        <a href={`${baseMktplaceURL}/collections?type=all`} className="action-link-style">
                          Buy XNFTs
                        </a>
                      </NavDropdown.Item>
                    </div>
                    <div style={{ justifyContent: "center", fontSize: "13px", paddingInline: "20px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "23px" }}>
                        Support
                      </div>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/how-it-works/centralized`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/how-it-works/centralized`} className="action-link-style">
                          How to use Exchange
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="https://fortune.daily.indexx.ai/how-to-play" className="action-link-div">
                        <a href="https://fortune.daily.indexx.ai/how-to-play" className="action-link-style">
                          Know how to play the lottery

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseHiveURL} className="action-link-div">
                        <a href={baseHiveURL} className="action-link-style">
                          Walk through the Hive

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseShopURL} className="action-link-div">
                        <a href={baseShopURL} className="action-link-style">
                          Know how to buy in the Shop


                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/how-it-works/decentralized`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/how-it-works/decentralized`} className="action-link-style">
                          How to use Swap


                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseWSURL} className="action-link-div">
                        <a href={baseWSURL} className="action-link-style">
                          Go through Wall Street

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseMktplaceURL} className="action-link-div">
                        <a href={baseMktplaceURL} className="action-link-style">
                          How to buy XNFTs


                        </a>
                      </NavDropdown.Item>
                    </div>
                  </div>
                  <div className="back"> </div>
                </div>
              </NavDropdown>

              <NavDropdown title="Products" id="basic-nav-dropdown" className="my-menu prod-menu" renderMenuOnMount={true}>
                <div style={{ width: "200vw" }}>

                  <div style={{ height: "26px", background: "black" }}></div>
                  <div className="d-flex flex-row my-menu main-menu" >
                    <div style={{ justifyContent: "center", fontSize: "13px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "18px" }}>
                        Explore Products
                      </div>
                      <NavDropdown.Item href={`${baseShopURL}/collections/gift-cards-1`} className="link-div">
                        <a href={`${baseShopURL}/collections/gift-cards-1`} className="link-style">
                          Gift Cards
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseShopURL}/collections/greeting-cards`} className="link-div">
                        <a href={`${baseShopURL}/collections/greeting-cards`} className="link-style">
                          Greeting Cards
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/nfts`} className="link-div">
                        <a href={`${baseURL}/indexx-exchange/nfts`} className="link-style">
                          NFT
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseWSURL}/certificates`} className="link-div">
                        <a href={`${baseWSURL}/certificates`} className="link-style">
                          Stock Certificates
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseWSURL}/details`} className="link-div">
                        <a href={`${baseWSURL}/details`} className="link-style">
                          Stock Tokens
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/token-details`} className="link-div">
                        <a href={`${baseURL}/indexx-exchange/token-details`} className="link-style">
                          Tokens
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseXnftURL} className="link-div">
                        <a href={baseXnftURL} className="link-style">
                          XNFT
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseXnftURL}/#fiat-cur`} className="link-div">
                        <a href={`${baseXnftURL}/#fiat-cur`} className="link-style">

                          XUSD
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/indexx-exchange/coming-soon" className="link-div">
                        <Link to="/indexx-exchange/coming-soon" className="link-style">
                          $1 Bitcoin

                        </Link>
                      </NavDropdown.Item>
                    </div>
                    <div style={{ justifyContent: "center", fontSize: "13px", paddingInline: "80px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "23px" }}>

                        Action
                      </div>
                      <NavDropdown.Item href={`${baseShopURL}/collections/gift-cards-1`} className="action-link-div">
                        <a href={`${baseShopURL}/collections/gift-cards-1`} className="action-link-style">

                          Shop Gift Cards

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseShopURL}/collections/greeting-cards`} className="action-link-div">
                        <a href={`${baseShopURL}/collections/greeting-cards`} className="action-link-style">
                          Shop Greeting Cards

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="https://opensea.io/collection/skullpunksog" className="action-link-div">
                        <a href="https://opensea.io/collection/skullpunksog" className="action-link-style">
                          Shop NFTs

                        </a>  
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseShopURL}/collections/indexx-stock-token-tickets`} className="action-link-div">
                        <a href={`${baseShopURL}/collections/indexx-stock-token-tickets`} className="action-link-style">
                          Shop Stock Certificates

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseShopURL}/collections/stock-gift-cards`} className="action-link-div">
                        <a href={`${baseShopURL}/collections/stock-gift-cards`} className="action-link-style">
                          Shop Stock Tokens

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/token-details`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/token-details`} className="action-link-style">
                          Shop Tokens
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseShopURL}/collections/xnft`} className="action-link-div">
                        <a href={`${baseShopURL}/collections/xnft`} className="action-link-style">
                          Shop XNFTs

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseMktplaceURL}/collections/xusd-nft/3`} className="action-link-div">
                        <a href={`${baseMktplaceURL}/collections/xusd-nft/3`} className="action-link-style">
                          Shop XUSDs

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/indexx-exchange/coming-soon" className="action-link-div">
                        <Link to="/indexx-exchange/coming-soon" className="action-link-style">
                          Buy $1 Bitcoin
                        </Link>
                      </NavDropdown.Item>
                    </div>
                    <div style={{ justifyContent: "center", fontSize: "13px", paddingInline: "20px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "23px" }}>

                        Support
                      </div>
                      <NavDropdown.Item href={`${baseShopURL}/collections/gift-cards-1`} className="action-link-div">
                        <a href={`${baseShopURL}/collections/gift-cards-1`} className="action-link-style">

                          How to buy Gift Cards


                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseShopURL}/collections/greeting-cards`} className="action-link-div">
                        <a href={`${baseShopURL}/collections/greeting-cards`} className="action-link-style">
                          How to buy Greeting Cards

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/nfts`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/nfts`} className="action-link-style">
                          How to buy NFTs


                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseShopURL}/collections/indexx-stock-token-tickets`} className="action-link-div">
                        <a href={`${baseShopURL}/collections/indexx-stock-token-tickets`} className="action-link-style">
                          How to buy Stock Certificates


                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/how-it-works/tokens`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/how-it-works/tokens`} className="action-link-style">
                          Learn about indexx Tokens


                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseXnftURL} className="action-link-div">
                        <a href={baseXnftURL} className="action-link-style">
                          How to buy XNFTs

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseXnftURL}/#fiat-cur`} className="action-link-div">
                        <a href={`${baseXnftURL}/#fiat-cur`} className="action-link-style">
                          How to buy XUSDs
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/indexx-exchange/coming-soon" className="action-link-div">
                        <Link to="/indexx-exchange/coming-soon" className="action-link-style">
                          Know how to buy $1 Bitcoin
                        </Link>
                      </NavDropdown.Item>
                    </div>
                  </div>
                  <div className="back prod-back"> </div>
                </div>
              </NavDropdown>



              <NavDropdown title="Program" id="basic-nav-dropdown" className="my-menu prog-menu" renderMenuOnMount={true}>
                <div style={{ width: "200vw" }}>

                  <div style={{ height: "26px", background: "black" }}></div>
                  <div className="d-flex flex-row my-menu main-menu">
                    <div style={{ justifyContent: "center", fontSize: "13px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "18px" }}>
                        Explore Program
                      </div>
                      <NavDropdown.Item href="https://register.affiliate.indexx.ai/" className="link-div">
                        <a href="https://register.affiliate.indexx.ai/" className="link-style">
                          Affiliate Program
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseHiveURL} className="link-div">
                        <a href={baseHiveURL} className="link-style">
                          Hive
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/trade-to-earn`} className="link-div">
                        <a href={`${baseURL}/indexx-exchange/trade-to-earn`} className="link-style">
                          Trade to Earn
                        </a>
                      </NavDropdown.Item>
                    </div>
                    <div style={{ justifyContent: "center", fontSize: "13px", paddingInline: "80px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "23px" }}>

                        Action
                      </div>
                      <NavDropdown.Item href="https://register.affiliate.indexx.ai/about" className="action-link-div">
                        <a href="https://register.affiliate.indexx.ai/about" className="action-link-style">
                          Sign up as an Afilliate



                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseHiveURL}/sign-up`} className="action-link-div">
                        <a href={`${baseHiveURL}/sign-up`} className="action-link-style">
                          Captain Bee Sign Up
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/indexx-exchange/coming-soon" className="action-link-div">
                        <Link to="/indexx-exchange/coming-soon" className="action-link-style">
                          Honeycomb Build Up
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/buy-sell/get-started`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/buy-sell/get-started`} className="action-link-style">
                          Trade to Earn Sign Up
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/buy-sell/login`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/buy-sell/login`} className="action-link-style">
                          Trade to Earn Sign In
                        </a>
                      </NavDropdown.Item>
                    </div>
                    <div style={{ justifyContent: "center", fontSize: "13px", paddingInline: "20px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "23px" }}>

                        Support
                      </div>
                      <NavDropdown.Item href="https://register.affiliate.indexx.ai/about" className="action-link-div">
                        <a href="https://register.affiliate.indexx.ai/about" className="action-link-style">
                          Benefit of an Affiliate
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/how-it-works/tradetoearn`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/how-it-works/tradetoearn`} className="action-link-style">
                          How to Trade to Earn
                        </a>
                      </NavDropdown.Item>
                    </div>
                  </div>
                  <div className="back prog-back"> </div>
                </div>
              </NavDropdown>


              <NavDropdown title="Wallet" id="basic-nav-dropdown" className="my-menu wallet-menu" renderMenuOnMount={true}>
                <div style={{ width: "200vw" }}>

                  <div style={{ height: "26px", background: "black" }}></div>
                  <div className="d-flex flex-row my-menu main-menu" >
                    <div style={{ justifyContent: "center", fontSize: "13px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "18px" }}>
                        Explore Wallet
                      </div>
                      <NavDropdown.Item href="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en" className="link-div">
                        <a href="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en" className="link-style">
                          Extension
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseWalletURL} className="link-div">
                        <a href={baseWalletURL} className="link-style">
                          Web
                        </a>
                      </NavDropdown.Item>
                    </div>
                    <div style={{ justifyContent: "center", fontSize: "13px", paddingInline: "80px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "23px" }}>

                        Action
                      </div>
                      <NavDropdown.Item href="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en" className="action-link-div">
                        <a href="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en" className="action-link-style">
                          Install Extension


                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseWalletURL} className="action-link-div">
                        <a href={baseWalletURL} className="action-link-style">
                          Sign up Web-2 Wallet
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={baseWalletURL} className="action-link-div">
                        <a href={baseWalletURL} className="action-link-style">
                          Sign Up Web-3 Wallet

                        </a>
                      </NavDropdown.Item>
                    </div>
                    <div style={{ justifyContent: "center", fontSize: "13px", paddingInline: "20px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "23px" }}>
                        Support
                      </div>
                      <NavDropdown.Item href="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en" className="action-link-div">
                        <a href="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en" className="action-link-style">
                          How to install and use wallet extension


                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseWalletURL}/Indexx-wallet/wallet-whitepaper`} className="action-link-div">
                        <a href={`${baseWalletURL}/Indexx-wallet/wallet-whitepaper`} className="action-link-style">
                          How to use wallet Web
                        </a>
                      </NavDropdown.Item>
                    </div>
                  </div>
                  <div className="back wallet-back"> </div>
                </div>
              </NavDropdown>


              <NavDropdown title="Company" id="basic-nav-dropdown" className="my-menu comp-menu" renderMenuOnMount={true}>
                <div style={{ width: "200vw" }}>

                  <div style={{ height: "26px", background: "black" }}></div>
                  <div className="d-flex flex-row my-menu main-menu">
                    <div style={{ justifyContent: "center", fontSize: "13px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "18px" }}>
                        Explore Company
                      </div>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/about`} className="link-div">
                        <a href={`${baseURL}/indexx-exchange/about`} className="link-style">
                          About
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/blog`} className="link-div">
                        <a href={`${baseURL}/indexx-exchange/blog`} className="link-style">
                          Blog
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/careers`} className="link-div">
                        <a href={`${baseURL}/indexx-exchange/careers`} className="link-style">
                          Careers
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/how-it-works`} className="link-div">
                        <a href={`${baseURL}/indexx-exchange/how-it-works`} className="link-style">
                          How it Works
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/markets`} className="link-div">
                        <a href={`${baseURL}/indexx-exchange/markets`} className="link-style">
                          Markets
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/vlog`} className="link-div">
                        <a href={`${baseURL}/indexx-exchange/vlog`} className="link-style">
                          Vlog
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/indexx-exchange/coming-soon" className="link-div">
                        <Link to="/indexx-exchange/coming-soon" className="link-style">
                          Document
                        </Link>
                      </NavDropdown.Item>
                    </div>
                    <div style={{ justifyContent: "center", fontSize: "13px", paddingInline: "80px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "23px" }}>
                        Action
                      </div>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/about`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/about`} className="action-link-style">
                          Know the company
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/blog`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/blog`} className="action-link-style">
                          Read updates
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/careers`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/careers`} className="action-link-style">
                          Find opportunity
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/how-it-works`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/how-it-works`} className="action-link-style">
                          Features
                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/markets`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/markets`} className="action-link-style">
                          Crypto trends

                        </a>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/vlog`} className="action-link-div">
                        <a href={`${baseURL}/indexx-exchange/vlog`} className="action-link-style">
                          Watch videos
                        </a>
                      </NavDropdown.Item>
                    </div>
                    <div style={{ justifyContent: "center", fontSize: "13px", paddingInline: "20px" }}>
                      <div className="action-link-div" style={{ paddingBottom: "23px" }}>
                        Support
                      </div>
                      <NavDropdown.Item href="/indexx-exchange/coming-soon" className="action-link-div">
                        <Link to="/indexx-exchange/coming-soon" className="action-link-style">
                          Government Certificates
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`${baseURL}/indexx-exchange/legal`} className="action-link-div">
                        <Link to={`${baseURL}/indexx-exchange/legal`} className="action-link-style">
                          Legal docs
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/indexx-exchange/coming-soon" className="action-link-div">
                        <Link to="/indexx-exchange/coming-soon" className="action-link-style">
                          Patent documents
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/indexx-exchange/coming-soon" className="action-link-div">
                        <Link to="/indexx-exchange/coming-soon" className="action-link-style">
                          Whitepapers
                        </Link>
                      </NavDropdown.Item>
                    </div>
                  </div>
                  <div className="back comp-back"> </div>
                </div>
              </NavDropdown>

              {/* {localStorage.getItem("user") ? (
                <Nav.Link as={Link} to="/indexx-exchange/markets" className='text-white link' href="#">Markets</Nav.Link>
              ) : <></>} */}

              {/* <Nav.Link  className='text-white link' href="https://test.wallet2.indexx.ai">Wallet</Nav.Link>
              <Nav.Link  className='text-white link' href="https://test.swap.indexx.ai/ai-engine">Ai Engine</Nav.Link>
              <Nav.Link  className='text-white link' href="https://test.indexx.ai/xchange">Indexx X</Nav.Link> */}
            </Nav>

            <Nav className="align-items-center">

              {localStorage.getItem("user") ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/indexx-exchange/buy-sell/"
                    href="/"
                    className="btn btn-danger text-white"
                    style={{ height: "41px", zIndex: "10000" }}
                  >
                    Buy Crypto
                  </Nav.Link>
                  {/* <img src={Bellicon} alt="Notifications"
                    className="ms-3 my-2 text-white cursor-pointer"
                    style={{ maxHeight: 26, alignSelf: "center" }}
                    onClick={() => navigate("/indexx-exchange/notification")}
                  /> */}

                  <NavDropdown title={
                    <div className="d-flex align-items-center justify-content-center">
                      <div style={{ marginBottom: "-60px", zIndex: "10000" }}>

                        <div
                          style={{
                            width: '80px',
                            height: '80px',
                            backgroundImage: `url(${isCaptain === true ? frame : beeframe})`,
                            // backgroundImage: `url(${frame})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            position: 'relative',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            // border:"none"
                          }}
                        >
                          <div
                            className="bee-hexagon"
                            style={{ marginBottom: `${isCaptain === true ? 0 : "7px"}` }}
                          >
                            <img
                              alt=""
                              src={userProfile ? userProfile : dummy}
                              width={'63px'}
                              height={'66px'}
                              style={{
                                border: "none"
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div>

                        {title}
                      </div>
                    </div>

                  } id="basic-nav-dropdown" className="my-menu profile-menu" renderMenuOnMount={true}>
                    <div style={{ width: "200vw", marginBottom: "-10px" }}>

                      <div style={{ height: "16px", background: "black" }}></div>
                      <div className="d-flex flex-row my-menu main-menu">
                        <div style={{ justifyContent: "center", fontSize: "13px" }}>
                          <div className="action-link-div" style={{ paddingBottom: "18px" }}>
                            Explore Profile
                          </div>
                          <NavDropdown.Item href="/indexx-exchange/account" className="link-div">
                            <Link to="/indexx-exchange/account" className="link-style">
                              Account & Settings
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/dashboard" className="link-div">
                            <Link to="/indexx-exchange/dashboard" className="link-style">
                              Waggle Dance / Dashboard
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/buy-sell/deposit-crypto" className="link-div">
                            <Link to="/indexx-exchange/buy-sell/deposit-crypto" className="link-style">
                              Deposit
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/notification" className="link-div">
                            <Link to="/indexx-exchange/notification" className="link-style">
                              Notification
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/buy-sell/order-history" className="link-div">
                            <Link to="/indexx-exchange/buy-sell/order-history" className="link-style">
                              Order History

                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/task-center" className="link-div">
                            <Link to="/indexx-exchange/task-center" className="link-style">
                              Task Center

                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/trade-to-earn" className="link-div">
                            <Link to="/indexx-exchange/trade-to-earn" className="link-style">
                              Trade to Earn

                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/buy-sell/transaction-history" className="link-div">
                            <Link to="/indexx-exchange/buy-sell/transaction-history" className="link-style">
                              Transaction History

                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/buy-sell/wallet" className="link-div">
                            <Link to="/indexx-exchange/buy-sell/wallet" className="link-style">
                              Wallet

                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/buy-sell/withdraw-crypto" className="link-div">
                            <Link to="/indexx-exchange/buy-sell/withdraw-crypto" className="link-style">
                              Withdraw

                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/" className="link-div" onClick={logOutUser}>
                            <Link to="/" className="link-style">
                              Logout
                            </Link>
                          </NavDropdown.Item>
                        </div>
                        <div style={{ justifyContent: "center", fontSize: "13px", paddingInline: "80px" }}>
                          <div className="action-link-div" style={{ paddingBottom: "23px" }}>
                            Action
                          </div>
                          <NavDropdown.Item href="/indexx-exchange/dashboard" className="action-link-div">
                            <Link to="/indexx-exchange/dashboard" className="action-link-style">
                              Sales
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/trade-to-earn" className="action-link-div">
                            <Link to="/indexx-exchange/trade-to-earn" className="action-link-style">
                              Trade and Earn

                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/task-center" className="action-link-div">
                            <Link to="/indexx-exchange/task-center" className="action-link-style">
                              Complete Tasks


                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/buy-sell/transaction-history" className="action-link-div">
                            <Link to="/indexx-exchange/buy-sell/transaction-history" className="action-link-style">
                              Recent Transactions

                            </Link>
                          </NavDropdown.Item>
                        </div>
                        <div style={{ justifyContent: "center", fontSize: "13px", paddingInline: "20px" }}>
                          <div className="action-link-div" style={{ paddingBottom: "23px" }}>
                            Support
                          </div>
                          <NavDropdown.Item href="/indexx-exchange/buy-sell/deposit-crypto" className="action-link-div">
                            <Link to="/indexx-exchange/buy-sell/deposit-crypto" className="action-link-style">
                              How to deposit
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/indexx-exchange/buy-sell/withdraw-crypto" className="action-link-div">
                            <Link to="/indexx-exchange/buy-sell/withdraw-crypto" className="action-link-style">
                              Know how to withdraw

                            </Link>
                          </NavDropdown.Item>

                        </div>
                      </div>
                      <div className="back profile-back"> </div>
                    </div>
                  </NavDropdown>

                  {/* <NavDropdown
                    title={title}
                    id="collasible-nav-dropdown"
                    className="dark-menu"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="/indexx-exchange/dashboard"
                      className="dropdown-item"
                      href="/"
                    >
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/indexx-exchange/account"
                      className="dropdown-item"
                      href="/"
                    >
                      Account & Settings
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/indexx-exchange/buy-sell/wallet"
                      href="/"
                      className="dropdown-item"
                    >
                      Wallet
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/indexx-exchange/buy-sell/withdraw-crypto"
                      className="dropdown-item"
                      href="/"
                    >
                      Withdraw
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/indexx-exchange/buy-sell/deposit-crypto"
                      className="dropdown-item"
                      href="/"
                    >
                      Deposit
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/indexx-exchange/redeem-stock"
                      className="dropdown-item"
                      href="/"
                    >
                      Redeem Stock
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/indexx-exchange/trade-to-earn"
                      className="dropdown-item"
                      href="/"
                    >
                      Trade to Earn
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/indexx-exchange/task-center"
                      className="dropdown-item"
                      href="/"
                    >
                     Task Center
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/indexx-exchange/buy-sell/transaction-history"
                      className="dropdown-item"
                      href="/"
                    >
                      Transaction History
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/indexx-exchange/buy-sell/order-history"
                      className="dropdown-item"
                      href="/"
                    >
                      Order History
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to=""
                      onClick={logOutUser}
                      className="dropdown-item"
                      href="/"
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to="/indexx-exchange/buy-sell/login"
                    className="text-white link"
                    href="/"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/indexx-exchange/buy-sell/get-started"
                    href="/"
                    className="btn btn-danger text-white"
                  >
                    Get started
                  </Nav.Link>
                </>
              )}
            </Nav>
            <DarkMode />
          </Navbar.Collapse>
        </Container>
        <div className="loader" id="loaderLayer">
          {" "}
          <img src={loaderGif} alt="loader" />
        </div>
      </Navbar>
    );
};

export default HeaderNew;