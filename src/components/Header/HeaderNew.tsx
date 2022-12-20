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

import about from "../../assets/header-icons/Company/about.png";
import affiliate from "../../assets/header-icons/Company/affiliate.png";
import blog from "../../assets/header-icons/Company/blog.png";
import career from "../../assets/header-icons/Company/career.png";
import howitworks from "../../assets/header-icons/Company/howitworks.png";
import hybrid from "../../assets/header-icons/Company/hybrid.png";
import { baseDEXURL, baseURL } from "../../services/api";


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
  { label: "Centralized", value: "buy-sell", url: "/indexx-exchange/buy-sell" },
  { label: "Trade To Earn", value: "trade-to-earn", url: "/indexx-exchange/trade-to-earn" },
  { label: "Markets", value: "markets", url: "/indexx-exchange/markets" },
  { label: "Tokens", value: "tokens", url: "/indexx-exchange/tokens" },
  { label: "Blog", value: "blog", url: "/indexx-exchange/blog" },
  { label: "About", value: "about", url: "/indexx-exchange/about" },
  { label: "Careers", value: "careers", url: "/indexx-exchange/careers" },
  { label: "Notifications", value: "notification", url: "/indexx-exchange/notification" },
  { label: "How it Works", value: "how-it-works", url: "/indexx-exchange/how-it-works" },
  { label: "", value: "/", url: "/" },
];

const HeaderNew = () => {
  let title = <>{String(localStorage.getItem("user")).toLowerCase()}</>;
  const [isInsideApp, setIsInsideApp] = useState(false);
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
  console.log(isInsideApp);
  useEffect(() => {

    (showText[0] !== "") ?
      document.title = `${showText[0]} | indexx.ai`
      :
      (pageName) ?
        document.title = `${pageName} | indexx.ai`
        :
        document.title = "indexx.ai"
  }, [showText, pageName]);

  console.log("testing",window.location.pathname)
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
                title="Products"
                id="collasible-nav-dropdown"
                className="dark-menu"
                renderMenuOnMount={true}
              >
                <NavDropdown.Item
                  as={Link}
                  to="/indexx-exchange/buy-sell/get-started"
                  className="dropdown-item"
                >
                  <Image preview={false} src={headerstar} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>Centralized</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}> Convert, Buy & Sell</Text>
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  href={baseDEXURL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image preview={false} src={headerdex} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>Decentralized</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}> Swap, Buy & Sell</Text>
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://tokens.indexx.ai/"
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
              </NavDropdown>
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
                  href={`${baseURL}/indexx-exchange/careers`}
                  >
                <Image preview={false} src={career} style={{width:15,height:15,marginBottom:3,marginRight:7}}></Image>
                   <Text style={{paddingLeft:4,color:'white'}}>  Careers</Text><br/>
                  <Text style={{fontSize:10,color:'white',marginLeft:26}}>Find opportunity in indexx.ai</Text>

                </NavDropdown.Item>
              </NavDropdown>
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