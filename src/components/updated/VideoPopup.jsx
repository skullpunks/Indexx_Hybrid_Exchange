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
    overflow: 'hidden',
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
    '@media (max-width: 600px)': {
      padding: '12px',
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
    height: 'auto',
  },
}));

const VideoPopup = ({ title, videoLink, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={`${classes.bnMask}`}>
      <div className={classes.bnModal}>
        <CloseIcon
          className={classes.closeButton}
          onClick={onClose}
          fontSize="large"
        />
        <div className={classes.contentContainer}>
          <h3>{title}</h3>
          <video className={classes.video} controls autoPlay muted>
            <source src={videoLink} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
