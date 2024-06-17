import { makeStyles } from '@mui/styles';
import React from 'react';
import GenericButton from '../../components/updated/shared/Button';
import WithdrawLayout from '../../components/updated/Withdraw';
import successIcon from '../../assets/updated/withdraw/withdraw_success.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
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
}));

const DepositsuccessPage = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const location = useLocation();
  const { accountInfo, amount } = location.state || {};

  return (
    <DepositCryptoLayout>
      <h3 className={classes.heading}>Your transaction has been recorded</h3>
      <div style={{ margin: '25px' }}></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={successIcon} alt="success icon" />
      </div>
      <div style={{ margin: '25px' }}></div>
      <h4 className={classes.secondaryHeading}>
        NOTE: The arrival time of withdrawal depends on the region of your
        receiving bank. Usually it takes 2-4 business days.
      </h4>
      <GenericButton text={'Continue'} onClick={() => navigate('/')} />
    </DepositCryptoLayout>
  );
};

export default DepositsuccessPage;
