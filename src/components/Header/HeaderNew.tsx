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

import {  baseURL, baseCEXURL } from "../../services/api";
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

  const isCaptain = true;
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
        <DarkMode/>
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
        <Container style={{maxWidth:"1360px"}}>
          <div className="d-flex logo__holder">
            <Navbar.Brand  href={baseURL} className="logo__icon">
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
                <div style={{width:"200vw"}}>

                <div style={{height:"26px", background:"black"}}></div>
              <div className="d-flex flex-row my-menu main-menu">
                <div style={{justifyContent:"center", fontSize:"13px"}}>
                  <div className="action-link-div" style={{paddingBottom:"18px"}}>
                  Explore Platforms
                  </div>
                  <NavDropdown.Item href="https://test.cex.indexx.ai/" className="link-div">
                    <Link to="https://test.cex.indexx.ai/" className="link-style">
                      Exchange
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://fortune.daily.indexx.ai/" className="link-div">
                    <Link to="https://fortune.daily.indexx.ai/" className="link-style">
                      Fortune Daily
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/" className="link-div">
                    <Link to="https://shop.indexx.ai/" className="link-style">
                      Shop
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://swap.indexx.ai/" className="link-div">
                    <Link to="https://swap.indexx.ai/" className="link-style">
                      Swap
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://wallstreet.indexx.ai/" className="link-div">
                    <Link to="https://wallstreet.indexx.ai/" className="link-style">
                      Wall Street
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://xnftmarketplace.indexx.ai/home" className="link-div">
                    <Link to="https://xnftmarketplace.indexx.ai/home" className="link-style">
                      Market
                    </Link> 
                  </NavDropdown.Item>
                </div>
                <div style={{justifyContent:"center", fontSize:"13px", paddingInline:"80px"}}>
                <div className="action-link-div" style={{paddingBottom:"23px"}}>
                    Action
                  </div>
                  
                  <NavDropdown.Item href="https://test.cex.indexx.ai/indexx-exchange/buy-sell/get-started" className="action-link-div">
                    <Link to={`${baseCEXURL}/buy-sell/get-started`} className="action-link-style">
                      Sign Up in Exchange

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://test.cex.indexx.ai/indexx-exchange/buy-sell/login" className="action-link-div">
                    <Link to="https://test.cex.indexx.ai/indexx-exchange/buy-sell/login" className="action-link-style">
                    Sign In in Exchange
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://fortune.daily.indexx.ai/" className="action-link-div">
                    <Link to="https://fortune.daily.indexx.ai/" className="action-link-style">
                    Buy Lottery tickets

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/gift-cards-1" className="action-link-div">
                    <Link to="https://shop.indexx.ai/collections/gift-cards-1" className="action-link-style">
                    Buy Gift Cards

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/greeting-cards" className="action-link-div">
                    <Link to="https://shop.indexx.ai/collections/greeting-cards" className="action-link-style">
                    Buy Greeting Cards

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/indexx-stock-token-tickets" className="action-link-div">
                    <Link to="https://shop.indexx.ai/collections/indexx-stock-token-tickets" className="action-link-style">
                    Buy Stock Certificates
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/stock-gift-cards" className="action-link-div">
                    <Link to="https://shop.indexx.ai/collections/stock-gift-cards" className="action-link-style">
                    Buy Stock Tokens

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://swap.indexx.ai/" className="action-link-div">
                    <Link to="https://swap.indexx.ai/" className="action-link-style">
                    Trade in swap

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://wallstreet.indexx.ai/" className="action-link-div">
                    <Link to="https://wallstreet.indexx.ai/" className="action-link-style">
                      Walk on Wall Street
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://xnftmarketplace.indexx.ai/collections?type=all" className="action-link-div">
                    <Link to="https://xnftmarketplace.indexx.ai/collections?type=all" className="action-link-style">
                      Buy XNFTs
                    </Link> 
                  </NavDropdown.Item>
                </div>
                <div style={{justifyContent:"center", fontSize:"13px", paddingInline:"20px"}}>
                <div className="action-link-div" style={{paddingBottom:"23px"}}>
                      Support
                      </div>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/how-it-works/centralized" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/how-it-works/centralized" className="action-link-style">
                      How to use Exchange
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://fortune.daily.indexx.ai/how-to-play" className="action-link-div">
                    <Link to="https://fortune.daily.indexx.ai/how-to-play" className="action-link-style">
                    Know how to play the lottery

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://hive.indexx.ai/" className="action-link-div">
                    <Link to="https://hive.indexx.ai/" className="action-link-style">
                    Walk through the Hive

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/" className="action-link-div">
                    <Link to="https://shop.indexx.ai/" className="action-link-style">
                    Know how to buy in the Shop


                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/how-it-works/decentralized" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/how-it-works/decentralized" className="action-link-style">
                    How to use Swap


                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://wallstreet.indexx.ai/" className="action-link-div">
                    <Link to="https://wallstreet.indexx.ai/" className="action-link-style">
                    Go through Wall Street

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://xnftmarketplace.indexx.ai/" className="action-link-div">
                    <Link to="https://xnftmarketplace.indexx.ai/" className="action-link-style">
                    How to buy XNFTs


                    </Link> 
                  </NavDropdown.Item>
                </div>
              </div>
              <div className="back"> </div>
              </div>
              </NavDropdown>

              <NavDropdown title="Products" id="basic-nav-dropdown" className="my-menu prod-menu" renderMenuOnMount={true}>
                <div style={{width:"200vw"}}>

                <div style={{height:"26px", background:"black"}}></div>
              <div className="d-flex flex-row my-menu main-menu" >
                <div style={{justifyContent:"center", fontSize:"13px"}}>
                <div className="action-link-div" style={{paddingBottom:"18px"}}>
                  Explore Products
                  </div>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/gift-cards-1" className="link-div">
                    <Link to="https://shop.indexx.ai/collections/gift-cards-1" className="link-style">
                    Gift Cards
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/greeting-cards" className="link-div">
                    <Link to="https://shop.indexx.ai/collections/greeting-cards" className="link-style">
    Greeting Cards
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/nfts" className="link-div">
                    <Link to="https://indexx.ai/indexx-exchange/nfts" className="link-style">
