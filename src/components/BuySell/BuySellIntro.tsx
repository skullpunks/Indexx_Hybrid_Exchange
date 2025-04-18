import React from 'react';
import { Tabs } from 'antd';
import BSConvertIntro from './BSConvertIntro';
import BSSellIntro from './BSSellIntro';
import BuyContent from './BuyContent';
import { BSContext, BSContextType } from '../../utils/SwapContext';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import lockedimage from '../../assets/arts/locked.png';
import { Button, Modal, Image } from 'antd';
import {
  baseDEXURL,
  geolocationData,
  getHoneyBeeDataByUsername,
} from '../../services/api';
import { useState, useEffect } from 'react';
import './BuySellIntro.css';

interface Props {
  setScreenName: (value: string | ((prevVar: string) => string)) => void;
  tokenType: number;
  subtokenType: number;
  setActiveTab?: any;
}

const filteredArray = (items: any, keyName: any, key: any) => {
  return items.filter(function (obj: any) {
    return obj[keyName] === key;
  });
};

const BuySellIntro: React.FC<Props> = ({
  setScreenName,
  tokenType,
  subtokenType,
}) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('1');
  const [ip, setIP] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [isTransferModalVisible, setIsTransferModalVisible] = useState(false);
  const [honeyBeeId, setHoneyBeeId] = useState('');
  const [userData, setUserData] = useState();
  const [honeyBeeEmail, setHoneyBeeEmail] = useState('');
  const handleTransferOk = () => {
    localStorage.setItem('userIp', ip);
    setIsTransferModalVisible(false);
  };

  const handleTransferCancel = () => {
    setIsTransferModalVisible(false);
  };

  const handleOk = () => {
    // setLoading(true);
  };

  useEffect(() => {
    if (id) {
      setHoneyBeeId(String(id));
      getHoneyBeeDataByUsername(String(id)).then((data) => {
        setUserData(data.data);

        setHoneyBeeEmail(data.data.userFullData?.email);
      });
    }
    geolocationData().then((res: any) => {
      setIP(res.data.IPv4);
      setCountry(res.data.country_name);
      setCountryCode(res.data.country_code);
    });
  }, [id]);

  const userId = localStorage.getItem('user');
  const navigate = useNavigate();
  const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
  console.log(activeTab, 'active tab value');
  const items = [
    {
      label: 'Buy',
      key: '1',
      value: 'buy',
      children: (
        <BuyContent
          setScreenName={setScreenName}
          tokenType={tokenType}
          subtokenType={subtokenType}
          setActiveTab={setActiveTab}
        />
      ),
    }, // remember to pass the key prop
    {
      label: 'Sell',
      key: '2',
      value: 'sell',
      children: (
        <BSSellIntro
          setScreenName={setScreenName}
          tokenType={tokenType}
          subtokenType={subtokenType}
        />
      ),
    },
    {
      label: 'Convert',
      key: '3',
      value: 'convert',
      children: (
        <BSConvertIntro
          setScreenName={setScreenName}
          tokenType={tokenType}
          subtokenType={subtokenType}
        />
      ),
    },
  ];
  const callback = function (key: any) {
    setActiveTab(key);
    //
    if (key === '2' && (country === 'United States' || countryCode === 'US')) {
      setIsTransferModalVisible(true);
    } else {
      setIsTransferModalVisible(false);
    }

    const filteredFromArray = items.filter(function (obj) {
      return obj?.key === key;
    });
    if (setBSvalue && BSvalue) {
      setBSvalue({
        ...BSvalue,
        orderType: filteredFromArray[0].value,
        amount: 0,
      });
    }

    if (honeyBeeId === 'undefined' || honeyBeeId === '')
      navigate(`/indexx-exchange/buy-sell?type=${filteredFromArray[0].value}`);
    else
      navigate(
        `/indexx-exchange/buy-sell/for-honeybee/${honeyBeeId}?type=${filteredFromArray[0].value}`
      );
  };

  const [searchParams, setSearchParams] = useSearchParams();
  let orderType = searchParams.get('type');

  useEffect(() => {
    if (orderType) {
      let fileteredArrayWithItem = filteredArray(items, 'value', orderType);
      setActiveTab(fileteredArrayWithItem[0].key);
    }
  }, [orderType]);

  return (
    <div
      className="bs_container card"
      style={{ borderColor: 'var(--border-color)' }}
    >
      {userId ? (
        <div>
          <Modal
            maskStyle={{ backdropFilter: 'blur(2px)' }}
            centered={true}
            open={false}
            onOk={handleTransferOk}
            onCancel={handleTransferCancel}
            width={670}
            maskClosable={false}
            className="custom-modal"
            footer={[
              <Button
                danger
                size="large"
                href={baseDEXURL}
                style={{ marginBottom: 20, width: '100%' }}
                type="primary"
                onClick={handleOk}
              >
                Go To Decentralized
              </Button>,

              <Button
                className="center"
                type="link"
                onClick={handleTransferCancel}
              >
                Cancel
              </Button>,
            ]}
            bodyStyle={{
              background: 'var(--body_background)',
              color: 'var(--body_color)',
            }}
          >
            <div className="align-center text-center">
              <Image preview={false} src={lockedimage}></Image>
              <p
                className="text-center"
                style={{ fontSize: 30, fontWeight: 400 }}
              >
                Service Notice
              </p>
              <p>
                Your IP address indicates that you’re attempting to access our
                services from the US. As per our Terms and Use, we’re unable to
                provide services to users from the region. Instead, please use
                our partner platform dedicated to US customers.
              </p>
            </div>
          </Modal>
          <Tabs
            defaultActiveKey={'1'}
            activeKey={activeTab}
            items={items}
            className="bs_tab_item"
            onChange={callback}
          />
        </div>
      ) : (
        <>
          <div className="bs_container_header">
            <h1>Buy Crypto</h1>
          </div>
          <BuyContent
            setScreenName={setScreenName}
            tokenType={tokenType}
            subtokenType={subtokenType}
          />
        </>
      )}
    </div>
  );
};

export default BuySellIntro;
