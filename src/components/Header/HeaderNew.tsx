// import { Button } from 'react-bootstrap';
// import { BellOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
// import { Dropdown } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./Header.css";
import loaderGif from "../../assets/arts/loaderIcon.gif";
import Bellicon from "../../assets/arts/Bellicon.png";
import {Typography ,Image }from 'antd';
import headerstar from "../../assets/header-icons/Products/CEX.png";
import headerdex from "../../assets/header-icons/Products/DEX.png";
import whitetoken from "../../assets/header-icons/Products/IndexxToken.png";

import earn from "../../assets/header-icons/EarnTab/t2e.png";
import bank from "../../assets/header-icons/EarnTab/bank.png";
import vlog from "../../assets/arts/cam.png";
import about from "../../assets/header-icons/Company/about.png";
import affiliate from "../../assets/header-icons/Company/affiliate.png";
import blog from "../../assets/header-icons/Company/blog.png";
import career from "../../assets/header-icons/Company/career.png";
import howitworks from "../../assets/header-icons/Company/howitworks.png";
import hybrid from "../../assets/header-icons/Company/hybrid.png";
import giftcard from "../../assets/header-icons/Shop/gift card white.png";
import greetcard from "../../assets/header-icons/Shop/greeting card white.png";
import redeem from "../../assets/header-icons/Shop/redeem white.png";
import store from "../../assets/header-icons/Shop/shop.png";
import walletweb from "../../assets/header-icons/Wallet/wallet web white.png";
import walletext from "../../assets/header-icons/Wallet/wallet extension white.png";
import nft from "../../assets/header-icons/Products/nft icon.svg";
import xusd from "../../assets/header-icons/Products/xusd icon.svg";
import xnft from "../../assets/header-icons/Products/xnft.png";
import fortune from "../../assets/header-icons/for.png";

import {  baseURL, baseDEXURL } from "../../services/api";


