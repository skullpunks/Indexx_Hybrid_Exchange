import { Button } from 'antd';
import React from 'react';
import smsAuthenticator from '../../assets/arts/smsAuthenticator.svg';
import { Link, useNavigate } from 'react-router-dom';
import GenericButton from '../updated/shared/Button';
import { useTheme } from '@mui/material';

const Security = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <div
      className="container security_container margin-t-3x margin-b-2x "
      style={{ padding: '20px' }}
    >
      <h1 className="font_25x padding-tb-1x border-b-1x">Security</h1>
      <div className="padding-tb-2x border-b-1x">
        <h4>Login Password</h4>
        <h6 className="font_17x">
          To keep your account secure, withdrawls are not permitted for 24 hours
          after changing your password.
        </h6>
        <GenericButton
          className=""
          text={'Change Password'}
          onClick={() => navigate('/indexx-exchange/change-password')}
          IconComponent={undefined}
          styles={{ marginTop: '20px', width: 'fit-content' }}
          disabled={undefined}
          loading={undefined}
        />
        {/* <Link to="/indexx-exchange/change-password"></Link>
        </Button> */}
      </div>

      {/* <div className="row d-flex padding-tb-2x mt-5">
        <div className="col-lg-8">
          <h4>2-Factor Authentication (2FA)</h4>
          <p className="font_17x">
            Increase your account security with 2-Factor Authentication (2FA).
            We support authenticator apps like the Google Authenticator and SMS
            authentication
          </p>

          <div
            className="padding-2x d-flex margin-t-3x authenticator_container"
            style={{
              border: `1px solid ${theme.palette.divider}`,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h6 className="font_18x">Google Athenticator</h6>

            <div
              className="d-flex"
              style={{ justifyContent: 'flex-end', gap: '10px' }}
            >
              <GenericButton
                className="w-auto"
                text={'disabled'}
                IconComponent={undefined}
                onClick={undefined}
                styles={{
                  backgroundColor: `grey !important`,
                  background: `grey !important`,
                  height: '40px',
                }}
                disabled={undefined}
                loading={undefined}
              />

              <GenericButton
                type="primary"
                className="w-auto"
                text={'enabled'}
                IconComponent={undefined}
                onClick={undefined}
                styles={{
                  height: '40px',
                }}
                disabled={undefined}
                loading={undefined}
              />
            </div>
          </div>
          <div
            className="padding-2x d-flex margin-t-3x flex-align-center authenticator_container"
            style={{
              border: `1px solid ${theme.palette.divider}`,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <h6 className="font_18x">
              <img
                src={smsAuthenticator}
                alt="smsAuthenticator"
                className="margin-r-1x"
                style={{ height: '50px' }}
              />
              SMS Athenticator
            </h6>

            <div
              className=" d-flex"
              style={{ justifyContent: 'flex-end', gap: '10px' }}
            >
              <GenericButton
                className="w-auto"
                text={'enabled'}
                IconComponent={undefined}
                onClick={undefined}
                s
                styles={{
                  height: '40px',
                }}
                disabled={undefined}
                loading={undefined}
              />
              <GenericButton
                className="w-auto"
                text={'disabled'}
                IconComponent={undefined}
                onClick={undefined}
                styles={{
                  backgroundColor: `grey !important`,
                  background: `grey !important`,
                  height: '40px',
                }}
                disabled={undefined}
                loading={undefined}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Security;
