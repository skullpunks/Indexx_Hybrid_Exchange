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

// import womanFlipCoin from '../../assets/arts/womanFlipCoin.svg';
import indexText_dark from '../../assets/indexx.ai_black.svg';
import indexText from '../../assets/indexx.ai white.png';
import indexTextyellow from '../../assets/indexx ai yellow 1.svg';
import indexTextyellowdark from '../../assets/yellow_dark.svg';
import arrow from '../../assets/arrow-.svg';
import plus from '../../assets/arts/plus.svg';
import './Footer.css';
import { baseCEXURL, baseDEXURL, baseURL, baseHiveURL, baseWSURL, baseWalletURL, baseShopURL, baseXnftURL, baseMktplaceURL } from '../../services/api';

interface FooterProps {
  helpIcon?: boolean;
  footerArt?: string;
}

const Footer = ({ helpIcon = true, footerArt = 'flipMan' }: FooterProps) => {
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
      href: 'https://www.youtube.com/channel/UCYXrfhPg7jUMBxPEBCEsaFw',
      alt: 'You-tube',
    },
    {
      src: facebook,
      href: 'https://www.facebook.com/profile.php?id=100086225564460',
      alt: 'facebook',
    },
    {
      src: Reddit,
      href: 'https://www.reddit.com/user/Indexx_ai/',
      alt: 'reddit',
    },
    {
      src: Telegram,
      href: 'https://t.me/indexxai',
      alt: 'reddit',
    },
  ];

  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || "light"
  );
  
  const [userLogged, setUserLogged] = useState('normal'); // Set the user's type
  
  useEffect(() => {
    const user = localStorage.getItem("userlogged") !== undefined ? setUserLogged(String(localStorage.getItem("userlogged"))) : setUserLogged('normal');
    const handleStorageChange = (event:any) => {
      console.log(event);
      setTheme(event.currentTarget.localStorage.selectedTheme);
      if(setUserLogged !== event.currentTarget.localStorage.userlogged) {
        setUserLogged(event.currentTarget.localStorage.userlogged);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <footer
        className="site_footer position-relative container-fluid desktop-display"
        style={{marginTop:"250px"}}
     
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

        <div className="flex-align-center d-flex flex-justify-between site_footer_inner row mx-auto">
        <span style={{ marginBottom:"18px", marginTop:"18px"}}>
                  <h1
                    className="align-middle"
                  >
                    <a href={baseURL}>
                    {theme === "dark" ?
                    <img src={userLogged === "normal" ? indexText : indexTextyellow} alt="index logo" width={"60px"} className='logo_ind'/>

                    :
                      <img src={userLogged === "normal" ? indexText_dark : indexTextyellowdark} alt="index logo" width={"60px"} className='logo_ind'/>
                    }
                      </a>
                    {/* <img src={arrow} alt="index logo" width={"19px"} /> */}
                  </h1>
                </span>
            <br />
            <br />
            <br />
          <div
            className="col-sm-12 col-md-12 footercentre2 text-center "
            style={{ marginBottom: 45, minWidth:"70%" }}
          >
            <div className="row text-left">
            <div className="col text-left">
                <span style={{ textAlign: 'left' }}>
                  <p className='fw-bold'>Platform</p>
                  <p className="footer-text text-left">
                    <a
                      href={baseCEXURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Exchange
                      </span>
                    </a>
                    <br />
                    <a
                      href="https://fortune.daily.indexx.ai/"
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Fortune Daily
                      </span>
                    </a>
                    <br />
                    <a
                       href={baseShopURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Shop
                      </span>
                    </a>
                    <br />
                    <a
                      href={baseDEXURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Swap
                      </span>
                    </a>
                    <br />
                    <a
                      href={baseWSURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Wall Street
                      </span>
                    </a>
                    <br />
                    <a
                      href={baseMktplaceURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Market
                      </span>
                    </a>
                    <br />
                    <br />
                  </p>
                </span>
              </div>
              <div className="col">
                <span style={{ textAlign: 'left' }}>
                  <p className='fw-bold'>Products</p>
                  <p className="footer-text text-left" style={{}}>
                    <a
                      href={`${baseShopURL}/collections/gift-cards-1`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Gift Cards
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseShopURL}/collections/greeting-cards`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Greeting Cards
                      </span>
                    </a>
                    <br />
                    <a
                       href={`${baseURL}/indexx-exchange/nfts`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      NFT
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseWSURL}/certificates`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Stock Certificates
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseWSURL}/details`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Stock Tokens
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/token-details`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Tokens
                      </span>
                    </a>
                    <br />
                    <a
                      href={baseXnftURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      XNFT
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseXnftURL}/#fiat-cur`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      XUSD
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/coming-soon?page=$1%20Bitcoin`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      $1 Bitcoin
                      </span>
                    </a>
                    <br />
                    <br />
                  </p>
                </span>
              </div>
              <div className="col">
                <span style={{ textAlign: 'left' }}>
                  <p className='fw-bold'>Program</p>
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
                      <span className='link_sty'>
                      Affiliate Program
                      </span>
                    </a>
                    <br />

                    <a
                      href={baseHiveURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Hive
                      </span>
                    </a>

                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/trade-to-earn`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                        Trade to Earn
                      </span>
                    </a>

                    <br />
                  </p>
                </span>
              </div>
              <div className="col">
                <span style={{ textAlign: 'left'}}>
                <p className='fw-bold'>Wallet</p>
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
                      <span className='link_sty'>
                      Wallet Extension
                      </span>
                    </a>
                    <br />

                    <a
                       href={baseWalletURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Wallet Web
                      </span>
                    </a>

                    <br />
                  </p>
                </span>
              </div>
              <div className="col">
                <span style={{ textAlign: 'left' }}>
                  <p className='fw-bold'>Company</p>
                  <p
                    className="footer-text text-left"
                    style={{
                      color: '#9F9F9F',
                      textDecoration: 'none',
                      lineHeight: 1.5,
                    }}
                  >
                    <a
                      href={`${baseURL}/indexx-exchange/about`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      About
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/blog`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Blog
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/careers`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Careers
                      </span>
                    </a>
                    <br />

                    <a
                      href={`${baseURL}/indexx-exchange/how-it-works`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      How it Works
                      </span>
                    </a>
                    <br />
                    {/* <a
                      href={baseURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      {' '}
                      Hybrid Exchange{' '}
                      </span>
                    </a> */}
                    <a
                      href={`${baseURL}/indexx-exchange/markets`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Markets
                      </span>
                    </a>
                    <br />

                    
                    <a
                      href={`${baseURL}/indexx-exchange/vlog`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Vlog
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/coming-soon?page=Document`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Document
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
            <div className="social-wrapper" style={{width:"fit-content", alignSelf:"end", marginTop:"150px"}}>
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
                style={{marginTop:"-33px"}}
              />
          </div>
          </div>
        </div>
        <div className="copyright_bar row mx-auto">
          <span className="copyright_text">
            Copyright © 2023 All Rights Reserved.
          </span>
         <span className='fit-content border-right'>
         <a href={`${baseURL}/indexx-exchange/legal/privacypolicy`}>
         Privacy Policy
          </a>
         </span>
         <span className='fit-content border-right'>
         <a href={`${baseURL}/indexx-exchange/legal/termsandconditions`}>
         Terms Of Use
          </a>
         </span>
         <span className='fit-content border-right'>
         <a href={`${baseURL}/indexx-exchange/legal`}>
         Legal
          </a>
         </span>
         <span className='fit-content'>
         <a href={`${baseURL}/indexx-exchange/coming-soon?page=Site%20Map`}>
         Site Map
          </a>
         </span>
        </div>
      </footer>

      <footer
        className="site_footer position-relative container-fluid mobile-display border-top"
        style={{paddingTop:"100px"}}
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
                  
          

        <div className="flex-align-center d-flex flex-justify-between site_footer_inner row" style={{marginLeft:"15px"}}>
          <div className=" footercentre col-sm-12 col-md-12">
            {/* <a href="/" id="1067941554">
                           <img src="https://lirp.cdn-website.com/5afbaf73/dms3rep/multi/opt/index-38-238w.png"
                               width="50%" height="22%" alt="" />
                       </a>
                        */}
            {/* <h1>
                       <Link to="/" className="primary_color">Get Connected</Link>
                   </h1> */}
                     
            <div className="social-wrapper"   style={{ marginBottom: 50 }}>
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
              <a className="btn footer-drop " data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                Platforms
                <img src={plus} alt="plus" width={"9px"} />
              </a>
              <div className="collapse multi-collapse" id="multiCollapseExample1">
                <div className="">
                  <span style={{ textAlign: 'start' }}>
                    <p className="text-extra-small" style={{}}>
                      <a
                        href={baseCEXURL}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className='link_sty'>
                          Exchange
                        </span>
                      </a>
                      <br />
                      <a
                        href="https://fortune.daily.indexx.ai/"
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className='link_sty'>
                          Fortune Daily
                        </span>
                      </a>
                      <br />
                      <a
                        href={baseShopURL}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className='link_sty'>
                          Shop
                        </span>
                      </a>
                      <br />
                      <a
                        href={baseDEXURL}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className='link_sty'>
                          Swap
                        </span>
                      </a>
                      <br />
                      <a
                        href={baseWSURL}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className='link_sty'>
                          Wall street
                        </span>
                      </a>
                      <br />
                      <a
                        href={baseMktplaceURL}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className='link_sty'>
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
              <a className="btn footer-drop " data-bs-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample2">
                Products
                <img src={plus} alt="plus" width={"9px"} />
              </a>
              <div className="collapse multi-collapse" id="multiCollapseExample2">
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
                      href={`${baseShopURL}/collections/gift-cards-1`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Gift Cards
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseShopURL}/collections/greeting-cards`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Greeting Cards
                      </span>
                    </a>
                    <br />
                    <a
                       href={`${baseURL}/indexx-exchange/nfts`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      NFT
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseWSURL}/certificates`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Stock Certificates
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseWSURL}/details`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Stock Tokens
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/token-details`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Tokens
                      </span>
                    </a>
                    <br />
                    <a
                      href={baseXnftURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      XNFT
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseXnftURL}/#fiat-cur`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      XUSD
                      </span>
                    </a>
                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/coming-soon?page=$1%20Bitcoin`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
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
              <a className="btn footer-drop " data-bs-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="false" aria-controls="multiCollapseExample3">
                Program
                <img src={plus} alt="plus" width={"9px"} />
              </a>
              <div className="collapse multi-collapse" id="multiCollapseExample3">
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
                      <span className='link_sty'>
                      Affiliate Program
                      </span>
                    </a>
                    <br />

                    <a
                      href={baseHiveURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
                      Hive
                      </span>
                    </a>

                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/trade-to-earn`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
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
              <a className="btn footer-drop " data-bs-toggle="collapse" href="#multiCollapseExample4" role="button" aria-expanded="false" aria-controls="multiCollapseExample4">
                Wallet
                <img src={plus} alt="plus" width={"9px"} />
              </a>
              <div className="collapse multi-collapse" id="multiCollapseExample4">
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
                      <span className='link_sty'>
                      Wallet Extension
                      </span>
                    </a>
                    <br />

                    <a
                       href={baseWalletURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      <span className='link_sty'>
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
              <a className="btn footer-drop " data-bs-toggle="collapse" href="#multiCollapseExample5" role="button" aria-expanded="false" aria-controls="multiCollapseExample5">
                Company
                <img src={plus} alt="plus" width={"9px"} />
              </a>
              <div className="collapse multi-collapse" id="multiCollapseExample5">
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
                        href={`${baseURL}/indexx-exchange/about`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className='link_sty'>
                          About{' '}
                        </span>
                      </a>

                      <br />
                      <a
                        href={`${baseURL}/indexx-exchange/blog`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className='link_sty'>
                          Blog{' '}
                        </span>
                      </a>

                      <br />
                      <a
                        href={`${baseURL}/indexx-exchange/careers`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className='link_sty'>
                          Careers{' '}
                        </span>
                      </a>
                      <br />
                      <a
                        href={`${baseURL}/indexx-exchange/how-it-works`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className='link_sty'>
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
                        href={`${baseURL}/indexx-exchange/markets`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className='link_sty'>
                          Markets Performance{' '}
                        </span>
                      </a>
                      <br />

                      <a
                        href={`${baseURL}/indexx-exchange/vlog`}
                        style={{ color: '#9F9F9F', textDecoration: 'none' }}
                      >
                        <span className='link_sty'>
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
        <div className="row mx-auto w-100"
            style={{ marginBottom: 40 }}
        >
                    <a href={baseURL} className='w-100 mx-auto d-flex justify-content-center'>
                    {theme === "dark" ?
                    <img src={userLogged === "normal" ? indexText : indexTextyellow} alt="index logo" width={"70px"} className='logo_ind'/>

                    :
                      <img src={userLogged === "normal" ? indexText_dark : indexTextyellowdark} alt="index logo" width={"70px"} className='logo_ind'/>
                    }
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