const {Text} = Typography;
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
  const navigate = useNavigate();
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
  const showUrl: any = Links.filter((link) =>
    window.location.pathname.includes(link.value)
  ).map((obj) => obj.url);
  useEffect(() => {

    (showText[0] !== "") ?
      document.title = `${showText[0]} | indexx.ai`
      :
      (pageName) ?
        document.title = `${pageName} | indexx.ai`
        :
        document.title = "indexx.ai"
  }, [showText, pageName]);

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
        <Container>
          <div className="d-flex logo__holder">
            <Navbar.Brand  href={baseURL} className="logo__icon">
              index.ai
            </Navbar.Brand>
            <Nav.Link as={Link} to={showUrl[0]} href="#" className="logo__text">
              {pageName || showText[0]}
            </Nav.Link>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <NavDropdown
                    title="Platforms"
                    id="collasible-nav-dropdown"
                    className="dark-menu"
                    renderMenuOnMount={true}
                  >
                    <NavDropdown.Item
                    className="dropdown-item"
                    href="https://test.xnftmarketplace.indexx.ai/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      preview={false}
                      src={xnft}
                      style={{
                        width: 18,
                        height: 22,
                        marginBottom: 3,
                        marginRight: 7,
                      }}
                    ></Image>
                    
                    <Text style={{ paddingLeft: 4, color: "white" }}>XNFT Market</Text>
                    <br />
                    <Text
                      style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                    >
                      {" "}
                      Buy, Sell & Trade XNFT
                    </Text>
                  </NavDropdown.Item>
                    <NavDropdown.Item
                      className="dropdown-item"
                      href="/"
                      rel="noreferrer"
                    >
                      <Image
                        preview={false}
                        src={headerstar}
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 7,
                        }}
                      ></Image>
                      <Text style={{ paddingLeft: 4, color: "white" }}>
                        Exchange
                      </Text>
                      <br />
                      <Text
                        style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                      >
                        {" "}
                        Convert, Buy & Sell
                      </Text>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="dropdown-item"
                      href={baseDEXURL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        preview={false}
                        src={headerdex}
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 7,
                        }}
                      ></Image>
                      <Text style={{ paddingLeft: 4, color: "white" }}>
                        Swap
                      </Text>
                      <br />
                      <Text
                        style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                      >
                        {" "}
                        Swap, Buy & Sell
                      </Text>
                    </NavDropdown.Item>

                  <NavDropdown.Item
                    className="dropdown-item"
                    href={`${baseURL}/indexx-exchange/coming-soon?page=Indexx%20Bank`}
                    target="_blank"
                  >
                    <Image
                      preview={false}
                      src={bank}
                      style={{
                        width: 15,
                        height: 15,
                        marginBottom: 3,
                        marginRight: 7,
                      }}
                    ></Image>
                    <Text style={{ paddingLeft: 4, color: "white" }}>
                      Indexx Bank
                    </Text>
                    <br />
                    <Text
                      style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                    >
                      Deposit and invest to earn
                    </Text>
                  </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title="Products"
                    id="collasible-nav-dropdown"
                    className="dark-menu"
                    renderMenuOnMount={true}
                  >
                    <NavDropdown.Item
                      href="https://indexx.ai/indexx-exchange/token-details"
                      className="dropdown-item"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        preview={false}
                        src={whitetoken}
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 7,
                        }}
                      ></Image>
                      <Text style={{ paddingLeft: 4, color: "white" }}>
                        Tokens
                      </Text>
                      <br />
                      <Text
                        style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                      >
                        {" "}
                        Know the characteristics of each token
                      </Text>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="dropdown-item"
                      href="/indexx-exchange/nfts"
                      rel="noreferrer"
                    >
                      <Image
                        preview={false}
                        src={nft}
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 7,
                        }}
                      ></Image>
                      <Text style={{ paddingLeft: 4, color: "white" }}>
                        NFT
                      </Text>
                      <br />
                      <Text
                        style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                      >
                        {" "}
                        Convert, Buy & Sell
                      </Text>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                    className="dropdown-item"
                    href="https://test.xnftmarketplace.indexx.ai/collections?type=all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      preview={false}
                      src={xnft}
                      style={{
                        width: 18,
                        height: 22,
                        marginBottom: 3,
                        marginRight: 7,
                      }}
                    ></Image>
                    <Text style={{ paddingLeft: 4, color: "white" }}>XNFT</Text>
                    <br />
                    <Text
                      style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                    >
                      {" "}
                      Buy, Sell & Trade XNFT
                    </Text>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="dropdown-item"
                      href="https://shop.indexx.ai/collections/xusd"
                    >
                      <Image
                        preview={false}
                        src={xusd}
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 7,
                        }}
                      ></Image>
                      <Text style={{ paddingLeft: 4, color: "white" }}>
                        XUSD
                      </Text>
                      <br />
                      <Text
                        style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                      >
                        {" "}
                        The stable USD
                      </Text>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="dropdown-item"
                      as={Link}
                      to="https://fortune.daily.indexx.ai/"
                    >
                      <Image
                        preview={false}
                        src={fortune}
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 7,
                        }}
                      ></Image>
                      <Text style={{ paddingLeft: 4, color: "white" }}>
                        Fortune Daily
                      </Text>

                      <br />
                      <Text
                        style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                      >
                        Win daily in Lottery
                      </Text>
                  </NavDropdown.Item>
                  </NavDropdown>
              {/* <NavDropdown
                title="Products"
                id="collasible-nav-dropdown"
                className="dark-menu"
                renderMenuOnMount={true}
              >
                <NavDropdown.Item
                  as={Link}
                  to="/indexx-exchange/buy-sell/login"
                  className="dropdown-item"
                >
                  <Image preview={false} src={headerstar} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>Exchange</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}> Convert, Buy & Sell</Text>
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  href="https://test.swap.indexx.ai"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image preview={false} src={headerdex} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>Swap</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}> Swap, Buy & Sell</Text>
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://indexx.ai/indexx-exchange/token-details"
                  className="dropdown-item"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image preview={false} src={whitetoken} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>indexx Tokens</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}> Know the characteristics of each token</Text>
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  as={Link}
                  to="/indexx-exchange/import-indexx-tokens"
                >
                   <Image preview={false} src={whitetoken} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>Import indexx Tokens</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}> Bring your tokens to our exchange</Text>
                  
                </NavDropdown.Item>
              </NavDropdown> */}
              {localStorage.getItem("user") ? (
                <Nav.Link as={Link} to="/indexx-exchange/markets" className='text-white link' href="#">Markets</Nav.Link>
              ) : <></>}
              <NavDropdown
                title="Earn"
                id="collasible-nav-dropdown"
                className="dark-menu"
                renderMenuOnMount={true}
              >
                <NavDropdown.Item
                  as={Link}
                  to="/indexx-exchange/trade-to-earn"
                  className="dropdown-item"
                  href="/"
                >
                   <Image preview={false} src={earn} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>Trade to Earn</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}>Earn more while trading</Text>
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  href={`${baseURL}/indexx-exchange/coming-soon?page=Indexx%20Bank`}
                  target="_blank"
                  
                >
                        <Image preview={false} src={bank} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>Indexx Bank</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}>Deposit and invest to earn</Text>
                </NavDropdown.Item>
                {/* <NavDropdown.Item as={Link} to="/indexx-exchange/coming-soon?page=Pools" className="dropdown-item" href="/">Pools</NavDropdown.Item> */}
              </NavDropdown>
              <NavDropdown
                title="Company"
                id="collasible-nav-dropdown"
                className="dark-menu"
                renderMenuOnMount={true}
              >
                <NavDropdown.Item 
                
                className="dropdown-item"
                href={`${baseURL}/indexx-exchange/how-it-works`}
                >
                <Image preview={false} src={howitworks} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>How it Works</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}>Know how the different features  work</Text>

                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  href={`${baseURL}/indexx-exchange/about`}
               
                >
                  <Image preview={false} src={about} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>About</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}>Background of the company</Text>
                </NavDropdown.Item>
                <NavDropdown.Item
                 
                  rel="noreferrer"
                  className="dropdown-item"
                  href={baseURL}
                >
                  <Image preview={false} src={hybrid} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>Hybrid Exchange</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}>Centralize and Decentralize Exchange</Text>
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://register.affiliate.indexx.ai/"
                
                  rel="noreferrer"
                >
                   <Image preview={false} src={affiliate} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>Affiliate Program</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}>Earn while sharing</Text>
                
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  href={`${baseURL}/indexx-exchange/blog`}
                 
                >
                   <Image preview={false} src={blog} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>Blog</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}>Updates and trends in the crypto world</Text>
                
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  href={`${baseURL}/indexx-exchange/vlog`}
                 
                >
                   <Image preview={false} src={vlog} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>Vlog</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}>Watch our videos to stay up to date</Text>
                
                </NavDropdown.Item>
                <NavDropdown.Item 
                  className="dropdown-item"
                  href={`${baseURL}/indexx-exchange/careers`}
                  >
                <Image preview={false} src={career} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>  Careers</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}>Find opportunity in indexx.ai</Text>

                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                    title="Wallet"
                    id="collasible-nav-dropdown"
                    className="dark-menu"
                    renderMenuOnMount={true}
                  >
                    <a
                      href="https://test.wallet2.indexx.ai/wallets/crypto-wallet"
                      className="dropdown-item"
                    >
                      <Image
                        preview={false}
                        src={walletweb}
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 7,
                        }}
                      ></Image>
                      <Text style={{ paddingLeft: 4, color: "white" }}>
                        Wallet Web
                      </Text>

                      <br />
                      <Text
                        style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                      >
                        Connect to Indexx Wallet web
                      </Text>
                    </a>
                    <NavDropdown.Item
                      className="dropdown-item"
                      href="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en"
                    >
                      <Image
                        preview={false}
                        src={walletext}
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 7,
                        }}
                      ></Image>
                      <Text style={{ paddingLeft: 4, color: "white" }}>
                        Wallet extension
                      </Text>
                      <br />
                      <Text
                        style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                      >
                        Download the web extension now
                      </Text>
                    </NavDropdown.Item>
                   
                </NavDropdown>

                <NavDropdown
                    title="Shop"
                    id="collasible-nav-dropdown"
                    className="dark-menu"
                    renderMenuOnMount={true}
                  >
                    <NavDropdown
                      title={<span><img src={giftcard} alt="icon" width={"15px"} height={"15px"} style={{margin:"0 7px 3px 0"}}/> <span style={{paddingLeft:"4px "}}  >Gift Cards</span></span>}
                      id="collasible-nav-dropdown"
                      className="dark-menu"
                      renderMenuOnMount={true}
                      style={{width:"204.5px"}}
                    >

                    <NavDropdown.Item
                      href="https://test.xnftmarketplace.indexx.ai/redeem-gift"
                      className="dropdown-item"
                    >
                      <Image
                        preview={false}
                        src={redeem}
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 7,
                        }}
                      ></Image>
                      <Text style={{ paddingLeft: 4, color: "white" }}>
                        Redeem Card
                      </Text>

                      <br />
                      <Text
                        style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                      >
                        Redeem card and buy XNFT now
                      </Text>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="https://shop.indexx.ai/collections/gift-cards-1"
                      className="dropdown-item"
                    >
                      <Image
                        preview={false}
                        src={store}
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 7,
                        }}
                      ></Image>
                      <Text style={{ paddingLeft: 4, color: "white" }}>
                        Store
                      </Text>

                      <br />
                      <Text
                        style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                      >
                        Buy more Gift Cards
                      </Text>
                    </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown
                      title={<span><img src={greetcard} alt="icon" width={"15px"} height={"15px"} style={{margin:"0 7px 3px 0"}}/> <span style={{paddingLeft:"4px "}}  >Greeting Cards</span></span>}
                      id="collasible-nav-dropdown"
                      className="dark-menu"
                      renderMenuOnMount={true}
                    >

                    <NavDropdown.Item
                      href="https://test.xnftmarketplace.indexx.ai/redeem-greeting"
                      className="dropdown-item"
                    >
                      <Image
                        preview={false}
                        src={redeem}
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 7,
                        }}
                      ></Image>
                      <Text style={{ paddingLeft: 4, color: "white" }}>
                        Redeem Card
                      </Text>

                      <br />
                      <Text
                        style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                      >
                        Redeem card and buy XNFT now
                      </Text>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="https://shop.indexx.ai/collections/greeting-cards"
                      className="dropdown-item"
                    >
                      <Image
                        preview={false}
                        src={store}
                        style={{
                          width: 15,
                          height: 15,
                          marginBottom: 3,
                          marginRight: 7,
                        }}
                      ></Image>
                      <Text style={{ paddingLeft: 4, color: "white" }}>
                        Store
                      </Text>

                      <br />
                      <Text
                        style={{ fontSize: 10, color: "white", marginLeft: 26 }}
                      >
                        Buy more Greeting Cards
                      </Text>
                    </NavDropdown.Item>
                    </NavDropdown>

                </NavDropdown>
              {/* <Nav.Link  className='text-white link' href="https://test.wallet2.indexx.ai">Wallet</Nav.Link>
              <Nav.Link  className='text-white link' href="https://test.swap.indexx.ai/ai-engine">Ai Engine</Nav.Link>
              <Nav.Link  className='text-white link' href="https://test.indexx.ai/xchange">Indexx X</Nav.Link> */}
            </Nav>
             
            <Nav>
             
              {localStorage.getItem("user") ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/indexx-exchange/buy-sell/"
                    href="/"
                    className="btn btn-danger text-white"
                  >
                    Buy Crypto
                  </Nav.Link>
                  <img src={Bellicon} alt="Notifications"
                    className="ms-3 my-2 text-white cursor-pointer"
                    style={{ maxHeight: 26, alignSelf: "center" }}
                    onClick={() => navigate("/indexx-exchange/notification")}
                  />
                  <NavDropdown
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
                  </NavDropdown>
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