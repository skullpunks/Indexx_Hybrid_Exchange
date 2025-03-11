import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import smartApyImage from '../../../assets/updated/SmartApy/smart-apy-image.png';
import iusdLogo from '../../../assets/updated/SmartApy/iusdLogo.svg';
import IconicHeader from '../shared/IconicHeader';
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
import DepositPopup from './DepositPopup';
import RenewPopup from './RenewPopup';
import SuccessfullDepositPopup from './SuccessfulDeposit';
import SuccessfullRenewPopup from './SuccessfullRenewPopup';

import disclaimerImage from '../../../assets/updated/SmartApy/disclaimerImage.svg';
import WhySmartApy from './WhySmartApy';
import smartAPYLogo from '../../../assets/updated/SmartApy/smartApyLogo.svg';
import HowItWorks from './HowItWorks';
import { useNavigate } from 'react-router-dom';
import SmartApyCal from './SmartApyCal';
import SmartApyWithdrawPopup from './SmartApyWithdrawPopup';
import SuccessfullWithdrawPopup from './SuccessfullWithdrawPopup';

import SmartApyImage from '../../../assets/updated/SmartApy/whySmartApyImage.png';
import ConfirmInvestmentPopup from './ConfirmInvestmentPopup';
import SuccessfulStakePopup from './SuccessfulStakePopup';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '100px auto',
  },
  container: {
    display: 'flex',
    maxWidth: '1380px',
    padding: '20px',
    width: '100%',
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    '&>div': {
      flex: 1,
    },
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  iusdcontainer: {
    background: theme.palette.divider,
    paddingBottom: '50px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: '1380px',
    width: '100%',
    margin: '50px auto 0 auto',
    padding: '80px 20px',
    gap: '50px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    '& h2': {
      fontSize: '62px',
      fontWeight: 'bold',
    },
    '& .hoverText': {
      cursor: 'pointer',
      '&:hover': {
        opacity: '.7',
      },
    },
    '&>p': {
      fontSize: '18px',
      marginBottom: '30px',
    },
    '& >.flexContainer': {
      cursor: 'pointer',
      '&:hover': {
        opacity: '.8',
      },
    },
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-start',
  },
  image: {
    maxWidth: '90%',
    height: 'auto',
  },
  imageOne: {
    maxWidth: '100%',
    height: 'auto',
    transition: 'all .2s linear',
    '&:hover': {
      transform: 'scale(1.05)',
      cursor: 'pointer',
      transition: 'all .2s linear',
    },
  },
  outlineBtn: {
    background: 'none !important',
    border: `1px solid ${theme.palette.primary.main} !important`,
    color: `${theme.palette.primary.main} !important`,
    '&:hover': {
      background: 'none !important',
      border: `1px solid ${theme.palette.primary.main} !important`,
      color: `${theme.palette.primary.main} !important`,
      opacity: '.7',
    },
  },
  withoutBg: {
    background: 'none !important',
    color: `${theme.palette.text.primary} !important`,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    gap: '10px',
    '& img': {
      height: '40px',
      transition: 'all .2s linear',
    },
    '&:hover': {
      opacity: '.8',
      '& img': {
        transform: 'scale(1.1)',
      },
    },
  },
  investPlanContainer: {
    padding: '50px 20px',
    maxWidth: '1380px',
    width: '100%',
    margin: 'auto',
    '& h2': {
      fontSize: '52px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    '& p': {
      marginBottom: '40px',
    },
  },
  table: {
    '& .MuiTableCell-root': {
      border: 'none',
      padding: '10px',
      fontSize: '18px', // Font size for table rows
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
      fontSize: '20px', // Font size for table header
      fontWeight: 'bold', // Optional: Make header bold
    },
  },
  disclaimerRoot: {
    maxWidth: '1380px',
    width: '100%',
    margin: '50px auto',
    padding: '20px',
    '& p': {
      fontSize: '12px',
      opacity: '.9',
    },
  },
  flexContainerRoot: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    '& h2': {
      margin: 0,
      fontSize: '48px',
      fontWeight: '500',
      fontStyle: 'italic',
    },
  },
  disclaimerContainer: {
    maxWidth: '1500px',
    margin: 'auto',
    padding: '20px',
    marginTop: '100px',
  },
  heading: {
    fontSize: '12px',
    marginBottom: '10px',
    maxWidth: '1200px',
    color: theme.palette.text.secondary,
  },
  subheading: {
    fontSize: '11px',
    marginBottom: '12px',
    maxWidth: '1200px',
    color: theme.palette.text.secondary,
  },
  text: {
    fontSize: '10px',
    lineHeight: '1.5',
    marginBottom: '16px',
    maxWidth: '1200px',
    color: theme.palette.text.secondary,
  },
  list: {
    paddingLeft: '20px',
    marginBottom: '10px',
    maxWidth: '1200px',
    color: theme.palette.text.secondary,
  },
  listItem: {
    fontSize: '10px',
    lineHeight: '1.5',
    marginBottom: '6px',
    maxWidth: '1200px',
    color: theme.palette.text.secondary,
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
  },
}));