NFT
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://wallstreet.indexx.ai/certificates" className="link-div">
                    <Link to="https://wallstreet.indexx.ai/certificates" className="link-style">
Stock Certificates
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://wallstreet.indexx.ai/details" className="link-div">
                    <Link to="https://wallstreet.indexx.ai/details" className="link-style">
Stock Tokens
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/token-details" className="link-div">
                    <Link to="https://indexx.ai/indexx-exchange/token-details" className="link-style">
Tokens
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://xnft.indexx.ai/" className="link-div">
                    <Link to="https://xnft.indexx.ai/" className="link-style">
XNFT
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://xnft.indexx.ai/#fiat-cur" className="link-div">
                    <Link to="https://xnft.indexx.ai/#fiat-cur" className="link-style">

                    XUSD
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/indexx-exchange/coming-soon" className="link-div">
                    <Link to="/indexx-exchange/coming-soon" className="link-style">
                    $1 Bitcoin

                    </Link> 
                  </NavDropdown.Item>
                </div>
                <div style={{justifyContent:"center", fontSize:"13px", paddingInline:"80px"}}>
                <div className="action-link-div" style={{paddingBottom:"23px"}}>

                    Action
                  </div>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/gift-cards-1" className="action-link-div">
                    <Link to="https://shop.indexx.ai/collections/gift-cards-1" className="action-link-style">

                      Shop Gift Cards

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/greeting-cards" className="action-link-div">
                    <Link to="https://shop.indexx.ai/collections/greeting-cards" className="action-link-style">
