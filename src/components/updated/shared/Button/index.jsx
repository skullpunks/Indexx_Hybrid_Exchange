import React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    padding: '8px 15px',
    position: 'relative',
    fontSize: '16px',
    minHeight: '48px',
    borderRadius: '10px !important',
    backgroundColor: '#11BE6A !important',
    boxShadow: 'none !important',
    color: '#202630 !important',
    fontWeight: 500,
    lineHeight: '24px',
    fontFamily: 'poppins !important',
    textTransform: 'capitalize !important',
    minWidth: '80px',
    '& .icon': {
      position: 'absolute',
      left: '15px',
      top: '50%',
      width: '16px',
      height: '16px',
      transform: 'translateY(-50%)',
    },
    '&:hover': {
      boxShadow: 'none !important',
      opacity: 0.9,
    },
    // '&.Mui-disabled': {
    //   backgroundColor: '#11BE6A !important', // Disabled state background color
    //   color: '#666666 !important', // Disabled state text color
    // },
  },
  progress: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const GenericButton = ({
  text,
  IconComponent,
  onClick,
  className,
  styles,
  disabled,
  loading,
  ...rest
}) => {
  const classes = useStyles();
  console.log("import LoadingButton from '@mui/lab/LoadingButton';", loading);
  return (
    <LoadingButton
      variant="contained"
      className={`${classes.button} ${className}`}
      onClick={onClick}
      style={styles}
      disabled={disabled || loading}
      loading={loading}
      {...rest}
    >
      {IconComponent && <div className="icon">{IconComponent}</div>}
      {text}
    </LoadingButton>
  );
};

GenericButton.propTypes = {
  text: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType, // Icon component
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string, // Custom class name
  styles: PropTypes.object, // Inline styles
  disabled: PropTypes.bool, // Disabled state
  loading: PropTypes.bool, // Loading state
};

GenericButton.defaultProps = {
  className: '',
  styles: {},
  disabled: false,
  loading: false,
};

export default GenericButton;
