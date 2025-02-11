import React, { useEffect, useState } from 'react';
// import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Instagram from '../../assets/arts/instagramIcon.svg';
import Twitter from '../../assets/arts/twit logo 1.svg';
import YouTube from '../../assets/arts/youtTubeIcon.svg';
import Reddit from '../../assets/arts/redditIcon.svg';
import facebook from '../../assets/arts/fb_logo.png';
import Telegram from '../../assets/arts/telegram.png';
// import needHelp from '../../assets/arts/needhelp.png';
// import personFlipCoin from "../../assets/arts/personFlipCoin.webp";
import personFlipCoin from '../../assets/arts/personFlip.png';
import axios from 'axios';
// import womanFlipCoin from '../../assets/arts/womanFlipCoin.svg';
import indexText_dark from '../../assets/header-icons/indexx-logo-v3-light.svg';
import indexText from '../../assets/header-icons/indexx-logo-v3-dark.svg';
import indexTextyellow from '../../assets/indexx ai yellow 1.svg';
import indexTextyellowdark from '../../assets/yellow_dark.svg';
import arrow from '../../assets/arrow-.svg';
import plus from '../../assets/arts/plus.svg';
import './Footer.css';
import {
  baseCEXURL,
  baseDEXURL,
  baseURL,
  baseHiveURL,
  baseWSURL,
  baseWalletURL,
  baseShopURL,
  baseXnftURL,
  baseMktplaceURL,
  getUserShortToken,
  decodeJWT,
  baseLottoUrl,
  baseAcademyUrl,
} from '../../services/api';
import { useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import jwtDecode from 'jwt-decode';

interface FooterProps {
  helpIcon?: boolean;
  footerArt?: string;
}
const useStyles = makeStyles((theme: any) => ({
  linkHover: {
    '&:hover': {
      color: `${theme.palette.text.primary} !important`,
    },
  },
  copyrightHover: {
    fontSize: '12px',
    '& a:hover': {
      color: `${theme.palette.text.secondary} !important`,
    },
  },
  siteFooterInnerBorder: {
    padding: '10px 0px',
    borderTop: `1px solid ${theme.palette.divider} !important`,
    borderBottom: `1px solid ${theme.palette.divider} !important`,
    [theme.breakpoints.down('md')]: {
      borderTop: `0px solid ${theme.palette.divider} !important`,
      borderBottom: `0px solid ${theme.palette.divider} !important`,
    },
  },
}));
const Footer = ({ helpIcon = true, footerArt = 'flipMan' }: FooterProps) => {
  const classes = useStyles();
  let cachedToken: any = null;

  const icons = [
    {
      src: Instagram,
      href: 'https://www.instagram.com/indexx_ai/',
      alt: 'Instagram',
    },
    {
      src: Twitter,
      href: 'https://twitter.com/Indexx_ai',
      alt: 'Twitter',
    },
    {
      src: YouTube,
      href: 'https://www.youtube.com/channel/UCDBjhB2zS-WHArfeEISJLrQ',
      alt: 'You-tube',
    },
    {
      src: facebook,
      href: 'https://www.facebook.com/profile.php?id=100086225564460',
      alt: 'facebook',
    },
    // {
    //   src: Reddit,
    //   href: 'https://www.reddit.com/user/Indexx_ai/',
    //   alt: 'reddit',
    // },
    {
      src: Telegram,
      href: 'https://t.me/indexxai',
      alt: 'reddit',
    },
  ];

  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'dark'
  );
  useEffect(() => {
    const handleStorageChange = (event: any) => {
      console.log(event);
      setTheme(event.currentTarget.localStorage.selectedTheme);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const [userLogged, setUserLogged] = useState('normal');

  useEffect(() => {
    const user =
      localStorage.getItem('userlogged') !== undefined
        ? setUserLogged(String(localStorage.getItem('userlogged')))
        : setUserLogged('normal');
    const handleStorageChange = (event: any) => {
      console.log(event);
      if (setUserLogged !== event.currentTarget.localStorage.userlogged) {
        setUserLogged(event.currentTarget.localStorage.userlogged);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const [exchangeUrl, setExchangeUrl] = useState(baseCEXURL);
  const [lottoUrl, setLottoUrl] = useState('https://lotto.indexx.ai/');

  const [tokenizedUrls, setTokenizedUrls] = useState({
    defaultUrl: `${baseURL}`,
    academyUrl: `https://academy.indexx.ai/`,
    exchangeUrl: `${baseURL}/indexx-exchange/nfts`,
    tokenDetailsUrl: `${baseURL}/indexx-exchange/token-details`,
    comingSoonUrl: `${baseURL}/indexx-exchange/coming-soon?page=Site%20Map`,
    aboutUrl: `${baseURL}/indexx-exchange/about`,
    blogUrl: `${baseURL}/indexx-exchange/blog`,
    careersUrl: `${baseURL}/indexx-exchange/careers`,
    howItWorksUrl: `${baseURL}/indexx-exchange/how-it-works`,
    marketsUrl: `${baseURL}/indexx-exchange/markets`,
    vlogUrl: `${baseURL}/indexx-exchange/vlog`,
    documentUrl: `${baseURL}/indexx-exchange/coming-soon?page=Document`,
    privacyUrl: `${baseURL}/indexx-exchange/legal/privacypolicy`,
    tandc: `${baseURL}/indexx-exchange/legal/termsandconditions`,
    legalUrl: `${baseURL}/indexx-exchange/legal`,
    tradeToEarnUrl: `${baseURL}/indexx-exchange/trade-to-earn`,
    bitcoinCmgUrl: `${baseURL}/indexx-exchange/coming-soon?page=$1%20Bitcoin`,
    wallStreetUrl: baseWSURL,
    wallStreetCertUrl: `${baseWSURL}/certificate`,
    wallStreetDetailsUrl: `${baseWSURL}/details`,
    backToCommunity: `${baseURL}/back-to-community`,
    eliteClub: `${baseURL}/elite-club`,
    howItWorks: `${baseURL}/how-master-login-works`,
    testimonial: `https://www.youtube.com/watch?v=9ULdWShBz3k`,
    whalesclub: `${baseURL}/whales-club`,
    // Add other URLs here as needed
  });

  const getAuthenticatedUrl = async (url: any) => {
    if (cachedToken) {
      const urlObj = new URL(url, window.location.origin);
      urlObj.searchParams.set('signInToken', cachedToken);
      // Check if the URL is for the stock-token page
      if (url.includes('/update/home/stock-token')) {
        urlObj.searchParams.set('buyToken', 'AMZN');
      } else if (url.includes('/update/home')) {
        urlObj.searchParams.set('buyToken', 'INEX');
      }
      return urlObj.toString();
    }

    const isAuthenticated = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');
    let shortToken;

    if (email) {
      shortToken = await getUserShortToken(email);
    } else if (isAuthenticated) {
      let decodedValue = await decodeJWT(isAuthenticated);
      shortToken = await getUserShortToken(decodedValue?.email);
    }

    if (isAuthenticated) {
      cachedToken = shortToken.data;
      const urlObj = new URL(url, window.location.origin);
      urlObj.searchParams.set('signInToken', shortToken.data);

      // Check if the URL is for the stock-token page
      if (url.includes('/update/home/stock-token')) {
        urlObj.searchParams.set('buyToken', 'AMZN');
      } else if (url.includes('/update/home')) {
        urlObj.searchParams.set('buyToken', 'INEX');
      }

      return urlObj.toString();
    }

    return url;
  };

  useEffect(() => {
    const fetchAuthenticatedUrls2 = async () => {
      const isAuthenticated = localStorage.getItem('access_token');
      const email = localStorage.getItem('email');
      let shortToken;

      if (email) {
        shortToken = await getUserShortToken(email);
      } else if (isAuthenticated) {
        let decodedValue = await decodeJWT(isAuthenticated);
        shortToken = await getUserShortToken(decodedValue?.email);
      }

      if (shortToken) {
        const token = shortToken?.data;

        setTokenizedUrls({
          defaultUrl: `${baseURL}?signInToken=${token}`,
          academyUrl: `https://academy.indexx.ai/?signInToken=${token}`,
          exchangeUrl: `${baseURL}/indexx-exchange/nfts?signInToken=${token}`,
          tokenDetailsUrl: `${baseURL}/indexx-exchange/token-details?signInToken=${token}`,
          comingSoonUrl: `${baseURL}/indexx-exchange/coming-soon?page=Site%20Map&signInToken=${token}`,
          aboutUrl: `${baseURL}/indexx-exchange/about?signInToken=${token}`,
          blogUrl: `${baseURL}/indexx-exchange/blog?signInToken=${token}`,
          careersUrl: `${baseURL}/indexx-exchange/careers?signInToken=${token}`,
          howItWorksUrl: `${baseURL}/indexx-exchange/how-it-works?signInToken=${token}`,
          marketsUrl: `${baseURL}/indexx-exchange/markets?signInToken=${token}`,
          vlogUrl: `${baseURL}/indexx-exchange/vlog?signInToken=${token}`,
          documentUrl: `${baseURL}/indexx-exchange/coming-soon?page=Document&signInToken=${token}`,
          privacyUrl: `${baseURL}/indexx-exchange/legal/privacypolicy?signInToken=${token}`,
          tandc: `${baseURL}/indexx-exchange/legal/termsandconditions?signInToken=${token}`,
          legalUrl: `${baseURL}/indexx-exchange/legal?signInToken=${token}`,
          tradeToEarnUrl: `${baseURL}/indexx-exchange/trade-to-earn?signInToken=${token}`,
          bitcoinCmgUrl: `${baseURL}/indexx-exchange/coming-soon?page=$1%20Bitcoin?signInToken=${token}`,
          wallStreetUrl: `${baseWSURL}?signInToken=${token}`,
          wallStreetCertUrl: `${baseWSURL}/certificates?ignInToken=${token}`,
          wallStreetDetailsUrl: `${baseWSURL}/details?signInToken=${token}`,
          backToCommunity: `${baseURL}/back-to-community?signInToken=${token}`,
          eliteClub: `${baseURL}/elite-club?signInToken=${token}`,
          howItWorks: `${baseURL}/how-master-login-works`,
          testimonial: `https://www.youtube.com/watch?v=9ULdWShBz3k`,
          whalesclub: `${baseURL}/whales-club?signInToken=${token}`,

          // Add other URLs here as needed
        });
      }
    };

    fetchAuthenticatedUrls2();
  }, []);

  useEffect(() => {
    const fetchAuthenticatedUrls = async () => {
      if (localStorage.getItem('access_token')) {
        setExchangeUrl(await getAuthenticatedUrl(baseCEXURL));
        setLottoUrl(await getAuthenticatedUrl('https://lotto.indexx.ai/'));
      }
    };

    fetchAuthenticatedUrls();
  }, []);

  return (
    <>
      <footer
        className="site_footer position-relative container-fluid desktop-display"
        style={{ marginTop: '150px' }}
      >
        {/* {helpIcon && (
          <a
            href={`${baseURL}/indexx-exchange/help`}
            className="need_help"
            style={{
              backgroundImage: `url(${needHelp})`,
              textDecoration: 'none',
            }}
          >
            Need Help?
          </a>
        )} */}

        <div
          className={`${classes.siteFooterInnerBorder} flex-align-center d-flex flex-justify-between site_footer_inner row mx-auto`}
        >
          <span style={{ marginBottom: '18px', marginTop: '18px' }}>
            <h1 className="align-middle">
              <a href={exchangeUrl}>
                {theme === 'dark' ? (
                  <img
                    src={indexText}
                    alt="index logo"
                    width={'60px'}
                    className="logo_ind"
                  />
                ) : (
                  <img
                    src={indexText_dark}
                    alt="index logo"
                    width={'60px'}
                    className="logo_ind"
                  />
                )}
              </a>
              {/* <img src={arrow} alt="index logo" width={"19px"} /> */}
            </h1>
          </span>
          <br />
          <br />
          <br />
          <div
            className="col-sm-12 col-md-12 footercentre2 text-center "
            style={{ marginBottom: 45, minWidth: '70%' }}
          >
            <div className="row text-left">
              <div className="col text-left">
                <span style={{ textAlign: 'left' }}>
                  <p className="fw-bold">Platform</p>
                  <p className="footer-text text-left">
                    <a
                      href={baseAcademyUrl}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Academy
                      </span>
                    </a>
                    <br />
                    <a
                      href={exchangeUrl}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Exchange / Buy Crypto
                      </span>
                    </a>
                    <br />
                    <a
                      href={lottoUrl}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Fantasy Lotto
                      </span>
                    </a>
                    <br />
                    <a
                      href={baseHiveURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Hive
                      </span>
                    </a>
                    <br />

                    <a
                      href={baseShopURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Shop
                      </span>
                    </a>
                    <br />
                    <br />
                  </p>
                </span>
              </div>
              <div className="col">
                <span style={{ textAlign: 'left' }}>
                  <p className="fw-bold">Products</p>
                  <p className="footer-text text-left" style={{}}>
                    <a
                      href={`https://indexxgifts.com/`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}></span>
                    </a>

                    <a
                      href={`${baseShopURL}/?category=gift`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Gift Cards
                      </span>
                    </a>
                    <br />

                    <a
                      href={`${baseShopURL}/?category=greeting`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Greeting Cards
                      </span>
                    </a>
                    <br />

                    <a
                      href={`${tokenizedUrls?.tokenDetailsUrl}`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        xTokens
                      </span>
                    </a>
                    <br />
                    <br />
                  </p>
                </span>
              </div>
              <div className="col">
                <span style={{ textAlign: 'left' }}>
                  <p className="fw-bold">Program</p>
                  <p
                    className="footer-text text-left"
                    style={{
                      color: '#9F9F9F',
                      textDecoration: 'none',
                      lineHeight: 1.5,
                    }}
                  >
                    <a
                      href="https://register.affiliate.indexx.ai/"
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Affiliate Program
                      </span>
                    </a>
                    <br />

                    <a
                      href={baseHiveURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Hive
                      </span>
                    </a>

                    <br />
                  </p>
                </span>
              </div>
              <div className="col">
                <span style={{ textAlign: 'left' }}>
                  <p className="fw-bold">Wallet</p>
                  <p
                    className="footer-text text-left"
                    style={{
                      color: '#9F9F9F',
                      textDecoration: 'none',
                      lineHeight: 1.5,
                    }}
                  >
                    <a
                      href="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en"
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Wallet Extension
                      </span>
                    </a>
                    <br />

                    <a
                      href={baseWalletURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Wallet Web
                      </span>
                    </a>

                    <br />
                  </p>
                </span>
              </div>
              <div className="col">
                <span style={{ textAlign: 'left' }}>
                  <p className="fw-bold">Company</p>
                  <p
                    className="footer-text text-left"
                    style={{
                      color: '#9F9F9F',
                      textDecoration: 'none',
                      lineHeight: 1.5,
                    }}
                  >
                    <a
                      href={`${tokenizedUrls?.aboutUrl}`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        About
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${tokenizedUrls?.backToCommunity}`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Back to Community
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${tokenizedUrls?.blogUrl}`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Blog
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${tokenizedUrls?.careersUrl}`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Careers
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${tokenizedUrls?.documentUrl}`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Documents
                      </span>
                    </a>

                    <br />
                    <a
                      href={`${tokenizedUrls?.eliteClub}`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Elite Club
                      </span>
                    </a>

                    <br />
                    <a
                      href={`${tokenizedUrls?.howItWorks}`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        How it Works
                      </span>
                    </a>
                    <br />

                    <a
                      href={`${tokenizedUrls?.testimonial}`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Testimonials
                      </span>
                    </a>
                    <br />

                    <a
                      href={`${tokenizedUrls?.vlogUrl}`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Vlog
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${tokenizedUrls?.whalesclub}`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className={`${classes.linkHover} link_sty`}>
                        Whales Club
                      </span>
                    </a>
                    <br />

                    <br />
                  </p>
                </span>
              </div>
            </div>
          </div>

          <div className=" footercentre col-sm-12 col-md-12">
            <div
              className="social-wrapper"
              style={{
                width: 'fit-content',
                alignSelf: 'end',
                marginTop: '150px',
              }}
            >
              <ul>
                {icons.map((icon, index) => (
                  <li key={index}>
                    <a
                      href={icon.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="social-connect-icons"
                        src={icon.src}
                        alt={icon.alt}
                        width="35"
                        height="35"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-xs-6 col-md-4 flip_icon_container">
              <img
                src={personFlipCoin}
                alt="Index flip coin art"
                className="flip_person_icon hide-img"
                style={{ marginTop: '-33px' }}
              />
            </div>
          </div>
        </div>
        <div className="copyright_bar row mx-auto">
          <span className="copyright_text">
            Copyright © 2023 All Rights Reserved.
          </span>
          <span
            className={`${classes.copyrightHover} fit-content border-right`}
          >
            <a href={`${tokenizedUrls?.privacyUrl}`}>Privacy Policy</a>
          </span>
          <span
            className={`${classes.copyrightHover} fit-content border-right`}
          >
            <a href={`${tokenizedUrls?.tandc}`}>Terms Of Use</a>
          </span>
          <span
            className={`${classes.copyrightHover} fit-content border-right`}
          >
            <a href={`${tokenizedUrls?.legalUrl}`}>Legal</a>
          </span>
          <span className={`${classes.copyrightHover} fit-content`}>
            <a href={`${tokenizedUrls?.comingSoonUrl}`}>Site Map</a>
          </span>
        </div>
      </footer>

      <footer
        className="site_footer position-relative container-fluid mobile-display border-top"
        style={{ paddingTop: '100px' }}
      >
        <div className="col-xs-6 col-md-4 flip_icon_container text-center">
          {/* <a href={`${baseURL}/indexx-exchange/help`} className="need_help_phone" style={{ backgroundImage: `url(${needHelp})` ,textDecoration:'none' }}>
                   Need Help?
               </a> */}
          {/* {footerArt === 'flipWoman' ? (
              <img
                src={womanFlipCoin}
                alt="Index flip coin art"
                className="flip_person_icon_mobile flip_woman"
              />
            ) : ( */}
          <img
            src={personFlipCoin}
            alt="Index flip coin art"
            className="flip_person_icon_mobile"
          />
          {/* )} */}
        </div>

        <div
          className={`${classes.siteFooterInnerBorder} flex-align-center d-flex flex-justify-between site_footer_inner row`}
          style={{ marginLeft: '15px' }}
        >
          <div className=" footercentre col-sm-12 col-md-12">
            {/* <a href="/" id="1067941554">
                           <img src="https://lirp.cdn-website.com/5afbaf73/dms3rep/multi/opt/index-38-238w.png"
                               width="50%" height="22%" alt="" />
                       </a>
                        */}
            {/* <h1>
                       <Link to="/" className="primary_color">Get Connected</Link>
                   </h1> */}

            <div className="social-wrapper" style={{ marginBottom: 50 }}>
              <ul>
                {icons.map((icon, index) => (
                  <li key={index}>
                    <a
                      href={icon.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="social-connect-icons"
                        src={icon.src}
                        alt={icon.alt}
                        width="35"
                        height="35"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="col-sm-12 col-md-12 footercentre2 text-left "
            style={{ marginBottom: 40 }}
          >
            <div className="row  w-100 mobile-row border-top">
              <a
                className="btn footer-drop "
                data-bs-toggle="collapse"
                href="#multiCollapseExample1"
                role="button"
                aria-expanded="false"
                aria-controls="multiCollapseExample1"
              >
                Platforms
                <img src={plus} alt="plus" width={'9px'} />
              </a>
              <div
                className="collapse multi-collapse"
                id="multiCollapseExample1"
              >
                <div className="">
                  <span style={{ textAlign: 'start' }}>
                    <p className="text-extra-small" style={{}}>
                      <a
                        href={exchangeUrl}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Exchange
                        </span>
                      </a>
                      <br />
                      <a
                        href={lottoUrl}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Fantasy Lotto
                        </span>
                      </a>
                      <br />
                      <a
                        href={baseShopURL}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Shop
                        </span>
                      </a>
                      <br />
                      <a
                        href={baseDEXURL}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Swap
                        </span>
                      </a>
                      <br />
                      <a
                        href={tokenizedUrls?.wallStreetUrl}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Wall street
                        </span>
                      </a>
                      <br />
                      <a
                        href={baseMktplaceURL}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Market
                        </span>
                      </a>
                      <br />
                      <br />
                    </p>
                  </span>
                </div>
              </div>
            </div>

            <div className="row  w-100 mobile-row">
              <a
                className="btn footer-drop "
                data-bs-toggle="collapse"
                href="#multiCollapseExample2"
                role="button"
                aria-expanded="false"
                aria-controls="multiCollapseExample2"
              >
                Products
                <img src={plus} alt="plus" width={'9px'} />
              </a>
              <div
                className="collapse multi-collapse"
                id="multiCollapseExample2"
              >
                <div className="">
                  <span style={{ textAlign: 'start' }}>
                    <p
                      className="text-extra-small"
                      style={{
                        color: '#9F9F9F',
                        textDecoration: 'none',
                        lineHeight: 1.5,
                      }}
                    >
                      <a
                        href={'https://indexxgifts.com/'}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Gift Cards
                        </span>
                      </a>
                      <br />
                      <a
                        href={`${baseShopURL}/collections/greeting-cards`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Greeting Cards
                        </span>
                      </a>
                      <br />
                      <a
                        href={`${tokenizedUrls?.exchangeUrl}`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          NFT
                        </span>
                      </a>
                      <br />
                      <a
                        href={`${tokenizedUrls?.wallStreetCertUrl}`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Stock Certificates
                        </span>
                      </a>
                      <br />
                      <a
                        href={`${tokenizedUrls?.wallStreetDetailsUrl}`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Stock Tokens
                        </span>
                      </a>
                      <br />
                      <a
                        href={`${tokenizedUrls?.tokenDetailsUrl}`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Tokens
                        </span>
                      </a>
                      <br />
                      <a
                        href={baseXnftURL}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          XNFT
                        </span>
                      </a>
                      <br />
                      <a
                        href={`${baseXnftURL}/#fiat-cur`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          XUSD
                        </span>
                      </a>
                      <br />
                      <a
                        href={`${tokenizedUrls?.bitcoinCmgUrl}`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          $1 Bitcoin
                        </span>
                      </a>
                      <br />
                      <br />
                    </p>
                  </span>
                </div>
              </div>
            </div>

            <div className="row  w-100 mobile-row">
              <a
                className="btn footer-drop "
                data-bs-toggle="collapse"
                href="#multiCollapseExample3"
                role="button"
                aria-expanded="false"
                aria-controls="multiCollapseExample3"
              >
                Program
                <img src={plus} alt="plus" width={'9px'} />
              </a>
              <div
                className="collapse multi-collapse"
                id="multiCollapseExample3"
              >
                <div className="">
                  <span style={{ textAlign: 'start' }}>
                    <p
                      className="text-extra-small"
                      style={{
                        color: '#9F9F9F',
                        textDecoration: 'none',
                        lineHeight: 1.5,
                      }}
                    >
                      <a
                        href="https://register.affiliate.indexx.ai/"
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Affiliate Program
                        </span>
                      </a>
                      <br />

                      <a
                        href={baseHiveURL}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Hive
                        </span>
                      </a>

                      <br />
                      <a
                        href={`${tokenizedUrls?.tradeToEarnUrl}`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Trade to Earn
                        </span>
                      </a>

                      <br />
                      <br />
                    </p>
                  </span>
                </div>
              </div>
            </div>

            <div className="row  w-100 mobile-row">
              <a
                className="btn footer-drop "
                data-bs-toggle="collapse"
                href="#multiCollapseExample4"
                role="button"
                aria-expanded="false"
                aria-controls="multiCollapseExample4"
              >
                Wallet
                <img src={plus} alt="plus" width={'9px'} />
              </a>
              <div
                className="collapse multi-collapse"
                id="multiCollapseExample4"
              >
                <div className="">
                  <span style={{ textAlign: 'start' }}>
                    <p
                      className="text-extra-small"
                      style={{
                        color: '#9F9F9F',
                        textDecoration: 'none',
                        lineHeight: 1.5,
                      }}
                    >
                      <a
                        href="https://chrome.google.com/webstore/detail/indexx-wallet/fpibioaihcagphbidhodidjbnclocgll?hl=en"
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Wallet Extension
                        </span>
                      </a>
                      <br />

                      <a
                        href={baseWalletURL}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Wallet Web
                        </span>
                      </a>
                      <br />
                      <br />
                    </p>
                  </span>
                </div>
              </div>
            </div>

            <div className="row  w-100 mobile-row">
              <a
                className="btn footer-drop "
                data-bs-toggle="collapse"
                href="#multiCollapseExample5"
                role="button"
                aria-expanded="false"
                aria-controls="multiCollapseExample5"
              >
                Company
                <img src={plus} alt="plus" width={'9px'} />
              </a>
              <div
                className="collapse multi-collapse"
                id="multiCollapseExample5"
              >
                <div className="">
                  <span style={{ textAlign: 'start' }}>
                    <p
                      className="text-extra-small"
                      style={{
                        color: '#9F9F9F',
                        textDecoration: 'none',
                        lineHeight: 1.5,
                      }}
                    >
                      <a
                        href={`${tokenizedUrls?.aboutUrl}`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          About{' '}
                        </span>
                      </a>

                      <br />
                      <a
                        href={`${tokenizedUrls?.blogUrl}`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Blog{' '}
                        </span>
                      </a>

                      <br />
                      <a
                        href={`${tokenizedUrls?.careersUrl}`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Careers{' '}
                        </span>
                      </a>
                      <br />
                      <a
                        href={`${tokenizedUrls?.howItWorksUrl}`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          {' '}
                          How it Works{' '}
                        </span>
                      </a>
                      <br />
                      {/* <a
                      href={`${baseURL}/indexx-exchange/nfts`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      NFT{' '}
                      </span>
                    </a>
                    <br />
                    <a
                      href="https://register.affiliate.indexx.ai/"
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Affiliate Program{' '}
                      </span>
                    </a>
                    <br /> */}
                      <a
                        href={`${tokenizedUrls?.marketsUrl}`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Markets Performance{' '}
                        </span>
                      </a>
                      <br />

                      <a
                        href={`${tokenizedUrls?.vlogUrl}`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className={`${classes.linkHover} link_sty`}>
                          Vlog{' '}
                        </span>
                      </a>

                      <br />
                      {/* <a
                      href={`${baseURL}/indexx-exchange/legal`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Legal{' '}
                      </span>
                    </a>
                    <br /> */}
                      <br />
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-auto w-100" style={{ marginBottom: 40 }}>
          <a
            href={tokenizedUrls?.defaultUrl}
            className="w-100 mx-auto d-flex justify-content-center"
          >
            {theme === 'dark' ? (
              <img
                src={indexText}
                alt="index logo"
                width={'70px'}
                className="logo_ind"
              />
            ) : (
              <img
                src={indexText_dark}
                alt="index logo"
                width={'70px'}
                className="logo_ind"
              />
            )}
          </a>
          {/* <img src={arrow} alt="index logo" width={"19px"} /> */}
        </div>
        <div className="copyright_bar row mx-auto w-100">
          <p className="copyright_text text-center w-100">
            Copyright © 2023 All Rights Reserved.
          </p>
          <br />
        </div>
      </footer>
    </>
  );
};

export default Footer;
