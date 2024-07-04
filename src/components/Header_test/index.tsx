import React, { useContext, useEffect, useRef, useState } from 'react';
import greetingCard from '../../assets/header-icons/sec_header_greeting.svg';
import logo from '../../assets/header-icons/indexx_logo.svg';
import './style.css';
import CrossIcon from '../../assets/header-icons/cross';

import Fantasy_Lotto from '../../assets/BSheader/fantasy.png';
import token from '../../assets/BSheader/tokens icon 1.svg';
import token_white from '../../assets/BSheader/tokens icon  white (1).svg';
import { auth_header_data } from './data';
import header_data from './data';
// import { Button } from 'react-bootstrap';
// import { BellOutlined } from "@ant-design/icons";

// import { Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import './Header.css';
import loaderGif from '../../assets/arts/loaderIcon.gif';
import hive from '../../assets/BSheader/hive logo HD2 1.svg';

import frame from '../../assets/updated/header/captain.png';
import beeframe from '../../assets/updated/header/normal.png';

import dummy from '../../assets/hive-dashboard/dummy.jpeg';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import {
  baseURL,
  baseCEXURL,
  getCaptainBeeStatics,
  getHoneyUserDetails,
  baseDEXURL,
  baseHiveURL,
  baseMktplaceURL,
  baseShopURL,
  baseWSURL,
  baseWalletURL,
  baseXnftURL,
  baseAcademyUrl,
  decodeJWT,
  checkEmail,
  checkByemail,
  getCaptainBeeByEmail,
} from '../../services/api';

import DarkMode from '../DarkMode/DarkMode';

const Links = [
  { label: 'Exchange', value: 'buy-sell', url: '/indexx-exchange/buy-sell' },
  {
    label: 'Trade To Earn',
    value: 'trade-to-earn',
    url: '/indexx-exchange/trade-to-earn',
  },
  { label: 'Markets', value: 'markets', url: '/indexx-exchange/markets' },
  { label: 'Tokens', value: 'tokens', url: '/indexx-exchange/tokens' },
  { label: 'Blog', value: 'blog', url: '/indexx-exchange/blog' },
  { label: 'Vlog', value: 'vlog', url: '/indexx-exchange/vlog' },
  { label: 'About', value: 'about', url: '/indexx-exchange/about' },
  { label: 'Careers', value: 'careers', url: '/indexx-exchange/careers' },
  {
    label: 'Notifications',
    value: 'notification',
    url: '/indexx-exchange/notification',
  },
  {
    label: 'How it Works',
    value: 'how-it-works',
    url: '/indexx-exchange/how-it-works',
  },
  { label: '', value: '/', url: '/' },
];

