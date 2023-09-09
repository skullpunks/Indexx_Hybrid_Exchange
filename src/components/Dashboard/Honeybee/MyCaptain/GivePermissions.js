import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 45,
  // 42,
  height: 23,
  // 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(22.5px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#FFB300' : '#FFB300',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 19,
    // 22,
    height: 19, 
    // 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


const GivePermissions = () => {
  return (
    <div>
      <div className='pt-2' style={{background:"#FFB300"}}></div>
    <div className="px-5 pt-4 pb-5" style={{background:"white"}}>
      <div className="font_15x fw-bold">
        You can give permissions to Buy/Sell/Convert to your CaptainBee Willie here.
      </div>
      <div
        className="d-flex justify-content-center flex-direction-column align-items-center  mt-5"
        style={{ gap: '20px' }}
      >
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ gap: '100px' }}
        >
          <div>
            <Typography variant="text" component="p" fontSize={'15px'}>
              Enable Captain Bee to Buy
            </Typography>
          </div>
          <div>
            <FormGroup>
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
        // label="Buy"
      />
    </FormGroup>
          </div>
        </div>

        <div
          className="d-flex justify-content-center align-items-center "
          style={{ gap: '100px' }}
        >
          <div>
            <Typography variant="text" component="p" fontSize={'15px'}>
              Enable Captain Bee to Sell
            </Typography>
          </div>
          <div>
          <FormGroup>
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
        // label="Buy"
      />
    </FormGroup>
          </div>
        </div>

        <div
          className="d-flex justify-content-center align-items-center "
          style={{ gap: '70px' }}
        >
          <div>
            <Typography variant="text" component="p" fontSize={'15px'}>
              Enable Captain Bee to Convert
            </Typography>
          </div>
          <div>
          <FormGroup>
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
        // label="Buy"
      />
    </FormGroup>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default GivePermissions;
