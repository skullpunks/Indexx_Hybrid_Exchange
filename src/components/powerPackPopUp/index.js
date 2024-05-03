import React, { useState } from 'react';
import './style.css';

import borderLeft from '../../assets/power-hive/Hive Arts-03 2.png';
import borderLeftHoney from '../../assets/power-hive/honey-bee.png';
const PopupModal = ({ open, setOpen, data }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="app-container">
      {open && (
        <div className="modal-overlay">
          <div
            className="custom-modal-content"
            style={{
              border:
                data.type === 'Crypto Pack' || data.type === 'Power Pack'
                  ? '1px solid #ffb300'
                  : '1px solid #8EDF78',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '66px',
              }}
            >
              <img
                src={
                  data.type === 'Crypto Pack' || data.type === 'Power Pack'
                    ? borderLeft
                    : borderLeftHoney
                }
                height={'100%'}
                width={'100%'}
              />
            </div>
            <span className="custom-close-button" onClick={handleClose}>
              &times;
            </span>
            <div className="modal-header">
              <img className="modal-logo" src={data.photo} alt="Logo" />
              <h2>
                {data.type} {data.name}
              </h2>
            </div>
            <div className="modal-body">
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '20px',
                }}
              >
                {data.heading}
              </h2>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                {data.subHeading1}
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  marginBottom: '20px',
                }}
              >
                {data.subPara1}
              </p>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                {data.subHeading2}
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  marginBottom: '20px',
                }}
              >
                {data.subPara2}
              </p>
            </div>
            <div className="modal-row">
              <div>
                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                  }}
                >
                  Total Return
                </h4>
                <p>{data.percentage}</p>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                  }}
                >
                  24 Months Bonus
                </h4>
                <p>{data.amount}</p>
              </div>
            </div>
            <div className="modal-buttons">
              <button
                className={
                  data.type === 'Crypto Pack' || data.type === 'Power Pack'
                    ? 'custom-modal-button'
                    : 'custom-modal-button-honey'
                }
                onClick={handleClose}
              >
                See Less
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupModal;
