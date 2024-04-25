import React, { useState } from 'react';
// import IN500 from "../../assets/token-icons/33.png";
import { Select } from 'antd';
// import Select from 'react-select';
// import { Option } from 'antd/lib/mentions';
import bsDollar from '../../assets/arts/usd icon 1.svg';
import bitcoinIcon from '../../assets/arts/Setoshi-Mask-0031.png';
// import SwapArrowIcon from "../../assets/arts/SwapArrowIcon.svg";
import initialTokens from '../../utils/Tokens.json';
import graphTokens from '../../utils/graphs.json';
// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  getHoneyBeeDataByUsername,
  getMinAndMaxOrderValues,
  isLoggedIn,
} from '../../services/api';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import './BS-Sell.css';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

interface Props {
  setScreenName: (value: string | ((prevVar: string) => string)) => void;
  tokenType: number;
  subtokenType: number;
  setActiveTab?: any;
}

const BuyContent: React.FC<Props> = ({
  setScreenName,
  tokenType,
  setActiveTab,
  subtokenType,
}) => {
  const navigate = useNavigate();

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
  const newarr = initialTokens.map((token: any) => {
    return {
      ...token,
      children: `${token.title} - ${token.subTitle}`,
    };
  });
  console.log(newarr);
  const [filteredtokens, setFilteredtokens] = useState(newarr);

  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'light'
  );
  useEffect(() => {
    const handleStorageChange = (event: any) => {
      setTheme(event.currentTarget.localStorage.selectedTheme);
      if (window.location.pathname.includes('for-honeybee')) {
        setTheme('light');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  useEffect(() => {
    const topCryptoTokens = ['WIBS', 'IN500', 'INEX', 'IUSD+', 'INXC'];

    let filtered: any[] = [];
    if (tokenType === 1) {
      if (subtokenType === 0) {
        // Stock tokens
        filtered = newarr.filter(
          (item) => item.isStock || item.subTitle.includes('SNP500')
        );
      } else if (subtokenType === 1) {
        // ETF tokens
        filtered = newarr.filter((item) => item.isETF);
      }
      // Sort alphabetically for Stocks and ETFs
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (tokenType === 0) {
      // Crypto tokens
      filtered = newarr.filter((item) => !item.isStock && !item.isETF);

      // Custom sorting for Crypto: top tokens first, then alphabetically
      filtered.sort((a, b) => {
        if (
          topCryptoTokens.includes(a.title) &&
          topCryptoTokens.includes(b.title)
        ) {
          return (
            topCryptoTokens.indexOf(a.title) - topCryptoTokens.indexOf(b.title)
          );
        } else if (topCryptoTokens.includes(a.title)) {
          return -1;
        } else if (topCryptoTokens.includes(b.title)) {
          return 1;
        }
        return a.title.localeCompare(b.title);
      });
    } else {
      // All tokens
      filtered = [...newarr];
    }

    setFilteredtokens(filtered);
    handleChange(filtered[0]?.address);
  }, [tokenType, subtokenType]);

  const [params] = useSearchParams();
  const urlParams = new URLSearchParams(window.location.search);
  const coinnameToIndex: Record<string, number> = {
    iusd: 3,
    inexbrc: 2,
    inexplg: 1,
  };
  useEffect(() => {
    const coinname = urlParams.get('coinname') || '';

    const defToken = String(params.get('toksymbol'));
    console.log('eff trig');
    const filtered = filteredtokens.find((x) => x.title === defToken);
    console.log(filtered, 'filtered token', filtered?.address);

    if (filtered?.address) {
      console.log('calling change');
      handleChange(filtered.address);
    } else {
      handleChange(filteredtokens[coinnameToIndex[coinname] || 0]?.address);
    }
  }, [filteredtokens, tokenType, subtokenType]);

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
      if (honeyBeeId === 'undefined' || honeyBeeId === '')
        navigate(
          `/indexx-exchange/buy-sell/confirm-purchase?amount=${buyVal}&token=${BSvalue.fromToken}`
        );
      else
        navigate(
          `/indexx-exchange/buy-sell/for-honeybee/${honeyBeeId}/confirm-purchase?amount=${buyVal}&token=${BSvalue.fromToken}`
        );
      // setScreenName("confirmPurchase");
    } else {
      // setScreenName("create");
      if (honeyBeeId === 'undefined' || honeyBeeId === '')
        navigate('/indexx-exchange/buy-sell/create');
      else
        navigate(`/indexx-exchange/buy-sell/for-honeybee/${honeyBeeId}/create`);
    }
  };

  const [buyVal, setBuyVal] = useState('');
  const [isLimitPassed, setLimitPassed] = useState(true);
  const [minMavData, setMinMaxData] = useState() as any;
  const { id } = useParams();
  const [honeyBeeId, setHoneyBeeId] = useState('');

  const categorizeTokens = (tokens: any) => {
    return {
      Crypto: tokens.filter((token: any) => !token.isStock && !token.isETF),
      StockTokens: tokens.filter((token: any) => token.isStock),
      ETFs: tokens.filter((token: any) => token.isETF),
    };
  };

  const categorizedTokens = categorizeTokens(filteredtokens);
  console.log(categorizedTokens, 'categorized tokenn');
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

    if (BSvalue?.fromToken) {
      handleChange(BSvalue.fromToken);
    }
  }, [BSvalue.fromTitle, BSvalue.amount, id, BSvalue.fromToken]);
  const [selectedOption, setSelectedOption] = useState<any>(null);
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
            <span
              className="font_20x pe-1"
              style={{ color: 'var(--body_color)' }}
            >
              $
            </span>
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
        <div
          className="font_20x opacity-75 justify-content-center d-flex"
          style={{ color: 'var(--body_color)' }}
        >
          Enter Amount to Buy
        </div>
        {!isLimitPassed ? (
          <div className="error_message font_15x">
            You can only Buy a minimum of {String(minMavData?.min)} USD or
            maximum of {String(minMavData?.max)} USD
          </div>
        ) : (
          <></>
        )}
      </div>

      <div
        className="bs_token cursor-pointer py-3"
        style={{ alignItems: 'center' }}
      >
        <div className="bs_token_left d-flex justify-between">
          <div className=" d-flex flex-justify-between flex-align-center width-100 style-sel">
            <span
              style={{
                marginRight: '30px',
                fontWeight: 'bold',
                fontSize: '16px',
                color: theme === 'dark' ? 'white' : 'black',
                marginLeft: '11px',
              }}
            >
              {' '}
              Buy
            </span>

            <Select
              className="width-100 border-0"
              onChange={handleChange}
              style={{
                width: '100%',
              }}
              value={BSvalue?.fromToken}
              dropdownStyle={{
                backgroundColor: 'var(--body_background)',
                color: 'var(--body_color)',
              }}
              showSearch // Enable search functionality
              // Define the property to filter options by
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
                        <Select.Option
                          key={token.address}
                          value={token.address}
                          className="common__token d-flex bs_token_container"
                          data-address={token.address}
                          style={{ paddingLeft: '15px', paddingRight: 0 }}
                        >
                          <div className="d-flex bs_token_num select-drop">
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
                                  ? '57'
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
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                  )
              )}
            </Select>
          </div>
        </div>
      </div>
      <div
        className="bs_token cursor-pointer py-3"
        style={{ alignItems: 'center' }}
      >
        <div
          className="bs_token_left d-flex justify-between align-items-center"
          style={{ height: '55px', padding: '0 11px' }}
        >
          <div className="bs_token_num d-flex text-start align-items-center">
            <span
              style={{
                marginRight: '12px',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              Pay with
            </span>
            <img
              src={bsDollar}
              alt="Index icon"
              width="40"
              style={{ marginRight: 11 }}
            />
            USD
          </div>
        </div>
      </div>
      <div
        className="bs_token cursor-pointer py-3"
        style={{ alignItems: 'center' }}
      >
        <div
          className="bs_token_left d-flex justify-between align-items-center"
          style={{ height: '55px', padding: '0 11px' }}
        >
          <div className="bs_token_num d-flex justify-between align-items-center">
            <span
              onClick={() => {
                console.log('handle crypto click');
                setActiveTab('3');
              }}
              style={{
                marginRight: '12px',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              Pay with
            </span>
            <img
              src={bitcoinIcon}
              alt="Index icon"
              width="40"
              style={{ marginRight: 11 }}
            />
            Crypto
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
