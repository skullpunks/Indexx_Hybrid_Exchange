import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import crown from "../../assets/elite_club/elite crown 2.svg";
// import PowerPackHeader from './PowerPackHeader/PowerPackHeader';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { EliteClubData } from './EliteClubData';
import EliteCard from './EliteCard';
import Menu from './Menu';

const EliteClub = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    setCards(EliteClubData);
  }, []);

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  return (
    <Box mt={18} pb={5}>
      {/* <PowerPackHeader /> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          width: "100%",
          objectFit: "scale-down",
          mt: 25,
          mb: 2,
          flexDirection: "column",
          gap: 3,
        }}
      >
      {!isMobile && <Menu />}

        <Box
          component={"img"}
          src={crown}
          alt='logo'
          width={isMobile ? "75px" : "100px"}
        />

        <Box sx={{ textAlign: "center", marginTop:"-35px" }}>
          <Typography fontSize={isMobile ? "25px" : "60px"} fontWeight={"bold"} textAlign="center" color="var(--primary_color)">
          Indexx Investor Elite Club
          </Typography>
        </Box>
      </Box>
    
      <Box sx={{ mt: 5, width: "80%", mx: "auto", maxWidth: "1300px" }}>
        <Grid
          container
          columns={{ xs: 1, sm: 12, md: 12 }}
          spacing={{ xs: 1, md: 2 }}
        >
          {cards.map((cr) => (
            <EliteCard
              key={cr.id}
              card={cr}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default EliteClub;
