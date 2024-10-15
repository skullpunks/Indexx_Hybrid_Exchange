import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import IconicHeader from '../components/updated/shared/IconicHeader';
import Markets from '../components/updated/Markets/';

const MarketsPage = () => {
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState('Markets');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div
      style={{
        width: '100%',
        marginTop: '70px',
        padding: '20px',
        color: theme.palette.text.primary,
      }}
    >
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <Markets />
    </div>
  );
};

export default MarketsPage;
