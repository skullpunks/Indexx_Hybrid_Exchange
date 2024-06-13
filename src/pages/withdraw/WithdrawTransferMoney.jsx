import React from 'react';
import { Button, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ContentCopy } from '@mui/icons-material';
import iusd from '../../assets/updated/buySell/usd.svg';
import WithdrawLayout from '../../components/updated/Withdraw';
import redInfo from '../../assets/updated/redInfo.svg';
const useStyle = makeStyles((theme) => ({
  heading: {
    fontSize: '30px',
    fontWeight: '600',
    color: `${theme.palette.text.primary} !important`,
    textAlign: 'left',
  },
  secondaryHeading: {
    fontSize: '14px',
    color: `${theme.palette.text.secondary} !important`,
    textAlign: 'left',
    marginBottom: '30px',
  },
  usDollar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: '30px',
    '& div': {
      display: 'flex',
      alignItems: 'center',
      '& img': {
        marginRight: '10px',
      },
    },
  },
  bankAmountDetail: {
    '& h5': {
      fontSize: '18px',
      fontWeight: '300', // Light
      marginBottom: '20px',
      border: 'none',
      background: 'none',
      textAlign: 'left',
      color: `${theme.palette.text.primary} !important`,
    },
    '& > div': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
    },
    '& *': {
      fontSize: '13px',
    },
  },
  copyButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const WithdrawTransferMoney = () => {
  const classes = useStyle();
  const theme = useTheme();
  return (
    <div>
      <WithdrawLayout>
        <h3 className={classes.heading}>
          3. Transfer money to process with order
        </h3>
        <h4 className={classes.secondaryHeading}>
          Please transfer your funds (USD) to the account below with the bank
          account you provided: 1***6{' '}
          <Button
            sx={{
              color: (theme) => theme.palette.primary.main,
              backgroundColor: 'transparent',
              border: 'none',
              padding: 0,
              width: 'fit-content',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            Change Bank Account
          </Button>
        </h4>

        <div className={classes.usDollar}>
          <div>
            <img src={iusd} alt="iusd+" />
            <p>USD US Dollar</p>
          </div>
          <div>$100.00</div>
        </div>
        <div className={classes.bankAmountDetail}>
          <h5>Binance Bank Account Details</h5>

          <div>
            <div>Reference Code</div>

            <div style={{ display: 'flex', gap: '4px' }}>
              <span
                style={{ color: theme.palette.text.primary, fontWeight: '500' }}
              >
                VBJQP4DB{' '}
              </span>
              <div
                className={classes.copyButton}
                onClick={() => copyToClipboard('VBJQP4DB')}
              >
                <ContentCopy
                  sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                  fontSize="small"
                />
              </div>
            </div>
          </div>

          <div
            style={{
              background: theme.palette.divider,
              padding: '10px',
              display: 'flex',
              gap: '10px',
              fontSize: '14px',
              color: theme.palette.text.secondary,
              borderRadius: '5px',
            }}
          >
            <img src={redInfo} alt={'redInfo'} />
            <p>
              Please include your reference code in the comments. Transfers with
              missing/incorrect code will be rejected
            </p>
          </div>
          <div>
            <div>Benificiary Account Name</div>

            <div style={{ display: 'flex', gap: '4px' }}>
              <span
                style={{ color: theme.palette.text.primary, fontWeight: '500' }}
              >
                Key Vision Development Limited{' '}
              </span>
              <div
                className={classes.copyButton}
                onClick={() =>
                  copyToClipboard('Key Vision Development Limited')
                }
              >
                <ContentCopy
                  sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                  fontSize="small"
                />
              </div>
            </div>
          </div>
          <div>
            <div>Benificiary Account Number/IBAN</div>

            <div style={{ display: 'flex', gap: '4px' }}>
              <span
                style={{ color: theme.palette.text.primary, fontWeight: '500' }}
              >
                1504546221{' '}
              </span>
              <div
                className={classes.copyButton}
                onClick={() => copyToClipboard('1504546221')}
              >
                <ContentCopy
                  sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                  fontSize="small"
                />
              </div>
            </div>
          </div>
          <div>
            <div>Benificiary Address</div>

            <div style={{ display: 'flex', gap: '4px' }}>
              <span
                style={{ color: theme.palette.text.primary, fontWeight: '500' }}
              >
                Office N 22 Alpha Seychelles{' '}
              </span>
              <div
                className={classes.copyButton}
                onClick={() => copyToClipboard('Office N 22 Alpha Seychelles')}
              >
                <ContentCopy
                  sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                  fontSize="small"
                />
              </div>
            </div>
          </div>
        </div>
      </WithdrawLayout>
    </div>
  );
};

export default WithdrawTransferMoney;
