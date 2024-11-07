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
    navigate('/indexx-exchange/power-hive/honey-bee-selection');
  };
  const handleCaptionBee = () => {
    navigate('/indexx-exchange/power-hive/captain-bee-selection');
  };
  return (
    <div style={{ marginTop: '100px' }}>
      <h4 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
        Indexx Hive 3 Steps to Thrive
      </h4>
      <CustomizedSteppers step={1} />

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
        <div onClick={handleCaptionBee} style={{ cursor: 'pointer' }}>
          <img src={hive_caption_bee} />
          <button className="orange-btn" style={{ marginTop: '20px' }}>
            Join as Hive Captain
          </button>
        </div>
        <div onClick={handleHoneyBee} style={{ cursor: 'pointer' }}>
          <img src={hive_honey_bee} />
          <button className="yellow-btn" style={{ marginTop: '20px' }}>
            Join as Honey Bee
          </button>
        </div>
      </section>

      <section className="power-pack-table">
        <img src={hive_table} alt="table" />
      </section>
    </div>
  );
};

export default PowerPackInitial;
