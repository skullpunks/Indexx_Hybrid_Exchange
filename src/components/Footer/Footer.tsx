import React from "react";
// import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Instagram from "../../assets/arts/instagramIcon.svg";
import Twitter from "../../assets/arts/twitterIcon.svg";
import YouTube from "../../assets/arts/youtTubeIcon.svg";
import Reddit from "../../assets/arts/redditIcon.svg";
import facebook from "../../assets/arts/fb_logo.png";
import Telegram from "../../assets/arts/telegram.png";
import needHelp from "../../assets/arts/needHelp.svg";
// import personFlipCoin from "../../assets/arts/personFlipCoin.webp";
import personFlipCoin from "../../assets/arts/personFlipCoin.png";
import womanFlipCoin from "../../assets/arts/womanFlipCoin.svg";
import { Link } from "react-router-dom";
import indexText from "../../assets/arts/indexText.svg";
import "./Footer.css";

interface FooterProps {
    helpIcon?: boolean;
    footerArt?: string;
}

const Footer = ({ helpIcon = true, footerArt = "flipMan" }: FooterProps) => {
    const icons = [
        {
            src: Instagram,
            href: "https://www.instagram.com/indexx_ai/",
            alt: "Instagram",
        },
        {
            src: Twitter,
            href: "https://twitter.com/Indexx_ai",
            alt: "Twitter",
        },
        {
            src: YouTube,
            href: "https://www.youtube.com/channel/UCYXrfhPg7jUMBxPEBCEsaFw",
            alt: "You-tube",
        },
        {
            src: facebook,
            href: "https://www.facebook.com/profile.php?id=100086225564460",
            alt: "facebook",
        },
        {
            src: Reddit,
            href: "https://www.reddit.com/user/Indexx_ai/",
            alt: "reddit",
        },
        {
            src: Telegram,
            href: "https://t.me/indexxai",
            alt: "reddit",
        },
    ]


    return (
        <footer className="site_footer position-relative container-fluid" style={{marginTop:40}}>
           

            
            {helpIcon &&
                <a href={"https://test.indexx.ai/indexx-exchange/help"} className="need_help" style={{ backgroundImage: `url(${needHelp})` ,textDecoration:'none' }}>
                    Need Help?
                </a>
            }
        
            <div className="flex-align-center d-flex flex-justify-between site_footer_inner row"  >
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
                                <li key={index} >
                                    <a href={icon.href} target="_blank" rel="noopener noreferrer">
                                        <img className="social-connect-icons" src={icon.src} alt={icon.alt} width="35" height="35" /></a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 footercentre2 text-center " style={{ marginBottom: 45}}>
                  
 
                    <div className="row text-left">
            <div className="col text-left">
              <span style={{ textAlign: "left" }}>
                <p>Products</p>
                <p className="text-extra-small text-left" style={{}}>
                  <a href="https://cex.indexx.ai/" style={{color:'#9F9F9F',textDecoration:'none'}}>Centralized</a>
                  <br />
                  <a href="https://test.dex.indexx.ai/"  style={{color:'#9F9F9F',textDecoration:'none'}}>Decentralized</a>
                  <br />
                  <a href="https://tokens.indexx.ai/"  style={{color:'#9F9F9F',textDecoration:'none'}}>indexx Tokens</a>
                  <br />
                  <a href="https://cex.indexx.ai/indexx-exchange/import-indexx-tokens"  style={{color:'#9F9F9F',textDecoration:'none'}}>Import indexx Tokens</a>
                  <br />
                  <br />
                </p>
                <p>Markets</p>
              </span>
            </div>
            <div className="col">
              <span style={{ textAlign: "left" }}>
                <p>Earn</p>
                <p className="text-extra-small text-left" style={{color:'#9F9F9F',textDecoration:'none',lineHeight:1.5}}>
                <a href="https://cex.indexx.ai/indexx-exchange/trade-to-earn" style={{color:'#9F9F9F',textDecoration:'none'}}> Trade to Earn </a>
                 <br />

                 <a href="https://test.indexx.ai/indexx-exchange/coming-soon?page=Indexx%20Bank" style={{color:'#9F9F9F',textDecoration:'none'}}> indexx Bank </a>
                  
                  <br />
                </p>
              </span>
            </div>
            <div className="col">
              <span style={{ textAlign: "left" }}>
                <p>Company</p>
                <p className="text-extra-small text-left" style={{color:'#9F9F9F',textDecoration:'none',lineHeight:1.5}}>
                <a href="https://test.indexx.ai/indexx-exchange/how-it-works" style={{color:'#9F9F9F',textDecoration:'none'}}>  How it Works </a>
                  <br />
                  <a href="https://test.indexx.ai/indexx-exchange/about" style={{color:'#9F9F9F',textDecoration:'none'}}>About </a>
                 <br />
                 <a href="https://test.indexx.ai" style={{color:'#9F9F9F',textDecoration:'none'}}>   Hybrid Exchange </a>
                 <br />
                 <a href="https://register.affiliate.indexx.ai/" style={{color:'#9F9F9F',textDecoration:'none'}}>Affiliate Program  </a>
                  <br />
                
                  <a href="https://test.indexx.ai/indexx-exchange/blog" style={{color:'#9F9F9F',textDecoration:'none'}}>Blog   </a>
                 
                  <br />
                  <a href="https://test.indexx.ai/indexx-exchange/legal" style={{color:'#9F9F9F',textDecoration:'none'}}>Legal    </a>
                 <br />
                 <a href="https://test.indexx.ai/indexx-exchange/careers" style={{color:'#9F9F9F',textDecoration:'none'}}>Careers    </a>
                 <br />
                </p>
              </span>
            </div>

            <div className="col" style={{marginRight:-80}}>
              <span>
                <h1 style={{ marginTop: 45, marginRight: -40 }}>
                  <Link to="/">
                    <img src={indexText} alt="index logo" />
                  </Link>
                </h1>
              </span>
            </div>
          </div>









                </div>
                <div className="col-xs-6 col-md-4 flip_icon_container">
                    {
                        (footerArt === "flipWoman") ?

                            <img src={womanFlipCoin} alt="Index flip coin art" className="flip_person_icon flip_woman" />
                            :
                            <img src={personFlipCoin} alt="Index flip coin art" className="flip_person_icon" />

                    }
                </div>
            </div>
            <div className="copyright_bar row">
                <p className="copyright_text text-center">
                    Copyright © 2023 All Rights Reserved.
                </p>
                <br />
            </div>
        </footer>
    );
};

export default Footer;
