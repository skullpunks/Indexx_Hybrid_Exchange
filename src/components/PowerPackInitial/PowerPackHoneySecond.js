import React from 'react';
import CustomizedSteppers from '../Stepper';
import action_pack from '../../assets/power-hive/action Pack.png';
import token_pack from '../../assets/power-hive/token pack.png';
import { useNavigate } from 'react-router-dom';

import './style.css';
const PowerPackCaptionSecond = () => {
  const navigate = useNavigate();
  const handlePowerPack = () => {
    navigate('/indexx-exchange/honey-bee/action-pack');
  };
  const handleCryptoPack = () => {
    navigate('/indexx-exchange/honey-bee/token-pack');
  };
  return (
    <div style={{ marginTop: '100px' }}>
      <h4 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
        Indexx Hive 3 Steps to Thrive
      </h4>
      <CustomizedSteppers step={1} />

      <section className="indexx_hive_membership_root">
        <h2>Hive Pack of Honey Bee</h2>
        <h4>Thrive with Crypto Financial Transformation</h4>
        <p>
          Hive Packs are comprehensive investment bundles by Indexx Hive,
          offering strategic insights, educational resources, and diversified
          investment options for navigating the cryptocurrency market
          effectively and maximizing financial returns.
        </p>
      </section>

      <section className="power-pack-category">
        <div
          onClick={handlePowerPack}
          style={{
            width: '100%',
            maxWidth: '356px',
            margin: 'auto',
          }}
        >
          <h3>Action Pack</h3>
          <img src={action_pack} />
          <button className="orange-btn" style={{ width: '100%' }}>
            Choose Action Pack
          </button>
          <p>
            Tailored for Honey Bee members, providing strategic insights and
            investment opportunities.
          </p>
        </div>

        <div
          onClick={handleCryptoPack}
          style={{
            width: '100%',
            maxWidth: '356px',
            margin: 'auto',
          }}
        >
          <h3>Token Pack</h3>
          <img src={token_pack} />
          <button className="yellow-btn" style={{ width: '100%' }}>
            Choose Token Pack
          </button>
          <p>
            Offers exclusive investment options in the form of coins, wallets,
            and tokens, catering to investment preferences.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PowerPackCaptionSecond;
