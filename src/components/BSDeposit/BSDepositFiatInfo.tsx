import React from 'react';
import { useEffect, useState } from 'react';
import '../BSDepositWithdraw/BSWithdraw.css';
import {
  ArrowRightOutlined,
  CopyFilled,
  InfoCircleFilled,
} from '@ant-design/icons';
import bsDollar from '../../assets/arts/bsDollar.svg';
import { Button, Tooltip, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DialogContext, DialogCtxState } from './BSDepositFiatLayout';
import { decodeJWT, getUserDetails } from '../../services/api';

export const BSDepositFiatInfo = () => {
  const navigate = useNavigate();
  const { depositeAmount } = React.useContext(DialogContext) as DialogCtxState;
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState() as any;
  useEffect(() => {
    let access_token = String(localStorage.getItem('access_token'));
    let decoded: any = decodeJWT(access_token);
    console.log(decoded.email);
    setEmail(decoded.email);
    getUserDetails(decoded.email).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setUserData(res.data);
      }
    });
  }, [email]);

  let message = `Please include your reference code in the comments. Transfers with missing/incorrect code will be rejected`;
  return (
    <div className="scan-container bs_main wd_container">
      <div className="d-flex w_fiat flex-justify-between flex-align-center deposit_ontainer">
        <div className="d-flex flex-align-center top_heading">Deposit Fiat</div>
        <div className="flex-justify-between flex-grow-1 d-flex">
          {' '}
          <div className="order_history">
            {' '}
            <Button danger className="margin-l-2x">
              Order History
              <ArrowRightOutlined />
            </Button>
          </div>
          <Button
            danger
            className="danger_disabled"
            onClick={() => navigate('/indexx-exchange/buy-sell/deposit-crypto')}
          >
            Deposit Crypto
            <ArrowRightOutlined />
          </Button>
        </div>
      </div>
      <div className="card bs_container bank_info_card  margin-lr-auto margin-t-3x padding-2x  wd_form_container responsive_container">
        <h1 className="font_28x">3.Transfer money to process with order</h1>
        <p className="padding-b-2x padding-lr-2x padding-t-1x">
          Please transfer your funds (USD) to the account below
        </p>
        <div className="d-flex flex-align-center  padding-tb-4x border-t-1x flex-justify-between">
          <div className="d-flex flex-align-center">
            <img src={bsDollar} alt="bsDollar" width="38" height="38" />
            <p className="font_28x padding-l-1x text-heavy">USD</p>
          </div>
          <p className="font_weight_800 font_28x text-heavy">
            ${depositeAmount}
          </p>
        </div>
        <div className=" padding-t-2x border-t-1x">
          <h1>Indexx Bank Account Details</h1>
        </div>

        <div className=" padding-t-2x">
          <div className="d-flex flex-justify-between font_15x brand_color padding-b-2x">
            <span className="">Reference Code</span>
            <Link to="" className="text_link text_line font_w_800">
              {userData?._id}
              <Tooltip title="Click To Copy">
                <span>
                  <CopyFilled className="margin-l-0_5x brand_color" />
                </span>
              </Tooltip>
            </Link>
          </div>
          <Alert
            message={message}
            showIcon
            icon={
              <InfoCircleFilled style={{ color: '#11be6a', fontSize: 20 }} />
            }
            type="success"
            style={{
              backgroundColor: 'rgba(95, 95, 95, 0.1)',
              borderColor: 'rgba(95, 95, 95, 0.1)',
            }}
          />

          <div className="d-flex flex-justify-between font_15x padding-tb-2x">
            <span className="">Benificiary Account Name</span>
            <div className="font_w_800">
              {' '}
              Indexx
              <Tooltip title="Click To Copy">
                <span>
                  <CopyFilled className="margin-l-0_5x brand_color" />
                </span>
              </Tooltip>
            </div>
          </div>
          <div className="d-flex flex-justify-between font_15x">
            <span className="">Benificiary Account Number/IBAN</span>
            <div className="font_w_800">
              {' '}
              1793811546
              <Tooltip title="Click To Copy">
                <span>
                  <CopyFilled className="margin-l-0_5x brand_color" />
                </span>
              </Tooltip>
            </div>
          </div>
          <div className="d-flex flex-justify-between font_15x padding-tb-2x">
            <span className="">Benificiary Address</span>
            <div className="font_w_800">
              {' '}
              Office 22 Alpha, Los angeles, California
              <Tooltip title="Click To Copy">
                <span>
                  <CopyFilled className="margin-l-0_5x brand_color" />
                </span>
              </Tooltip>
            </div>
          </div>
          {/* <div className='d-flex flex-justify-between font_15x'>
            <span className=''>SWIFT/BIC Code</span>
            <div className='font_w_800'> SIGNUS33XXX<CopyFilled className="margin-l-0_5x brand_color"/></div>
          </div>
          <div className='d-flex flex-justify-between font_15x padding-tb-2x'>
            <span className=''>Recipient Bank Name</span>
            <div className='font_w_800'>Signature Bank<CopyFilled className="margin-l-0_5x brand_color"/></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BSDepositFiatInfo;
