import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button } from '@mui/material';
import crown from '../../assets/elite_club/Crown logo.svg';
import './Menu.css';
import Bull from '../../assets/elite_club/bull_new.svg';
import Eagle from '../../assets/elite_club/Eagle_new.svg';
import Foxtail from '../../assets/elite_club/fox_new.svg';
import Lion from '../../assets/elite_club/lion_New.svg';

import Bull_gif from '../../assets/elite_club/bull_opt.gif';
import Eagle_gif from '../../assets/elite_club/eagle_opt.gif';
import Foxtail_gif from '../../assets/elite_club/fox_opt.gif';
import Lion_gif from '../../assets/elite_club/lion_opt.gif';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    // setValue(0);
  };

  const getBackgroundImage = () => {
    switch (value) {
      case 0:
        return `url(${Lion_gif})`; // Use the appropriate variable for Lion image
      case 1:
        return `url(${Bull_gif})`; // Use the appropriate variable for Bull image
      case 2:
        return `url(${Eagle_gif})`; // Use the appropriate variable for Eagle image
      case 3:
        return `url(${Foxtail_gif})`; // Use the appropriate variable for Foxtail image
      default:
        return ''; // Default background or handle it as per your requirement
    }
  };

  const TabPanel = ({ index, value, children }) => (
    <div hidden={value !== index} style={{ marginTop: '20px' }}>
      {value === index && <div>{children}</div>}
    </div>
  );

  return (
    <div>
      <button onClick={handleDrawerOpen} style={{
        position:"fixed",
        top:"110px",
        left:"45px",
        zIndex:"999",
        width:"fit-content",
        background:"transparent",
        color:"var(--body_color)",
        fontSize:"15px",

      }}> <MenuIcon fontSize='15px'/> {" "}Menu</button>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        className="my-drawer"
        sx={{
          '& .MuiDrawer-paper': {
            paddingTop: '90px',
            position: 'fixed',
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(0, 0, 0, 0.7)', // Add an overlay effect
            backgroundImage: getBackgroundImage(),
            backgroundSize: 'cover',
            transition: 'width 1.5s ease-in-out',
            // backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          },
        }}
      >
        <Box width={'100vw'} height={'100vh'} className="over-bg" sx={{ display: 'flex', paddingLeft: '5%', }}>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              position: 'absolute',
              top: 110,
              justifyContent: 'flex-start',
              alignItems: 'baseline',
              padding: '0',
              width: '25px',
              height: '25px',
              color:"var(--body_color)",
              '&:hover': {
                background: 'none',
              },
            }}
            disableRipple
          >
            <CloseIcon color='var(--body_color)'/>
          </IconButton>
          <Box
            sx={{
              width: '25%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRight: '2px solid var(--primary_color)',
              alignItems: 'end',
              alignSelf:"baseline",
              paddingRight:"2%",
            }}
            mt={5}
          >
            <Box component={'img'} src={crown} alt="logo" width={'85px'} />
            <Typography
              fontSize={'33px'}
              fontWeight={500}
              textAlign="center"
              color="var(--primary_color)"
              mt={2}
              mb={6}
            >
              Indexx Elite Club
            </Typography>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleTabChange}
              sx={{ width: '50%' }}
              className="menu-tabs"
              disableRipple
            >
              <Tab label="Lion Crown" className="menu-tab" disableRipple/>
              <Tab label="Bull Run" className="menu-tab" disableRipple/>
              <Tab label="Eagle Eye" className="menu-tab" disableRipple/>
              <Tab label="Foxtail" className="menu-tab" disableRipple/>
            </Tabs>
          </Box>
          <Box className="over-bg-2" sx={{ width: '76%', paddingLeft: '5%', }}>
            <TabPanel value={value} index={0}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                mt={5}
              >
                <Box
                  component={'img'}
                  src={Lion}
                  alt="logo"
                  height={'350px'}
                  //   width={"85px"}
                />
                <Typography
                  fontSize={'13px'}
                  textAlign="center"
                  color="var(--primary_color)"
                  width={"80%"}
                  mt={5}
                >
                  Reign supreme with Lion Crown's 250,000 INEX token bonus, 7%
                  extra on transactions, and a $250,000 ETF portfolio.
                  Experience Diamond-level Hive Powerpack access, personalized
                  support, and unlimited Indexx Academy courses. Elevate
                  earnings with a 20% first-level referral bonus, 12% on the
                  second level, and indulge in 30 free monthly lottery tickets,
                  along with exclusive Limited Edition Elite Lion NFTs.
                </Typography>
                <Box className='d-flex' mt={4} sx={{gap:18}}>
                <Link to="/indexx-exchange/elite-learn/1">
                <Button
                        onClick={handleDrawerClose}
                        className='menu-btns'
                    >
                        Learn more
                    </Button>
                    </Link>
                    {/* <Button
                        // onClick={}
                        className='menu-btns'
                    >
                        Features
                    </Button> */}
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                mt={5}
              >
            <Box
                  component={'img'}
                  src={Bull}
                  alt="logo"
                  height={'350px'}
                  //   width={"85px"}
                />
                <Typography
                  fontSize={'13px'}
                  textAlign="center"
                  color="var(--primary_color)"
                  width={"80%"}
                  mt={5}
                >
                  Thrive in Bull Run's opulence with a 150,000 INEX token bonus, 5% extra on transactions, and a $150,000 ETF portfolio. Access Platinum-level Hive Powerpack, unlimited Indexx Academy courses, and exclusive events, complemented by 20 free monthly lottery tickets.
                </Typography>
                <Box className='d-flex' mt={4} sx={{gap:18}}>
                <Link to="/indexx-exchange/elite-learn/2">
                <Button
                        onClick={handleDrawerClose}
                        className='menu-btns'
                    >
                        Learn more
                    </Button>
                    </Link>
                    {/* <Button
                        // onClick={}
                        className='menu-btns'
                    >
                        Features
                    </Button> */}
                </Box>
            </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
            <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                mt={5}
              >
            <Box
                  component={'img'}
                  src={Eagle}
                  alt="logo"
                  height={'350px'}
                  //   width={"85px"}
                />
                <Typography
                  fontSize={'13px'}
                  textAlign="center"
                  color="var(--primary_color)"
                  width={"80%"}
                  mt={5}
                >
                 Ascend with Eagle Club's 50,000 INEX token bonus, 3% extra on transactions, and a $50,000 ETF portfolio. Enjoy Gold-level Hive Powerpack access, six free Indexx Academy courses, and lucrative referral bonuses with 10 free monthly lottery tickets.
                </Typography>
                <Box className='d-flex' mt={4} sx={{gap:18}}>
                <Link to="/indexx-exchange/elite-learn/3">

                <Button
                        onClick={handleDrawerClose}
                        className='menu-btns'
                    >
                        Learn more
                    </Button>
                  </Link>
                    {/* <Button
                        // onClick={}
                        className='menu-btns'
                    >
                        Features
                    </Button> */}
                </Box>
            </Box>
            </TabPanel>
            <TabPanel value={value} index={3}>
            <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                mt={5}
              >
            <Box
                  component={'img'}
                  src={Foxtail}
                  alt="logo"
                  height={'350px'}
                  //   width={"85px"}
                />
                <Typography
                  fontSize={'13px'}
                  textAlign="center"
                  color="var(--primary_color)"
                  width={"80%"}
                  mt={5}
                >
                Step into sophistication with Foxtail's 25,000 INEX token sign-up bonus, 1% extra on transactions, and a $25,000 ETF portfolio. Access Silver-level Hive Powerpack, enrich your knowledge with three Indexx Academy courses, and boost earnings with an 8% first-level referral bonus, accompanied by five free lottery tickets each month.
                </Typography>
                <Box className='d-flex' mt={4} sx={{gap:18}}>
                <Link to="/indexx-exchange/elite-learn/4">

                <Button
                        onClick={handleDrawerClose}
                        className='menu-btns'
                    >
                        Learn more
                    </Button>
                </Link>
                    {/* <Button
                        // onClick={}
                        className='menu-btns'
                    >
                        Features
                    </Button> */}
                </Box>
            </Box>
            </TabPanel>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default Menu;
