import { Button, Modal, notification } from 'antd';
import React, { useEffect, useState } from 'react';
// import IN500 from "../../assets/token-icons/33.png";
// import IUSD from "../../assets/token-icons/35.png";
// import downArrow from "../../assets/arts/downArrow.svg";
// import swapIcon from "../../assets/arts/swapIcon.svg";
// import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import { CloseCircleFilled } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createBuyOrder,
  createStripePaymentIntent,
  decodeJWT,
  getAppSettings,
  getCoinPriceByName,
  getHoneyBeeDataByUsername,
  getTaskCenterDetails,
  oneUSDHelper,
} from '../../services/api';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from '../../utils/Tokens.json';
import '../Stripe/CheckoutForm.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Stripe/CheckoutForm';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import NeedPermission from './Notification/NeedPermission';
import PaymentOptions from './Notification/PaymentOptions';
// import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

interface Props {
  setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
let priceData: any = {};
let appSettingArr: any[] = [];

// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51MJM8OLRNgju1k3I37ZxdmbiiJHIFWbEwZXIESCKGwlYsOU6VHk1GMrdkB4qdA5helFlHS9x0YVWWEF8bDeI7cX300V45nfTCz'
);
// This is your live publishable API key.
//const stripePromise = loadStripe("pk_live_51MJM8OLRNgju1k3IG1eMgbxWijny3tiwF3pcAYbwOQpduUbh60g79yxLBjSNsruKaepiAEI76ay3Y27N8cAgnwjz00gofPaXN8");

