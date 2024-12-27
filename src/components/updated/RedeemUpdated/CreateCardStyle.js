import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    maxWidth: '1380px',
    margin: 'auto',
  },
  sendCryptoRoot: {
    maxWidth: '840px',
    width: '100%',
    '& h3': {
      color: theme.palette.text.primary,
      fontSize: '38px',
      fontWeight: '500',
    },
    '& p': {
      color: theme.palette.text.secondary,
      fontSize: '15px',
      marginBottom: '20px',
    },
    '& button': {
      background: theme.palette.divider,
      width: 'fit-content',
      color: theme.palette.text.secondary,
      fontSize: '13px',
      height: '40px',
      padding: '16px',
      textTransform: 'capitalize !important',
    },
  },
  redeemRoot: {
    display: 'flex',
    justifyContent: 'space-between',

    gap: '40px',
    marginBottom: '80px',
    marginTop: '50px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  redeemLeft: {
    borderRadius: '4px',
    flex: '50%',
    marginTop: '-5px',
  },
  inputFieldRoot: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '20px',
    gap: '20px',
    '& .textfieldInner': {
      flex: 1,
    },
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '20px',
    marginTop: '30px',
    '& button': {
      maxWidth: '250px',
      width: '100%',
    },
  },
  selectTypeContainer: {
    marginBottom: '20px',
    '& label': {
      fontSize: '11px',
      marginBottom: '10px',
    },
  },
  enterAmountContainer: {
    marginBottom: '20px',
  },
  quantityContainer: {
    marginBottom: '20px',
  },
  // activeImg: {
  //   border: `5px solid ${theme.palette.primary.main}`,
  // },
  hoverCardEffect: {
    padding: '0px 20px',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  errorMessage: {
    color: 'red',
    marginBottom: '20px',
  },
  currencyDisplay: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    '& img': {
      width: '24px',
      height: '24px',
      marginRight: '10px',
    },
  },
  balanceDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  cardGrid: {
    marginTop: '20px',
    gap: '10px',
    '& .slick-slide': {
      width: '100% !important',
    },
  },
  swiperContainer: {
    position: 'relative', // Set position relative to enable absolute positioning of arrows
    margin: '2rem auto',
  },
  slickArrow: {
    position: 'absolute',
    top: '50%', // Center the arrows vertically
    transform: 'translateY(-50%)', // Adjust vertical alignment
    backgroundColor: 'none',
    height: '50px',
    width: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    opacity: 1,
    zIndex: 1,
    cursor: 'pointer',
  },
  slickPrev: {
    left: '-35px', // Position to the left of the slider
    [theme.breakpoints.down('md')]: {
      display: 'none',
      left: '0px',
    },
  },
  slickNext: {
    right: '-35px', // Position to the right of the slider
    [theme.breakpoints.down('md')]: {
      display: 'none',

      right: '0px',
    },
  },
  slickArrowHover: {
    '&:hover': {
      color:
        theme.palette.mode === 'dark' ? 'white !important' : 'white !important',
      opacity: 1,
    },
  },
  slickArrowIcon: {
    color: 'grey',
    fontSize: '30px',
    '&:hover': {
      color:
        theme.palette.mode === 'dark' ? 'white !important' : 'white !important',
      opacity: 1,
    },
  },
  btnWithNoBg: {
    width: 'fit-content',
    background: 'none !important',
    color: `${theme.palette.primary.main} !important`,
    padding: 0,
    height: 'fit-content',
    '&:hover': {
      background: 'none !important',
      color: `${theme.palette.primary.main} !important`,
      opacity: '.7',
    },
  },
}));

export default useStyles;
