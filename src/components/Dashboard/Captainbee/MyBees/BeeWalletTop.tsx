import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import comingSoon from "../../../../assets/coming_soon.png";
import {
  decodeJWT,
  getUserWallets,
  getCoinPriceByName,
} from '../../../../services/api';
import GenericButton from '../../../updated/shared/Button';
import { makeStyles } from '@mui/styles';
// Define the makeStyles hook
const useStyles = makeStyles((theme: any) => ({
  container: {
    maxWidth: '1200px',
    padding: '24px',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    border: `1px solid ${theme?.palette?.divider}`,
    [theme?.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '15px',
      border: 'none !important',
    },
  },
  balanceSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    '& h6': {
      fontSize: '20px !important',
      color: `${theme.palette.text.primary} !important`,
      fontWeight: '600',
    },
  },
  hiddenBalance: {
    fontSize: '32px !important',
    marginTop: '8px',
    fontWeight: '600 !important',
  },
  pnlText: {
    fontSize: '14px !important',
    marginTop: '25px !important',
  },
  eyeIcon: {
    marginLeft: '8px',
    cursor: 'pointer',
  },
  redText: {
    color: 'red !important',
  },
  greenText: {
    color: `${theme.palette.primary.main} !important`,
  },
  buttonContainer: {
    flex: 3,
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      flex: 3,
      marginTop: '20px',
      flexDirection: 'column',
      width: '100%',
      gap: '50px',
    },
  },
  button: {
    flex: 1,
    fontSize: '13px !important',
    padding: '0px 12px !important',
    height: '28px !important',
    background:
      theme.palette.mode === 'dark'
        ? `rgb(73 81 91)!important`
        : `${theme.palette.divider} !important`,
    color: `${theme.palette.text.primary} !important`,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  balanceContainer: {
    margin: '30px auto',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: '100%',
      '&>div:first-child': {
        width: '100%',
      },
    },
  },
}));

const BeeWalletTop = ({ BeeEmail }: any) => {
  const navigate = useNavigate();
  const [totalBalanceInUSD, setTotalBalanceInUSD] = useState(0);
  let access_token = String(localStorage.getItem('access_token'));
  let decoded: any = decodeJWT(access_token);
  const classes = useStyles();

  useEffect(() => {
    getAllUserWallet();
    //     getUserWallets(decoded.email).then((userWallets) => {
    //     let usersWallet = userWallets.data;
    //     let totalBalInUSD = 0;
    //     for (let i = 0; i < usersWallet.length; i++) {
    //         if(usersWallet[i].coinType === "Crypto") {
    //           getCoinPriceByName(usersWallet[i]?.coinSymbol).then((res) => {
    //                 let coinPrice = res.data;
    //                 let totalCoinBalance = usersWallet[i].coinBalance * coinPrice;
    //                 totalBalInUSD += totalCoinBalance;
    //                 setTotalBalanceInUSD(totalBalInUSD);
    //            });
    //         } else {
    //             totalBalInUSD += Number(usersWallet[i]?.coinBalance);
    //         }
    //     }
    //     setTotalBalanceInUSD(totalBalInUSD)
    // });
  });

  const getAllUserWallet = async () => {
    try {
      const userWallets = await getUserWallets(decoded.email);
      const usersWallet = userWallets.data;
      let totalBalInUSD = 0;

      usersWallet.forEach((wallet: any) => {
        const balance = Number(wallet.coinBalance);
        if (wallet.coinType === 'Crypto' && wallet.coinPrice) {
          const price = Number(wallet.coinPrice);
          if (!isNaN(price)) {
            totalBalInUSD += balance * price;
          }
        } else {
          totalBalInUSD += balance;
        }
      });

      setTotalBalanceInUSD(totalBalInUSD);
    } catch (err) {
      console.error('Error in getAllUserWallet', err);
    }
  };

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className={classes.balanceContainer}>
        <div style={{ flex: 1 }}>
          <h2 className="font_15x">Estimated Balance</h2>
          <div className="d-flex flex-align-center color_general">
            <h2 className="margin-b-0 font_15x">$</h2>
            {isVisible ? (
              <h1 className="margin-b-0 font_15x">
                {Math.floor(totalBalanceInUSD * 100) / 100}&nbsp;&nbsp;&nbsp;
              </h1>
            ) : (
              <h1 className="margin-b-0 font_15x">
                {(Math.floor(totalBalanceInUSD * 100) / 100)
                  .toString()
                  .replace(/./g, '•')}
                &nbsp;&nbsp;&nbsp;
              </h1>
            )}
            <div onClick={toggleVisibility}>
              {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          {/* <Button type="primary" danger>Withdraw</Button> */}
          {/* <Button danger type="primary" shape="round" size="large" className="btn_xl buy_sell_button margin-l-3x" onClick={() => navigate("/indexx-exchange/buy-sell/")}>Buy Crypto</Button> */}
          <GenericButton
            text={'Buy Crypto'}
            onClick={() =>
              navigate(`/update/home?buyToken=INEX&user=${BeeEmail}`)
            }
            IconComponent={undefined}
            className={classes.button}
            styles={undefined}
            disabled={undefined}
            loading={undefined}
          />

          <GenericButton
            text={'Sell Crypto'}
            onClick={() =>
              navigate(`/update/home?buyToken=INEX&user=${BeeEmail}`)
            }
            IconComponent={undefined}
            className={classes.button}
            styles={undefined}
            disabled={undefined}
            loading={undefined}
          />

          <GenericButton
            text={'Convert Crypto'}
            onClick={() => navigate(`/convert?user=${BeeEmail}`)}
            IconComponent={undefined}
            className={classes.button}
            styles={undefined}
            disabled={undefined}
            loading={undefined}
          />

          {/* <Link to="/indexx-exchange/buy-sell/withdraw-crypto"></Link> */}
          <GenericButton
            text={'Deposit'}
            onClick={() =>
              navigate(`/deposit-crypto-select-coin?user=${BeeEmail}`)
            }
            IconComponent={undefined}
            className={classes.button}
            styles={undefined}
            disabled={undefined}
            loading={undefined}
          />

          <GenericButton
            text={'Withdraw'}
            onClick={() =>
              navigate(`/withdraw-crypto-select-coin?user=${BeeEmail}`)
            }
            IconComponent={undefined}
            className={classes.button}
            styles={undefined}
            disabled={undefined}
            loading={undefined}
          />
        </div>
      </div>
    </>
  );
};

export default BeeWalletTop;