Shop Greeting Cards

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://opensea.io/collection/skullpunksog" className="action-link-div">
                    <Link to="https://opensea.io/collection/skullpunksog" className="action-link-style">
Shop NFTs

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/indexx-stock-token-tickets" className="action-link-div">
                    <Link to="https://shop.indexx.ai/collections/indexx-stock-token-tickets" className="action-link-style">
Shop Stock Certificates

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/stock-gift-cards" className="action-link-div">
                    <Link to="https://shop.indexx.ai/collections/stock-gift-cards" className="action-link-style">
Shop Stock Tokens

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/token-details" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/token-details" className="action-link-style">
Shop Tokens
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/xnft" className="action-link-div">
                    <Link to="https://shop.indexx.ai/collections/xnft" className="action-link-style">
Shop XNFTs

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://xnftmarketplace.indexx.ai/collections/xusd-nft/3" className="action-link-div">
                    <Link to="https://xnftmarketplace.indexx.ai/collections/xusd-nft/3" className="action-link-style">
Shop XUSDs

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/indexx-exchange/coming-soon" className="action-link-div">
                    <Link to="/indexx-exchange/coming-soon" className="action-link-style">
Buy $1 Bitcoin
                    </Link> 
                  </NavDropdown.Item>
                </div>
                <div style={{justifyContent:"center", fontSize:"13px", paddingInline:"20px"}}>
                <div className="action-link-div" style={{paddingBottom:"23px"}}>

                      Support
                    </div>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/gift-cards-1" className="action-link-div">
                    <Link to="https://shop.indexx.ai/collections/gift-cards-1" className="action-link-style">

                      How to buy Gift Cards


                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/greeting-cards" className="action-link-div">
                    <Link to="https://shop.indexx.ai/collections/greeting-cards" className="action-link-style">
How to buy Greeting Cards

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/nfts" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/nfts" className="action-link-style">
How to buy NFTs


                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://shop.indexx.ai/collections/indexx-stock-token-tickets" className="action-link-div">
                    <Link to="https://shop.indexx.ai/collections/indexx-stock-token-tickets" className="action-link-style">
How to buy Stock Certificates


                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/how-it-works/tokens" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/how-it-works/tokens" className="action-link-style">
Learn about indexx Tokens


                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://xnft.indexx.ai/" className="action-link-div">
                    <Link to="https://xnft.indexx.ai/" className="action-link-style">
How to buy XNFTs

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://xnft.indexx.ai/#fiat-cur" className="action-link-div">
                    <Link to="https://xnft.indexx.ai/#fiat-cur" className="action-link-style">
                    How to buy XUSDs
                    </Link> 
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
                <div style={{width:"200vw"}}>

                <div style={{height:"26px", background:"black"}}></div>
              <div className="d-flex flex-row my-menu main-menu">
                <div style={{justifyContent:"center", fontSize:"13px"}}>
                <div className="action-link-div" style={{paddingBottom:"18px"}}>
                  Explore Program
                  </div>
                  <NavDropdown.Item href="https://register.affiliate.indexx.ai/" className="link-div">
                    <Link to="https://register.affiliate.indexx.ai/" className="link-style">
                    Affiliate Program
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://hive.indexx.ai/" className="link-div">
                    <Link to="https://hive.indexx.ai/" className="link-style">
Hive
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/trade-to-earn" className="link-div">
                    <Link to="https://indexx.ai/indexx-exchange/trade-to-earn" className="link-style">
Trade to Earn
                    </Link> 
                  </NavDropdown.Item>
                </div>
                <div style={{justifyContent:"center", fontSize:"13px", paddingInline:"80px"}}>
                <div className="action-link-div" style={{paddingBottom:"23px"}}>

                    Action
                    </div>
                  <NavDropdown.Item href="https://register.affiliate.indexx.ai/about" className="action-link-div">
                    <Link to="https://register.affiliate.indexx.ai/about" className="action-link-style">
                      Sign up as an Afilliate



                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://hive.indexx.ai/sign-up" className="action-link-div">
                    <Link to="https://hive.indexx.ai/sign-up" className="action-link-style">
