import React from 'react';
import CustomizedSteppers from '../Stepper';
import crypto_pack from '../../assets/power-hive/crypto.png';
import power_pack from '../../assets/power-hive/power.png';
import { useNavigate } from 'react-router-dom';

import './style.css';
const PowerPackCaptionSecond = () => {
  const navigate = useNavigate();
  const handlePowerPack = () => {
    navigate('/indexx-exchange/captain-bee/power-pack');
  };
  const handleCryptoPack = () => {
    navigate('/indexx-exchange/captain-bee/crypto-pack');
  };
  return (
    <div style={{ marginTop: '100px' }}>
      <h4 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
        Indexx Hive 3 Steps to Thrive
      </h4>
      <CustomizedSteppers step={1} />

      <section className="indexx_hive_membership_root">
        <h2>Hive Pack of Hive Captain</h2>
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
          <h3>Power Pack</h3>
          <img src={power_pack} />
          <button className="orange-btn" style={{ width: '100%' }}>
            Choose Power Pack
          </button>
          <p>
            Power Packs provide diverse investment options and resources for all
            members.
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
          <h3>Crypto Pack</h3>
          <img src={crypto_pack} />
          <button className="yellow-btn" style={{ width: '100%' }}>
            Choose Crypto Pack
          </button>
          <p>
            Offers strategic insights and investment opportunities exclusive to
            the crypto market.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PowerPackCaptionSecond;
