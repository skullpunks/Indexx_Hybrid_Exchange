import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../shared/TextField';
import { useTheme } from '@mui/material';
import CustomSelectBox from './CustomSelect';
import GenericButton from '../shared/Button';
import IconicHeader from '../shared/RedeemIconicHeader';
import {
  decodeJWT,
  getAllGiftCards,
  getCoinPriceByName,
  sendGiftcard,
} from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    maxWidth: '1280px',
    margin: 'auto',
  },
  sendCryptoRoot: {
    maxWidth: '700px',
    width: '100%',

    '& h3': {
      color: theme.palette.text.primary,
      fontSize: '40px',
      fontWeight: '500',
    },
    '& p': {
      color: theme.palette.text.secondary,
      fontSize: '15px',
      marginBottom: '20px',
    },
    '& button': {
      background: theme.palette.divider,
      width: 'fit-content',
      color: theme.palette.text.secondary,
      fontSize: '13px',
      height: '40px',
      padding: '16px',
      textTransform: 'capitalize !important',
    },
  },
  redeemRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '80px',
    marginTop: '50px',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  redeemLeft: {
    borderRadius: '4px',
    flex: '40%',
  },
  redeemBtnContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-start',
    marginBottom: '20px',
  },
  greenBtn: {
    background: `${theme.palette.primary.main} !important`,
    color: '#000 !important',
    width: 'fit-content',
    padding: '32px',
    height: '34px',
    textTransform: 'capitalize !important',
  },
  transparentBtn: {
    background: `${theme.palette.divider} !important`,
    color: `${theme.palette.text.primary} !important`,
    width: 'fit-content',
    padding: '16px',
    height: '34px',
    textTransform: 'capitalize !important',
  },
  inputFieldRoot: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '20px',
    gap: '20px',
    '& .textfieldInner': {
      flex: 1,
    },
  },
  greyButton: {
    width: 'fit-content',
    background: '#EAECEF !important',
    color: '#000 !important',
    height: '44px',
    textTransform: 'capitalize !important',
    padding: '16px !important',
  },
  paragraph: {
    color: theme.palette.text.secondary,
    fontSize: '12px',
  },
  cardListHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '50px auto',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '20px',
    },
  },
  cardHeaderLeft: {
    '& h3': {
      color: theme.palette.text.primary,
      fontSize: '44px',
      fontWeight: '500',
    },
    '& p': {
      color: theme.palette.text.secondary,
      fontSize: '15px',
    },
  },
  cardHeaderRight: {
    color: theme.palette.text.secondary,
    fontSize: '13px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)',
    gap: '10px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2,1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1,1fr)',
    },
  },
  button: {
    width: 'fit-content',
    display: 'flex',
    gap: '5px',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  enterAmountContainer: {
    marginBottom: '20px',
  },
  quantityContainer: {
    marginBottom: '20px',
  },
  selectTypeContainer: {
    marginBottom: '20px',
    '& label': {
      fontSize: '11px',
      marginBottom: '10px',
    },
  },
  giftCardDetails: {
    margin: '20px 0px',
    '& p': {
      fontSize: '14px',
      color: theme.palette.text.primary,
      margin: '10px 0px',
    },
  },
}));

