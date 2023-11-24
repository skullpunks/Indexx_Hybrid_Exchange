import React, { useState, useEffect } from 'react';
import frame from '../../../../assets/hive-dashboard/beeframe-2.svg';
import framecapt from '../../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';
import waggle from '../../../../assets/hive-dashboard/waggle dance icon.svg';

import pin from '../../../../assets/hive-dashboard/sidebar/pin- 1.svg';
import man from '../../../../assets/hive-dashboard/sidebar/man- 2.svg';
import house from '../../../../assets/hive-dashboard/sidebar/house 2 1.svg';
import clock from '../../../../assets/hive-dashboard/sidebar/clock 1.svg';
import { Button } from 'antd';
import loadingGif from '../../../../assets/beeloade.gif';


import '../../Captainbee/CaptainDash.css';
import BeeTabs from './BeeTabs';
import BeeHeader from '../BeeHeader/BeeHeader';
import { getCaptainBeeStatics, getHoneyUserDetails, getReferredUserDetails } from '../../../../services/api';

const BeeDash2 = () => {
  const [userType, setUserType] = useState("");
  const [staticsData, setStaticsData] = useState();
  const [honeyBeeData, setHoneyBeeData] = useState();
  const [honeybeeCreateDate, setHoneybeeCreateDate] = useState();
  const [captainBeeData, setRefferedUserData] = useState();
  const [captainbeeCreateDate, setCaptainbeeCreateDate] = useState();
  const [captainbeeOrders, setCaptainbeeOrders] = useState();
  const [captainbeesUsers, setCaptainbeeUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
      const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;
      const user = localStorage.getItem("user") !== undefined ? String(localStorage.getItem("user")) : undefined;
  
      setUserType(userType);
  
      if (userType === "CaptainBee") {
        if (username) {
          try {
            const data = await getCaptainBeeStatics(username);
            setStaticsData(data.data);
            setIsLoading(false); 
          } catch (error) {
            // Handle error
            console.error("Error loading CaptainBee statics:", error);
          }
        }
      } else {
        try {
          const honeyUserData = await getHoneyUserDetails(user);
          setHoneybeeCreateDate(honeyUserData.data.accountCreationDate);
          setHoneyBeeData(honeyUserData?.data?._doc);
  
          const referredUserData = await getReferredUserDetails(user);
          setRefferedUserData(referredUserData.data);
          setCaptainbeeCreateDate(referredUserData.data.accountCreationDate);
          setCaptainbeeOrders(referredUserData.data.totalOrder);
          setCaptainbeeUsers(referredUserData.data.honeyBeesCount);
          setIsLoading(false); 
        } catch (error) {
          // Handle error
          console.error("Error loading Honey User details or Referred User details:", error);
        }
      }
    };
  
    loadData();
  }, []);
  

  const subscription = true;

  return (
    <>
      <BeeHeader />
      {isLoading &&
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter:"blur(8px)",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 995,
            pointerEvents: 'none',
          }}
        >
          <img src={loadingGif} alt="Loading" />
          <p style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
            Please wait while Waggle Dance is loading
            <span className="dots-animation"></span>
          </p>
        </div>
      }
      <div style={{ paddingTop: "220px" }}>
        <div className='font_20x fw-bold justify-content-center d-flex' style={{ marginLeft: "-562px" }}>
          <img src={waggle} alt="" width={"46px"} />&nbsp;&nbsp;&nbsp;
          Waggle Dance / My Dashboard
        </div>
        <div className="hive-container">
          <div
            className="d-flex justify-content-between"
          // style={{ width: '76%', maxWidth: '1140px' }}
          >
            <div className="d-flex flex-direction-column align-items-center mt-1" style={{ width: "280px" }}>
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
                  <div className="hexagon"
                    style={{ marginBottom: '16px' }}
                  >
                    <img
                      alt=""
                      src={honeyBeeData?.profilePic === undefined ? dummy : honeyBeeData?.profilePic}
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
                    marginBottom: "8px"
                  }}
                >
                  <div className="side-hexagon">
                    <img
                      alt=""
                      src={captainBeeData?.refferedUserAffilateData?.photoIdFileurl !== undefined ? captainBeeData?.refferedUserAffilateData?.photoIdFileurl : dummy}
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
                  Honey Bee of Captain {captainBeeData?.refferedUserAffilateData?.Username} Team
                </div>
                <div className="align-items-start" 
                // style={{ marginLeft: `${isMobile ? "65px" : "0px"}` }}
                >
                {/* {(!subscription?.paypalSubscriptionDBData) ? */}
                {(!subscription) ?
                  (<div className="d-flex flex-direction-column align-items-start mt-3">
                    <div className="font_15x">
                      Subscribe to your $150 monthly INEX investment today
                    </div>
                    <div style={{width:"100%"}}>
                      <Button
                        type="primary"
                        className="atn-btn atn-btn-round atn-btn-hover hive-btn mt-3"
                        // onClick={handleCreateSubscription}
                        style={{width:"100%", height:"auto", color:"#393939"}}
                      >
                        Subscribe
                      </Button>
                    </div>
                  </div>)
                  :
                  (<div className="d-flex flex-direction-column align-items-start mt-3">
                    <div className="font_20x">
                      $150 INEX Subscription Details
                    </div>
                    <div className="font_13x mt-3">
                      Subscription ID: H-HDDJF89JDFJ08
                      {/* {subscription?.paypalSubscriptionDetails?.id} */}
                    </div>
                    <div className="font_13x">
                      Status: ACTIVE
                      {/* {subscription?.paypalSubscriptionDetails?.status} */}
                    </div>
                    <div className="font_13x">
                      Next Billing Date: December 14, 2023 at 3:30 PM
                      {/* {formatReadableDate(subscription?.paypalSubscriptionDetails?.billing_info.next_billing_time)} */}
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
                  </div>)
                }
                </div>
                <div className="align-items-start lh_32x mt-4">
                  <div className="font_13x d-flex align-items-center ">
                    <img alt="man" src={man} className="me-2" />
                    {honeyBeeData?.accname ? `@${honeyBeeData?.accname}` : "NA"}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    <img alt="man" src={pin} className="me-2" />
                    {honeyBeeData?.country ? honeyBeeData?.country : "NA"}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    <img alt="man" src={house} className="me-2" />
                    {honeyBeeData?.city ? `@${honeyBeeData?.city}` : "NA"}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    <img alt="man" src={clock} className="me-2" />
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
