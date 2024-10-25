import { Button, Tabs } from 'antd';
import React, { useState } from 'react';
import BSTransactionCryptoHistoryTable from './BSTransactionCryptoHistoryTable';
import BSTransactionHistoryTable from './BSTransactionHistoryTable';
import { DownloadOutlined } from '@ant-design/icons';
import GenericButton from '../updated/shared/Button';
import DownloadReportPopup from './DownloadReportPopup';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@mui/styles';

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
const BSTransactionHistoryContent = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1); // Goes back to the previous page in history
    } else {
      navigate('/'); // Redirects to home if there's no history
    }
  };
  const [pdfDownload, setPdfDownload] = useState(false);

  return (
    <div className="flex-align-stretch bs_main width-100 large_card position-relative  ">
      <div>
        {' '}
        <div className={classes.link} onClick={handleGoBack}>
          <ArrowBackIcon /> Go Back
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Transaction History</h1>
        <GenericButton
          text={'Download Report'}
          IconComponent={undefined}
          onClick={() => setPdfDownload(true)}
          className={undefined}
          styles={{ width: 'fit-content' }}
          disabled={undefined}
          loading={undefined}
        />
      </div>

      <div>
        <Tabs
          type="line"
          defaultActiveKey="1"
          className="bs_tab_item orange tabs_button"
        >
          <Tabs.TabPane tab="Crypto" key="1">
            <BSTransactionCryptoHistoryTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Fiat" key="2">
            <BSTransactionHistoryTable />
          </Tabs.TabPane>
        </Tabs>
      </div>
      {pdfDownload && (
        <DownloadReportPopup onClose={() => setPdfDownload(false)} />
      )}
      {/* <Button className='disabled_button ant-btn ant-btn-dangerous danger_disabled width_auto margin-r-2x position-absolute reset_button' onClick={() => window.location.reload()}> reset </Button> */}
    </div>
  );
};

export default BSTransactionHistoryContent;