const BSConfirmPurchase: React.FC<Props> = ({ setScreenName }) => {
  const navigate = useNavigate();
  const { BSvalue } = React.useContext(BSContext) as BSContextType;
  const [loadings, setLoadings] = useState<boolean>(false);

  const filteredFromArray = initialTokens.filter(function (obj) {
    return obj?.address === BSvalue?.fromToken;
  });

  const getPricesData = async () => {
    const res = await getCoinPriceByName(String(filteredFromArray[0].title));
    priceData = res.data.results.data;
    setRateData(priceData);

    let oneUsdValue: any = await oneUSDHelper(
      priceData,
      filteredFromArray[0].title
    );
    const finalPay: any =
      oneUsdValue * Number(BSvalue?.amount) * (1 - Number(adminFee) / 100);
    setTotalAmountToPay(finalPay);
  };

  const getAllSetting = async () => {
    const res = await getAppSettings();
    appSettingArr = res.data;
    if (filteredFromArray[0].title === 'INEX' || filteredFromArray[0].title === 'IUSD+' || filteredFromArray[0].title === 'IN500' || filteredFromArray[0].title === 'INXC') {
      let adminFees = appSettingArr.find(
        (item: any) => item.key === 'IndexxTokensAdminFees'
      );
      setAdminFees(adminFees.value);
    } else {
      let adminFees = appSettingArr.find(
        (item: any) => item.key === 'AdminFees'
      );
      setAdminFees(adminFees.value);
    }
    return;
  };
  const { id } = useParams();
  const [honeyBeeId, setHoneyBeeId] = useState("");
  const [userData, setUserData] = useState();
  const [honeyBeeEmail, setHoneyBeeEmail] = useState("");
  const [adminFee, setAdminFees] = useState('');
  const [totalAmountToPay, setTotalAmountToPay] = useState(0);
  const [isTransferModalVisible, setIsTransferModalVisible] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [rateData, setRateData] = useState();
  const [taskCenterDetails, setTaskCenterDetails] = useState() as any;
  const [permissionData, setPermissionData] = useState() as any;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [message, setMessage] = useState<String>();

  const showTransferModal = () => {
    setIsTransferModalVisible(true);
  };

  const handleTransferOk = () => {
    setIsTransferModalVisible(false);
  };

  const handleTransferCancel = () => {
    setIsTransferModalVisible(false);
  };

  const getTaskCenterDetailsData = async () => {
    const access_token = String(localStorage.getItem('access_token'));
    const decoded: any = await decodeJWT(access_token);
    let res = await getTaskCenterDetails(String(decoded.email));
    if (res.status === 200) {
      setTaskCenterDetails(res.data.data);
    }
  };

  // Create an order and PaymentIntent as soon as the confirm purchase button is clicked
  const createNewBuyOrder = async () => {
    setLoadings(true);
    let basecoin: string = filteredFromArray[0].title;
    let quotecoin: string = 'USD';
    let amount: number = Number(BSvalue?.amount);
    let outAmount = Math.floor(totalAmountToPay * 1000000) / 1000000;
    let res;
    if (id) {


      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Captain bee, Please apply for buy approval from honey bee");
        setIsModalOpen(true);
        setMessage("As Captain bee, Please apply for buy approval from honey bee");
        setLoadings(false);
        return;
      }
      res = await createBuyOrder(basecoin, quotecoin, amount, outAmount, 0, honeyBeeEmail, true);
    } else {
      res = await createBuyOrder(basecoin, quotecoin, amount, outAmount);
    }
    if (res.status === 200) {
      setLoadings(false);
      //--Below code is to enable paypal Order---

      for (let i = 0; i < res.data.links.length; i++) {
        if (res.data.links[i].rel.includes("approve")) {
          window.location.href = res.data.links[i].href;
        }
      }
      //getStripePaymentIntent(res.data.orderId, res.data.user.email);
    } else {
      setLoadings(false);
      // OpenNotification('error', res.data);
      setIsModalOpen(true);
      setMessage(res.data);
    }
  };

  const getStripePaymentIntent = async (orderId: string, email: string) => {
    const res = await createStripePaymentIntent(
      Number(BSvalue?.amount),
      orderId,
      email
    );
    setClientSecret(res.client_secret);
    showTransferModal();
  };

  useEffect(() => {

    if (id) {
      setHoneyBeeId(String(id));
      getHoneyBeeDataByUsername(String(id)).then((data) => {
        setUserData(data.data);

        setHoneyBeeEmail(data.data.userFullData?.email);
        let captainbeePermissions = data.data.referredUserData?.data.relationships;


        let c = captainbeePermissions.find((x: { honeybeeEmail: any; }) => x.honeybeeEmail === data.data.userFullData?.email);

        setPermissionData(c)
      });

    }
    getAllSetting();
    getPricesData();
    getTaskCenterDetailsData();
    // if(document.getElementById("input_get_value") && document.getElementById("input_get_value")?.innerHTML){
    let element = document.getElementById('input_get_value')!;
    let testVal = element.innerText;
    let charFontSize =
      testVal.length < 6
        ? '1.1'
        : testVal.length < 9
          ? '0.9'
          : testVal.length < 12
            ? '0.8'
            : testVal.length < 15
              ? '0.6'
              : '0.4';
    let charWidth = testVal.length <= 1 ? 1.1 : 0.9;
    element.style.width = (testVal.length + 1) * charWidth + 'ch';
    element.style.fontSize = charFontSize + 'ch';
    // }
  }, [getAllSetting, getPricesData, getTaskCenterDetailsData, id])

  const appearance = {
    theme: String('stripe'),
  };
  const options = {
    clientSecret,
    appearance,
    // appearance: {
    //     theme: String('stripe'),
    // }
  } as any;
  // const openStipePayment = async () => {
  //     let res = await createBuyOrder(filteredFromArray[0].title, 'USD', Number(BSvalue?.amount), priceData);
  //     if (res.status === 200) {
  //         // route to new page by changing window.location
  //         window.open("https://buy.stripe.com/test_14k3dEgSm2Zb2Iw289", "_self") //to open new page
  //     } else {
  //         alert("Failed to create an order");
  //     }
  // }

  return (
    <>
      <div className="bs_container card check-out">
        <div className="card__header flex-justify-between d-flex flex-align-center">
          <h1 className="centered" style={{ color: '#5f5f5f' }}>
            <span
              className="cursor-pointer"
              onClick={() => {
                if (honeyBeeId === "undefined" || honeyBeeId === "")
                  navigate('/indexx-exchange/buy-sell/');
                else
                  navigate(`/indexx-exchange/buy-sell/for-honeybee/${honeyBeeId}`);
              }
              }
            >
              &#60;
            </span>{' '}
            &nbsp; Confirm Purchase
          </h1>
          {/* <CloseOutlined style={{ fontSize: "16" }} onClick={() => { }} /> */}
        </div>

        <div className="card-body padding-0">
          <div className="bs_curreny d-flex position-relative ">
            <div
              className="bs_curreny_left flex-align-center padding-b-2x"
              style={{ alignItems: 'baseline', padding: '50px 20px' }}
            >
              <span className="font_20x" style={{ lineHeight: 4, color: "var(--body_color)" }}>
                $
              </span>
              <span
                placeholder="0"
                className="font_60x color_general padding-l-1x"
                id="input_get_value"
                style={{
                  width: '1.2ch',
                  minHeight: '100px',
                  lineHeight: '100px',
                }}
              >
                {BSvalue?.amount}
              </span>
              {/* <span placeholder="0" id="input_get_value" style={{ width: "1.2ch" }} className="font_60x color_general padding-l-1x"  >{BSvalue?.amount}</span> */}
            </div>
            {/* <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} alt="ddd" className="hover_icon" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div> */}
          </div>
          <div
            className="bs_token d-flex cursor-pointer justify-between font_20x"
            style={{ alignItems: 'center', color: "var(--body_color)" }}
          >
            <span>Rate</span>
            <span>
              {Number(rateData).toFixed(2)} USD / {filteredFromArray[0].title}
            </span>
          </div>
          <div
            className="bs_token d-flex cursor-pointer justify-between font_20x"
            style={{ alignItems: 'center', color: "var(--body_color)" }}
          >
            <span>Total</span>
            <span>
              {Math.floor(totalAmountToPay * 1000000) / 1000000}{' '}
              {filteredFromArray[0].title}
            </span>
          </div>
          <div
            className="d-flex pe-3"
            style={{
              justifyContent: 'flex-end',
            }}
          >
            {' '}
            <small>Transaction/Admin Fee: {adminFee || '0.00'} %</small>
          </div>

          <div className="footer bs_footer_action">
            {Number(BSvalue?.amount) > 50 &&
              taskCenterDetails?.tradeToEarnPercentage > 0 && (
                <h6 className="text-center">
                  Rewards Applied for this order:{' '}
                  {Math.floor(
                    ((Number(BSvalue?.amount) *
                      taskCenterDetails?.tradeToEarnPercentage) /
                      100) *
                    100
                  ) / 100}{' '}
                  INEX
                </h6>
              )}
            {/* <Button type="primary" className="atn-btn atn-btn-round" block onClick={() => setScreenName("BSBuyInProgress")}> Confirm Purchase (11s)</Button> */}
            <Button
              type="primary"
              className="atn-btn atn-btn-round"
              block
              onClick={() => setIsModalOpen2(true)}
              // onClick={() => createNewBuyOrder()}
              loading={loadings}
            >
              {' '}
              Confirm Purchase
            </Button>

            <Modal
              title="indexx.ai"
              open={isTransferModalVisible}
              onOk={handleTransferOk}
              onCancel={handleTransferCancel}
              footer={null}
              width={850}
              maskClosable={false}
              className="buy_purchase_modal custom-modal"
              bodyStyle={{ background: "var(--body_background)", color: "var(--body_color)" }}

            >
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
            </Modal>

            {<Modal title="indexx.ai" visible={isTransferModalVisible} onOk={handleTransferOk} onCancel={handleTransferCancel} footer={null} width={850} maskClosable={false} className="buy_purchase_modal">

              {/* <Paypal2 className={undefined} value={BSvalue?.amount} /> */}
              <div style={{ maxWidth: "750px", minHeight: "200px" }}>
                <PayPalScriptProvider
                  options={{
                    "client-id": "AXh_SjiYho65fhZoKGSXRllbnvnsxOfJ0iLV5BLNcIenhYOOZ_5ABJJStkb0T0tgpxd22DTSklrquOaB",
                    components: "buttons",
                    currency: "USD"
                  }}
                >
                  {/* <Button
                  currency={"USD"}
                  showSpinner={false}
                /> */}
                </PayPalScriptProvider>
              </div>
            </Modal>}

          </div>
        </div>
      </div>
      <div>
        <NeedPermission
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={message}
          id={id}
        />
      </div>
      <div>
        <PaymentOptions
          isVisible={isModalOpen2}
          onClose={() => setIsModalOpen2(false)}
          message={message}
        />
      </div>
    </>
  );
};

export default BSConfirmPurchase;
