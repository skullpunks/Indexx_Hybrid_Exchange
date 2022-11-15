import React from 'react'
import BackgroundImage from "../../assets/background.jpg";
import hands from "../../assets/arts/hands.svg";
import frank from "../../assets/arts/frank.svg";
import Omkar from "../../assets/arts/Omkar.svg";
import lili from "../../assets/arts/lili.svg";
import brian from "../../assets/arts/brian.svg";
import tony from "../../assets/arts/tony.svg";
import Nick from "../../assets/arts/Nick.svg";
import "./About.css";
import Footer from '../Footer/Footer';

const About = () => {
    return (
        <>
            <div className=''>
                <div style={{ backgroundImage: `url(${BackgroundImage})` }} className="home-container about-container">
                    <h1 className='text-white'>About Us</h1>
                    <h1 className='text-white font_60x text-center' style={{ maxWidth: 900 }}>We empower you to do more
                        with your money.</h1>

                </div>
                <div className='handsImage'><img src={hands} alt="hands-08 1" className="w-100" /></div>
            </div>
            <div className='main_container'>
                <div className='row'><div className="col-lg-12  font_25x font_30x">The new economy has arrived. We believe America should lead in crypto and we're committed to helping people across the U.S. access the world of digital assets.</div></div>
                <div>
                    <br />
                    <br />
                    <div className='font_30x'>Buy. Trade. Earn. Your Way.</div>
                    <br />
                    <div className='font_15x'>
                        Markets are always on the move, but peace of mind is priceless.
                        indexx.ai  provides secure and reliable access to the world’s most popular cryptocurrencies, with some of the lowest fees in the industry.</div>
                    <br />
                    <div className='font_15x'>
                        Launched in September 2019 and headquartered in California, indexx.ai was established to serve U.S. consumers and adhere to U.S. regulations.</div>
                </div>
                <br />
                <br />
                <div className='margin-t-2x margin-b-2x text-center'>
                    <div className='font_40x text-center padding-t-3x'>Meet Our Executive Team</div>
                    <br />
                    <br />
                    <div className='row'>

                    <div className="col-lg-3 col-md-offset-0" ></div>
                   
                        <div className='col-lg-2  text-center margin-t-2x'>
                        <div className="">
                            <img src={brian} alt="BRIAN" /><br />
                            <span className='employee_name'>
                                BRIAN ZHENG<br />
                                <div className='disignation'>President & CEO</div>

                            </span>
                            </div>
                        </div>
                        <div className='col-lg-2 text-center margin-t-2x'>
                            <div className="">
                                <img src={Omkar} alt="BRIAN" /><br />
                                <span className='employee_name'>
                                OMKAR SUNKU<br />
                                <div className='disignation'>Chief Technology Officer </div></span>
                            </div>
                        </div>
                        <div className='col-lg-2 text-center margin-t-2x'>
                            <img src={frank} alt="frank" /><br />
                            <span className='employee_name'>
                                FRANK HETTMANN<br />
                                <div className='disignation'>Chief People Officer</div>

                            </span>
                        </div>

                        <div className="col-lg-3 col-md-offset-0 " ></div>
                        <div className="col-lg-3 col-md-offset-0" ></div>
                        <div className='col-lg-2 text-center margin-t-2x '>
                            <img src={Nick} alt="BRIAN" /><br />
                            <span className='employee_name'>
                                NICK FRASER<br />
                                <div className='disignation'>Chief Operations Officer</div></span>
                        </div>
                        <div className='col-lg-2 text-center margin-t-2x'>
                            <img src={tony} alt="BRIAN" /><br />
                            <span className='employee_name'>
                                TONY PELAYO<br />
                                <div className='disignation'>Chief Marketing & Sales Officer</div></span>
                        </div>

                       
                        <div className='col-lg-2 text-center margin-t-2x '>
                            <img src={lili} alt="frank" /><br />
                            <span className='employee_name'>
                                LILI<br />
                                <div className='disignation'>Chief Financial Officer</div>

                            </span>
                        </div>
                        <div className="col-lg-3 col-md-offset-0" ></div>
                    </div>
                </div>
                <div className='font_15x padding-t-3x margin-t-3x padding-b-3x' style={{ paddingBottom: 200 }}>Make a career out of crypto. Join the indexx.ai team and help us take the future of money to new heights.</div>
            </div>
            <Footer footerArt="flipWoman" />
        </>
    );
}

export default About;