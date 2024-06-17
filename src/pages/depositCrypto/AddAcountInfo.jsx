import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { Button, Tooltip, Alert, IconButton } from '@mui/material';
import DepositLayout from '../../components/updated/Deposit';
import { CopyFilled, InfoCircleFilled } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import bsDollar from '../../assets/arts/usd icon 1.svg';
import InfoIcon from '@mui/icons-material/Info';
import { decodeJWT, getUserDetails } from '../../services/api';
const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '30px',
    fontWeight: '600',
    color: `${theme.palette.text.primary} !important`,
    textAlign: 'center',
  },
  secondaryHeading: {
    fontSize: '14px',
    color: `${theme.palette.text.secondary} !important`,
    textAlign: 'center',
    marginBottom: '30px',
  },
  container: {
    padding: '20px',
  },
  card: {
    padding: '20px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
    marginBottom: '20px',
  },
  field: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    display: 'flex',
    alignItems: 'center',
  },
}));
const DepositAddAccountInfo = () => {
  const classes = useStyles();
  const location = useLocation();
  const { currency, amount } = location.state || {};
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [userData, setUserData] = useState(null);
  const [copiedField, setCopiedField] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    let emailFromToken = '';

    if (accessToken) {
      const decoded = decodeJWT(String(accessToken));
      emailFromToken = decoded.email;
      setEmail(emailFromToken);
    }

    const emailToUse = emailFromToken || email;

    if (emailToUse) {
      getUserDetails(emailToUse).then((res) => {
        if (res.status === 200) {
          setUserData(res.data);
        }
      });
    }
  }, [email]);


  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000); // Reset copiedField after 2 seconds
  };


  const message = `Please include your reference code in the comments. Transfers with missing/incorrect code will be rejected`;

  return (
    <DepositLayout>
      <div className={classes.container}>
        <h3 className={classes.heading}>
          Transfer money to process with order
        </h3>
        <h4 className={classes.secondaryHeading}>
          {' '}
          Please transfer your funds to the account below
        </h4>
        <Alert
          icon={<InfoIcon fontSize="large" />}
          severity="info"
          style={{
            marginTop: '20px',
            backgroundColor: 'rgba(95, 95, 95, 0.1)',
            borderColor: 'rgba(95, 95, 95, 0.1)',
          }}
        >
          {message}
        </Alert>
        <div className={classes.card}>
          <div className={classes.field}>
            <span className={classes.label}>Currency:</span>
            <div className={classes.value}>
              <img src={bsDollar} alt="currency" width="25" />
              <span>{currency}</span>
            </div>
          </div>
          <div className={classes.field}>
            <span className={classes.label}>Amount:</span>
            <span>{amount}</span>
          </div>
          <div className={classes.field}>
            <span className={classes.label}>Reference Code:</span>
            <div className={classes.value}>
              <span>{userData?._id}</span>
              <Tooltip title={copiedField === 'reference' ? 'Copied' : 'Click To Copy'}>
                <CopyFilled
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleCopy(userData?._id, 'reference')}
                />
              </Tooltip>
            </div>
          </div>
          <div className={classes.field}>
            <span className={classes.label}>Beneficiary Account Name:</span>
            <div className={classes.value}>
              <span>Indexx</span>
              <Tooltip title={copiedField === 'accountName' ? 'Copied' : 'Click To Copy'}>
                <CopyFilled
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleCopy('Indexx', 'accountName')}
                />
              </Tooltip>
            </div>
          </div>
          <div className={classes.field}>
            <span className={classes.label}>Beneficiary Account Number/IBAN:</span>
            <div className={classes.value}>
              <span>1793811546</span>
              <Tooltip title={copiedField === 'accountNumber' ? 'Copied' : 'Click To Copy'}>
                <CopyFilled
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleCopy('1793811546', 'accountNumber')}
                />
              </Tooltip>
            </div>
          </div>
          <div className={classes.field}>
            <span className={classes.label}>Beneficiary Address:</span>
            <div className={classes.value}>
              <span>Office 22 Alpha, Los Angeles, California</span>
              <Tooltip title={copiedField === 'address' ? 'Copied' : 'Click To Copy'}>
                <CopyFilled
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleCopy('Office 22 Alpha, Los Angeles, California', 'address')}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </DepositLayout>
  );
};

export default DepositAddAccountInfo;
