import { makeStyles } from '@mui/styles';
import React from 'react';
import GenericButton from '../../components/updated/shared/Button';
import WithdrawLayout from '../../components/updated/Withdraw';
import successIcon from '../../assets/updated/withdraw/withdraw_success.svg';
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
const WithdrawSuccessPage = () => {
  const classes = useStyle();
  return (
    <div>
      <WithdrawLayout>
        <h3 className={classes.heading}>Your transaction has recorded </h3>
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
          <div style={{ margin: '10px' }}></div>
        </h4>
        <GenericButton text={'Continue'} />
      </WithdrawLayout>
    </div>
  );
};

export default WithdrawSuccessPage;
