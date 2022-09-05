import React from 'react';
import './IndexxScan.css';
import BackgroundImage from "../../assets/background.jpg";
import IndexxText from "../../assets/indexxscan.png";
import Bottom from "../../assets/scan-bottom.png";

function App() {
    return (
        <div>
            <div style={{backgroundImage: `url(${BackgroundImage})`}} className="scan-container">
                <div><img src={IndexxText} alt="NewImage" className="scan-Image"/></div>
                <div className="helper-text"> Hybrid Platform</div>
                <div className="section-usp">
                    <span className="font-big">0% fees</span> &nbsp;  for all transactions
                </div>
                <div><img src={Bottom} alt="NewImage" className="scan-Image"/></div>
            </div>
        </div>
    );
}

export default App;
