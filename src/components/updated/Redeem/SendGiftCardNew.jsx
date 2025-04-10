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
} from '../../../services/api';
import EditCardDetailsPopup from './EditCardDetailsPopup.jsx';
import CustomizedSteppers from './CustomizedStepper';
import { useCardStore } from './CardContext';

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

  // Use the Zustand store
  const {
    cardDetails,
    addCard,
    removeCard,
    updateCardDetail,
    setAmountInUsd,
    setSelectedImg,
    setSelectedImgUrl,
    amountInUsd: storeAmountInUsd,
  } = useCardStore();

  const [loading, setLoading] = useState(false);
  const [giftCards, setGiftCards] = useState([]);
  const [selectedGiftCard, setSelectedGiftCard] = useState(
    giftCardData?.voucher
  );
  const [userEmail, setUserEmail] = useState('');

  // Initialize store with location state data if available
  useEffect(() => {
    if (email && cardDetails[0].recipientEmail === '') {
      updateCardDetail(0, 'recipientEmail', email);
    }

    if (giftCardData?.voucher && cardDetails[0].selectedGiftCard === null) {
      updateCardDetail(0, 'selectedGiftCard', giftCardData.voucher);
    }

    if (selectedImg) {
      setSelectedImg(selectedImg);
    }

    if (selectedImgUrl) {
      setSelectedImgUrl(selectedImgUrl);
    }

    if (amountInUsd) {
      setAmountInUsd(amountInUsd);
    }
  }, [email, giftCardData, selectedImg, selectedImgUrl, amountInUsd]);

  useEffect(() => {
    async function fetchGiftCard() {
      const token = localStorage.getItem('access_token');
      const decodedToken = decodeJWT(String(token));
      if (decodedToken?.email) {
        setUserEmail(decodedToken.email);
        
        // Set sender email for all cards automatically
        cardDetails.forEach((_, index) => {
          updateCardDetail(index, 'senderEmail', decodedToken.email);
        });
      }
      let res = await getAllGiftCards(decodedToken?.email);
      setGiftCards(res.data);
    }
    fetchGiftCard();
  }, []);

  const handleSendGiftcard = async () => {
    setLoading(true);

    // Validate all cards have required fields - don't check senderEmail as it's set automatically
    const missingFields = cardDetails.some(
      (card) => !card.recipientEmail || !card.senderName
    );
    if (missingFields) {
      alert('All recipient emails and sender names are required.');
      setLoading(false);
      return;
    }

    navigate('/redeem/select-payment-method', {
      state: {
        cardDetails: cardDetails,
        selectedImg: selectedImg,
        selectedImgUrl: selectedImgUrl,
        amountInUsd: storeAmountInUsd
      }
    });
    setLoading(false);
  };

  const handleGiftCardChange = async (e, index) => {
    const voucherValue = e.target.value;

    // Update the selected gift card in the cardDetails array
    updateCardDetail(index, 'selectedGiftCard', voucherValue);

    // If this is the first card or no index passed, also update the main state
    if (index === 0 || index === undefined) {
      setSelectedGiftCard(voucherValue);
    }

    let requiredGiftCard = giftCards.find(
      (card) => card.voucher === voucherValue
    );

    if (requiredGiftCard) {
      // Update image and image URL if available in the selected gift card
      if (requiredGiftCard.giftCardImgUrl) {
        setSelectedImgUrl(requiredGiftCard.giftCardImgUrl);
        updateCardDetail(index, 'selectedImgUrl', requiredGiftCard.giftCardImgUrl);
      }
      
      if (requiredGiftCard.giftCardImg) {
        setSelectedImg(requiredGiftCard.giftCardImg);
        updateCardDetail(index, 'selectedImg', requiredGiftCard.giftCardImg);
      }

      // Update amount in USD if type is available
      if (requiredGiftCard.type) {
        const result = await getCoinPriceByName(String(requiredGiftCard.type));
        let priceData = result.data.results.data;
        const calculatedAmount = priceData * Number(requiredGiftCard.amount);
        
        setAmountInUsd(calculatedAmount);
        updateCardDetail(index, 'amountInUsd', calculatedAmount);
      }
    }
  };

  const [selectedTab, setSelectedTab] = useState('Send');
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const [showEditPopup, setShowEditPopup] = useState(false);
  const theme = useTheme();

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

      {/* Map through each card in cardDetails */}
      {cardDetails.map((cardDetail, index) => (
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
                {cardDetails.length > 1 && (
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
}).format(storeAmountInUsd)}`}
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
                  updateCardDetail(index, 'recipientEmail', e.target.value)
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
                  updateCardDetail(index, 'senderName', e.target.value)
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
                  updateCardDetail(index, 'message', e.target.value)
                }
              />
            </div>

            {index === cardDetails.length - 1 && (
              <div className={classes.btnContainer}>
                <GenericButton text={'+ Add More Card'} onClick={addCard} />
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
