import { Button, Tabs } from 'antd';
import React, { useState } from 'react';
import BSTransactionCryptoHistoryTable from './BSTransactionCryptoHistoryTable';
import BSTransactionHistoryTable from './BSTransactionHistoryTable';
import { DownloadOutlined } from '@ant-design/icons';
import GenericButton from '../updated/shared/Button';
import DownloadReportPopup from './DownloadReportPopup';

const BSTransactionHistoryContent = () => {
  const [pdfDownload, setPdfDownload] = useState(false);
  return (
    <div className="flex-align-stretch bs_main width-100 large_card position-relative  ">
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
