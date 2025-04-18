import { CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import AdvanceVerfication from '../../assets/arts/AdvanceVerfication.svg';
import BasicVerfication from '../../assets/arts/BasicVerfication.svg';
import HiveVerfication from '../../assets/arts/new_arts/3 dots.svg';
import { decodeJWT, getUserDetails, sendOtp } from '../../services/api';
import useCopyToClipboard from '../../utils/useCopyToClipboard';
import OpenNotification from '../OpenNotification/OpenNotification';
import { useNavigate } from 'react-router-dom';
import GenericButton from '../updated/shared/Button';
import './Account.css';
import IdentificationInput from './SSNInputField';
const BasicInfo = ({ theme }: { theme: any }) => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState() as any;
  const [copiedValue, copy] = useCopyToClipboard();
  const [loadings, setLoadings] = useState(false);
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false); // Loader state

  const handleLoading = (state:any) => {
    setIsUpdating(state);
  };

  useEffect(() => {
    let access_token = String(localStorage.getItem('access_token'));
    let decoded: any = decodeJWT(access_token);

    setEmail(decoded.email);
    getUserDetails(decoded.email).then((res) => {
      if (res.status === 200) {
        console.log('res.data', res.data);
        setUserData(res.data);
      }
    });
  }, [email]);

  const openBlockpassLink = async () => {
    console.log(
      'userData?.verification?.emailVerified',
      userData?.verification?.emailVerified
    );
    if (userData?.verification?.emailVerified) {
      // route to new page by changing window.location
      window.open(
        'https://verify-with.blockpass.org/?clientId=indexx_2c1c1&serviceName=Indexx.ai&env=prod',
        '_blank'
      ); //to open new page
    } else {
      OpenNotification('error', 'Verify your email to continue.');
    }
  };

  const resendEmail = async () => {
    setLoadings(true);
    let res = await sendOtp(email);
    if (res.status === 200) {
      OpenNotification('success', res.data);
      setLoadings(false);
      navigate('email-auth');
    } else {
      setLoadings(false);
      OpenNotification('error', res.data);
    }
  };
  return (
    <div className={isUpdating ? 'blurred-screen' : ''}>
      <div className="basic_info container margin-t-2x padding-t-3x">
        <div>
          <header className="font_25x border-b-1x padding-lr-2x padding-tb-1x">
            Account Info
          </header>
          <div className="padding-2x">
            <p
              className="font_20x"
              style={{ color: theme.palette.text.primary }}
            >
              {userData?.email}
            </p>
            <div className="basic-det">
              <div>{userData?.vipLevel}</div>
              <div>Personal</div>
              <div>User ID</div>
              <div className=" d-flex align-items-center">
                <span>{String(userData?.email)}</span>
                <CopyOutlined
                  className="hover_icon"
                  onClick={() => copy(String(userData?.email))}
                />
                {/* <Tooltip title="Copied to Clipboard!" ></Tooltip> */}
              </div>
              <div>Referral Code</div>
              <div className="d-flex align-items-center">
                <span>{userData?.referralCode}</span>
                {/* <Tooltip title="Click to copy"><CopyOutlined className='padding-lr-1x hover_icon' /> </Tooltip> */}
                <CopyOutlined
                  className="hover_icon"
                  onClick={() => copy(userData?.referralCode)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="basic_info container margin-t-2x padding-t-3x margin-b-2x">
        <div>
          <header className="font_18x border-b-1x padding-lr-2x padding-tb-1x">
            Verification & Limits
          </header>
          <div className="padding-2x row">
            <div className="col-lg-5">
              <span className="font_18x margin-b-3x d-block">
                Personal Verification
              </span>
              <div
                className={
                  userData?.verification?.emailVerified
                    ? 'd-flex align-items-center  padding-1x'
                    : 'd-flex align-items-center padding-1x'
                }
                style={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px',
                }}
              >
                {userData?.verification?.emailVerified ? (
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        localStorage.getItem('userType') === 'Indexx Exchange'
                          ? BasicVerfication
                          : HiveVerfication
                      }
                      alt="AdvanceVerfication"
                      className="font_30x margin-r-1x"
                      width={'40px'}
                    />
                    <h2 className="font_18x margin-b-0">
                      <span
                        style={{
                          color: `${theme.palette.text.primary} !important`,
                        }}
                      >
                        Basic Verification
                      </span>
                    </h2>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <img
                      src={AdvanceVerfication}
                      alt="AdvanceVerfication"
                      className="font_30x margin-r-1x"
                    />
                    <h2
                      className="font_18x margin-b-0"
                      style={{
                        minWidth: 'fit-content',
                        color: `${theme.palette.text.primary} !important`,
                      }}
                    >
                      <span
                        style={{
                          color: `${theme.palette.text.primary} !important`,
                        }}
                      >
                        Basic Verification
                      </span>
                    </h2>
                    {/* <Button type="primary" className="margin-l-2x" loading={loadings}
                                            onClick={() => resendEmail()}>
                                            Verify Email
                                        </Button> */}
                  </div>
                )}
              </div>
              <br></br>
              {/* Need to Add SSN Input field */}
              <IdentificationInput
                initialCountry={userData?.country || 'US'}
                initialPersonalId={userData?.personalIdNumber || ''}
                setLoading={handleLoading}
              />

              <div
                className={
                  !userData?.isKYCPass
                    ? 'd-flex align-items-center  margin-t-2x padding-1x'
                    : 'd-flex align-items-center  padding-1x'
                }
                style={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px',
                }}
              >
                {!userData?.isKYCPass ? (
                  <div>
                    <img
                      src={AdvanceVerfication}
                      alt="AdvanceVerfication"
                      className="font_30x margin-r-1x"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src={
                        localStorage.getItem('userType') === 'Indexx Exchange'
                          ? BasicVerfication
                          : HiveVerfication
                      }
                      alt="AdvanceVerfication"
                      className="font_30x margin-r-1x"
                      width={'40px'}
                    />
                  </div>
                )}
                <div>
                  <h2
                    className="font_18x margin-b-0"
                    style={{
                      color: `${theme.palette.text.primary} !important`,
                    }}
                  >
                    Advanced Verification
                  </h2>
                  {!userData?.isKYCPass && (
                    <div className="font_12x opacity-50">
                      Unlock further features and raise your deposit and
                      withdrawal limits{' '}
                    </div>
                  )}
                </div>
              </div>
              {!userData?.isKYCPass && (
                <div
                  className="d-flex align-items-center align-items-stretch"
                  style={{ margin: '20px 0px' }}
                >
                  <div className="font_12x w-100">
                    Please verify your identity first in order to start advanced
                    verification
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-5 basic_funtion bs_main">
              <h1
                className="font_18x margin-b-3x d-block font_weight_800 padding-l-24px"
                style={{ color: theme.palette.text.primary }}
              >
                Basic Functions
              </h1>
              <div className="usd_deposit">USD Deposits & Withdrawals,</div>
              <div className="padding-tb-1x crypto_deposit">
                Crypto Deposits & Withdrawals,
              </div>
              <div className="buy_Sell_convert">Buy, Sell & Convert</div>
              <div className="padding-tb-1x adv_trade">Advanced Trading</div>
              <div className="bank_trns_debit">Bank Transfer & Debit Card</div>
              {/* <div className="padding-tb-1x apple_pay">Apple Pay</div> */}
              {/* <div className="api_trading">API Trading</div> */}
              {/* <h1 className="padding-tb-1x font_18x  font_weight_800 margin-tb-2x padding-l-24px">Advanced Functions</h1> */}
              <div className="padding-tb-1x staking">Staking</div>
              {/* <div className="padding-tb-1x otc_trading">OTC Trading</div>
                            <div className="wire_transfer">Wire Transfer</div>
                            <div className="padding-tb-1x ">Region currently not supported</div> */}
              <br></br>
              {!userData?.verification?.emailVerified && (
                <GenericButton
                  text={'Verify Email'}
                  loading={loadings}
                  onClick={() => resendEmail()}
                  IconComponent={undefined}
                  className={undefined}
                  styles={undefined}
                  disabled={undefined}
                />
              )}
              {userData?.verification?.emailVerified &&
                !userData?.isKYCPass && (
                  <GenericButton
                    text={'Verify Identity'}
                    onClick={() => openBlockpassLink()}
                    IconComponent={undefined}
                    styles={undefined}
                    disabled={undefined}
                    loading={undefined}
                    className={undefined}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
