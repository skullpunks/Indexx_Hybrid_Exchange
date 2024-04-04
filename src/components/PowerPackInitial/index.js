import React from 'react';
import CustomizedSteppers from '../Stepper';
import hive_honey_bee from '../../assets/power-hive/indexxHiveHoneyBee.svg';
import hive_caption_bee from '../../assets/power-hive/indexxHiveCaptionBee.svg';
import hive_table from '../../assets/power-hive/table.svg';
import { useNavigate } from 'react-router-dom';

import './style.css';
const PowerPackInitial = () => {
  const navigate = useNavigate();
  const handleHoneyBee = () => {
    navigate('/indexx-exchange/honeyBee/power-pack');
  };
  const handleCaptionBee = () => {
    navigate('/indexx-exchange/captainBee/power-pack');
  };
  return (
    <div style={{ marginTop: '190px' }}>
      <CustomizedSteppers />

      <section className="indexx_hive_membership_root">
        <h2>Indexx Hive Membership</h2>
        <h4>Thrive with Crypto Financial Transformation</h4>
        <p>
          Unlock exclusive benefits and opportunities in decentralized finance
          (DeFi) with Indexx Hive Membership. Gain access to advanced trading
          tools, educational resources, priority support, and rewarding
          opportunities. Join us today and elevate your crypto journey
        </p>
      </section>

      <section className="power-pack-category">
        <div onClick={handleHoneyBee} style={{ cursor: 'pointer' }}>
          <img src={hive_honey_bee} />
          <button style={{ background: '#8EDF78' }}>Join as Honey Bee</button>
        </div>
        <div onClick={handleCaptionBee} style={{ cursor: 'pointer' }}>
          <img src={hive_caption_bee} />
          <button style={{ background: '#F8C229' }}>Join as Caption Bee</button>
        </div>
      </section>

      <section className="power-pack-table">
        <img src={hive_table} alt="table" />
      </section>
    </div>
  );
};

export default PowerPackInitial;
