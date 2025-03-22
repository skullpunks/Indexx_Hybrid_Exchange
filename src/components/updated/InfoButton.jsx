import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VideoPopup from './VideoPopup';
import Tooltip from '@mui/material/Tooltip';

const tooltipTexts = {
  BuySell: 'Learn how to buy and sell in Indexx Exchange',
  Convert: 'Learn how to convert your crypto',
  SmartCrypto: 'Learn how to invest in smart crypto',
  Staking: 'Learn how to stake coins',
};

const InfoButton = ({ page }) => {
  const [infoPopupOpen, setInfoPopupOpen] = useState(false);
  const theme = useTheme();

  const handlePopupClose = () => {
    setInfoPopupOpen(false);
  };

  return (
    <>
      <Tooltip
        title={tooltipTexts[page] || 'Click for more information'}
        arrow
        placement="right"
        PopperProps={{
          sx: {
            '& .MuiTooltip-tooltip': {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontSize: '14px',
            },
          },
        }}
        componentsProps={{
          arrow: {
            sx: {
              color: theme.palette.background.paper,
            },
          },
        }}
      >
        <InfoOutlinedIcon
          onClick={() => {
            setInfoPopupOpen(true);
          }}
          style={{
            cursor: 'pointer',
            margin: '5px',
            color: theme.palette.text.secondary,
          }}
        />
      </Tooltip>
      {infoPopupOpen && <VideoPopup page={page} onClose={handlePopupClose} />}
    </>
  );
};

export default InfoButton;
