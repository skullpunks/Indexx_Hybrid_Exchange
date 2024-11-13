import React, { useEffect, useState } from 'react';
import PowerCard from './PowerCard';
import { Box, Grid, Typography } from '@mui/material';
import { PackData } from './PackData';
import powerp from '../../assets/powerpack/Power pack.png';
import hive from '../../assets/powerpack/HiveLogo.png';
// import PowerPackHeader from './PowerPackHeader/PowerPackHeader';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

const PowerPack = ({ type }) => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    setCards(PackData);
  }, []);

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  return (
    <Box mt={18} pb={5}>
      {/* <PowerPackHeader /> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          width: '100%',
          objectFit: 'scale-down',
          mt: 25,
          mb: 2,
          flexDirection: `${isMobile ? 'column' : 'row'}`,
          gap: 3,
        }}
      >
        <Box component={'img'} src={powerp} alt="logo" />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant={'h3'} fontSize={'40px'} textAlign="center">
            Investor's Power Pack
          </Typography>
        </Box>
        <Box
          component={'img'}
          src={hive}
          alt="logo"
          width={90}
          marginRight={-3}
        />
        <Typography variant={'h3'} fontSize={'40px'} textAlign="center">
          Indexx Hive
        </Typography>
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
        To unlock the full potential of earning as a "Hive Captain," you must
        invest in a minimum of the Hive Captain Power Pack or a higher tier.
        This investment is your ticket to financial growth and success.
      </Typography>
      <Box sx={{ mt: 5, width: '80%', mx: 'auto', maxWidth: '1300px' }}>
        <Grid
          container
          columns={{ xs: 1, sm: 12, md: 12 }}
          spacing={{ xs: 1, md: 2 }}
        >
          {cards.map((cr) => (
            <PowerCard key={cr.id} card={cr} type={type} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PowerPack;
