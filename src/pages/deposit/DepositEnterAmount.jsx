import { Button, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import DepositLayout from '../../components/updated/Deposit';
import GenericButton from '../../components/updated/shared/Button';
import InputField from '../../components/updated/shared/TextField';
import iusd from '../../assets/updated/buySell/usd.svg';

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
  },
  endAdornmentContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '10px',
    borderLeft: `1px solid ${theme.palette.divider}`,
    '& img': {
      width: '25px',
      height: '25px',
    },
  },
  questionText: {
    fontSize: '18px',
    color: `${theme.palette.text.secondary} !important`,
    textAlign: 'left',
  },
  answerText: {
    fontSize: '18px',
    color: `${theme.palette.text.primary} !important`,
    textAlign: 'right',
  },
  isAnswerBoldText: {
    fontSize: '20px',
    fontWeight: '600',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: 'auto', // Adjust margin as needed
  },
}));

const TransactionDetails = ({ question, answer, isAnswerBold }) => {
  const classes = useStyle();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div className={classes.questionText}>{question}</div>
      <div
        className={`${classes.answerText} ${
          isAnswerBold && classes.isAnswerBoldText
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

const DepositEnterAmount = () => {
  const classes = useStyle();
  return (
    <DepositLayout>
      <div className={classes.enterAmountRoot}>
        <h3 className={classes.heading}>2. Enter Amount</h3>
        <InputField
          label={'Currency'}
          placeholder="Enter 20-50000"
          type={'number'}
          secondaryLabel={'Transaction Requirements'}
          endAdornment={
            <InputAdornment position="end">
              <span className={classes.endAdornmentContainer}>
                <img src={iusd} alt={'IUSD'} />
                <p>IUSD+</p>
              </span>
            </InputAdornment>
          }
        />

        <div style={{ margin: '30px' }}></div>
        <TransactionDetails
          question={'Transaction method:'}
          answer="Bank Transfer(SWIFT)"
        />
        <div style={{ margin: '10px' }}></div>

        <TransactionDetails question={'Transaction Fee:'} answer="0.00 IUSD+" />
        <div style={{ margin: '10px' }}></div>

        <TransactionDetails
          question={'You receive:'}
          answer="20.00 IUSD+"
          isAnswerBold
        />
        <div className={classes.buttonWrapper}>
          <Button
            variant="outlined"
            sx={{ textTransform: 'capitalize', fontFamily: 'poppins' }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: 'capitalize', fontFamily: 'poppins' }}
          >
            Continue
          </Button>
        </div>
      </div>
    </DepositLayout>
  );
};

export default DepositEnterAmount;