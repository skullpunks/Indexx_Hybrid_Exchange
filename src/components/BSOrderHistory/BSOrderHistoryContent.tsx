import { Button, Tabs } from 'antd';
import React from 'react';
import BSBuyOrderHistoryTable from './BSBuyOrderHistoryTable';
import BSSellOrderHistoryTable from './BSSellOrderHistoryTable';
import BSConvertOrderHistoryTable from './BSConvertOrderHistoryTable';
import { makeStyles } from '@mui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme: any) => ({
  link: {
    fontWeight: 500,
    background: 'none',
    width: 'fit-content',
    border: 'none',
    padding: '0px',
    fontSize: '16px',
    lineHeight: '22px',
    marginBottom: '20px',
    cursor: 'pointer',
    color: `${theme.palette.text.secondary} !important`,
    '&:hover': {
      color: `${theme.palette.text.primary} !important`,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
}));

const BSOrderHistoryContent = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1); // Goes back to the previous page in history
    } else {
      navigate('/'); // Redirects to home if there's no history
    }
  };

  return (
    <div className="flex-align-stretch bs_main width-100 large_card position-relative">
      <div>
        {' '}
        <div className={classes.link} onClick={handleGoBack}>
          <ArrowBackIcon /> Go Back
        </div>
      </div>

      <h1>Order History</h1>
      <Tabs
        type="line"
        defaultActiveKey="1"
        className="bs_tab_item orange tabs_button"
      >
        <Tabs.TabPane tab="Buy" key="1">
          <BSBuyOrderHistoryTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Sell" key="2">
          <BSSellOrderHistoryTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Convert" key="3">
          <BSConvertOrderHistoryTable />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default BSOrderHistoryContent;