Captain Bee Sign Up
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/indexx-exchange/coming-soon" className="action-link-div">
                    <Link to="/indexx-exchange/coming-soon" className="action-link-style">
Honeycomb Build Up
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/buy-sell/get-started" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/buy-sell/get-started" className="action-link-style">
                    Trade to Earn Sign Up 
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/buy-sell/login" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/buy-sell/login" className="action-link-style">
Trade to Earn Sign In
                    </Link> 
                  </NavDropdown.Item>
                </div>
                <div style={{justifyContent:"center", fontSize:"13px", paddingInline:"20px"}}>
                <div className="action-link-div" style={{paddingBottom:"23px"}}>

                      Support
                  </div>
                  <NavDropdown.Item href="https://register.affiliate.indexx.ai/about" className="action-link-div">
                    <Link to="https://register.affiliate.indexx.ai/about" className="action-link-style">
                      Benefit of an Affiliate
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/how-it-works/tradetoearn" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/how-it-works/tradetoearn" className="action-link-style">
                    How to Trade to Earn
                    </Link> 
                  </NavDropdown.Item>
                </div>
              </div>
              <div className="back prog-back"> </div>
              </div>
              </NavDropdown>


              <NavDropdown title="Wallet" id="basic-nav-dropdown" className="my-menu wallet-menu" renderMenuOnMount={true}>
                <div style={{width:"200vw"}}>

                <div style={{height:"26px", background:"black"}}></div>
              <div className="d-flex flex-row my-menu main-menu" >
                <div style={{justifyContent:"center", fontSize:"13px"}}>
                <div className="action-link-div" style={{paddingBottom:"18px"}}>
                  Explore Wallet
                  </div>
                  <NavDropdown.Item href="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en" className="link-div">
                    <Link to="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en" className="link-style">
                    Extension
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://wallet.indexx.ai/login/sign-in" className="link-div">
                    <Link to="https://wallet.indexx.ai/login/sign-in" className="link-style">
                    Web
                    </Link> 
                  </NavDropdown.Item>
                </div>
                <div style={{justifyContent:"center", fontSize:"13px", paddingInline:"80px"}}>
                <div className="action-link-div" style={{paddingBottom:"23px"}}>

                    Action
                  </div>
                  <NavDropdown.Item href="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en" className="action-link-div">
                    <Link to="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en" className="action-link-style">
                      Install Extension


                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://wallet.indexx.ai/login/sign-in" className="action-link-div">
                    <Link to="https://wallet.indexx.ai/login/sign-in" className="action-link-style">
                    Sign up Web-2 Wallet
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://wallet.indexx.ai/login/sign-in" className="action-link-div">
                    <Link to="https://wallet.indexx.ai/login/sign-in" className="action-link-style">
Sign Up Web-3 Wallet

                    </Link> 
                  </NavDropdown.Item>
                </div>
                <div style={{justifyContent:"center", fontSize:"13px", paddingInline:"20px"}}>
                <div className="action-link-div" style={{paddingBottom:"23px"}}>
                      Support
                      </div>
                  <NavDropdown.Item href="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en" className="action-link-div">
                    <Link to="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en" className="action-link-style">
                    How to install and use wallet extension


                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://wallet.indexx.ai/Indexx-wallet/wallet-whitepaper" className="action-link-div">
                    <Link to="https://wallet.indexx.ai/Indexx-wallet/wallet-whitepaper" className="action-link-style">