const HeaderTest = () => {
  const theme = useTheme() as any;
  const isAuthenticated = localStorage.getItem('access_token') !== null;

  const [backdropVisibility, setBackdropVisibility] = useState(false);
  const elementRef = useRef(null);

  //   const isAuthenticated = false;

  //   const [activeIndex, setactiveIndex] = useState(0);
  //   const [iconicHeaderData, setIconicHeaderData] = useState(
  //     header_data
  //       .find((el) => el.active === true)
  //       ?.dropDownContent.find((elem) => elem.mainList === true)?.links
  //   );let title = <>{String(localStorage.getItem('user')).toLowerCase()}</>;
  const [, setIsInsideApp] = useState(false);
  const timeoutRef = useRef<any>(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [staticsData, setStaticsData] = useState();
  const [honeyBeeData, setHoneyBeeData] = useState();
  const [honeybeeCreateDate, setHoneybeeCreateDate] = useState();
  const [isCaptain, setisCaptain] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [url, setUrl] = useState('');
  const [haspowerpack, setHaspowerpack] = useState(false);

  console.log(haspowerpack, 'has pack');

  let pageName = searchParams.get('page');
  // alert(pageName)
  useEffect(() => {
    if (location) {
      setIsInsideApp(location.pathname.includes('/indexx-exchange/'));
    }
  }, [location]);
  const showText: any = Links.filter((link) =>
    window.location.pathname.includes(link.value)
  ).map((obj) => obj.label);
  // const showUrl: any = Links.filter((link) =>
  //   window.location.pathname.includes(link.value)
  // ).map((obj) => obj.url);
  useEffect(() => {
    showText[0] !== ''
      ? (document.title = `${showText[0]} | indexx.ai`)
      : pageName
        ? (document.title = `${pageName} | indexx.ai`)
        : (document.title = 'indexx.ai');
  }, [showText, pageName]);
  useEffect(() => {
    async function checkUserType() {
      let userType =
        localStorage.getItem('userType') !== undefined
          ? String(localStorage.getItem('userType'))
          : undefined;
      let username =
        localStorage.getItem('username') !== undefined
          ? String(localStorage.getItem('username'))
          : undefined;

      const user =
        localStorage.getItem('user') !== undefined
          ? String(localStorage.getItem('user'))
          : undefined;

      const email = localStorage.getItem('email') !== undefined
        ? String(localStorage.getItem('email'))
        : undefined;

      let getUserType = await checkByemail(String(email))
      userType = getUserType.userType
      const accessToken =
        localStorage.getItem('access_token') !== undefined
          ? String(localStorage.getItem('access_token'))
          : undefined;
      

      if (userType === 'CaptainBee') {
        if (accessToken && accessToken !== 'null' && accessToken !== '') {
          
          let resObj = await getCaptainBeeByEmail(String(email));
          console.log("resObj", resObj)
          username = resObj?.data.Username;
        }
        setisCaptain(true);
        if (username) {
          getCaptainBeeStatics(String(username)).then((data) => {
            setUserProfile(data?.data?.affiliateUserProfile?.photoIdFileurl);
            console.log("index header", data?.data?.affiliateUserProfile?.photoIdFileurl)
            setStaticsData(data.data);
            if (
              data?.data?.powerPackData !== undefined &&
              data?.data?.powerPackData !== null &&
              data?.data?.powerPackData !== ''
            ) {
              setHaspowerpack(true);
            }
          });
        }
      } else {
        setisCaptain(false);

        getHoneyUserDetails(String(user)).then((data) => {
          setHoneybeeCreateDate(data.data.accountCreationDate);
          setHoneyBeeData(data?.data?._doc);
          setUserProfile(data?.data?._doc?.profilePic);
        });
      }
    }
    checkUserType();
  }, []);

  useEffect(() => {
    let access_token = String(localStorage.getItem('access_token'));
    console.log('access', access_token);
    if (access_token) {
      try {
        let decoded = decodeJWT(access_token);
        const userEmail = decoded.email;
        const userKey = String(localStorage.getItem('userkey'));
        const userType = localStorage.getItem('userType');
        const userpassword = localStorage.getItem('userpass');
        console.log('userEmail', userEmail);
        console.log('userKey', userKey);
        console.log('userpassword', userpassword);
        const walletUrl = `${baseWalletURL}/login/sign-in/?useremail=${userEmail}&userkey=${userpassword}&usertype=${userType}`;
        setUrl(walletUrl);
      } catch (error) {
        console.error('Error decoding access_token:', error);
        // Handle the error, e.g., show an error message to the user or perform appropriate actions.
      }
    }
  }, []);

  const [userLogged, setUserLogged] = useState('normal'); // Set the user's type

  const userEmail = localStorage.getItem('user') || '';

  useEffect(() => {
    const user =
      localStorage.getItem('userlogged') !== undefined
        ? setUserLogged(String(localStorage.getItem('userlogged')))
        : setUserLogged('normal');
    const handleStorageChange = (event: any) => {
      // console.log(event);
      if (setUserLogged !== event.currentTarget.localStorage.userlogged)
        setUserLogged(event.currentTarget.localStorage.userlogged);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const isMobile = useMediaQuery('(max-width:768px)');

  //   const handleItemClick = (path: string, i: number) => {
  //     setactiveIndex(i);
  //     console.log(path, 'path');
  //   };
  const handleMouseEnter = () => {
    // Set a timeout to open the dropdown after 0.2s
    timeoutRef.current = setTimeout(() => {
      setBackdropVisibility(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    // Clear the timeout if user leaves before 0.2s
    clearTimeout(timeoutRef.current);
    // Hide the dropdown after a delay
    setTimeout(() => {
      setBackdropVisibility(false);
    }, 200);
  };
  const updateBackDropVisibility = (type: string) => {
    if (type === 'enter') handleMouseEnter();
    if (type === 'leave') handleMouseLeave();
  };

  useEffect(() => {
    const element = elementRef.current;

    if (element) {
      const computedStyle = window.getComputedStyle(element);
      const visibility = computedStyle.getPropertyValue('visibility');
      const display = computedStyle.getPropertyValue('display');

      if (visibility === 'hidden' || display === 'none') {
        console.log('Element is hidden or not visible');
      } else {
        console.log('Element is visible');
        setBackdropVisibility(false);
      }
    }
  }, []);

  const logOutUser = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const userType =
      localStorage.getItem('userType') !== undefined
        ? String(localStorage.getItem('userType'))
        : undefined;
    localStorage.removeItem('user'); //remove one item
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('redirected');
    localStorage.removeItem('email');
    localStorage.clear(); //clear all localstorage
    console.log(userType);
    
    window.location.href = `${baseURL}/auth/login?action=Logout`;
    // if (userType === 'CaptainBee') {
    //   window.location.href = '/auth/login';
    // } else if (userType === 'HoneyBee') {
    //   window.location.href = '/auth/login';
    // } else {
    //   if (window.location.pathname.includes('trade-to-earn'))
    //     window.location.reload();
    //   else window.location.href = '/auth/login';
    // }
  };
  const handleLogout = (e: any, nm: string) => {
    if (nm !== 'logout') return;
    logOutUser(e);
  };
  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, zIndex: 10000 }}>
        <div className="wrapper">
          <div
            className="backdrop"
            style={{
              display: 'block',
              opacity: backdropVisibility ? 1 : 0,
              background:
                theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : '',
              transitionDelay: '.1s',
              height: backdropVisibility ? '100vh' : 0,
            }}
          ></div>

          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div className="logo" style={{ marginRight: '30px' }}>
              <a href="https://indexx.ai">
                <img src={logo} />
              </a>
            </div>
            <input type="radio" name="slider" id="menu-btn" />
            <input type="radio" name="slider" id="close-btn" />
            <ul className="nav-links" style={{ flex: 1 }}>
              <label htmlFor="close-btn" className="btn close-btn">
                x
              </label>
              {header_data.map((element) => (
                <>
                  <li
                    className="main"
                    onMouseEnter={() => updateBackDropVisibility('enter')}
                    onMouseLeave={() => updateBackDropVisibility('leave')}
                  >
                    <a
                      href={element.href}
                      className={`desktop-item ${element.active ? 'link_active' : ''
                        }`}
                      onMouseEnter={() => updateBackDropVisibility('enter')}
                    >
                      {element.mainTextDesktop}
                    </a>
                    <input type="checkbox" id={element.mainTextDesktop} />
                    <label
                      htmlFor={element.mainTextDesktop}
                      className="mobile-item"
                    >
                      {element.mainTextMob} {element.hasMegaDrop ? '>' : ''}
                    </label>
                    {element.hasMegaDrop ? (
                      <div
                        className="mega-box"
                        style={{
                          background:
                            theme.palette.mode === 'light' ? '#FAFAFC' : '',
                          color:
                            theme.palette.mode === 'light'
                              ? '#333336 !important'
                              : '',
                        }}
                        ref={elementRef}
                      >
                        <div className="content">
                          {element.dropDownContent.map((elem) => (
                            <div
                              className="row"
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <header>{elem.heading}</header>
                              <ul
                                className={`mega-links ${elem.mainList ? 'main' : ''
                                  }`}
                              >
                                {elem.links.map((el) => (
                                  <li>
                                    <a
                                      href={el.href}
                                      className={
                                        theme.palette.mode === 'light'
                                          ? 'dark_color'
                                          : ''
                                      }
                                    >
                                      {el.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          <div className="row"></div>
                          <div className="row"></div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </li>
                </>
              ))}

              {auth_header_data
                .filter((el) => el.isAuth === isAuthenticated)
                .map((element, i) => (
                  <>
                    {element.mainTextDesktop === 'Logout' ? (
                      <li
                        className="main"
                        style={{
                          marginLeft: i === 0 ? 'auto' : '',
                          display: 'flex',
                          cursor: 'pointer',
                        }}
                      // onClick={(e) =>
                      //   handleLogout(
                      //     e,
                      //     element.mainTextDesktop.toLocaleLowerCase()
                      //   )
                      // }
                      >
                        <a
                          className={`desktop-item ${element.active ? 'link_active' : ''
                            }`}
                          onClick={(e) => handleLogout(e, 'logout')}
                        >
                          Logout
                        </a>
                      </li>
                    ) : (
                      <li
                        className="main"
                        style={{
                          marginLeft: i === 0 ? 'auto' : '',
                          display: 'flex',
                        }}
                        onMouseEnter={
                          isAuthenticated
                            ? () => updateBackDropVisibility('enter')
                            : () => updateBackDropVisibility('leave')
                        }
                        onMouseLeave={() => updateBackDropVisibility('leave')}
                      >
                        {!isMobile && isAuthenticated && (
                          <div
                            style={{
                              marginBottom: '-23px',
                              zIndex: '10000000',

                              transform: 'translateY(10px)',
                            }}
                          >
                            <div
                              style={{
                                width: isCaptain ? '60px' : '65px',
                                height: isCaptain ? '80px' : '70px',
                                backgroundImage: `url(${isCaptain === true ? frame : beeframe
                                  })`,
                                transform: !isCaptain ? 'rotate(-30deg)' : '',
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
                                className={
                                  isCaptain ? 'bee-hexagon' : 'elipse-img'
                                }
                                style={{
                                  marginBottom: `${isCaptain === true ? 0 : '7px'
                                    }`,
                                }}
                              >
                                <img
                                  alt=""
                                  src={userProfile ? userProfile : dummy}
                                  width={'63px'}
                                  height={'66px'}
                                  style={{
                                    border: 'none',
                                  }}
                                />

                              </div>
                            </div>
                          </div>
                        )}
                        <a
                          href={element.href}
                          className={`desktop-item ${element.active ? 'link_active' : ''
                            }`}
                        >
                          {isAuthenticated
                            ? userEmail
                            : element.mainTextDesktop}
                        </a>
                        <input type="checkbox" id={element.mainTextDesktop} />
                        <label
                          htmlFor={element.mainTextDesktop}
                          className="mobile-item"
                        >
                          {isAuthenticated
                            ? userEmail
                            : element.mainTextDesktop}
                        </label>
                        {element.hasMegaDrop ? (
                          <div
                            className="mega-box"
                            style={{
                              background:
                                theme.palette.mode === 'light' ? '#FAFAFC' : '',
                              color:
                                theme.palette.mode === 'light'
                                  ? '#333336 !important'
                                  : '',
                            }}
                            ref={elementRef}
                          >
                            <div className="content">
                              {element.dropDownContent.map((elem) => (
                                <div
                                  className="row"
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                  }}
                                >
                                  <header>{elem?.heading}</header>
                                  <ul
                                    className={`mega-links ${elem?.mainList ? 'main' : ''
                                      }`}
                                  >
                                    {elem?.links.map((el) => (
                                      <li>
                                        <a
                                          onClick={(e) =>
                                            handleLogout(
                                              e,
                                              el.name.toLocaleLowerCase()
                                            )
                                          }
                                          href={el.href}
                                          className={
                                            theme.palette.mode === 'light'
                                              ? 'dark_color'
                                              : ''
                                          }
                                        >
                                          {el.name}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}

                              <div className="row"></div>
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                      </li>
                    )}
                  </>
                ))}
            </ul>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <DarkMode />
            <label htmlFor="menu-btn" className="btn menu-btn">
              <CrossIcon />
            </label>
          </div>
        </div>
      </nav>
      {/* <div
        className="secondary_header_root"
        style={{ background: theme === 'dark' ? '#000' : '' }}
      >
        <div className="secondary_header_content">
          {iconicHeaderData?.map((curr: any, i) => (
            <div
              key={i}
              className={`secondary_header_content_item ${
                i === activeIndex ? 'active' : ''
              }`}
              onClick={() => handleItemClick(curr.href, i)}
            >
              <span className="secondary_header_content_img_container">
                <img
                  src={
                    theme !== 'light'
                      ? curr?.imgLight ?? token_white
                      : curr?.imgDark ?? token
                  }
                />
              </span>
              <span>{curr.name}</span>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default HeaderTest;
