import React from 'react';
import Button from '@mui/material/Button';
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
  },
}));

const GenericButton = ({
  text,
  IconComponent,
  onClick,
  className,
  styles,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={`${classes.button} ${className}`}
      onClick={onClick}
      style={styles}
      {...rest}
    >
      {IconComponent && <div className="icon">{IconComponent}</div>}
      {text}
    </Button>
  );
};

GenericButton.propTypes = {
  text: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType, // Icon component
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string, // Custom class name
  styles: PropTypes.object, // Inline styles
};

export default GenericButton;
