import React, { useState, useEffect } from 'react';
import frame from '../../../../assets/hive-dashboard/beeframe-2.svg';
import framecapt from '../../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';
import waggle from '../../../../assets/hive-dashboard/Waggle_LM.png';
import waggle_dark from '../../../../assets/hive-dashboard/waggle_DM.png';

import pin from '../../../../assets/hive-dashboard/sidebar/location.png';
import man from '../../../../assets/hive-dashboard/sidebar/man.png';
import house from '../../../../assets/hive-dashboard/sidebar/home.png';
import clock from '../../../../assets/hive-dashboard/sidebar/clock.png';

import info from '../../../../assets/hive-dashboard/sidebar/info.png';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import pin_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/location.png';
import man_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/man.png';
import house_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/home.png';
import clock_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/clock.png';

import { Button } from 'antd';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import loadingGif from '../../../../assets/beeloade.gif';

import OpenNotification from '../../../OpenNotification/OpenNotification';

import '../../Captainbee/CaptainDash.css';
import BeeTabs from './BeeTabs';
import BeeHeader from '../BeeHeader/BeeHeader';
import {
  createMonthlyHoneyBeeINEXsubscription,
  decodeJWT,
  formatReadableDate,
  getCaptainBeeStatics,
  getHoneyUserDetails,
  getReferredUserDetails,
} from '../../../../services/api';

