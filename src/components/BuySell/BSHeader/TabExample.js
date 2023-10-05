import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import stock from '../../../assets/BSheader/graphd 1.svg';
import power from '../../../assets/BSheader/power pack 1.svg';
import token from '../../../assets/BSheader/tokens icon 1.svg';
import all from '../../../assets/BSheader/x icon- 1.svg';
import './TabExample.css';
import { Link } from 'react-router-dom';

const TabExample = ({ selectedTab, handleTabChange }) => {
  // const [selectedTab, setSelectedTab] = useState(0);

  // const handleTabChange = (event, newValue) => {
  //   setSelectedTab(newValue);
  // };

  console.log(selectedTab);

  return (
    <div
      style={{
        position: 'fixed',
        top: '90px',
        width: '100%',
        zIndex: 999,
        background: '#fff',
        height: '90px',
      }}
      className="ext-tabs"
    >
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        aria-label="icon label tabs example"
      >
        <Tab
          label="All"
          icon={
            <img
              src={all}
              alt="Home"
              width={'40px'}
              style={{ marginBottom: 0 }}
            />
          }
          style={{
            width: '40px',
            textTransform: 'none',
            color: 'inherit',
            fontSize: '10px',
            padding:0
          }}
        />
        <Tab
          label="Tokens"
          icon={
            <img
              src={token}
              alt="Home"
              width={'42px'}
              style={{ marginBottom: 0 }}
            />
          }
          style={{
            width: '100px',
            textTransform: 'none',
            color: 'inherit',
            fontSize: '10px',
            padding:0
          }}
        />

        <Tab
          label="Stock Tokens"
          icon={<img src={stock} alt="Home" width={'45px'} 
          style={{ marginBottom: 6, marginTop:6}}
          />}
          style={{
            width: '100px',
            textTransform: 'none',
            color: 'inherit',
            fontSize: '10px',
            padding:0
          }}
        />
        <Tab
          label="Power Packs"
          icon={
            <img
              src={power}
              alt="Home"
              width={'63px'}
              style={{ marginBottom: 0 }}
            />
          }
          component={Link}
          to='/indexx-exchange/power-pack'
          style={{
            width: '100px',
            textTransform: 'none',
            color: 'inherit',
            fontSize: '10px',
            padding:0
          }}
        />
      </Tabs>
      {/* <div style={{color:"#11BE6A", fontSize:"10px", fontStyle:"italic", display:'flex',
      justifyContent:"center", paddingTop:"10px", paddingBottom:"30px"}}>
      Buy, Sell and Convert all types of tokens
      </div> */}
    </div>
  );
};

export default TabExample;
