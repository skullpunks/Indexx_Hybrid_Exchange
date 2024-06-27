import { FormControl, FormControlLabel, Radio } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import GenericButton from '../../components/updated/shared/Button';
import DepositCryptoLayout from '../../components/updated/DepositCrypto';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  enterAmountRoot: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  },
  heading: {
    fontSize: '30px',
    fontWeight: '600',
    color: `${theme.palette.text.primary} !important`,
    textAlign: 'left',
    marginBottom: theme.spacing(4),
  },
  radioLabel: {
    fontSize: '40px', // Increase the size of the radio button text
    color: `${theme.palette.text.primary} !important`,
    '&.MuiFormControlLabel-label': {
      fontSize: '24px',
    },
  },
  comingSoonText: {
    fontSize: '20px', // Increase the size of the coming soon text
    color: `${theme.palette.text.secondary} !important`,
    marginTop: '16px', // Add some margin for spacing
    marginLeft: '28px',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: 'auto', // Adjust margin as needed
  },
}));

const DepositCryptoChange = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <DepositCryptoLayout>
      <div className={classes.enterAmountRoot}>
        <h3 className={classes.heading}>2. Change Deposit Wallet</h3>
        <FormControl>
          <FormControlLabel
            value="assetWallet"
            control={<Radio />}
            label="Asset Wallet"
            classes={{ label: classes.radioLabel }}
            checked
          />
          <div className={classes.comingSoonText}>
            Spot Wallet (coming soon)
          </div>
        </FormControl>

        <div style={{ margin: '40px' }}></div>
        <GenericButton text={'Confirm'} type="text" />
      </div>
    </DepositCryptoLayout>
  );
};

export default DepositCryptoChange;