How to use wallet Web
                    </Link> 
                  </NavDropdown.Item>
                </div>
              </div>
              <div className="back wallet-back"> </div>
              </div>
              </NavDropdown>
              

              <NavDropdown title="Company" id="basic-nav-dropdown" className="my-menu comp-menu" renderMenuOnMount={true}>
                <div style={{width:"200vw"}}>

                <div style={{height:"26px", background:"black"}}></div>
              <div className="d-flex flex-row my-menu main-menu">
                <div style={{justifyContent:"center", fontSize:"13px"}}>
                <div className="action-link-div" style={{paddingBottom:"18px"}}>
                  Explore Company
                  </div>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/about" className="link-div">
                    <Link to="https://indexx.ai/indexx-exchange/about" className="link-style">
                    About
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/blog" className="link-div">
                    <Link to="https://indexx.ai/indexx-exchange/blog" className="link-style">
Blog
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/careers" className="link-div">
                    <Link to="https://indexx.ai/indexx-exchange/careers" className="link-style">
Careers
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/how-it-works" className="link-div">
                    <Link to="https://indexx.ai/indexx-exchange/how-it-works" className="link-style">
How it Works
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/markets" className="link-div">
                    <Link to="https://indexx.ai/indexx-exchange/markets" className="link-style">
Markets
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/vlog" className="link-div">
                    <Link to="https://indexx.ai/indexx-exchange/vlog" className="link-style">
Vlog
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/indexx-exchange/coming-soon" className="link-div">
                    <Link to="/indexx-exchange/coming-soon" className="link-style">
Document
                    </Link> 
                  </NavDropdown.Item>
                </div>
                <div style={{justifyContent:"center", fontSize:"13px", paddingInline:"80px"}}>
                <div className="action-link-div" style={{paddingBottom:"23px"}}>
                    Action
                  </div>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/about" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/about" className="action-link-style">
                    Know the company
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/blog" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/blog" className="action-link-style">
Read updates
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/careers" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/careers" className="action-link-style">
Find opportunity
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/how-it-works" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/how-it-works" className="action-link-style">
Features
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/markets" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/markets" className="action-link-style">
Crypto trends

                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/vlog" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/vlog" className="action-link-style">
Watch videos
                    </Link> 
                  </NavDropdown.Item>
                </div>
                <div style={{justifyContent:"center", fontSize:"13px", paddingInline:"20px"}}>
                <div className="action-link-div" style={{paddingBottom:"23px"}}>
                      Support
                  </div>
                  <NavDropdown.Item href="/indexx-exchange/coming-soon" className="action-link-div">
                    <Link to="/indexx-exchange/coming-soon" className="action-link-style">
                    Government Certificates
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://indexx.ai/indexx-exchange/legal" className="action-link-div">
                    <Link to="https://indexx.ai/indexx-exchange/legal" className="action-link-style">
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
                    style={{height:"41px", zIndex:"10000"}}
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
<div style={{marginBottom:"-60px", zIndex:"10000"}}>

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
  style={{ marginBottom: `${isCaptain === true ? 0 : "7px" }` }}
>
  <img
    alt=""
    src={dummy}
    width={'63px'}
    height={'66px'}
    style={{
      border:"none"
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
                <div style={{width:"200vw", marginBottom:"-10px"}}>

                <div style={{height:"16px", background:"black"}}></div>
              <div className="d-flex flex-row my-menu main-menu">
                <div style={{justifyContent:"center", fontSize:"13px"}}>
                <div className="action-link-div" style={{paddingBottom:"18px"}}>
                  Explore Profile
                  </div>
                  <NavDropdown.Item href="/indexx-exchange/account" className="link-div">
                    <Link to="/indexx-exchange/account" className="link-style">
                    Account & Settings
                    </Link> 
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/indexx-exchange/dashboard" className="link-div">
                    <Link to="/indexx-exchange/dashboard" className="link-style">
                    Dashboard
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
                <div style={{justifyContent:"center", fontSize:"13px", paddingInline:"80px"}}>
                <div className="action-link-div" style={{paddingBottom:"23px"}}>
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
                <div style={{justifyContent:"center", fontSize:"13px", paddingInline:"20px"}}>
                <div className="action-link-div" style={{paddingBottom:"23px"}}>
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
            <DarkMode/>
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