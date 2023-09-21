import {
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import { Button, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { getHoneyBeePermissions, updatePermissionsByHoneyBee } from '../../../../services/api';

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
  const [, setPermissionsData] = useState();
  const [buyPermissionData, setBuyPermissionsData] = useState();
  const [sellPermissionData, setSellPermissionsData] = useState();
  const [convertPermissionData, setConvertPermissionsData] = useState();
  const [email, setEmail] = useState();
  const [loadings, setLoadings] = useState(false);

  const openNotificationWithIcon = (
    type,
    message
  ) => {
    const Icon =
      type === 'error' ? (
        <CloseCircleFilled />
      ) : (
        <CheckCircleFilled className="text_link" />
      );
    notification[type]({
      message: message,
      description: '',
      icon: Icon,
      style: {
        border: '1px solid #11be6a',
        boxShadow: 'none',
        borderRadius: 5,
        top: 100,
      },
    });
  };
  const savePermissions = async () => {
    try {
      setLoadings(true);
      const res = await updatePermissionsByHoneyBee(email, convertPermissionData, buyPermissionData, sellPermissionData);
      if (res.status === 200) {
        setLoadings(false);
        openNotificationWithIcon('success', "Permissions updated successfully");
      } else {
        setLoadings(false);
        openNotificationWithIcon('error', "Failed to update permissions");
      }
    } catch (err) {
      console.log(err);
    }
    //
  }

  useEffect(() => {
    const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
    const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;
    
    const email = localStorage.getItem("user") !== undefined ? String(localStorage.getItem("user")) : undefined;
    setEmail(email);
    
    getHoneyBeePermissions(email).then((data) => {
      
      
      setPermissionsData(data.data);
      setBuyPermissionsData(data.data.permissions.buy)
      setSellPermissionsData(data.data.permissions.sell)
      setConvertPermissionsData(data.data.permissions.convert)
    })

  }, []);

  return (
    <div>
      <div className='pt-2' style={{ background: "#FFB300" }}></div>
      <div className="px-5 pt-4 pb-5" style={{ background: "white" }}>
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
                  control={<IOSSwitch sx={{ m: 1 }} checked={buyPermissionData}  />}
                  value={buyPermissionData}
                  onChange={(e) => {
                    
                    if (!buyPermissionData && e.target.checked === true) {
                      setBuyPermissionsData(true)
                    } else {
                      setBuyPermissionsData(false)
                    }
                  }}
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
                  control={<IOSSwitch sx={{ m: 1 }} checked={sellPermissionData}  />}
                  onChange={(e) => {
                    
                    if (!sellPermissionData && e.target.checked === true) {
                      setSellPermissionsData(true)
                    } else {
                      setSellPermissionsData(false)
                    }
                  }}
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
                  control={<IOSSwitch sx={{ m: 1 }} checked={convertPermissionData}  />}
                  onChange={(e) => {
                    
                    if (!convertPermissionData && e.target.checked === true) {
                      setConvertPermissionsData(true)
                    } else {
                      setConvertPermissionsData(false)
                    }
                  }}
                // label="Buy"
                />
              </FormGroup>
            </div>
          </div>

          <div
            className="d-flex justify-content-center align-items-center "
            style={{ marginTop: '20px' }}
          >
            <Button
              loading={loadings}
              variant="contained"
              onClick={savePermissions}
              disableTouchRipple
              // disabled={!isChecked || !isChecked2 || !frontFile || !backFile || !photoIdFile} // Disable if frontFile is null
              sx={{
                backgroundColor: '#FFB300',
                borderRadius: '2px',
                color: '#282828',
                width: '49%',
                px: 10,
                py: 1,
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 500,
                boxShadow: 'none',
                //   mt:3,
                '&:hover': {
                  backgroundColor: '#FFB300',
                  boxShadow: 'none',
                },
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default GivePermissions;
