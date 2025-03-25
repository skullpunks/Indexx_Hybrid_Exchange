import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Container,
  Grid,
  Box,
  Tabs,
  Tab,
  styled,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import CustomDrawer from '../components/CustomDrawer';
import faqIcon from '../assets/updated/support_center/white icons/asset lock.png';

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
    title: 'Need to Complete ',
    content: 'Dummy content for FAQ 1.',
    link: '/faqs/1',
    icon: faqIcon,
  },
  {
    id: '1',
    title: 'Complete Identity',
    content:
      'Dummy content for FAQ 2.\n Dummy content for FAQ 2.\n Dummy content for FAQ 2.\n Dummy content for FAQ 2.\n Dummy content for FAQ 2.\n ',
    link: '/faqs/1',
    icon: faqIcon,
  },
  {
    id: '2',
    title: 'Complete Entity ',
    content: 'Dummy content for FAQ 3.',
    link: '/faqs/1',
    icon: faqIcon,
  },
  {
    id: '3',
    title: 'How to Request/Provide',
    content: 'Dummy content for FAQ 4.',
    link: '/faqs/4',
    icon: faqIcon,
  },
  {
    id: '4',
    title: 'How to Use the Verification',
    content: 'Dummy content for FAQ 5.',
    link: '/faqs/5',
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
    marginBottom: '30px',
    fontSize: '32px !important',
    fontWeight: '600 !important',
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
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={2}>
        {isDesktop && (
          <Grid item xs={12} md={3}>
            <CustomDrawer faqs={FAQS} activeId={id} />
          </Grid>
        )}
        <Grid item xs={12} md={isDesktop ? 9 : 12}>
          <h1 className={classes.title}>FAQ</h1>
          <Box
            sx={{
              width: '100%',
              maxWidth: 600,
              border: `1px solid #2b3139`,
              borderRadius: '16px',
            }}
          >
            <Box
              sx={{
                padding: '24px 24px 0 24px',
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{ fontSize: '20px', fontWeight: '600 !important', mb: 2 }}
              >
                All FAQ
              </Typography>
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
            <Box sx={{ borderTop: '1px solid #2b3139', padding: '24px' }}>
              <Typography variant="body1">{currentFAQ.content}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FaqsPage;
