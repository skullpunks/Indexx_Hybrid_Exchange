import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../shared/TextField';
import { useTheme } from '@mui/material';
import CustomSelectBox from './CustomSelect';
import GenericButton from '../shared/Button';
import IconicHeader from '../shared/RedeemIconicHeader';
import gift1 from '../../../assets/redeem/gift1.png';

import {
  decodeJWT,
  getAllGiftCards,
  getCoinPriceByName,
  sendGiftcard,
} from '../../../services/api';
import EditCardDetailsPopup from './EditCardDetailsPopup.jsx';
import CustomizedSteppers from './CustomizedStepper';

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
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
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
  smallRemoveBtn: {
    padding: '4px 8px !important',
    minWidth: 'unset !important',
    fontSize: '12px !important',
    height: 'auto !important',
    marginBottom: '8px',
    color: `${theme.palette.error.main} !important`,
    background: 'transparent !important',
    '&:hover': {
      background: `${theme.palette.divider} !important`,
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
  const [sendCardDetails, setSendCardDetails] = useState([
    {
      id: 0,
      recipientEmail: email || '',
      senderName: '',
      message: `Hey [Receiver's Name],

This is [Your Name], and I'm excited to gift you something truly special - a Crypto Gift Card!

Consider it the gift of the future and an investment in what's to come. Redeem it now to kickstart your crypto journey.

Enjoy and happy investing!`,
      selectedGiftCard: giftCardData?.voucher,
    },
  ]);
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

    // Validate all cards have required fields
    const missingFields = sendCardDetails.some(
      (card) => !card.recipientEmail || !card.senderName
    );
    if (missingFields) {
      alert('All recipient emails and sender names are required.');
      setLoading(false);
      return;
    }

    try {
      // Send all cards
      const results = await Promise.all(
        sendCardDetails.map(async (card) => {
          const cardData = giftCards.find(
            (gc) => gc.voucher === card.selectedGiftCard
          );
          return await sendGiftcard(
            card.selectedGiftCard,
            cardData?.createdBy,
            card.recipientEmail,
            card.message,
            card.senderName,
            selectedImgUrl
          );
        })
      );

      // Check if all cards were sent successfully
      const allSuccessful = results.every((result) => result.status === 200);

      if (allSuccessful) {
        navigate('/redeem/send-card-successful', {
          state: {
            selectedImg: selectedImg
              ? selectedImg
              : giftCards?.find(
                  (card) => card.voucher === sendCardDetails[0].selectedGiftCard
                )?.giftCardImgUrl,
            giftCardData: giftCardData
              ? giftCardData
              : giftCards?.find(
                  (card) => card.voucher === sendCardDetails[0].selectedGiftCard
                ),
            amountInUsd,
            cardCount: sendCardDetails.length,
          },
        });
      } else {
        console.error('Failed to send gift/greeting cards:', results);
        alert('Failed to send one or more gift/greeting cards.');
      }
    } catch (error) {
      console.error('Error sending gift cards:', error);
      alert('An error occurred while sending gift cards.');
    }

    setLoading(false);
  };

  // Handle changes to individual card details
  const handleCardDetailChange = (index, field, value) => {
    const updatedDetails = [...sendCardDetails];
    updatedDetails[index][field] = value;
    setSendCardDetails(updatedDetails);
  };

  // Add a new card to send
  const addMoreCard = () => {
    setSendCardDetails([
      ...sendCardDetails,
      {
        id: sendCardDetails.length,
        recipientEmail: '',
        senderName: '',
        message: message,
        selectedGiftCard: null,
      },
    ]);
  };

  // Remove a card
  const removeCard = (indexToRemove) => {
    if (sendCardDetails.length > 1) {
      setSendCardDetails(
        sendCardDetails.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const [selectedTab, setSelectedTab] = useState('Send');
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const [showEditPopup, setShowEditPopup] = useState(false);
  const theme = useTheme();

  const redirect = async () => {
    navigate('/redeem');
  };

  const handleGiftCardChange = async (e, index) => {
    const voucherValue = e.target.value;

    // Update the selected gift card in the sendCardDetails array
    const updatedDetails = [...sendCardDetails];
    updatedDetails[index].selectedGiftCard = voucherValue;
    setSendCardDetails(updatedDetails);

    // If this is the first card or no index passed, also update the main state
    if (index === 0 || index === undefined) {
      setSelectedGiftCard(voucherValue);
    }

    let requiredGiftCard = giftCards.find(
      (card) => card.voucher === voucherValue
    );

    if (requiredGiftCard?.type) {
      const result = await getCoinPriceByName(String(requiredGiftCard?.type));
      let priceData = result.data.results.data;
      setAmountInUsd(priceData * Number(requiredGiftCard?.amount));
    }
  };

  return (
    <div className={classes.root}>
      <div style={{ margin: '100px' }}></div>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />

      <CustomizedSteppers step={2} />

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

      {/* Map through each card in sendCardDetails */}
      {sendCardDetails.map((cardDetail, index) => (
        <div className={classes.redeemRoot} key={cardDetail.id || index}>
          <div style={{ flex: '30%' }}>
            <img src={gift1} alt="" style={{ width: '100%' }} />
          </div>
          {cardDetail.selectedGiftCard && (
            <div style={{ flex: '30%' }}>
              <img
                src={
                  gift1 ||
                  giftCards?.find(
                    (card) => card.voucher === cardDetail.selectedGiftCard
                  )?.giftCardImgUrl ||
                  selectedImg ||
                  gift1
                }
                alt=""
                style={{ width: '100%' }}
              />
            </div>
          )}
          <div className={classes.redeemLeft}>
            <div className={classes.selectTypeContainer}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <label>Select previously created gift cards here:</label>
                {sendCardDetails.length > 1 && (
                  <GenericButton
                    text={'Remove'}
                    className={classes.smallRemoveBtn}
                    onClick={() => removeCard(index)}
                  />
                )}
              </div>
              <CustomSelectBox
                items={giftCards}
                type="Gift Card"
                value={cardDetail.selectedGiftCard}
                onChange={(e) => handleGiftCardChange(e, index)}
                hasborder
                isGiftCard
              />
            </div>
            {cardDetail.selectedGiftCard && (
              <div className={classes.giftCardDetails}>
                <p>
                  Type:{' '}
                  {
                    giftCards?.find(
                      (card) => card.voucher === cardDetail.selectedGiftCard
                    )?.cardType
                  }
                </p>
                <p>
                  Token Amount:{' '}
                  {
                    giftCards?.find(
                      (card) => card.voucher === cardDetail.selectedGiftCard
                    )?.amount
                  }{' '}
                  {
                    giftCards?.find(
                      (card) => card.voucher === cardDetail.selectedGiftCard
                    )?.type
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
                label={"Recipient's Email"}
                type="text"
                placeholder="abc@xyz.com"
                value={cardDetail.recipientEmail}
                onChange={(e) =>
                  handleCardDetailChange(
                    index,
                    'recipientEmail',
                    e.target.value
                  )
                }
              />
            </div>
            <div className={classes.quantityContainer}>
              <InputField
                label={"Sender's Name"}
                type="text"
                placeholder="Enter sender's name"
                value={cardDetail.senderName}
                onChange={(e) =>
                  handleCardDetailChange(index, 'senderName', e.target.value)
                }
              />
            </div>
            <div className={classes.quantityContainer}>
              <InputField
                label={'Leave message (optional) '}
                type="textarea"
                placeholder="Write a message for your friend and your family"
                value={cardDetail.message}
                onChange={(e) =>
                  handleCardDetailChange(index, 'message', e.target.value)
                }
              />
            </div>

            {index === sendCardDetails.length - 1 && (
              <div className={classes.btnContainer}>
                <GenericButton text={'+ Add More Card'} onClick={addMoreCard} />
                <GenericButton
                  text={'Edit Details'}
                  onClick={() => setShowEditPopup(true)}
                />
                <GenericButton
                  text={'Send'}
                  loading={loading}
                  onClick={handleSendGiftcard}
                />
              </div>
            )}
          </div>
        </div>
      ))}

      {showEditPopup && (
        <EditCardDetailsPopup onClose={() => setShowEditPopup(false)} />
      )}
    </div>
  );
};

export default SendCard;
