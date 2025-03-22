import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
  Grid,
  Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import CustomDrawer from '../components/CustomDrawer';

const faqs = [
  {
    id: '1',
    title: 'Why Do I Need to Complete ',
    content: 'Dummy content for FAQ 1.',
  },
  {
    id: '2',
    title: 'How to Complete Identity',
    content: 'Dummy content for FAQ 2.',
  },
  {
    id: '3',
    title: 'How to Complete Entity ',
    content: 'Dummy content for FAQ 3.',
  },
  {
    id: '4',
    title: 'How to Request/Provide',
    content: 'Dummy content for FAQ 4.',
  },
  {
    id: '5',
    title:
      'How to Use the Verification Collaborators Function in Binance Entity?',
    content: 'Dummy content for FAQ 5.',
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
    fontSize: '40px !important',
    fontWeight: '600 !important',
  },
  appBar: {
    position: 'fixed',
    width: '100%',
    zIndex: 1000,
  },
  contentContainer: {
    padding: theme.spacing(3),
  },
}));

const FaqsPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const selectedFaq = faqs.find((faq) => faq.id === id) || {
    title: 'FAQ Not Found',
    content: 'No content available.',
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <h1 className={classes.title}>FAQs</h1>
      <CssBaseline />
      <AppBar className={classes.appBar} sx={{ backgroundColor: '#1E2329' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FAQ
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <CustomDrawer faqs={faqs} activeId={id} />
        </Grid>
        <Grid item xs={12} md={9} className={classes.contentContainer}>
          <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
            {selectedFaq.title}
          </Typography>
          <Divider sx={{ backgroundColor: '#424A53', marginBottom: '20px' }} />
          <Typography variant="body1" sx={{ color: 'white' }}>
            {selectedFaq.content}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FaqsPage;
