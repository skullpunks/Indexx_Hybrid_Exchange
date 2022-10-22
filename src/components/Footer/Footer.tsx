import React from "react";
// import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Instagram from "../../assets/arts/instagramIcon.svg";
import Twitter from "../../assets/arts/twitterIcon.svg";
import YouTube from "../../assets/arts/youtTubeIcon.svg";
// import Reddit from "../../assets/arts/redditIcon.svg";
import facebook from "../../assets/arts/fb_logo.png";
import needHelp from "../../assets/arts/needHelp.svg";
import personFlipCoin from "../../assets/arts/personFlipCoin.svg";
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
    ]


    return (
        <footer className="site_footer position-relative container-fluid">
            {helpIcon &&
                <Link to="/indexx-exchange/help" className="need_help" style={{ backgroundImage: `url(${needHelp})` }}>
                    Need Help?
                </Link>
            }
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
                                <li key={index} >
                                    <a href={icon.href} target="_blank" rel="noopener noreferrer">
                                        <img className="social-connect-icons" src={icon.src} alt={icon.alt} width="35" height="35" /></a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 footercentre2 text-center ">
                    <h1>
                        <Link to="/"><img src={indexText} alt="index logo" /></Link>
                    </h1>
                    <br />
                    <p className="text-extra-small">
                        Indexx stock token is the world first coin <br />
                        pegged with world largest stock market <br />
                        index the S&P 500. Pioneered the concept in <br />
                        the cryptocurrency space.
                    </p>
                    <p className="footer_center_text">
                        {/* <span className="d-block">949-228-9079</span>
                        <br /> */}

                        indexx Limited, CUB Financial Centre,<br />
                        GF6, Lyford Cay, Nassau, Bahamas.<br /> <br />

                        550 Newport Center Drive<br />
                        Newport Beach,<br />
                        CA 92660 United State<br />
                        <br />
                    </p>

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
                    Copyright © 2022 All Rights Reserved by Indexx.
                </p>
                <br />
            </div>
        </footer>
    );
};

export default Footer;