const SendCard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { giftCardData, selectedImg, selectedImgUrl, email, amountInUsd } =
    location.state || {}; // Extracting giftCardData from location state
  console.log(location.state);
  const [recipientEmail, setRecipientEmail] = useState(email);
  const [senderName, setSenderName] = useState('');
  const [amountInUsdValue, setAmountInUsd] = useState(0);

  const [message, setMessage] = useState(`Hey [Receiver's Name],

This is [Your Name], and I'm excited to gift you something truly special - a Crypto Gift Card!

Consider it the gift of the future and an investment in what's to come. Redeem it now to kickstart your crypto journey.

Enjoy and happy investing!`);
  const [loading, setLoading] = useState(false);
  const [giftCards, setGiftCards] = useState([]);
  const [selectedGiftCard, setSelectedGiftCard] = useState(
    giftCardData?.voucher
  );

  useEffect(() => {
    async function fetchGiftCard() {
      const token = localStorage.getItem('access_token');
      const decodedToken = decodeJWT(String(token));
      let res = await getAllGiftCards(decodedToken?.email);
      setGiftCards(res.data);
      console.log(res);
    }
    fetchGiftCard();
  }, []);

  const handleSendGiftcard = async () => {
    setLoading(true);
    if (!recipientEmail || !senderName) {
      alert('Recipient email and sender name are required.');
      setLoading(false);
      return;
    }

    const result = await sendGiftcard(
      selectedGiftCard,
      giftCards.find((card) => card.voucher === selectedGiftCard)?.createdBy,
      recipientEmail,
      message,
      senderName,
      selectedImgUrl
    );
    if (result.status === 200) {
      navigate('/redeem/send-card-successful', {
        state: {
          selectedImg: selectedImg
            ? selectedImg
            : giftCards?.find((card) => card.voucher === selectedGiftCard)
                ?.giftCardImgUrl,
          giftCardData: giftCardData
            ? giftCardData
            : giftCards?.find((card) => card.voucher === selectedGiftCard),
          amountInUsd,
        },
      });
    } else {
      console.error('Failed to send gift/greeting card:', result);
      alert('Failed to send gift/greeting card.');
    }
    setLoading(false);
  };

  const [selectedTab, setSelectedTab] = useState('Send');
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const theme = useTheme();

  const redirect = async () => {
    navigate('/redeem');
  };

  const handleGiftCardChange = async (e) => {
    setSelectedGiftCard(e.target.value);
    let requiredGiftCard = giftCards.find(
      (card) => card.voucher === e.target.value
    );
    const result = await getCoinPriceByName(String(requiredGiftCard?.type));
    let priceData = result.data.results.data;
    setAmountInUsd(priceData * Number(requiredGiftCard?.amount));
  };
  console.log('selectedGiftCard', selectedGiftCard);
  return (
    <div className={classes.root}>
      <div style={{ margin: '100px' }}></div>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />

      {/* Top Section */}
      <div className={classes.sendCryptoRoot}>
        <h3>
          Send Crypto Gift Card or <br />
          Crypto Greeting Cards
        </h3>
        <p>
          Struggling to find a unique gift? Our crypto gift cards are the
          perfect solution. Redeemable on our exchange, they are not just a
          present, but an investment for the future. The perfect gift for the
          modern age!
        </p>
      </div>
      {/* Redeem form */}
      <div className={classes.redeemRoot}>
        {selectedGiftCard && (
          <div style={{ flex: '30%' }}>
            <img
              src={
                giftCards?.find((card) => card.voucher === selectedGiftCard)
                  ?.giftCardImgUrl || selectedImg
              }
              alt=""
              style={{ width: '100%' }}
            />
          </div>
        )}
        <div className={classes.redeemLeft}>
          <div className={classes.selectTypeContainer}>
            <label>Select previously created gift cards here:</label>
            <CustomSelectBox
              items={giftCards}
              type="Gift Card"
              value={selectedGiftCard}
              onChange={handleGiftCardChange}
              hasborder
              isGiftCard
            />
          </div>
          {selectedGiftCard && (
            <div className={classes.giftCardDetails}>
              <p>
                Type:{' '}
                {
                  giftCards?.find((card) => card.voucher === selectedGiftCard)
                    ?.cardType
                }
              </p>
              <p>
                Token Amount:{' '}
                {
                  giftCards?.find((card) => card.voucher === selectedGiftCard)
                    ?.amount
                }{' '}
                {
                  giftCards?.find((card) => card.voucher === selectedGiftCard)
                    ?.type
                }
              </p>
              <p>
                {`Amount in USD: ${' '}
  ${new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(
    isNaN(amountInUsd) || amountInUsd === null || amountInUsd === undefined
      ? amountInUsdValue
      : amountInUsd
  )}`}
              </p>
            </div>
          )}
          <div className={classes.enterAmountContainer}>
            <InputField
              label={'Recipient’s Email'}
              type="text"
              placeholder="abc@xyz.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>
          <div className={classes.quantityContainer}>
            {' '}
            <InputField
              label={"Sender's Name"}
              type="text"
              placeholder="Enter sender's name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
          </div>
          <div className={classes.quantityContainer}>
            {' '}
            <InputField
              label={'Leave message (optional) '}
              type="textarea"
              placeholder="Write a message for your friend and your family"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className={classes.btnContainer}>
            <GenericButton
              text={'Send'}
              loading={loading}
              styles={{ width: '40%' }}
              onClick={handleSendGiftcard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendCard;
