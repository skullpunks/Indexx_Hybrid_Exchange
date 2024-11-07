import { Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import IN500 from "../../assets/token-icons/33.png";
// import IUSD from "../../assets/token-icons/35.png";
// import downArrow from "../../assets/arts/downArrow.svg";
// import swapIcon from "../../assets/arts/swapIcon.svg";
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from '../../utils/Tokens.json';
import './BS-Sell.css';
// import { createSellOrder, getAppSettings } from '../../services/api';
import {
  confirmSellOrder,
  createSellOrder,
  getAppSettings,
  getCoinPriceByName,
  oneUSDHelper,
  decodeJWT,
  getTaskCenterDetails,
  getHoneyBeeDataByUsername,
} from '../../services/api';
import OpenNotification from '../OpenNotification/OpenNotification';

interface Props {
  setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
let appSettingArr: any[] = [];

// const BSSellConfirmConvert: React.FC = () => {
const BSSellConfirmConvert: React.FC<Props> = ({ setScreenName }) => {
  //
  const navigate = useNavigate();
  const [rateData, setRateData] = useState();
  const [loadings, setLoadings] = useState<boolean>(false);
  const { id } = useParams();
  const [honeyBeeId, setHoneyBeeId] = useState('');
  const [userData, setUserData] = useState();
  const [honeyBeeEmail, setHoneyBeeEmail] = useState('');
  const [totalAmountToPay, setTotalAmountToPay] = useState(0);
  const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
  const [adminFee, setAdminFees] = useState('');
  const [, setTaskCenterDetails] = useState() as any;
  const [permissionData, setPermissionData] = useState() as any;

  //const [isFirstEnabled, setisFirstEnabled] = useState(true);
  // const [isSecondEnabled, setisSecondEnabled] = useState(false);
  //const [order, setOrder] = useState() as any;
  const filteredFromArray = initialTokens.filter(function (obj) {
    return obj?.address === BSvalue?.fromToken;
  });
  let priceData: any = {};

  const navigateBak = () => {
    if (honeyBeeId === 'undefined' || honeyBeeId === '')
      navigate(`/indexx-exchange/buy-sell?type=sell`);
    else
      navigate(
        `/indexx-exchange/buy-sell/for-honeybee/${honeyBeeId}?type=sell`
      );
    // setScreenName("");
  };

  const getTaskCenterDetailsData = async () => {
    const access_token = String(localStorage.getItem('access_token'));
    const decoded: any = await decodeJWT(access_token);
    let res = await getTaskCenterDetails(String(decoded.email));
    if (res.status === 200) {
      setTaskCenterDetails(res.data.data);
    }
  };

  useEffect(() => {
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

    if (id) {
      setHoneyBeeId(String(id));
      getHoneyBeeDataByUsername(String(id)).then((data) => {
        setUserData(data.data);

        setHoneyBeeEmail(data.data.userFullData?.email);
        let captainbeePermissions =
          data.data.referredUserData?.data.relationships;

        let c = captainbeePermissions.find(
          (x: { honeybeeEmail: any }) =>
            x.honeybeeEmail === data.data.userFullData?.email
        );

        setPermissionData(c);
      });
    }
    getAllSetting();
    getPricesData();
    getTaskCenterDetailsData();
  }, []);

  const getPricesData = async () => {
    const res = await getCoinPriceByName(
      String(filteredFromArray[0].title),
      'Sell'
    );
    priceData = res.data.results.data;

    setRateData(priceData);
    let oneUsdValue = await oneUSDHelper(priceData, filteredFromArray[0].title);

    setTotalAmountToPay(
      priceData * Number(BSvalue?.amount) -
        (priceData * Number(BSvalue?.amount) * Number(adminFee)) / 100
    );
  };

  const createNewSellOrder = async () => {
    setLoadings(true);
    let basecoin: string = filteredFromArray[0].title;
    let quotecoin: string = 'USD';
    let amount: number = Number(BSvalue?.amount);
    let res;
    if (id) {
      if (!permissionData?.permissions?.sell) {
        setLoadings(false);
        OpenNotification(
          'error',
          'As Hive Captain, Please apply for sell approval from honey bee'
        );
        return;
      }
      res = await createSellOrder(
        basecoin,
        quotecoin,
        amount,
        totalAmountToPay,
        0,
        honeyBeeEmail,
        true
      );
    } else {
      res = await createSellOrder(
        basecoin,
        quotecoin,
        amount,
        totalAmountToPay
      );
    }

    if (res.status === 200) {
      //setisFirstEnabled(false);
      //setisSecondEnabled(true);
      //setOrder(res.data);
      if (setBSvalue && BSvalue) {
        setBSvalue({ ...BSvalue, orderId: String(res?.data?.orderId) || '' });
        setBSvalue({ ...BSvalue, orderType: 'Sell' });
        setBSvalue({ ...BSvalue, fromTitle: filteredFromArray[0].title });
        await processSellOrder(res.data);
      }
    } else {
      setLoadings(false);
      OpenNotification(
        'error',
        'Failed to Process Sell Order. Please check balance on the wallet'
      );
    }
    //getStripePaymentIntent(res.data.orderId, res.data.user.email);
  };

  const processSellOrder = async (order: any) => {
    let basecoin: string = filteredFromArray[0].title;

    if (basecoin === 'INEX') {
      setLoadings(false);
      OpenNotification(
        'error',
        'Failed to Process Sell Order. INEX token not allowed to sell'
      );
    } else {
      const res = await confirmSellOrder(
        order.user.email,
        order.orderId,
        'Completed',
        basecoin
      );
      if (res.status === 200) {
        setLoadings(false);
        OpenNotification('success', 'Successfully Processed Sell Order');
        // setScreenName("BSSellInprogress");
        if (honeyBeeId === 'undefined' || honeyBeeId === '')
          navigate('/indexx-exchange/buy-sell/sell-in-progress');
        else
          navigate(`/indexx-exchange/buy-sell/sell-in-progress/${honeyBeeId}`);
      } else {
        setLoadings(false);
        OpenNotification(
          'error',
          'Failed to Process Sell Order. INEX token not allowed to sell'
        );
      }
    }
  };

  const getAllSetting = async () => {
    const res = await getAppSettings();
    appSettingArr = res.data;
    if (
      filteredFromArray[0].title === 'INEX' ||
      filteredFromArray[0].title === 'IUSD+' ||
      filteredFromArray[0].title === 'IN500' ||
      filteredFromArray[0].title === 'INXC' ||
      filteredFromArray[0].title === 'WISB'
    ) {
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
  };
  //

  // const createNewSellOrder = async () => {
  //     let quotecoin: string = filteredFromArray[0].title;
  //     let basecoin: string = 'USD';
  //     let amount: number = Number(BSvalue?.amount);
  //     const res = await createSellOrder(basecoin, quotecoin, amount);
  //

  //     setScreenName("BSSellInprogress");
  // }

  return (
    <div className="bs_container card sell_screens">
      <div className="card__header flex-justify-between d-flex flex-align-center">
        <h1 className="centered cursor-pointer" style={{ color: '#5f5f5f' }}>
          <span className="font_20x pe-2 " onClick={navigateBak}>
            &#60;
          </span>
          Confirm Sell
        </h1>
      </div>

      <div className="card-body ">
        <div className="bs_curreny d-flex position-relative padding-lr-2x  ">
          <div
            className="bs_curreny_left padding-b-2x"
            style={{ transform: 'scale(1)', padding: '35px 20px' }}
          >
            <span
              placeholder="0"
              className="color_general font_60x"
              id="input_get_value"
              style={{ width: '1.2ch' }}
            >
              {BSvalue?.amount}
            </span>
            {/* <span placeholder="0" className=" " id="input_get_value" style={{ width: "1.2ch" }}>{BSvalue?.amount}</span> */}
            <span className="font_20x ps-2" style={{ lineHeight: 4 }}>
              {' '}
              {filteredFromArray[0].title}
            </span>
          </div>
          {/* <span className="font_20x" style={{
                        position: "absolute", bottom: "38px", left: "50%", fontSize: "12px"
                    }} >$ 1</span>
                    <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} className="hover_icon" alt="ddd" style={{ position: "absolute", right: "24px", top: "60%" }} />
                    </div> */}
        </div>

        <div className="padding-lr-2x font_15x padding-b-2x padding-t-2x">
          <div className="d-flex flex-justify-between">
            <span> Sell To</span>
            <span className="font_w_800">USD Balance</span>
          </div>
          <div className="d-flex flex-justify-between">
            <span> Price</span>
            <span className="font_w_800">
              {rateData} {filteredFromArray[0].title} / USD
            </span>
          </div>
          <div className="d-flex flex-justify-between">
            <span> You will get</span>
            <span className="font_w_800">
              {Math.floor(totalAmountToPay * 100) / 100} USD
            </span>
          </div>
          <div className="d-flex flex-justify-between">
            <span> Transaction/Admin Fee:</span>
            <span className="font_w_800">{adminFee} %</span>
          </div>
        </div>
        {/* <div className="bs_token d-flex cursor-pointer" style={{ alignItems: "center" }}>
                        <div className="bs_token_left d-flex justify-between">
                            <div className="bs_token_num d-flex flex-align-center" >
                                <img src={ethereum} alt="Index icon" width="30" height="30" style={{ marginRight: 11, }} />
                                ETH  <span className="token_grey">Ethereum</span><a className="font_15x bs_link padding-l-2x" style={{ paddingTop: "5px", }}>Max</a>
                            </div>
                        </div>
                        <div className="d-flex">  <div style={{
                            fontSize: "10px",
                            paddingTop: "7px",
                            paddingRight: "4px"
                        }}><div>0.00908 ETH</div><div>= $ 11.72</div></div><img src={arrowAddress} alt="arrow icon" style={{}} /></div>
                    </div> */}
        <div className="footer bs_footer_action">
          {/* {Number(totalAmountToPay) > 50 &&
                        <h6 className='text-center'>Rewards Applied for this order: {(Math.floor(Number(totalAmountToPay) * 30 / 100 * 100)) / 100} INEX</h6>
                    }

                    {Number(totalAmountToPay) > 50 && (taskCenterDetails?.tradeToEarnPercentage > 0) &&
                        <h6 className='text-center'>Rewards Applied for this order: {(Math.floor(Number(totalAmountToPay) * (taskCenterDetails?.tradeToEarnPercentage) / 100 * 100)) / 100} INEX</h6>
                    } */}
          {/* <Button type="primary" className="atn-btn atn-btn-round margin-t-3x" block onClick={() => setScreenName("BSSellInprogress")}> Confirm Conversion (11s)</Button> */}
          <Button
            type="primary"
            className="atn-btn atn-btn-round margin-t-3x"
            loading={loadings}
            block
            onClick={() => createNewSellOrder()}
          >
            {' '}
            Confirm Sell
          </Button>
          {/* <Button type="primary" className="atn-btn atn-btn-round margin-t-3x" hidden={(!isSecondEnabled)} block onClick={() => processSellOrder()}> Confirm Conversion (11s)</Button> */}
          {/* <Button type="primary" className="atn-btn atn-btn-round" block onClick={() => createNewSellOrder()}> Confirm Purchase (11s)</Button> */}
        </div>
      </div>
    </div>
  );
};

export default BSSellConfirmConvert;
