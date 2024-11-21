import React from 'react';
import '../../../BuySell/BS-Sell.css';
import '../../Honeybee/MyBees/BuySellDummy.css';
// import Footer from '../../../Footer/Footer';
import TeamCaptainWalletTop from './TeamCaptainWalletTop';
import TeamCaptWalletTable from './TeamCaptWalletTable';
// import { Link } from 'react-router-dom';
// import { CaretRightOutlined, CheckCircleOutlined } from '@ant-design/icons';

// import PlainCircle from "../../assets/arts/PlainCircle.svg";

type TeamWalletProps = {
  email: string;
};
const TeamCaptWallet: React.FC<TeamWalletProps> = ({ email }) => {
  return (
    <div className="">
      {/* <div className='d-flex bs_wallet_top'>
                <div>
                    <Link to="" className='font_15x text-white' ><CheckCircleOutlined className='padding-r-2x margin-r-0_5x' />Create account</Link>
                </div>
                <div>
                    <Link to="" className='font_15x margin-l-2x text-white' ><img src={PlainCircle} alt="PlainCircle" width="15" height="15" className='padding-r-2x' /> <span style={{paddingTop:5}}>Add payment method</span><CaretRightOutlined className='margin-l-0_5x' /></Link>
                </div>
            </div> */}

      <div className="scan-container d-flex flex-direction-column card not_so_large_card orange pb-0">
        <TeamCaptainWalletTop email={email} />

        <div className="width-100 bs_wallet_table">
          <TeamCaptWalletTable email={email} />
        </div>
      </div>
      {/* <Footer footerArt="flipWoman" /> */}
    </div>
  );
};

export default TeamCaptWallet;
