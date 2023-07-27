import React from 'react';
// import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Instagram from '../../assets/arts/instagramIcon.svg';
import Twitter from '../../assets/arts/twitterIcon.svg';
import YouTube from '../../assets/arts/youtTubeIcon.svg';
import Reddit from '../../assets/arts/redditIcon.svg';
import facebook from '../../assets/arts/fb_logo.png';
import Telegram from '../../assets/arts/telegram.png';
import needHelp from '../../assets/arts/needhelp.png';
// import personFlipCoin from "../../assets/arts/personFlipCoin.webp";
import personFlipCoin from '../../assets/arts/personFlip.png';

import womanFlipCoin from '../../assets/arts/womanFlipCoin.svg';
import indexText from '../../assets/indexx.ai white.png';
import './Footer.css';
import { baseCEXURL, baseDEXURL, baseURL } from '../../services/api';

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

  return (
    <>
      <footer
        className="site_footer position-relative container-fluid desktop-display"
     
      >
        {helpIcon && (
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
        )}

        <div className="flex-align-center d-flex flex-justify-between site_footer_inner row">
          <div className=" footercentre col-sm-12 col-md-12">
            {/* <a href="/" id="1067941554">
                           <img src="https://lirp.cdn-website.com/5afbaf73/dms3rep/multi/opt/index-38-238w.png"
                               width="50%" height="22%" alt="" />
                       </a>
                        */}
            {/* <h1>
                       <Link to="/" className="primary_color">Get Connected</Link>
                   </h1> */}
            <div className="social-wrapper">
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
            className="col-sm-12 col-md-12 footercentre2 text-center "
            style={{ marginBottom: 45 }}
          >
            <div className="row text-left">
              <div className="col text-left">
                <span style={{ textAlign: 'left' }}>
                  <p>Products</p>
                  <p className="text-extra-small text-left" style={{}}>
                    <a
                      href={baseCEXURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Exchange
                    </a>
                    <br />
                    <a
                      href={baseDEXURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Swap
                    </a>
                    <br />
                    <a
                       href={`${baseURL}/indexx-exchange/token-details`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      indexx Tokens
                    </a>
                    <br />
                    <a
                      href={`${baseCEXURL}/indexx-exchange/import-indexx-tokens`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Import indexx Tokens
                    </a>
                    <br />
                    <a
                      href="https://test.xnftmarketplace.indexx.ai/"
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      XNFT Marketplace
                    </a>
                    <br />
                    <a
                      href="https://test.wallet2.indexx.ai/wallets/crypto-wallet"
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Wallet 2.0
                    </a>
                    <br />
                    <br />
                  </p>
                </span>
              </div>
              <div className="col">
                <span style={{ textAlign: 'left' }}>
                  <p>Earn</p>
                  <p
                    className="text-extra-small text-left"
                    style={{
                      color: '#9F9F9F',
                      textDecoration: 'none',
                      lineHeight: 1.5,
                    }}
                  >
                    <a
                      href={`${baseCEXURL}/indexx-exchange/trade-to-earn`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      {' '}
                      Trade to Earn{' '}
                    </a>
                    <br />

                    <a
                      href={`${baseURL}/indexx-exchange/coming-soon?page=Indexx%20Bank`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      {' '}
                      indexx Bank{' '}
                    </a>

                    <br />
                  </p>
                </span>
              </div>
              <div className="col">
                <span style={{ textAlign: 'left' }}>
                  <p>Company</p>
                  <p
                    className="text-extra-small text-left"
                    style={{
                      color: '#9F9F9F',
                      textDecoration: 'none',
                      lineHeight: 1.5,
                    }}
                  >
                    <a
                      href={`${baseURL}/indexx-exchange/how-it-works`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      {' '}
                      How it Works{' '}
                    </a>
                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/about`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      About{' '}
                    </a>
                    <br />

                    <a
                      href={`${baseURL}/indexx-exchange/nfts`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      NFT{' '}
                    </a>
                    <br />
                    <a
                      href={baseURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      {' '}
                      Hybrid Exchange{' '}
                    </a>
                    <br />
                    <a
                      href="https://register.affiliate.indexx.ai/"
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Affiliate Program{' '}
                    </a>
                    <br />

                    <a
                      href={`${baseURL}/indexx-exchange/blog`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Blog{' '}
                    </a>

                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/vlog`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Vlog{' '}
                    </a>

                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/legal`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Legal{' '}
                    </a>
                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/careers`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Careers{' '}
                    </a>
                    <br />
                  </p>
                </span>
              </div>

              <div className="col" style={{ marginRight: -40 }}>
                <span>
                  <h1
                    className="align-middle"
                    style={{ marginTop: 45, marginRight: -40 }}
                  >
                    <a href={baseURL}>
                      <img src={indexText} alt="index logo" width={"119px"} />
                    </a>
                  </h1>
                </span>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-md-4 flip_icon_container">
            {/* {footerArt === 'flipWoman' ? (
              <img
                src={womanFlipCoin}
                alt="Index flip coin art"
                className="flip_person_icon flip_woman hideicon"
              />
            ) : ( */}
              <img
                src={personFlipCoin}
                alt="Index flip coin art"
                className="flip_person_icon hide-img"
                style={{marginTop:"-33px"}}
              />
            {/* )} */}
          </div>
        </div>
        <div className="copyright_bar row">
          <p className="copyright_text text-center">
            Copyright © 2023 All Rights Reserved.
          </p>
          <br />
        </div>
      </footer>

      <footer
        className="site_footer position-relative container-fluid mobile-display"
       
      >
        
           

        <div className="col-xs-6 col-md-4 flip_icon_container text-center">
          
        <a href={`${baseURL}/indexx-exchange/help`} className="need_help_phone" style={{ backgroundImage: `url(${needHelp})` ,textDecoration:'none' }}>
                   Need Help?
               </a>
            {footerArt === 'flipWoman' ? (
              <img
                src={womanFlipCoin}
                alt="Index flip coin art"
                className="flip_person_icon_mobile flip_woman"
              />
            ) : (
              <img
                src={personFlipCoin}
                alt="Index flip coin art"
                className="flip_person_icon_mobile"
              />
            )}
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
                     
            <div className="social-wrapper"   style={{ marginBottom: 30 }}>
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
            className="col-sm-12 col-md-12 footercentre2 text-center "
            style={{ marginBottom: 80 }}
          >
            <div className="row text-center">
              <div className="col text-center">
                <span style={{ textAlign: 'center' }}>
                  <p>Products</p>
                  <p className="text-extra-small text-center" style={{}}>
                    <a
                      href={baseCEXURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Exchange
                    </a>
                    <br />
                    <a
                      href={baseDEXURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Swap
                    </a>
                    <br />
                    <a
                      href="https://tokens.indexx.ai/"
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      indexx Tokens
                    </a>
                    <br />
                    <a
                      href={`${baseCEXURL}/indexx-exchange/import-indexx-tokens`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Import indexx Tokens
                    </a>
                    <br />
                    <br />
                  </p>
                </span>
              </div>
              <div className="col">
                <span style={{ textAlign: 'center' }}>
                  <p>Earn</p>
                  <p
                    className="text-extra-small text-center"
                    style={{
                      color: '#9F9F9F',
                      textDecoration: 'none',
                      lineHeight: 1.5,
                    }}
                  >
                    <a
                      href={`${baseCEXURL}/indexx-exchange/trade-to-earn`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      {' '}
                      Trade to Earn{' '}
                    </a>
                    <br />

                    <a
                      href={`${baseURL}/indexx-exchange/coming-soon?page=Indexx%20Bank`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      {' '}
                      indexx Bank{' '}
                    </a>

                    <br />
                  </p>
                </span>
              </div>
              <div className="col">
                <span style={{ textAlign: 'center' }}>
                  <p>Company</p>
                  <p
                    className="text-extra-small text-center"
                    style={{
                      color: '#9F9F9F',
                      textDecoration: 'none',
                      lineHeight: 1.5,
                    }}
                  >
                    <a
                      href={`${baseURL}/indexx-exchange/how-it-works`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      {' '}
                      How it Works{' '}
                    </a>
                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/about`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      About{' '}
                    </a>

                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/nfts`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      NFT{' '}
                    </a>


                    
                   

                    <br />
                    <a
                      href={baseURL}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      {' '}
                      Hybrid Exchange{' '}
                    </a>
                    <br />
                    <a
                      href="https://register.affiliate.indexx.ai/"
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Affiliate Program{' '}
                    </a>
                    <br />

                    <a
                      href={`${baseURL}/indexx-exchange/blog`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Blog{' '}
                    </a>

                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/vlog`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Vlog{' '}
                    </a>

                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/legal`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Legal{' '}
                    </a>
                    <br />
                    <a
                      href={`${baseURL}/indexx-exchange/careers`}
                      style={{ color: '#9F9F9F', textDecoration: 'none' }}
                    >
                      Careers{' '}
                    </a>
                    <br />
                  </p>
                </span>
              </div>

              <div style={{ marginRight: -80 }}>
                <span>
                  <h1
                    className="align-middle"
                    style={{ marginTop: 45,}}
                  >
                    <a href={baseURL}>
                      <img src={indexText} alt="index logo"  width={"119px"} />
                    </a>
                  </h1>
                </span>
              </div>
            </div>
          </div>
        
        </div>
        <div className="copyright_bar row">
          <p className="copyright_text text-center">
            Copyright © 2023 All Rights Reserved.
          </p>
          <br />
        </div>
      </footer>
    </>
  );
};

export default Footer;
