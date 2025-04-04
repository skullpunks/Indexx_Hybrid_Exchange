import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Tabs,
  Tab,
  styled,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import CustomDrawer from './CustomDrawer';
import faqIcon from '../../assets/updated/support_center/white icons/asset lock.png';

import RegisterLoginContent from './RegisterLoginContent';
import BuySellContent from './BuySellContent';
import ConvertContent from './ConvertContent';

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.primary,
  fontSize: '16px',
  fontWeight: '600',
  width: 'fit-content',
  marginRight: '20px',
  padding: '5px 0px',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '0px',
  position: 'relative',
  background: 'transparent !important',
  height: 'unset',

  '&.active': {
    color: theme.palette.primary.light,
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 'calc(50% - 10px)',
      width: '16px',
      borderBottom: `3px solid ${theme.palette.primary.light}`,
    },
  },
  '&:hover': {
    color: theme.palette.secondary.light,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
  },
}));

export const FAQS = [
  {
    id: '0',
    title: 'Register/Login',
    content: <RegisterLoginContent />,
    link: '/faqs/0',
    icon: faqIcon,
  },
  {
    id: '1',
    title: 'Buy/Sell Crypto',
    content: <BuySellContent />,
    link: '/faqs/1',
    icon: faqIcon,
  },
  {
    id: '2',
    title: 'Convert Crypto',
    content: <ConvertContent />,
    link: '/faqs/2',
    icon: faqIcon,
  },
];

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '0 auto',
    maxWidth: '1200px',
    marginTop: '100px',
  },
  title: {
    marginBottom: '20px',
    fontSize: '44px !important',
    fontWeight: '600 !important',
    display: 'inline-block',
  },
}));

const FaqsPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [currentTab, setCurrentTab] = useState(id);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
    navigate(`/faqs/${newValue}`);
  };

  const currentFAQ = FAQS.find((faq) => faq.id === id) || {
    title: 'FAQ Not Found',
    content: 'No content available.',
  };

  return (
    <Box
      container
      spacing={2}
      sx={{
        margin: '100px auto',
        maxWidth: 'fit-content',
        width: '100%',
        display: 'flex',
      }}
    >
      {isDesktop && (
        <Box item>
          <CustomDrawer faqs={FAQS} activeId={id} />
        </Box>
      )}
      <Box sx={{ margin: '20px', width: '90%' }}>
        <h1 className={classes.title}>FAQ</h1>
        <Box
          sx={{
            maxWidth: 600,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '16px',
            marginBottom: '16px',
          }}
        >
          <Box
            sx={{
              padding: '24px 24px 0 24px',
            }}
          >
            <h1
              variant="h5"
              component="div"
              style={{
                fontSize: '25px',
                fontWeight: 'bold',
                marginBottom: '16px',
              }}
            >
              {currentFAQ.title}
            </h1>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              {!isDesktop && (
                <Tabs
                  value={currentTab}
                  onChange={handleChange}
                  centered={false}
                  variant="scrollable"
                  scrollButtons={false}
                  sx={{
                    width: '100%',
                    background: 'none',
                    '& .MuiTabs-indicator': {
                      display: 'none',
                    },
                    [theme.breakpoints.down('md')]: {
                      '& .MuiTabs-scrollButtons': {
                        display: 'flex',
                      },
                      '& .MuiTabScrollButton-root': {
                        padding: '25px',
                        color: 'white',
                        fontSize: '24px',
                      },
                    },
                  }}
                >
                  {FAQS.map((tab, index) => (
                    <CustomTab
                      key={index}
                      label={tab.title}
                      iconPosition="top"
                      disableRipple
                      className={id === tab.id ? 'active' : ''}
                    />
                  ))}
                </Tabs>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              borderTop: `1px solid ${theme.palette.divider}`,
              padding: '24px',
            }}
          >
            <Typography variant="body1">{currentFAQ.content}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FaqsPage;
