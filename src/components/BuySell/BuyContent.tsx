import React, { useState } from 'react';
// import IN500 from "../../assets/token-icons/33.png";
import { Select } from 'antd';
// import { Option } from 'antd/lib/mentions';
import bsDollar from '../../assets/arts/usd icon 1.svg';
// import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import initialTokens from '../../utils/Tokens.json';
import graphTokens from '../../utils/graphs.json';
// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getHoneyBeeDataByUsername, getMinAndMaxOrderValues, isLoggedIn } from '../../services/api';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import './BS-Sell.css';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  setScreenName: (value: string | ((prevVar: string) => string)) => void;
  tokenType: number;
}

const BuyContent: React.FC<Props> = ({ setScreenName, tokenType }) => {
  const navigate = useNavigate();
  const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
  const [filteredtokens, setFilteredtokens] = useState(initialTokens);
  
  useEffect(() => {
    if(tokenType === 2) {
      const filtered = initialTokens.filter(item =>
        item.subTitle.toLowerCase().includes('Stock'.toLowerCase()) ||
        item.subTitle.toLowerCase().includes('SNP500'.toLowerCase())
      );
      setFilteredtokens(filtered);
      
      handleChange(filtered[0].address);
    }

    else if (tokenType === 1){
      const filtered = initialTokens.filter(item =>
        !item.subTitle.toLowerCase().includes('Stock'.toLowerCase()) &&
        !item.subTitle.toLowerCase().includes('SNP500'.toLowerCase())

      );
      setFilteredtokens(filtered);
      handleChange(filtered[0].address);
    }

    else if (tokenType === 0){
      setFilteredtokens(initialTokens);
      handleChange(initialTokens[0].address);
    }
  }, [tokenType])
  

  const navigateUser = () => {
    let getRequiredCoin = filteredtokens.find(
      (x) => x.address === BSvalue?.fromToken
    );
    if (getRequiredCoin?.title === 'INXP' || getRequiredCoin?.title === 'FTT') {
      alert(
        'Indexx Phoenix(INXP) and FTX Token(FTT) are not available for Buy'
      );
      return;
    }
    if (isLoggedIn()) {
      if (setBSvalue && BSvalue) {
        setBSvalue({ ...BSvalue, amount: parseFloat(buyVal) });
      }
      if (honeyBeeId === "undefined" || honeyBeeId === "")
        navigate('/indexx-exchange/buy-sell/confirm-purchase');
      else
        navigate(`/indexx-exchange/buy-sell/for-honeybee/${honeyBeeId}/confirm-purchase`);
      // setScreenName("confirmPurchase");
    } else {
      // setScreenName("create");
      if (honeyBeeId === "undefined" || honeyBeeId === "")
        navigate('/indexx-exchange/buy-sell/create');
      else
        navigate(`/indexx-exchange/buy-sell/for-honeybee/${honeyBeeId}/create`);
    }

  };

  const [buyVal, setBuyVal] = useState('');
  const [isLimitPassed, setLimitPassed] = useState(true);
  const [minMavData, setMinMaxData] = useState() as any;
  const { id } = useParams();
  const [honeyBeeId, setHoneyBeeId] = useState("");

  useEffect(() => {
    

    if (id) {
      setHoneyBeeId(String(id));
    }

    if (BSvalue.amount !== 0) {
      setBuyVal(BSvalue?.amount.toString());
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
      // 
      setMinMaxData(x);
    });
  }, [BSvalue.fromTitle, BSvalue.amount, id]);

  const handleChange = async (value: string) => {
    let getRequiredCoin = filteredtokens.find((x) => x.address === value);
    let getGraphCoin = graphTokens.find((x) => x.address === value);

    if (setBSvalue && BSvalue) {
      setBSvalue({
        ...BSvalue,
        fromToken: value,
        fromGraph: String(getGraphCoin?.graph),
      });
    }
    await checkMinMaxValue(String(getRequiredCoin?.title), parseInt(buyVal));
  };

  const checkMinMaxValue = async (value: string, buyValue: number) => {
    let minAndMax = await getMinMaxValue(value);
    if (buyValue > minAndMax.max) {
      setLimitPassed(false);
    } else if (buyValue < minAndMax.min) {
      setLimitPassed(false);
    } else {
      setLimitPassed(true);
    }
  };

  const getMinMaxValue = async (value: string) => {
    let res = await getMinAndMaxOrderValues(value, 'BUY');
    return res;
  };

  const updateBuyVal = async (e: React.FormEvent<HTMLInputElement>) => {
    let testVal: string = '';
    if (e.currentTarget != null) {
      testVal = e?.currentTarget?.value;

      if (!/^\d{0,6}(?:\.\d{0,5})?$/.test(testVal)) {
        e.preventDefault();
        return;
      }

      setBuyVal(testVal);

      // let charFontSize = (testVal.length > 7) ? 0.9 : 1.1;
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

      let value = BSvalue?.fromToken;
      // debugger;
      let getRequiredCoin = filteredtokens.find((x) => x.address === value);
      await checkMinMaxValue(String(getRequiredCoin?.title), parseInt(testVal));
    }
  };

  return (
    <div>
      <div
        className="padding-lr-1x padding-tb-3x"
        style={{ paddingTop: 50, paddingBottom: 50 }}
      >
        <div className="bs_curreny d-flex position-relative ">
          <div
            className="bs_curreny_left padding-2x"
            style={{ transform: 'scale(1)' }}
          >
            <span className="font_20x pe-1" style={{ color: "var(--body_color)" }}>$</span>
            {/* <input placeholder="0" className=" " type="text" value={val} onChange={() => updateBuyVal} style={{ width: "207px" }} /> */}

            <input
              placeholder="0"
              className="input_currency "
              type="number"
              value={buyVal}
              onChange={updateBuyVal}
              style={{ width: '1.2ch' }}
            />
          </div>
          {/* <div className='swap_Arrow_icon'>
                    <img src={SwapArrowIcon} className="hover_icon" alt="ddd" style={{ position: "absolute", right: "4px", top: "60%" }} />
                </div> */}
        </div>
        <div className="font_20x opacity-75 justify-content-center d-flex" style={{ color: "var(--body_color)" }}>Enter Amount</div>
        {!isLimitPassed ? (
          <div className="error_message font_15x">
            You can only Buy a minimum of {String(minMavData?.min)} USD or
            maximum of {String(minMavData?.max)} USD
          </div>
        ) : (
          <></>
        )}
        {/* <div className="bs_purchase d-flex">
                <Dropdown overlay={menu} trigger={['click']} >
                    <Space style={{ color: "#11be6a" }}>
                        <ReloadOutlined className='swap_icons' style={{ fontSize: 16, marginRight: 10 }} />
                        One-time purchase
                    </Space>
                </Dropdown>
            </div> */}
        {/* <div>Rate {BSvalue?.lastPrice} USD</div> */}
      </div>
      <div
        className="bs_token d-flex cursor-pointer py-3"
        style={{ alignItems: 'center' }}
      >
        <div
          className="bs_token_left d-flex justify-between align-items-center"
          style={{ height: '55px', padding: '0 11px' }}
        >
          <div className="bs_token_num d-flex text-start align-items-center">
            <img
              src={bsDollar}
              alt="Index icon"
              width="38"
              height="38"
              style={{ marginRight: 11 }}
            />
            USD <span className="token_grey">US Dollar</span>
          </div>
        </div>
      </div>
      <div
        className="bs_token d-flex cursor-pointer py-3"
        style={{ alignItems: 'center' }}
      >
        <div className="bs_token_left d-flex justify-between">
          <div className=" d-flex flex-justify-between flex-align-center width-100 style-sel">
            <Select
              className="width-100 border-0"
              onChange={handleChange}
              value={BSvalue?.fromToken}
              dropdownStyle={{ backgroundColor: "var(--body_background)", color: "var(--body_color)" }}
            >
              {filteredtokens
                //  .filter((x) => !(x.title === "INXP" || x.title === "FTT"))
                .map((token, index) => {
                  return (
                    <Select.Option
                      key={token.address}
                      value={token.address}
                      className="common__token d-flex bs_token_container"
                      data-address={token.address}
                      style={{paddingLeft : "15px", paddingRight : 0}}
                    >
                      <div className="d-flex bs_token_num select-drop">
                        <img
                          src={
                            require(`../../assets/token-icons/${token.image}.png`)
                              .default
                          }
                          alt="IN500"
                          width="38"
                          height="38"
                        />
                        <div className=" padding-l-1x d-flex flex-align-center">
                          {token.title}{' '}
                          <span
                            style={{ color: 'var(--body_color)' }}
                            className="margin-l-0_5x"
                          >
                            {token.subTitle}
                          </span>{' '}
                        </div>
                      </div>
                    </Select.Option>
                  );
                })}
            </Select>
          </div>
        </div>
      </div>

      <div className="bs_footer_action">
        {/* disabled={(!isLimitPassed)} */}
        <button
          onClick={navigateUser}
          className={!isLimitPassed || buyVal === '' ? 'disable_icon ' : ''}
          style={{ marginTop: 18 }}
        >
          Preview Purchase{' '}
        </button>
      </div>
    </div>
  );
};

export default BuyContent;
