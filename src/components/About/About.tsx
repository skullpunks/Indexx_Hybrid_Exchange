import React from 'react'
import BackgroundImage from "../../assets/background.jpg";
import "./About.css";

const About = () => {
    return (
        <div className=''>
            <div style={{ backgroundImage: `url(${BackgroundImage})` }} className="home-container about-container">
                <h1 className='text-white'>About Us</h1>
                <h1 className='text-white font_60x text-center' style={{ maxWidth: 900 }}>We empower you to do more
                    with your money.</h1>
                <div className='handsImage' ></div>
            </div>

        </div>
    )
}

export default About