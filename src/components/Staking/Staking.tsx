import React, { useState } from 'react';
import '../BuySell/BS-Sell.css';
import '../BuySell/BuySellDummy.css';
// import Footer from '../Footer/Footer';
import StakingTable from './StakingTable';
import StakingTop from './StakingTop';
import PowerPackHeader from '../PowerPack/PowerPackHeader/PowerPackHeader';
// import { Link } from 'react-router-dom';
// import { CaretRightOutlined, CheckCircleOutlined } from '@ant-design/icons';

// import PlainCircle from "../../assets/arts/PlainCircle.svg";

const Staking = () => {

  const [refresh, setRefresh] = useState<boolean>(true);

  const handleRefereshChange = (event: any) => {
    setRefresh(!refresh);
  };

  // console.log(refresh, "referesh");
  
  return (
    <div>

      <PowerPackHeader />
      <div className="bs_wallet" style={{ paddingTop: "200px" }}>
        {/* <div className='d-flex bs_wallet_top'>
                <div>
                    <Link to="" className='font_15x text-white' ><CheckCircleOutlined className='padding-r-2x margin-r-0_5x' />Create account</Link>
                </div>
                <div>
                    <Link to="" className='font_15x margin-l-2x text-white' ><img src={PlainCircle} alt="PlainCircle" width="15" height="15" className='padding-r-2x' /> <span style={{paddingTop:5}}>Add payment method</span><CaretRightOutlined className='margin-l-0_5x' /></Link>
                </div>
            </div> */}

        <div className="scan-container d-flex flex-direction-column card large_card orange pb-0">
          <StakingTop refresh={refresh} handleRefresh={handleRefereshChange}/>

          <div className="width-100 bs_wallet_table">
            <StakingTable refresh={refresh}/>
          </div>
        </div>
        {/* <Footer footerArt="flipWoman" /> */}
      </div>
    </div>

  );
};

export default Staking;
