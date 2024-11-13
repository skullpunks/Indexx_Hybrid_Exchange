import { Button, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

import { useEffect, useState } from 'react';
import {
  getHoneyBeePermissions,
  updatePermissionsByHoneyBee,
} from '../../../../services/api';
import { IOSSwitch } from '../../../IOSSwitch/IOSSwitch';
import OpenNotification from '../../../OpenNotification/OpenNotification';

const GivePermissions = () => {
  const [, setPermissionsData] = useState();
  const [buyPermissionData, setBuyPermissionsData] = useState();
  const [sellPermissionData, setSellPermissionsData] = useState();
  const [convertPermissionData, setConvertPermissionsData] = useState();
  const [email, setEmail] = useState();
  const [loadings, setLoadings] = useState(false);

  const savePermissions = async () => {
    try {
      setLoadings(true);
      const res = await updatePermissionsByHoneyBee(
        email,
        convertPermissionData,
        buyPermissionData,
        sellPermissionData
      );
      if (res.status === 200) {
        setLoadings(false);
        OpenNotification('success', 'Permissions updated successfully');
      } else {
        setLoadings(false);
        OpenNotification('error', 'Failed to update permissions');
      }
    } catch (err) {
      console.log(err);
    }
    //
  };

  useEffect(() => {
    const userType =
      localStorage.getItem('userType') !== undefined
        ? String(localStorage.getItem('userType'))
        : undefined;
    const username =
      localStorage.getItem('username') !== undefined
        ? String(localStorage.getItem('username'))
        : undefined;

    const email =
      localStorage.getItem('user') !== undefined
        ? String(localStorage.getItem('user'))
        : undefined;
    setEmail(email);

    getHoneyBeePermissions(email).then((data) => {
      setPermissionsData(data.data);
      setBuyPermissionsData(data.data.permissions.buy);
      setSellPermissionsData(data.data.permissions.sell);
      setConvertPermissionsData(data.data.permissions.convert);
    });
  }, []);

  return (
    <div>
      <div className="pt-2" style={{ background: '#FFB300' }}></div>
      <div className="px-5 pt-4 pb-5" style={{ background: 'white' }}>
        <div className="font_15x fw-bold">
          You can give permissions to Buy/Sell/Convert to your CaptainBee Willie
          here.
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
                Enable Hive Captain to Buy
              </Typography>
            </div>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch sx={{ m: 1 }} checked={buyPermissionData} />
                  }
                  value={buyPermissionData}
                  onChange={(e) => {
                    if (!buyPermissionData && e.target.checked === true) {
                      setBuyPermissionsData(true);
                    } else {
                      setBuyPermissionsData(false);
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
                Enable Hive Captain to Sell
              </Typography>
            </div>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch sx={{ m: 1 }} checked={sellPermissionData} />
                  }
                  onChange={(e) => {
                    if (!sellPermissionData && e.target.checked === true) {
                      setSellPermissionsData(true);
                    } else {
                      setSellPermissionsData(false);
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
                Enable Hive Captain to Convert
              </Typography>
            </div>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch sx={{ m: 1 }} checked={convertPermissionData} />
                  }
                  onChange={(e) => {
                    if (!convertPermissionData && e.target.checked === true) {
                      setConvertPermissionsData(true);
                    } else {
                      setConvertPermissionsData(false);
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
                  backgroundColor: '#FFD000',
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
