import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import IN500 from "../../assets/token-icons/33.png";
// import IUSD from "../../assets/token-icons/35.png";
// import downArrow from "../../assets/arts/downArrow.svg";
// import swapIcon from "../../assets/arts/swapIcon.svg";
// import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
// import { CheckCircleFilled } from '@ant-design/icons';
import OpenNotification from '../OpenNotification/OpenNotification';

import {
  getAppSettings,
  getCoinPriceByName,
  createConvertOrder,
  confirmConvertOrder,
  decodeJWT,
  getTaskCenterDetails,
  getHoneyBeeDataByUsername,
} from '../../services/api';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import initialTokens from '../../utils/Tokens.json';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
//import loaderGif from "../../assets/arts/loaderIcon.gif";

// const filteredArray = (items: any, keyName: any, key: any) => {
//     return items.filter(function (obj: any) {
//         return obj[keyName] === key;
//     });
// }

// import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

interface Props {
  setScreenName: (value: string | ((prevVar: string) => string)) => void;
}
const BSConfirmConvert: React.FC<Props> = ({ setScreenName }) => {
  // const BSConfirmConvert: React.FC = () => {
  // 
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState<boolean>(false);
  const [rateData1, setRateData1] = useState(0);
  const [rateData2, setRateData2] = useState(0);
  const [rateData3, setRateData3] = useState(0);
  const [totalAmountToPay, setTotalAmountToPay] = useState(0);
  const [, setTotalAmountToPayInUSD] = useState(0);
  const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
  const [, setTaskCenterDetails] = useState() as any;
  const { id } = useParams();
  const [honeyBeeId, setHoneyBeeId] = useState("");
  const [permissionData, setPermissionData] = useState() as any;
  const [honeyBeeEmail, setHoneyBeeEmail] = useState("");
  const filteredFromArray = initialTokens.filter(function (obj) {
    return obj?.address === BSvalue?.fromToken;
  });
  const filteredToArray = initialTokens.filter(function (obj) {
    return obj?.address === BSvalue?.toToken;
  });
  const navigateBak = () => {
    navigate('/indexx-exchange/buy-sell?type=convert');
    // setScreenName("");
  };

  let priceData1: any = {};
  let priceData2: any = {};
  let appSettingArr: any[] = [];

  const getTaskCenterDetailsData = async () => {
    const access_token = String(localStorage.getItem('access_token'));
    const decoded: any = await decodeJWT(access_token);
    let res = await getTaskCenterDetails(String(decoded.email));
    if (res.status === 200) {
      setTaskCenterDetails(res.data.data);
    }
  };

  const getPricesData = async () => {
    let res = await getCoinPriceByName(String(filteredFromArray[0].title));
    priceData1 = res.data;
    if (String(filteredFromArray[0].title) === 'FTT') {
      res = await getCoinPriceByName('FTT');
      priceData1 = res.data;
    }

    setRateData1(priceData1.results.data);
    let res2 = await getCoinPriceByName(String(filteredToArray[0].title));
    priceData2 = res2.data;

    setRateData2(priceData2.results.data);


    let finalRate = priceData1.results.data / priceData2.results.data;

    setRateData3(finalRate);
    //setTotalAmountToPay(finalRate * Number(BSvalue?.amount))
    setTotalAmountToPayInUSD(
      finalRate * Number(BSvalue?.amount) * priceData2.results.data
    );
    // let oneUsdValue = await oneUSDHelper(priceData, filteredFromArray[0].title);
    // 
    // 
    setTotalAmountToPay(
      finalRate * Number(BSvalue?.amount) -
      (finalRate * Number(BSvalue?.amount) * Number(adminFee)) / 100
    );
    return;
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
  const [adminFee, setAdminFees] = useState('');

  useEffect(() => {
    if (id) {
      setHoneyBeeId(String(id));
      getHoneyBeeDataByUsername(String(id)).then((data) => {

        setHoneyBeeEmail(data.data.userFullData?.email);
        let captainbeePermissions = data.data.referredUserData?.data.relationships;


        let c = captainbeePermissions.find((x: { honeybeeEmail: any; }) => x.honeybeeEmail === data.data.userFullData?.email);

        setPermissionData(c)
      });

    }
    getAllSetting();
    getPricesData();
    getTaskCenterDetailsData();
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
  }, []);

  const createProcessOrder = async () => {
    setLoadings(true);
    let basecoin: string = filteredFromArray[0].title;
    let quotecoin: string = filteredToArray[0].title;
    let res;
    if (id) {


      if (!permissionData?.permissions?.convert) {
        setLoadings(false);
        OpenNotification('error', "As Captain bee, Please apply for convert approval from honey bee");
        return;
      }
      res = await createConvertOrder(basecoin, quotecoin, Number(BSvalue?.amount), totalAmountToPay, 0, honeyBeeEmail, true);
    } else {
      res = await createConvertOrder(
        basecoin,
        quotecoin,
        Number(BSvalue?.amount),
        totalAmountToPay
      );
    }

    if (res.status === 200) {
      if (setBSvalue && BSvalue) {
        setBSvalue({ ...BSvalue, orderId: String(res?.data?.orderId) || '' });
        await processConvertOrder(res.data);
      }
    } else {
      setLoadings(false);
      OpenNotification('error', "Failed to Process Convert Order. Please check balance on the wallet");
    }
  };


  const processConvertOrder = async (order: any) => {
    const res = await confirmConvertOrder(order.user.email, order.orderId);

    if (res.status === 200) {
      setLoadings(false);
      OpenNotification('success', 'Successfully Processed Convert Order');
      // setScreenName("BSSellInprogress");
      if (honeyBeeId === "undefined" || honeyBeeId === "")
        navigate("/indexx-exchange/buy-sell/convert-in-progress");
      else
        navigate(`/indexx-exchange/buy-sell/convert-in-progress/${honeyBeeId}`);
    } else {
      setLoadings(false);
      OpenNotification('error', "Failed to Process Convert Order. Please check balance on the wallet");
    }
  };

  // getAllSetting();
  // getPricesData();

  return (
    <div className="bs_container card pb-0">
      <div className="card__header flex-justify-between d-flex flex-align-center">
        <h1 className="centered" style={{ color: '#5f5f5f' }}>
          <span
            className="cursor-pointer"
            style={{ fontSize: 20, paddingRight: 10 }}
            onClick={navigateBak}
          >
            &#60;
          </span>
          Confirm Convert
        </h1>
        {/* <CloseOutlined style={{ fontSize: "16" }} onClick={() => { }} /> */}
      </div>

      <div className="card-body ">
        <div className="bs_curreny d-flex position-relative ">
          {/* <div className="bs_curreny_left" style={{ alignItems: "baseline", padding: "50px 20px" }}> */}
          {/* <span placeholder="0" className="pe-2 color_general font_60x" >{BSvalue?.amount}</span> */}
          {/* <span className="font_20x" style={{ lineHeight: "60px" }} >{filteredFromArray[0].title}</span> */}

          <div
            className="bs_curreny_left padding-b-2x"
            style={{ alignItems: 'baseline', padding: '40px 20px' }}
          >
            <span
              placeholder="0"
              className="pe-2 color_general font_60x"
              id="input_get_value"
              style={{ width: '1.2ch' }}
            >
              {BSvalue?.amount}
            </span>
            <span className="font_20x" style={{ lineHeight: '1.1ch' }}>
              {filteredFromArray[0].title}
            </span>
          </div>
          {/* <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} alt="ddd" className="hover_icon" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div> */}
        </div>
        <div
          className="bs_token d-flex cursor-pointer justify-between font_20x"
          style={{ alignItems: 'center' }}
        >
          <span>{filteredToArray[0].title} Rate</span>
          <span>
            {Math.floor(rateData2 * 10000) / 10000} USD /{' '}
            {filteredToArray[0].title}
          </span>
        </div>
        <div
          className="bs_token d-flex cursor-pointer justify-between font_20x"
          style={{ alignItems: 'center' }}
        >
          <span>{filteredFromArray[0].title} Rate </span>
          <span>
            {Math.floor(rateData1 * 10000) / 10000} USD /{' '}
            {filteredFromArray[0].title}
          </span>
        </div>
        <div
          className="bs_token d-flex cursor-pointer justify-between font_20x"
          style={{ alignItems: 'center' }}
        >
          <span>Rate</span>
          <span>
            {rateData3 < 0.0001
              ? rateData3.toFixed(8)
              : Math.floor(rateData3 * 10000) / 10000} {filteredToArray[0].title} /{' '}
            {filteredFromArray[0].title}
          </span>
        </div>
        <div
          className="bs_token d-flex cursor-pointer justify-between font_20x"
          style={{ alignItems: 'center' }}
        >
          <span>Total</span>
          <span>
            {Math.floor(totalAmountToPay * 100000) / 100000}{' '}
            {filteredToArray[0].title}
          </span>
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
        <div className="footer bs_footer_action p-2">
          <p className="text-center pb-1 pt-1" style={{ color: "var(--body_color)" }}>
            Transaction/Admin Fee: {adminFee || '0.00'} %
          </p>
          {/* {Number(totalAmountToPayInUSD) > 50 && (taskCenterDetails?.tradeToEarnPercentage > 0) &&
                        <h6 className='text-center'>Rewards Applied for this order: {(Math.floor(Number(totalAmountToPayInUSD) * (taskCenterDetails?.tradeToEarnPercentage) / 100 * 100)) / 100} INEX</h6>
                    } */}
          {/* setScreenName("BSConvertInProgress")  rocessSellOrder() ({Math.floor(totalAmountToPayInUSD * 100 ) /  100} USD)*/}
          {/* <Button type="primary" className="atn-btn atn-btn-round" block onClick={() => navigate("/indexx-exchange/buy-sell/convert-in-progress")}> Confirm Conversion (11s)</Button> */}
          <Button
            type="primary"
            className="atn-btn atn-btn-round"
            loading={loadings}
            block
            onClick={() => createProcessOrder()}
          >
            {' '}
            Confirm Conversion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BSConfirmConvert;
