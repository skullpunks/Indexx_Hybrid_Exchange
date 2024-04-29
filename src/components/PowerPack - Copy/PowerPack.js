import React, { useEffect, useState } from 'react';
import PowerCard from './PowerCard';
import { Box, Grid, Typography } from '@mui/material';
import {
  PackData,
  HoneyBeeTokenData,
  HoneyBeeActionData,
  CaptainBeeCryptoData,
  CaptainBeePowerData,
} from './PackData';
import { HoneyPackData } from './HoneyBeeData';
import powerp from '../../assets/powerpack/Power pack.png';
import hive from '../../assets/powerpack/HiveLogo.png';
// import PowerPackHeader from './PowerPackHeader/PowerPackHeader';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import CustomizedSteppers from '../Stepper';
import PopupModal from '../powerPackPopUp';

const PowerPack = ({ type, subType }) => {
  const [cards, setCards] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  useEffect(() => {
    setCards(
      subType === 'action'
        ? HoneyBeeActionData
        : subType === 'token'
        ? HoneyBeeTokenData
        : subType === 'crypto'
        ? CaptainBeeCryptoData
        : CaptainBeePowerData
    );
  }, []);

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  return (
    <Box style={{ marginTop: '100px' }} pb={5}>
      {/* <PowerPackHeader /> */}

      <h4 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
        Indexx Hive 3 Steps to Thrive
      </h4>
      <CustomizedSteppers step={2} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          width: '100%',
          objectFit: 'scale-down',
          marginTop: '80px',
          mb: 2,
          flexDirection: isMobile ? 'column' : 'row',
          gap: 3,
        }}
      >
        <h3
          style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center' }}
        >
          Indexx Hive
          {subType === 'action'
            ? ' Honey Bee Action Pack'
            : subType === 'token'
            ? ' Honey Bee Token Pack'
            : subType === 'crypto'
            ? ' Captain Bee Crypto Pack'
            : ' Captain Bee Power Pack'}
        </h3>
      </Box>

      <Typography
        variant="body1"
        fontSize={'20px'}
        sx={{
          mt: 2,
          color: 'var(--body_color)',
          textAlign: 'center',
          maxWidth: '1000px',
          mx: 'auto',
          lineHeight: '1.5',
        }}
      >
        To unlock the full potential of earning as a{' '}
        <b>{type === 'captainBee' ? 'Captain Bee,' : 'Honey Bee,'}</b> you must
        invest in a minimum of the{' '}
        {type === 'captainBee'
          ? 'Captain Bee Crypto Pack'
          : 'Honey Bee Action Pack'}{' '}
        or a higher tier. This investment is your ticket to financial growth and
        success.
      </Typography>
      <Box sx={{ mt: 5, width: '100%', mx: 'auto', maxWidth: '700px' }}>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}
        >
          {cards.slice(0, 2).map((cr) => (
            <>
              <PowerCard
                key={cr.id}
                card={cr}
                type={type}
                subType={subType}
                setPopup={setOpenPopup}
                setPopupData={setPopupData}
              />
            </>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mt: 5, width: '100%', mx: 'auto', maxWidth: '1000px' }}>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}
        >
          {cards.slice(2).map((cr) => (
            <>
              <PowerCard
                key={cr.id}
                card={cr}
                type={type}
                subType={subType}
                setPopup={setOpenPopup}
                setPopupData={setPopupData}
              />
            </>
          ))}
        </Grid>
        <PopupModal open={openPopup} setOpen={setOpenPopup} data={popupData}  />
      </Box>
    </Box>
  );
};

export default PowerPack;
