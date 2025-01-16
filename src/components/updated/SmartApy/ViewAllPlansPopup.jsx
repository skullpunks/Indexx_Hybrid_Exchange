// Updated ViewAllPlansPopup Component
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from '@mui/material';
import SmartApyWithdrawPopup from './SmartApyWithdrawPopup';

const useStyles = makeStyles((theme) => ({
  dataShow: {
    opacity: '1 !important',
    visibility: 'visible !important',
    '& .bnModalWrap': {
      transform: 'scale(1) !important',
    },
  },
  bidsFullModal: {},
  bnMask: {
    alignItems: 'center',
    backgroundColor: ' rgba(0, 0, 0, .5)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1200,
    width: '100%',
    height: '100vh',
  },
  bnTrans: {
    padding: '20px',
    opacity: 0,
    transitionDuration: '250ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in-out',
    visibility: 'hidden',
  },
  bnModal: {
    '& .bnModalWrap': {
      backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e2329',
      borderRadius: '16px',
      boxShadow: '0px 3px 6px rgba(0,0,0,.04)',
      maxWidth: '760px',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      width: '100%',
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    textAlign: 'center',
    color: `${theme.palette.text.primary} !important`,
    '& h3': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: '28px',
      marginTop: '10px',
      marginBottom: '40px',
    },
    '& h4': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
      margin: '10px 0px 15px 0px',
    },
    '& p': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
    },
  },
  table: {
    border: `1px solid ${theme.palette.divider}`,
    minWidth: '550px',

    padding: '10px',
    '& .MuiTableCell-root': {
      border: 'none',
      padding: '10px',
      fontSize: '14px', // Font size for table rows
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
      fontSize: '18px', // Font size for table header
      fontWeight: '500', // Optional: Make header bold
    },
  },
  tableHeadCell: {
    fontSize: '16px', // Increase the font size of the table heading
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    gap: '15px',
    marginTop: '25px',
  },
  cancelButton: {
    background:
      theme.palette.mode === 'light'
        ? '#EAECEF !important'
        : '#2B3139 !important',
    color: `${theme.palette.text.primary} !important`,
  },
  outlineBtn: {
    background: 'none !important',
    border: `1px solid ${theme.palette.primary.main} !important`,
    color: `${theme.palette.text.primary} !important`,
    '&:hover': {
      background: 'none !important',
      border: `1px solid ${theme.palette.primary.main} !important`,
      color: `${theme.palette.text.primary} !important`,
    },
  },
}));

const ViewAllPlansPopup = ({ onClose }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [withdrawPopup, setWithdrawPopup] = useState(false);

  return (
    <div
      className={`${classes.bnTrans} ${classes.dataShow} ${classes.bnMask} ${classes.bnModal}  ${classes.bidsFullModal}`}
    >
      <div className="bnModalWrap">
        <div className={classes.contentContainer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div></div>

            <div onClick={onClose} style={{ cursor: 'pointer' }}>
              <CloseIcon
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </div>
          </div>

          <h3 className={classes.heading}>Existing Smart APY Plans</h3>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ background: 'none' }}
          >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>Tier</TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Deposit Duration
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>APY</TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Amount
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    tier: 'Bronze',
                    depositDuration: '6 months',
                    apy: '20%',
                    amount: '$500',
                    action: 'Withdraw',
                  },
                  {
                    tier: 'Gold',
                    depositDuration: '12 months',
                    apy: '30%',
                    amount: '$51,000',
                    action: 'Withdraw',
                  },
                ].map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.tier}</TableCell>
                    <TableCell>{row.depositDuration}</TableCell>
                    <TableCell>{row.apy}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          textTransform: 'capitalize',
                          width: 'fit-content',
                          height: 'fit-content',
                          padding: '10px 25px',
                        }}
                        onClick={() => setWithdrawPopup(true)}
                      >
                        {row.action}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {withdrawPopup && (
        <SmartApyWithdrawPopup onClose={() => setWithdrawPopup(false)} />
      )}
    </div>
  );
};

export default ViewAllPlansPopup;
