import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  dataShow: {
    opacity: '1 !important', 
    visibility: 'visible !important',
    '& .bnModalWrap': {
      transform: 'scale(1) !important',
    },
  },
  bnMask: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1200,
    width: '100%',
    height: '100vh',
  },
  bnModal: {
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e2329',
    borderRadius: '16px',
    boxShadow: '0px 3px 6px rgba(0,0,0,.04)',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    transform: 'scale(.9)',
    transitionDuration: '250ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in-out',
    width: '800px',
    height: 'auto',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    textAlign: 'center',
    color: `${theme.palette.text.primary} !important`,
    overflowY: 'auto',
    maxHeight: '90vh',
    '@media (max-width: 600px)': {
      padding: '12px',
    },
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      display: 'none !important',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#484f59 !important'
          : '#a0a6af !important',
    },
  },
  closeButton: {
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    right: '20px',
    '@media (max-width: 600px)': {
      top: '10px',
      right: '10px',
    },
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    gap: '15px',
    marginTop: '25px',
  },
  video: {
    width: '100%',
    height: '450px',
    maxHeight: '450px',
    marginBottom: '10px',
    aspectRatio: '16 / 9',
    '@media (max-width: 600px)': {
      height: '300px',
    },
  },
}));

const VideoPopup = ({ page, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();

  const videoData = {
    BuySell: {
      titles: ['How to Buy Crypto', 'How to Sell Crypto'],
      videoLinks: [
        'https://www.youtube.com/embed/LLKmL5YU52E',
        'https://www.youtube.com/embed/Gl-rvCGtsY0',
      ],
    },
    Convert: {
      titles: ['How to convert'],
      videoLinks: ['https://www.youtube.com/embed/reDfKZkLwbU'],
    },
    SmartCrypto: {
      titles: ['How to Invest in Smart Crypto'],
      videoLinks: ['https://www.youtube.com/embed/reDfKZkLwbU'],
    },
    Staking: {
      titles: ['How to stake coins at Indexx'],
      videoLinks: ['https://www.youtube.com/embed/yIBnRB5lDpQ'],
    },
  };

  const { titles, videoLinks } = videoData[page] || {
    titles: ['Video not available'],
    videoLinks: [''],
  };

  return (
    <div className={`${classes.bnMask}`}>
      <div className={classes.bnModal}>
        <CloseIcon
          className={classes.closeButton}
          onClick={onClose}
          fontSize="large"
        />
        <div className={classes.contentContainer}>
          {titles.map((title, index) => (
            <div key={index}>
              <h3 style={{ margin: '10px' }}>{title}</h3>
              {videoLinks[index] ? (
                <iframe
                  className={classes.video}
                  src={videoLinks[index]}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>This video is not available for the current page.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