const SmartAPY = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('Smart APY');
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const rows = [
    { duration: '6 months', growth: '20%', action: 'Invest' },
    { duration: '12 months', growth: '30%', action: 'Invest' },
    { duration: '18 months', growth: '40%', action: 'Invest' },
  ];

  return (
    <div className={classes.root}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />

      <div className={classes.container}>
        {/* First child */}
        <div className={classes.textSection}>
          <div className={classes.flexContainerRoot}>
            <img src={smartAPYLogo} alt="" />
            <h2>Smart APY</h2>
          </div>
          <h2>Make your money, Make money.</h2>
          <p>
            Discover modern financial solutions with Smart APY—secure,
            innovative, and growth-focused. Experience smarter investment today.
          </p>
          <div className={classes.buttonGroup}>
            <GenericButton
              text={'Start Invest'}
              styles={{ maxWidth: '250px', width: '100%' }}
              onClick={() => navigate('/smart-apy-calculator')}
            />
            <GenericButton
              text={'How it works >'}
              className={classes.withoutBg}
              onClick={() => navigate('/smart-apy-how-it-works')}
              styles={{ maxWidth: '200px', width: '100%' }}
            />
          </div>
        </div>

        {/* Second child */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <img
            src={smartApyImage}
            alt="Smart APY Visual"
            className={classes.image}
          />
        </div>
      </div>

      <div className={classes.iusdcontainer}>
        <div className={classes.contentContainer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flex: '40%',
            }}
          >
            <img
              src={iusdLogo}
              alt="Smart APY Visual"
              className={classes.imageOne}
              onClick={() =>
                window.open(
                  'https://indexx.ai/indexx-exchange/token-details/usd',
                  '_blank'
                )
              }
            />
          </div>

          <div className={classes.textSection} style={{ flex: '60%' }}>
            <h2
              className="hoverText"
              onClick={() =>
                window.open(
                  'https://indexx.ai/indexx-exchange/token-details/usd',
                  '_blank'
                )
              }
            >
              indexx IUSD+
            </h2>
            <p>
              indexx USD+ stablecoin can be instantly minted and redeemed to
              USDT 1:1. Simply replace USDT with USD+ stablecoin and start
              getting passive yield where it didn’t exist before.
            </p>
            <div
              className={classes.flexContainer}
              onClick={() =>
                window.open(
                  'https://indexx.ai/indexx-exchange/token-details/usd',
                  '_blank'
                )
              }
            >
              <img src={iusdLogo} alt="IUSD Logo" />
              <p>1 IUSD+ ≈ 1 USD</p>
            </div>
          </div>
        </div>
        <WhySmartApy />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '50px auto',
        }}
      >
        <img
          src={SmartApyImage}
          alt="IndeXX Mascot"
          className={classes.image}
        />
      </div>

      <div className={classes.investPlanContainer}>
        <h2>Smart APY Investment Plans</h2>
        <p>
          Maximize your returns with flexible investment options tailored to
          your goals.
        </p>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ background: 'none' }}
        >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Deposit Duration</TableCell>
                <TableCell>APY</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.duration}</TableCell>
                  <TableCell>{row.growth}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate('/smart-apy-calculator')}
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

      {/* <div className={classes.investPlanContainer}>
        <h2>Investment Tiers</h2>
        <p style={{ maxWidth: '700px', width: '100%' }}>
          Boost your returns with flexible investment options crafted to align
          with your goals. Our plan tiers provide outstanding returns.
        </p>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ background: 'none' }}
        >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Tier</TableCell>
                <TableCell>Investment Range</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {investmentTiersRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.tier}</TableCell>
                  <TableCell>{row.investmentRange}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate('/smart-apy-calculator')}
                    >
                      {row.action}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div> */}

      <div className={classes.disclaimerRoot}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '50px 0px',
          }}
        >
          <img src={disclaimerImage} alt="" />
        </div>
        {/* <p>
          Disclaimer
          <br />
          <br />
          No Investment Advice
          <br />
          The information provided regarding Indexx Smart APY investment does
          not constitute investment advice, financial advice, trading advice, or
          any other sort of advice. You should not treat any of the content as
          such. Indexx Smart does not recommend that any particular investment
          strategy, including APY investment, should be bought, sold, or held by
          you. We strongly encourage conducting your own due diligence and
          consulting your financial advisor before making any investment
          decisions.
          <br />
          <br />
          Accuracy of Information
          <br />
          While Indexx Smart strives to ensure the accuracy of the information
          presented on its platform, it will not be held responsible for any
          missing, incorrect, or outdated information. All content is provided
          "as is." You understand that you are using any and all information
          available at your own risk.
          <br />
          <br />
          Non-Endorsement
          <br />
          The presence of third-party advertisements, links, or services on
          Indexx Smart does not imply an endorsement, guarantee, or
          recommendation by Indexx Smart. We encourage you to conduct your own
          research and due diligence before using any third-party services or
          products.
          <br />
          <br />
          Early Withdrawal Penalty
          <br />
          <ul>
            <li>Withdrawals before 6 months: 10% penalty.</li>
            <li>Withdrawals before 12 months: 5% penalty.</li>
          </ul>
        </p> */}

        <div className={classes.disclaimerContainer}>
          <h1 className={classes.heading}>DISCLAIMER</h1>
          <p className={classes.text}>
            Smart APY is a financial product offered by Indexx.ai, designed to
            provide high-yield returns on your investment through the staking of
            IUSD+, a stablecoin pegged to the US Dollar. While the yields
            offered are fixed and guaranteed for the duration of the lock-in
            period, all participants must understand the following:
          </p>

          <h2 className={classes.subheading}>
            No Guarantee of Fiat Value Stability
          </h2>

          <p className={classes.text}>
            While IUSD+ is a stablecoin designed to maintain a 1:1 value with
            the US Dollar, market conditions and external factors could affect
            its value.
          </p>

          <h3 className={classes.subheading}>Regulatory Risk:</h3>
          <p className={classes.text}>
            Cryptocurrency and digital assets are subject to evolving regulatory
            environments, which may impact the availability, security, or
            performance of Smart APY. Platform Risk: Indexx.ai ensures best
            practices in security and management; however, technical issues,
            maintenance, and external attacks may temporarily impact access to
            funds.
          </p>

          <h3 className={classes.subheading}>Non-Reversible Transactions</h3>
          <p className={classes.text}>
            Once funds are converted to IUSD+ and staked through Smart APY, they
            are locked for the chosen period (6, 12, or 18 months) and cannot be
            withdrawn early.
          </p>

          <h3 className={classes.subheading}>Yield Payment:</h3>
          <p className={classes.text}>
            Yield is paid in IUSD+ and credited to your Indexx.ai wallet. At the
            end of the lock-in period, users may choose to convert their IUSD+
            back to USD or use it for further investments.
          </p>

          <h2 className={classes.subheading}>Terms & Conditions:</h2>
          <p>
            By participating in the Smart APY program, you agree to the
            following:
          </p>
          <h3 className={classes.subheading}>Eligibility</h3>
          <p className={classes.text}>
            Participants must be 18 years or older and comply with their local
            laws regarding digital asset investments.
          </p>
          <h3 className={classes.subheading}>Account Verification:</h3>
          <p className={classes.text}>
            Users must complete necessary KYC (Know Your Customer) and AML
            (Anti-Money Laundering) processes before participating.
          </p>
          <h3 className={classes.subheading}>Investment and Lock-in Period:</h3>

          <p className={classes.text}>
            By choosing a lock-in period of 6, 12, or 18 months, you agree to
            keep your funds staked for the duration without early withdrawal.
          </p>

          <h3 className={classes.subheading}>Yield Rates:</h3>

          <p className={classes.text}>
            Yield rates are fixed at: <br />
            6 months: 20% APY <br />
            12 months: 30% APY <br />
            18 months: 40% APY <br />
            <br />{' '}
          </p>
          <h3 className={classes.subheading}>Yield Distribution:</h3>
          <p className={classes.text}>
            Yields are calculated on the staked amount and paid in IUSD+ at the
            end of the lock-in period.
          </p>

          <h3 className={classes.subheading}>No Financial Advice</h3>
          <p className={classes.text}>
            Smart APY is not financial or investment advice. Please consult a
            financial advisor before investing.
          </p>

          <h3 className={classes.subheading}>Tax Responsibility:</h3>
          <p className={classes.text}>
            Users are responsible for reporting and paying any taxes associated
            with their earnings from Smart APY.
          </p>

          <h3 className={classes.subheading}>Termination or Modification:</h3>
          <p className={classes.text}>
            Indexx.ai reserves the right to modify or terminate the Smart APY
            program with prior notice.
          </p>

          <p className={classes.text}>
            By proceeding with Smart APY, you acknowledge and agree to these
            terms and conditions.
          </p>
        </div>
      </div>
      {/* <SmartApyWithdrawPopup /> */}
      {/* <SuccessfullWithdrawPopup /> */}
      {/* <SuccessfullRenewPopup /> */}
      {/* <SuccessfullDepositPopup /> */}
      {/* <RenewPopup /> */}
      {/* <DepositPopup /> */}
      {/* <ConfirmInvestmentPopup /> */}
      {/* <SuccessfulStakePopup /> */}
    </div>
  );
};

export default SmartAPY;