const BeeDash2 = () => {
  const [userType, setUserType] = useState('');
  const [staticsData, setStaticsData] = useState();
  const [honeyBeeData, setHoneyBeeData] = useState();
  const [honeybeeCreateDate, setHoneybeeCreateDate] = useState();
  const [captainBeeData, setRefferedUserData] = useState();
  const [captainbeeCreateDate, setCaptainbeeCreateDate] = useState();
  const [captainbeeOrders, setCaptainbeeOrders] = useState();
  const [captainbeesUsers, setCaptainbeeUsers] = useState();
  const [subscription, setSubscription] = useState(null);
  const [loadings, setLoadings] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const userType =
        localStorage.getItem('userType') !== undefined
          ? String(localStorage.getItem('userType'))
          : undefined;
      const username =
        localStorage.getItem('username') !== undefined
          ? String(localStorage.getItem('username'))
          : undefined;
      const user =
        localStorage.getItem('user') !== undefined
          ? String(localStorage.getItem('user'))
          : undefined;

      setUserType(userType);

      if (userType === 'CaptainBee') {
        if (username) {
          try {
            const data = await getCaptainBeeStatics(username);
            setStaticsData(data.data);
            setIsLoading(false);
          } catch (error) {
            // Handle error
            console.error('Error loading CaptainBee statics:', error);
          }
        }
      } else {
        try {
          const honeyUserData = await getHoneyUserDetails(user);
          if (honeyUserData?.data?.paypalSubscriptionDetails) {
            setSubscription(honeyUserData?.data?.paypalSubscriptionDetails);
            //const hasValidSubscription = data?.data?.paypalSubscriptionDetails && Object.keys(data?.data?.paypalSubscriptionDetails).length > 0;
          }
          setHoneybeeCreateDate(honeyUserData.data.accountCreationDate);
          setHoneyBeeData(honeyUserData?.data?._doc);

          const referredUserData = await getReferredUserDetails(user);
          setRefferedUserData(referredUserData.data);
          setCaptainbeeCreateDate(referredUserData.data.accountCreationDate);
          setCaptainbeeOrders(referredUserData?.data?.totalOrders?.length);
          setCaptainbeeUsers(referredUserData.data.honeyBeesCount);
          setIsLoading(false);
        } catch (error) {
          // Handle error
          console.error(
            'Error loading Honey User details or Referred User details:',
            error
          );
        }
      }
    };

    loadData();
  }, []);

  const handleCreateSubscription = async () => {
    try {
      setLoadings(true);
      let access_token = String(localStorage.getItem('access_token'));
      let decoded = decodeJWT(access_token);
      let res = await createMonthlyHoneyBeeINEXsubscription(
        decoded.email,
        'USD',
        'INEX',
        '150',
        '',
        ''
      );
      if (res.status === 200) {
        for (let i = 0; i < res.data.links.length; i++) {
          OpenNotification('success', 'Subscription success');
          if (res.data.links[i].rel.includes('approve')) {
            window.location.href = res.data.links[i].href;
          }
        }
      } else {
        OpenNotification('error', res.data);
      }
    } catch (err) {
      OpenNotification(
        'error',
        'Something went wrong. Please try again after sometime.'
      );
      console.log('err', err);
    } finally {
      setLoadings(false);
    }
  };

  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'dark'
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log(event);
      setTheme(event.currentTarget.localStorage.selectedTheme);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip
      {...props}
      arrow
      classes={{ popper: className }}
      placement="top-start"
    />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: 'var(--body_background)',
      backgroundColor: 'var(--body_background)',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--body_background)',
      color: 'var(--body_color)',
      minWidth: '90%',
      width: '215px',
    },
  }));

  return (
    <>
      <BeeHeader />
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 995,
            pointerEvents: 'none',
          }}
        >
          <img src={loadingGif} alt="Loading" />
          <p
            style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}
          >
            Please wait while Hive Dashboard is loading
            <span className="dots-animation"></span>
          </p>
        </div>
      )}
      <div style={{ paddingTop: '220px' }}>
        <div
          className="font_20x fw-bold justify-content-center d-flex"
          style={{ marginLeft: '-562px' }}
        >
          <img
            src={theme === 'dark' ? waggle_dark : waggle}
            alt=""
            width={'46px'}
          />
          &nbsp;&nbsp;&nbsp; Hive Dashboard
        </div>
        <div className="hive-container">
          <div
            className="d-flex justify-content-between"
            // style={{ width: '76%', maxWidth: '1140px' }}
          >
            <div
              className="d-flex flex-direction-column align-items-center mt-1"
              style={{ width: '280px' }}
            >
              <div className="d-flex  flex-direction-row align-items-center">
                <div
                  style={{
                    width: '193px',
                    height: '193px',
                    backgroundImage: `url(${frame})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    // border:"none"
                  }}
                >
                  <div className="hexagon" style={{ marginBottom: '16px' }}>
                    <img
                      alt=""
                      src={
                        honeyBeeData?.profilePic === undefined
                          ? dummy
                          : honeyBeeData?.profilePic
                      }
                      width={'63px'}
                      height={'66px'}
                      ml={'-6px'}
                      border={'none'}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: '104px',
                    height: '107px',
                    backgroundImage: `url(${framecapt})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'end',
                    // border:"none"
                    marginBottom: '8px',
                  }}
                >
                  <div className="side-hexagon">
                    <img
                      alt=""
                      src={
                        captainBeeData?.refferedUserAffilateData
                          ?.photoIdFileurl !== undefined
                          ? captainBeeData?.refferedUserAffilateData
                              ?.photoIdFileurl
                          : dummy
                      }
                      width={'63px'}
                      height={'66px'}
                      ml={'-6px'}
                      border={'none'}
                    />
                  </div>
                </div>
              </div>
              <div className="align-items-start">
                <div className="font_20x fw-bold align-items-start mt-4 lh_32x">
                  Honey Bee {honeyBeeData?.username}
                </div>
                <div className="font_10x mb-3 lh_32x align-items-start">
                  Honey Bee of Captain{' '}
                  {captainBeeData?.refferedUserAffilateData?.Username} Team
                </div>
                <div
                  className="align-items-start"
                  // style={{ marginLeft: `${isMobile ? "65px" : "0px"}` }}
                >
                  {/* {(!subscription?.paypalSubscriptionDBData) ? */}
                  {!subscription?.paypalSubscriptionDBData ? (
                    <div className="d-flex flex-direction-column align-items-start mt-3">
                      <div className="font_15x">
                        Subscribe to your $150 monthly INEX investment today
                      </div>
                      <div
                        className="d-flex align-items-start gap-2"
                        style={{ width: '100%' }}
                      >
                        <BootstrapTooltip
                          title="Captain Bee Subscription Fees: 
Ensure your elite rank and commission earnings by subscribing monthly. Failure to pay on time leads to demotion, lowering your Captain Bee status and associated commissions. Stay at the top – don't forget to pay your dues!"
                          sx={{ width: '20%' }}
                        >
                          <Button
                            className="atn-btn atn-btn-round atn-btn-hover hive-btn mt-3"
                            style={{
                              width: 'auto',
                              height: 'auto',
                              color: '#393939',
                              display: 'flex',
                              alignItems: 'center',
                              paddingBlock: '9.5px',
                            }}
                          >
                            <img src={info} alt="info" />
                          </Button>
                        </BootstrapTooltip>
                        <Button
                          loading={loadings}
                          type="primary"
                          className="atn-btn atn-btn-round atn-btn-hover hive-btn mt-3"
                          onClick={handleCreateSubscription}
                          style={{
                            width: '80%',
                            height: 'auto',
                            color: '#393939',
                          }}
                        >
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex flex-direction-column align-items-start mt-3">
                      <div className="font_20x">
                        $150 INEX Subscription Details
                        <BootstrapTooltip
                          title="Captain Bee Subscription Fees: 
Ensure your elite rank and commission earnings by subscribing monthly. Failure to pay on time leads to demotion, lowering your Captain Bee status and associated commissions. Stay at the top – don't forget to pay your dues!"
                          sx={{ width: '20%' }}
                        >
                          <InfoOutlinedIcon
                            sx={{
                              fontSize: '18px',
                              color: 'var(--body_color)',
                              mb: 0.5,
                              ml: 0.8,
                            }}
                          />
                        </BootstrapTooltip>
                      </div>
                      <div className="font_13x mt-3">
                        Subscription ID:{' '}
                        {subscription?.paypalSubscriptionDetails?.id}
                      </div>
                      <div className="font_13x">
                        Status:{' '}
                        {subscription?.paypalSubscriptionDetails?.status}
                      </div>
                      <div className="font_13x">
                        Next Billing Date:{' '}
                        {formatReadableDate(
                          subscription?.paypalSubscriptionDetails?.billing_info
                            .next_billing_time
                        )}
                      </div>
                      {/* <div>
                      <Button
                        type="danger"
                        className="atn-btn atn-btn-round atn-btn-hover mt-3"
                        onClick={handleCancelSubscription}

                      >
                        Cancel Subscription
                      </Button>
                    </div> */}
                    </div>
                  )}
                </div>
                <div className="align-items-start lh_32x mt-4">
                  <div className="font_13x d-flex align-items-center ">
                    <img
                      alt="man"
                      src={theme === 'dark' ? man_dark : man}
                      className="me-2"
                    />
                    {honeyBeeData?.accname ? `@${honeyBeeData?.accname}` : 'NA'}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    <img
                      alt="man"
                      src={theme === 'dark' ? pin_dark : pin}
                      className="me-2"
                    />
                    {honeyBeeData?.country ? honeyBeeData?.country : 'NA'}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    <img
                      alt="man"
                      src={theme === 'dark' ? house_dark : house}
                      className="me-2"
                    />
                    {honeyBeeData?.city ? `@${honeyBeeData?.city}` : 'NA'}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    <img
                      alt="man"
                      src={theme === 'dark' ? clock_dark : clock}
                      className="me-2"
                    />
                    {honeybeeCreateDate}
                  </div>
                </div>
              </div>
            </div>
            <div className="honeybee-container">
              <BeeTabs />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeeDash2;
