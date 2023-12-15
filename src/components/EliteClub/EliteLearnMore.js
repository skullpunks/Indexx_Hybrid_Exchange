import { Box, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { EliteClubData } from './EliteClubData';
import './Menu.css';
import Menu from './Menu';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

const EliteLearnMore = () => {
  const { id } = useParams();
  const [data, setdata] = useState();

  useEffect(() => {
    const filtered = EliteClubData.filter((item) => item.id === id);
    setdata(filtered[0]);
  }, [id]);

  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'light'
  );

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));


  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log(event);
      setTheme(event.currentTarget.localStorage.selectedTheme);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Box mt={isMobile ? 5 : 10}>
      {!isMobile && <Menu />}
      <Link to="/indexx-exchange/elite-club">
        <button
          style={{
            position: 'fixed',
            top: `${isMobile ? '60px' : '110px'}`,
            left: `${isMobile ? '20px' : '160px'}`,
            zIndex: '999',
            width: 'fit-content',
            background: 'transparent',
            color: 'var(--body_color)',
            fontSize: '15px',
          }}
        >
          {' '}
          Home
        </button>
      </Link>

      <Box
        sx={{
          backgroundImage: `url(${data?.gif})`,
          backgroundSize: 'cover',
          width: '100%',
          height: `${isMobile ? '30vh' : '100vh'}`,
        }}
        className="d-flex justify-content-center"
      ></Box>
      <Box
        className="d-flex justify-content-center over-bg"
        mt={id === '1' ? `${isMobile ? '-70%' : '-50%'}` : `${isMobile ? '-90%' : '-70%'}`}
        pt={20}
      >
        <Box component={'img'} src={data?.photo} alt="logo" width={'90%'} />
      </Box>
      <Box className="d-flex justify-content-center" mt={isMobile ? 20 : 30} mb={isMobile ? 25 : 35}>
        <Typography
          fontWeight={'bold'}
          fontSize={isMobile ? '23px' : '50px'}
          textAlign={isMobile ? 'center' : "left"}
          width={'85%'}
        >
          {data?.desc}
        </Typography>
      </Box>
      <Box
        mt={10}
        mb={15}
        sx={{
          backgroundImage: `url(${data?.gif})`,
          backgroundSize: 'cover',
          width: '100%',
        }}
      >
        <Box className="d-flex justify-content-center align-items-center over-bg-3" pt={7} pb={10}
        sx={{flexDirection : `${isMobile ? 'column' : 'row'}`}}
        >
          <Box
            className="d-flex flex-column align-items-center align-self-center"
            width={'50%'}
          >
            <Box
              component={'img'}
              src={data?.photo}
              alt="logo"
              width={'260px'}
            />
            <Typography
              fontWeight={'bold'}
              fontSize={isMobile ? '30px' : '48px'}
              textAlign="left"
              mt={isMobile ? 2 : 5}
            >
              Perks
            </Typography>
          </Box>
          <Box className="d-flex flex-column" width={isMobile ? "90%" : '50%'}
            sx={{alignItems : `${isMobile ? 'center' : 'left'}` }}
          >
            {data?.perks.map((item) => (
              <Box width={'80%'}  mt={3}>
                <Typography
                  fontWeight={'bold'}
                  fontSize={'20px'}
                  textAlign="left"
                  lineHeight={'36px'}
                >
                  {item?.title}
                </Typography>
                <Typography
                  fontSize={isMobile ? '13px' : '10px'}
                  textAlign="left"
                  lineHeight={'36px'}
                >
                  {item?.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        className="d-flex flex-column justify-content-center align-items-center"
        mt={30}
      >
        <Box
          component={'img'}
          src={data?.back_photo}
          alt="logo"
          width={'145px'}
          mb={4}
        />
        <Typography
          fontWeight={500}
          fontSize={isMobile ? '30px' : '40px'}
          textAlign="center"
          width={isMobile ? '90%' : '50%'}
        >
          Why you should invest today
        </Typography>
        <Typography
          fontWeight={500}
          fontSize={isMobile ? '15px' : '10px'}
          textAlign={isMobile ? 'center' : "left"}
          width={isMobile ? '90%' : '520px'}
          lineHeight={'30px'}
          mt={3}
          mb={8}
        >
          {data?.why_invest}
        </Typography>
      </Box>

      <Box
        mt={10}
        mb={15}
        sx={{
          backgroundImage: `url(${data?.gif})`,
          backgroundSize: 'cover',
          width: '100%',
        }}
      >
        <Box
          className="d-flex justify-content-center flex-column align-items-center over-bg-3"
          pt={7}
          pb={10}
        >
          <Box component={'img'} src={data?.photo} alt="logo" width={isMobile ? '95%' : '450px'} />
          <Typography
            // fontWeight={'bold'}
            fontSize={'54px'}
            textAlign="left"
            mt={5}
          >
            <span style={{ fontSize: '40px' }}> $ </span>
            {data?.price}
            <span style={{ fontSize: '40px' }}> USD </span>
          </Typography>
          <Button
            // onClick={}
            sx={{
              background: data?.clr,
              color: '#fff',
              borderRadius: '5px',
              mt: 2,
              width: '331px',
              height: '43px',
              fontSize: '18px',
              fontWeight: '100',
              textTransform: 'none',
              zIndex: '5',
              '&:hover, &:active, &:focus': {
                background: data?.clr,
                opacity: '0.9',
              },
            }}
          >
            Invest
          </Button>
        </Box>
      </Box>

      <Box
        className="d-flex flex-column justify-content-center align-items-center"
        mt={isMobile ? 10 : 30}
      >
        <Box
          className="d-flex flex-column justify-content-center"
          width={isMobile ? '90%' : '75%'}
          sx={{alignItems : `${isMobile ? 'center' : 'left'}` }}
        >
          <Typography
            fontWeight={'bold'}
            fontSize={isMobile ? '25px' : '40px'}
            textAlign={isMobile ? 'center' : "left"}
            width={'95%'}
          >
            Indexx Investor Elite Club
          </Typography>
          {isMobile ? 
          <>

          <Typography
            fontWeight={'bold'}
            fontSize={isMobile ? '50px' : '60px'}
            textAlign={isMobile ? 'center' : "left"}
            width={isMobile ? '90%' : '85%'}
          >
            {data?.name} 
          </Typography>
          <Typography
            fontSize={isMobile ? '20px' : '60px'}
            textAlign={isMobile ? 'center' : "left"}
            width={isMobile ? '90%' : '85%'}
          >
            Investment Package
          </Typography>
          </>

          :
          <Typography
            fontWeight={'bold'}
            fontSize={isMobile ? '30px' : '60px'}
            textAlign={isMobile ? 'center' : "left"}
            width={isMobile ? '90%' : '85%'}
          >
            {data?.name} Investment Package
          </Typography>
          }
          {data?.package.map((pack) => (
            <Box className="d-flex" mt={10}
            sx={{flexDirection : `${isMobile ? 'column' : 'row'}`, gap: 5,
            alignItems : `${isMobile ? 'center' : 'left'}`,
            justifyContent:`${isMobile ? 'center' : 'left'}`,
             }}

            >
            <Box width={isMobile ? '100%' : "auto"} className="d-flex justify-content-center">

              <Box
                component={'img'}
                src={
                  theme === 'dark' ? pack?.image : pack?.lightimg || pack?.image
                }
                alt="logo"
                alignSelf={'baseline'}
                width={isMobile ? '120px' : 'auto'}
              />
            </Box>
              <Box>
                <Typography
                  fontWeight={600}
                  fontSize={isMobile ? '20px' : '25px'}
                  lineHeight={'30px'}
                  // textAlign="left"
                  textAlign={isMobile ? 'center' : "left"}

                  // width={'85%'}
                >
                  {pack?.title}
                </Typography>
                <Box ml={isMobile ? 0 : '50px'} mt={1} minHeight={'150px'}>
                  {pack?.list.map((item) => (
                    <Typography
                      fontSize={'10px'}
                      lineHeight={'30px'}
                      textAlign={isMobile ? 'center' : "left"}
                      // width={'85%'}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="d-flex justify-content-center">
        <Button
          // onClick={}
          sx={{
            background: '#000',
            color: '#fff',
            borderRadius: '5px',
            mt: 4,
            width: '331px',
            height: '43px',
            fontSize: '18px',
            fontWeight: '100',
            textTransform: 'none',
            zIndex: '5',
            '&:hover, &:active, &:focus': {
              background: '#3E3E3E',
              opacity: '0.5',
            },
          }}
        >
          Invest
        </Button>
      </Box>
    </Box>
  );
};

export default EliteLearnMore;
