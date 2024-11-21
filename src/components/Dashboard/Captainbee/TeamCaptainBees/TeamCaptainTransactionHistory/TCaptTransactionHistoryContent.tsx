import { Button, Tabs } from 'antd';
import React from 'react';
import TCaptTransactionHistoryTable from './TCaptTransactionHistoryTable';
import TCaptTransactionCryptoHistoryTable from './TCaptTransactionCryptoHistoryTable';

type TeamCapTxTableProps = {
  email: string;
};

const TCaptTransactionHistoryContent: React.FC<TeamCapTxTableProps> = ({
  email,
}) => {
  return (
    <div className="flex-align-stretch bs_main width-100 not_so_large_card position-relative">
      <Tabs
        type="line"
        defaultActiveKey="1"
        className="bs_tab_item orange tabs_button font_15x"
      >
        <Tabs.TabPane tab="Crypto" key="1">
          <TCaptTransactionCryptoHistoryTable email={email} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Fiat" key="2">
          <TCaptTransactionHistoryTable email={email} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default TCaptTransactionHistoryContent;
