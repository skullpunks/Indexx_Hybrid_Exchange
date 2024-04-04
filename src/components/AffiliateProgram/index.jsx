import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import dummy from '../../assets/hive-dashboard/dummy.jpeg';
import frame from '../../assets/hive-dashboard/frame.svg';
import beeframe from '../../assets/hive-dashboard/beeframe-2.svg';
//
import captainHat from '../../assets/affiliate/captainHat.svg';
import honeyBee from '../../assets/affiliate/honeyBee.svg';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const AffiliateProgram = () => {
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));
  const [userProfile, setUserProfile] = useState();
  const [isCaptain, setisCaptain] = useState(false);

  return (
    <Box mt={18} pb={5} style={{ width: '75vw', margin: 'auto' }}>
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
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant={'h3'}
            fontSize={'40px'}
            textAlign="center"
            color="var(--primary_color)"
          >
            Indexx Hive Colony / Affiliate Program
          </Typography>
        </Box>
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
          fontSize: '14px',
        }}
      >
        Unlock exciting opportunities to earn rewards while spreading the word
        about our innovative platform. Become an affiliate today and be part of
        our thriving community!
      </Typography>

      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {localStorage.getItem('userlogged') !== 'normal' && (
          <div>
            <div
              style={{
                // width: '80px',
                // height: '80px',
                width: '150px',
                height: '150px',
                backgroundImage: `url(${
                  isCaptain === true ? frame : beeframe
                })`,
                // backgroundImage: `url(${frame})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                // border:"none"
              }}
            >
              <div
                className="bee-hexagon"
                style={{
                  marginBottom: `${isCaptain === true ? 0 : '7px'}`,
                  width: '110px',
                  height: '110px',
                }}
              >
                <img
                  alt=""
                  src={userProfile ? userProfile : dummy}
                  //   width={'63px'}
                  //   height={'66px'}
                  style={{
                    border: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <Typography
          fontSize={'20px'}
          textAlign="center"
          color="var(--primary_color)"
        >
          John Smith
        </Typography>
        <Typography
          variant="body1"
          fontSize={'20px'}
          sx={{
            color: 'var(--body_color)',
            textAlign: 'center',
            maxWidth: '1000px',
            mx: 'auto',
            lineHeight: '1.5',
            fontSize: '14px',
          }}
        >
          Captain Bee
        </Typography>

        <Typography
          fontSize={'14px'}
          fontWeight={700}
          textAlign="center"
          color="var(--primary_color)"
        >
          Congratulations, you have unlocked the hive dashboard. The
          Dashboard/Waggle Dance will help you with your commissions
        </Typography>

        <Button
          sx={{
            backgroundColor: '#FFD000',
            color: 'var(--body_color)',
            border: '1px solid #FFB300',
            borderRadius: '0',
            px: 4,
            mt: 3,
            width: '260px',
            height: '36px',
            fontSize: '13px',
            fontWeight: '100',
            textTransform: 'none',
            zIndex: '5',
            '&:hover': {
              background: '#FFD000',
              borderColor: '#FFD000',
            },
          }}
        >
          Waggle Dance
        </Button>

        <Box style={{ marginTop: '75px' }}>
          <Typography
            variant={'h3'}
            fontSize={'40px'}
            textAlign="center"
            color="#343434"
            style={{ marginBottom: '50px' }}
          >
            Invite a new member to your colony now!
          </Typography>

          {/* couple of cards */}
          {/* <Grid container spacing={2} justifyContent="center"> */}
          <Grid
            container
            spacing={2}
            rowSpacing={3}
            columnSpacing={3}
            justifyContent="center"
          >
            {/* FIRST BOX */}
            <Grid item xs={12} md={6}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={captainHat} alt="" />
                <Typography
                  variant={'h3'}
                  fontSize={'40px'}
                  textAlign="center"
                  color="black !important"
                >
                  Captain Bee
                </Typography>
                <Typography
                  variant="body1"
                  fontSize={'20px'}
                  sx={{
                    color: 'var(--body_color)',
                    textAlign: 'center',
                    maxWidth: '1000px',
                    lineHeight: '1.5',
                    fontSize: '14px',
                    marginTop: '3px',
                    marginBottom: '10px',
                  }}
                >
                  Owners of the HoneyCombs
                </Typography>
                <Typography
                  variant="body1"
                  fontSize={'18px'}
                  sx={{
                    color: 'var(--body_color)',
                    textAlign: 'center',
                    maxWidth: '1000px',
                    mx: 'auto',
                    lineHeight: '1.5',
                    fontSize: '14px',
                  }}
                >
                  Note: Please copy the referral code provided and share it with
                  the individuals you wish to invite.
                </Typography>
                {/*  */}
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="body1"
                    fontSize={'18px'}
                    sx={{
                      color: '#004FB7',
                      fontSize: '20px',
                    }}
                  >
                    XRLYINk@
                  </Typography>
                  <ContentCopyIcon
                    style={{ marginLeft: '10px', width: '15px' }}
                  />
                </Box>
                <Button
                  sx={{
                    backgroundColor: '#FFD000',
                    color: 'var(--body_color)',
                    border: '1px solid #FFB300',
                    borderRadius: '0',
                    mt: 3,
                    width: '260px',
                    height: '36px',
                    fontSize: '13px',
                    fontWeight: '100',
                    textTransform: 'none',
                    zIndex: '5',
                    '&:hover': {
                      background: '#FFD000',
                      borderColor: '#FFD000',
                    },
                  }}
                >
                  Invite a Captain Bee to your colony
                </Button>
                {/*  */}
              </Box>
            </Grid>
            {/* SECOND BOX */}
            <Grid item xs={12} md={6}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={captainHat} alt="" />
                <Typography
                  variant={'h3'}
                  fontSize={'40px'}
                  textAlign="center"
                  color="black !important"
                >
                  Honey Bee
                </Typography>
                <Typography
                  variant="body1"
                  fontSize={'20px'}
                  sx={{
                    color: 'var(--body_color)',
                    textAlign: 'center',
                    maxWidth: '1000px',
                    lineHeight: '1.5',
                    fontSize: '14px',
                    marginTop: '3px',
                    marginBottom: '10px',
                  }}
                >
                  Workers of the Honeycombs
                </Typography>
                <Typography
                  variant="body1"
                  fontSize={'18px'}
                  sx={{
                    color: 'var(--body_color)',
                    textAlign: 'center',
                    maxWidth: '1000px',
                    mx: 'auto',
                    lineHeight: '1.5',
                    fontSize: '14px',
                  }}
                >
                  Note: Please copy the referral code provided and share it with
                  the individuals you wish to invite.
                </Typography>
                {/*  */}
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="body1"
                    fontSize={'18px'}
                    sx={{
                      color: '#004FB7',
                      fontSize: '20px',
                    }}
                  >
                    XRLYRSf@
                  </Typography>
                  <ContentCopyIcon
                    style={{ marginLeft: '10px', width: '15px' }}
                  />
                </Box>
                <Button
                  sx={{
                    backgroundColor: '#FFD000',
                    color: 'var(--body_color)',
                    border: '1px solid #FFB300',
                    borderRadius: '0',
                    mt: 3,
                    width: '260px',
                    height: '36px',
                    fontSize: '13px',
                    fontWeight: '100',
                    textTransform: 'none',
                    zIndex: '5',
                    '&:hover': {
                      background: '#FFD000',
                      borderColor: '#FFD000',
                    },
                  }}
                >
                  Invite a Honey Bee to your colony
                </Button>
                {/*  */}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* end */}
      </Box>
    </Box>
  );
};

export default AffiliateProgram;
