import React, { useEffect, useRef, useState } from 'react';
import bsDollar from '../../assets/arts/usd icon 1.svg';
import './BS-Sell.css';
import { Select, Modal, Button } from 'antd';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import { Option } from 'antd/lib/mentions';
import initialTokens from '../../utils/Tokens.json';
import graphTokens from '../../utils/graphs.json';
import {
  getMinAndMaxOrderValues,
  getWalletBalance,
  decodeJWT,
  getHoneyBeeDataByUsername,
} from '../../services/api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import OpenNotification from '../OpenNotification/OpenNotification';

export interface TokensObj {
  title: string;
  subTitle: string;
  image: string;
  address: string;
  commonToken: boolean;
  graph: string;
}

interface Props {
  setScreenName: (value: string | ((prevVar: string) => string)) => void;
  tokenType: number;
  subtokenType: number;
}
const BSSellIntro: React.FC<Props> = ({
  setScreenName,
  tokenType,
  subtokenType,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [val, setVal] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  // const [flag, setFlag] = useState(false);
  const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
  const [isLimitPassed, setLimitPassed] = useState(true);
  const [minMavData, setMinMaxData] = useState() as any;
  const [email, setEmail] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [showUserBalance, setShowUserBalance] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [isTransferModalVisible, setIsTransferModalVisible] = useState(false);
  const [honeyBeeId, setHoneyBeeId] = useState('');
  const [honeyBeeEmail, setHoneyBeeEmail] = useState('');
  const [filteredtokens, setFilteredtokens] = useState(initialTokens);

  useEffect(() => {
    if (tokenType === 2) {
      if (subtokenType === 0) {
        const filtered = initialTokens.filter(
          (item) =>
            (item.subTitle.toLowerCase().includes('Stock'.toLowerCase()) ||
              item.subTitle.toLowerCase().includes('SNP500'.toLowerCase())) &&
            !item.subTitle.toLowerCase().includes('ETF'.toLowerCase())
        );
        setFilteredtokens(filtered);
        handleChange(filtered[0].address);
      } else if (subtokenType === 1) {
        const filtered = initialTokens.filter((item) =>
          item.subTitle.toLowerCase().includes('ETF'.toLowerCase())
        );
        setFilteredtokens(filtered);
        handleChange(filtered[0].address);
      }
    } else if (tokenType === 1) {
      const filtered = initialTokens.filter(
        (item) =>
          !item.subTitle.toLowerCase().includes('Stock'.toLowerCase()) &&
          !item.subTitle.toLowerCase().includes('SNP500'.toLowerCase()) &&
          !item.subTitle.toLowerCase().includes('ETF'.toLowerCase())
      );
      setFilteredtokens(filtered);
      handleChange(filtered[0].address);
    } else if (tokenType === 0) {
      setFilteredtokens(initialTokens);
      handleChange(initialTokens[0].address);
    }
  }, [tokenType, subtokenType]);

  const categorizeTokens = (tokens: any) => {
    return {
      Crypto: tokens.filter((token: any) => !token.isStock && !token.isETF),
      StockTokens: tokens.filter((token: any) => token.isStock),
      ETFs: tokens.filter((token: any) => token.isETF),
    };
  };

  const categorizedTokens = categorizeTokens(filteredtokens);

  // useEffect(() => {
  //     // initialTokens = initialTokens.filter((x) => !(x.title === "INXP" || x.title === "FTT"))
  //     let access_token = String(localStorage.getItem("access_token"));
  //     let decoded: any = decodeJWT(access_token);
  //     setEmail(decoded.email)
  //     if (BSvalue && BSvalue.amount !== 0) {
  //         setVal(BSvalue?.amount.toString());
  //         let amount = BSvalue?.amount.toString();
  //         let charFontSize = amount.length < 7 ? "1.1" : amount.length < 9 ? "0.9" : amount.length < 12 ? "0.8" : amount.length < 15 ? "0.6" : "0.4";
  //         let charWidth = amount.length <= 1 ? 1.2 : 0.9
  //         if (document.getElementsByClassName("input_currency")[0]) {
  //             let element = document.getElementsByClassName("input_currency")[0] as HTMLBodyElement;
  //             element.style.width = ((amount.length + 1) * charWidth) + 'ch';
  //             element.style.fontSize = charFontSize + "ch";
  //         }
  //     }
  //     getMinMaxValue(String(BSvalue?.fromTitle)).then((x) => {
  //         setMinMaxData(x);

  //     });

  //     if (id) {
  //         setHoneyBeeId(String(id));
  //         getHoneyBeeDataByUsername(String(id)).then((data) => {

  //             setHoneyBeeEmail(data.data.userFullData?.email);
  //         });

  //     }

  //     if (BSvalue?.fromToken) {
  //         handleChange(BSvalue.fromToken);
  //     }

  //     // Set initial input field value
  //     if (BSvalue?.amount) {
  //         setVal(BSvalue.amount.toString());
  //     }
  // }, [email, BSvalue])

  // On Component Mount
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      const decoded = decodeJWT(access_token);
      setEmail(decoded.email);
      if (BSvalue && BSvalue.amount !== 0) {
        setVal(BSvalue?.amount.toString());
        let amount = BSvalue?.amount.toString();
        let charFontSize =
          amount.length < 7
            ? '1.1'
            : amount.length < 9
            ? '0.9'
            : amount.length < 12
            ? '0.8'
            : amount.length < 15
            ? '0.6'
            : '0.4';
        let charWidth = amount.length <= 1 ? 1.2 : 0.9;
        if (document.getElementsByClassName('input_currency')[0]) {
          let element = document.getElementsByClassName(
            'input_currency'
          )[0] as HTMLBodyElement;
          element.style.width = (amount.length + 1) * charWidth + 'ch';
          element.style.fontSize = charFontSize + 'ch';
        }
      }
      getMinMaxValue(String(BSvalue?.fromTitle)).then((x) => {
        setMinMaxData(x);
      });

      if (id) {
        setHoneyBeeId(String(id));
        getHoneyBeeDataByUsername(String(id)).then((data) => {
          setHoneyBeeEmail(data.data.userFullData?.email);
        });
      }
    }
  }, []); // Empty dependency array to run only once

  const location = useLocation();

  // For handling BSvalue.amount changes
  useEffect(() => {
    if (BSvalue?.amount !== 0) {
      setVal(BSvalue.amount.toString());
      // ... update element styles as needed ...
    }
  }, [BSvalue?.amount]);

  // For handling BSvalue.fromTitle changes
  useEffect(() => {
    if (BSvalue?.fromTitle) {
      getMinMaxValue(BSvalue.fromTitle).then(setMinMaxData);
    }
  }, [BSvalue?.fromTitle]);

  // For handling BSvalue.fromToken changes
  useEffect(() => {
    if (BSvalue?.fromToken) {
      handleChange(BSvalue.fromToken);
    }
  }, [BSvalue?.fromToken]);

  useEffect(() => {
    if (BSvalue?.fromToken) {
      const selectedToken = filteredtokens.find(
        (token) => token.address === BSvalue.fromToken
      );
      getCoinBalance(String(selectedToken?.title));
    }
  }, [location]);

  const getCoinBalance = async (value: string) => {
    if (honeyBeeId && honeyBeeEmail) {
      const res = await getWalletBalance(honeyBeeEmail, value);
      setSelectedCoin(value);
      if (res.status === 200) {
        setUserBalance(res.data.balance);
        setShowUserBalance(true);
      } else {
        setUserBalance(0);
        setShowUserBalance(true);
      }
    } else {
      let access_token = String(localStorage.getItem('access_token'));
      let decoded: any = decodeJWT(access_token);
      let email = decoded.email;
      const res = await getWalletBalance(email, String(value));
      setSelectedCoin(value);
      if (res.status === 200) {
        setUserBalance(res.data.balance);
        setShowUserBalance(true);
      } else {
        setUserBalance(0);
        setShowUserBalance(true);
      }
    }
  };
  const handleTransferOk = () => {
    setIsTransferModalVisible(false);
  };

  const handleTransferCancel = () => {
    setIsTransferModalVisible(false);
  };

  // Function to update the user balance
  const updateUserBalance = async (tokenTitle: string) => {
    let access_token = String(localStorage.getItem('access_token'));
    let decoded: any = decodeJWT(access_token);
    let email = decoded.email;
    const balanceResponse = await getWalletBalance(email, tokenTitle);
    if (balanceResponse.status === 200) {
      setUserBalance(balanceResponse.data.balance);
    } else {
      setUserBalance(0); // Handle error or set default balance
    }
  };

  useEffect(() => {
    // Function to be called when the location changes
    const handleLocationChange = () => {
      // Update the balance here
      const selectedToken = filteredtokens.find(
        (token) => token.address === BSvalue.fromToken
      );
      let access_token = String(localStorage.getItem('access_token'));
      let decoded: any = decodeJWT(access_token);
      setEmail(decoded.email);
      if (selectedToken) {
        updateUserBalance(selectedToken.title);
      }
    };

    // Call the function when the component mounts or location changes
    handleLocationChange();
  }, [location, filteredtokens, BSvalue.fromToken]);

  const handleChange = async (value: string) => {
    let getRequiredCoin = filteredtokens.find((x) => x.address === value);
    if (getRequiredCoin?.title === 'INXP' || getRequiredCoin?.title === 'FTT') {
      setIsTransferModalVisible(true);

      // alert("Indexx Phoenix(INXP) and FTX Token(FTT) are not available for Sell");
    }
    let getGraphCoin = graphTokens.find((x) => x.address === value);
    // setNetwork(value)

    if (setBSvalue && BSvalue) {
      setBSvalue({
        ...BSvalue,
        fromToken: value,
        fromGraph: String(getGraphCoin?.graph),
      });
    }
    await checkMinMaxValue(String(getRequiredCoin?.title), parseInt(val));
    await getCoinBalance(String(getRequiredCoin?.title));
  };

  const updateVal = async (e: React.FormEvent<HTMLInputElement>) => {
    let testVal: string = e.currentTarget.value;

    if (e.currentTarget != null) {
      testVal = e?.currentTarget?.value;
      if (!/^\d{0,6}(?:\.\d{0,5})?$/.test(testVal)) {
        e.preventDefault();
        return;
      }
      setVal(testVal);

      let charFontSize =
        testVal.length < 7
          ? '1.1'
          : testVal.length < 9
          ? '0.9'
          : testVal.length < 12
          ? '0.8'
          : testVal.length < 15
          ? '0.6'
          : '0.4';
      let charWidth = testVal.length <= 1 ? 1.1 : 0.9;
      e.currentTarget.style.width = (testVal.length + 1) * charWidth + 'ch';
      e.currentTarget.style.fontSize = charFontSize + 'ch';

      let value = BSvalue?.fromTitle;

      await checkMinMaxValue(String(value), parseInt(testVal));
      handleChange(String(BSvalue?.fromToken));
    }
  };

  const filteredFromArray = filteredtokens.filter(function (obj: any) {
    return obj?.address === BSvalue?.fromToken;
  });

  const getMinMaxValue = async (value: string) => {
    let res = await getMinAndMaxOrderValues(value, 'SELL');

    return res;
  };

  const checkMinMaxValue = async (value: string, buyValue: number) => {
    let minAndMax = await getMinMaxValue(value);
    setMinMaxData(minAndMax);
    if (buyValue > minAndMax.max) {
      setLimitPassed(false);
    } else if (buyValue < minAndMax.min) {
      setLimitPassed(false);
    } else {
      setLimitPassed(true);
    }
  };

  // Utility function to check if a token is an Indexx token
  const isIndexxToken = (tokenTitle: string) => {
    const indexxTokens = [
      'IN500',
      'INEX',
      'INXC',
      'IUSD+',
      'ALCRYP',
      'AMZN',
      'APPL',
      'BCM',
      'CRYC10',
      'EQSTK',
      'GOOGL',
      'INDXXF',
      'META',
      'MSFT',
      'NVDA',
      'PEP',
      'SNP500',
      'TSLA',
      'TOB'
    ];
    return indexxTokens.includes(tokenTitle);
  };

    // Utility function to check if a token is WIBS token
    const isWIBSToken = (tokenTitle: string) => {
      const indexxTokens = [
        'WIBS'
      ];
      return indexxTokens.includes(tokenTitle);
    };

    
  const formSubmit = () => {
    let getRequiredCoin = filteredtokens.find(
      (x) => x.address === BSvalue?.fromToken
    );

    // Check for disallowed selling of Indexx Tokens
    if (isIndexxToken(String(getRequiredCoin?.title))) {
      //alert("Selling of Indexx tokens is not allowed.");
      OpenNotification(
        'error',
        'Feature of selling Indexx tokens is coming soon.'
      );
      return;
    }

    if (isWIBSToken(String(getRequiredCoin?.title))) {
      //alert("Selling of Indexx tokens is not allowed.");
      OpenNotification(
        'error',
        'Feature of selling WIBS tokens is coming soon.'
      );
      return;
    }

    if (getRequiredCoin?.title === 'INXP' || getRequiredCoin?.title === 'FTT') {
      setIsTransferModalVisible(true);
      return;
    }
    if (val) {
      if (honeyBeeId === 'undefined' || honeyBeeId === '')
        navigate('/indexx-exchange/buy-sell/sell-confirm-convert');
      else
        navigate(
          `/indexx-exchange/buy-sell/sell-confirm-convert/${honeyBeeId}`
        );
      // setScreenName("BSSellConfirmConvert");

      if (setBSvalue && BSvalue) {
        setBSvalue({ ...BSvalue, amount: parseFloat(val) });
      }
    }
  };

  return (
    <div className="sell_screens">
      <div
        className="padding-lr-1x padding-tb-3x"
        style={{ paddingTop: 50, paddingBottom: 50 }}
      >
        <div className="bs_curreny d-flex position-relative ">
          <div
            className="bs_curreny_left padding-2x"
            style={{ transform: 'scale(1)' }}
          >
            <input
              placeholder="0"
              ref={ref}
              className="input_currency"
              type="text"
              value={val}
              onChange={updateVal}
              style={{ width: '1.2ch' }}
            />
            <span className="font_20x px-1">{filteredFromArray[0].title}</span>

            {/* <span className="font_20x">IN500</span> */}
          </div>
          {/* <div className='swap_Arrow_icon'>
                        <img src={SwapArrowIcon} alt="ddd" className="hover_icon" style={{ position: "absolute", right: "4px", top: "60%" }} />
                    </div> */}
        </div>
        <div
          className="font_20x opacity-75 justify-content-center d-flex"
          style={{ color: 'var(--body_color)' }}
        >
          Enter Amount
        </div>

        {/* {((!isLimitPassed) && )?
                    <div className='error_message font_15x'>You can only Sell a minimum of {String(minMavData?.min)} USD or maximum of {String(minMavData?.max)} USD </div>
                    :
                    <></>
                } */}

        <Modal
          maskStyle={{ backdropFilter: 'blur(2px)' }}
          centered={true}
          open={isTransferModalVisible}
          onOk={handleTransferOk}
          onCancel={handleTransferCancel}
          width={670}
          maskClosable={false}
          className="custom-modal"
          footer={[
            <Button
              className="center"
              type="link"
              onClick={handleTransferCancel}
            >
              Ok
            </Button>,
          ]}
          bodyStyle={{
            background: 'var(--body_background)',
            color: 'var(--body_color)',
          }}
        >
          <div
            className="align-center text-center"
            style={{ backgroundColor: 'var(--body_background)' }}
          >
            {/* <Image preview={false} src={lockedimage}></Image> */}
            <p
              className="text-center"
              style={{ fontSize: 20, fontWeight: 400 }}
            >
              Error Message
            </p>
            <p>
              Indexx Phoenix(INXP) and FTX Token(FTT) are currently not
              available for Sell
            </p>
          </div>
        </Modal>
      </div>
      <div
        className="bs_token cursor-pointer py-3"
        style={{ alignItems: 'center' }}
      >
        <Select
          className="width-100 border-0"
          onChange={handleChange}
          value={BSvalue?.fromToken}
          dropdownStyle={{
            backgroundColor: 'var(--body_background)',
            color: 'var(--body_color)',
          }}
        >
          {Object.entries(categorizedTokens).map(
            ([category, tokens]) =>
              tokens.length > 0 && (
                <Select.OptGroup
                  key={category}
                  label={
                    <span
                      className={`custom-optgroup-label theme-${localStorage.getItem(
                        'userlogged'
                      )}`}
                    >
                      {category}
                    </span>
                  }
                >
                  {tokens.map((token: any) => (
                    <Option
                      key={token.address}
                      value={token.address}
                      className="common__token d-flex bs_token_container"
                      data-address={token.address}
                      style={{ paddingLeft: '15px', paddingRight: 0 }}
                    >
                      <div className="d-flex bs_token_num select-drop">
                        <span
                          style={{
                            marginRight: '73px',
                            marginBottom: '-21px',
                            transform: 'translateY(5px)',
                            fontWeight: 'bold',
                            fontSize: '16px',
                          }}
                        >
                          {' '}
                          Sell
                        </span>
                        <img
                          src={
                            require(`../../assets/token-icons/${token.image}.png`)
                              .default
                          }
                          alt={token.title}
                          width={
                            ['INEX', 'IN500', 'INXC', 'IUSD'].some((str) =>
                              token.image.includes(str)
                            )
                              ? '55'
                              : '40'
                          }
                        />
                        <div className="padding-l-1x d-flex flex-align-center">
                          {token.title}
                          <span
                            style={{ color: 'var(--body_color)' }}
                            className="margin-l-0_5x"
                          >
                            {token.subTitle}
                          </span>
                        </div>
                      </div>
                    </Option>
                  ))}
                </Select.OptGroup>
              )
          )}
        </Select>
      </div>

      <div
        className="bs_token cursor-pointer py-4"
        style={{ alignItems: 'center' }}
      >
        <div className="bs_token_left d-flex justify-between">
          <div
            className="bs_token_num d-flex flex-align-center pe-3"
            style={{ paddingLeft: '12px' }}
          >
            <span
              style={{
                marginRight: '20px',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              {' '}
              Deposit to
            </span>
            <img
              src={bsDollar}
              alt="Index icon"
              width="40"
              style={{ marginRight: 11 }}
            />
            USD <span className="token_grey">US Dollar</span>
          </div>
        </div>
        {/* <div>  <img src={arrowAddress} className="arrow_address" alt="arrow icon" style={{}} /></div> */}
      </div>
      <div className="bs_footer_action ">
        {/* <button className="sell_btn" disabled={(!isLimitPassed)} onClick={formSubmit}>Preview Sell </button> */}
        <button
          style={{ marginTop: 0 }}
          className={
            (parseFloat(val) < 0.00001 || isNaN(parseFloat(val))) &&
            parseFloat(val) <= Math.floor(userBalance * 1000) / 1000
              ? 'disable_icon'
              : userBalance === 0 || userBalance < parseFloat(val)
              ? 'disable_icon'
              : ''
          }
          onClick={formSubmit}
        >
          Preview Sell{' '}
        </button>
      </div>
      {/* {showUserBalance && */}
      <div>
        <h6 className="text-center mb-0">
          {' '}
          Current Available Balance : {Math.floor(userBalance * 10000) /
            10000}{' '}
          {filteredFromArray[0].title}{' '}
        </h6>
      </div>
      {/* } */}
    </div>
  );
};
export default BSSellIntro;
