import { Badge, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { decodeJWT, getUserDetails } from '../../services/api';
// import Footer from '../Footer/Footer';
import "./BS-Sell.css";
import "./BuySellDummy.css";

// import { Link } from 'react-router-dom';
// import { CaretRightOutlined, CheckCircleOutlined } from '@ant-design/icons';

// import PlainCircle from "../../assets/arts/PlainCircle.svg";

const BSDashhboard = () => {
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState() as any;

    useEffect(() => {
        return () => {
            let access_token = String(localStorage.getItem("access_token"));
            let decoded: any = decodeJWT(access_token);
            setEmail(decoded.email)
            getUserDetails(decoded.email).then((res) => {
                
                if (res.status === 200) {
                    
                    setUserData(res.data);
                }
            });
        }
    }, [email]);

    return (
        <div className='bs_wallet'>
            {/* <div className='d-flex bs_wallet_top'>
                <div>
                    <Link to="" className='font_15x text-white' ><CheckCircleOutlined className='padding-r-2x margin-r-0_5x' />Create account</Link>
                </div>
                <div>
                    <Link to="" className='font_15x margin-l-2x text-white' ><img src={PlainCircle} alt="PlainCircle" width="15" height="15" className='padding-r-2x' /> <span style={{paddingTop:5}}>Add payment method</span><CaretRightOutlined className='margin-l-0_5x' /></Link>
                </div>
            </div> */}

            {/* <div className='scan-container d-flex flex-direction-column card large_card orange'>

                <div className='width-100 bs_wallet_table'>
                    <BSWalletTable />
                </div>
            </div> */}

            <div className='scan-container d-flex flex-direction-column card large_card orange'>
                    <h1>User Info</h1>
                    <Descriptions  bordered>
                        <Descriptions.Item label="Email">{String(userData?.email)}</Descriptions.Item>
                        <Descriptions.Item label="Base Currency">{userData?.baseCurrency}</Descriptions.Item>
                        <Descriptions.Item label="Role">{userData?.role}</Descriptions.Item>
                        <Descriptions.Item label="Last Login">{userData?.lastLogin}</Descriptions.Item>
                        <Descriptions.Item label="VIP Level" span={2}>
                           {userData?.vipLevel}
                        </Descriptions.Item>
                        <Descriptions.Item label="Account Status" span={3}>
                            <Badge status="processing" text="Active" />
                        </Descriptions.Item>
                        {/* <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item> */}
                        <Descriptions.Item label="Verification Info">
                            Email Verified: {userData?.verification.emailVerified ? "Yes" : "No"} 
                            <br />
                            Mobile Verified: {userData?.verification.phoneVerified ? "Yes" : "No"} 
                            <br />
                            Photo Verified: {userData?.verification.photoVerified ? "Yes" : "No"} 
                            <br />
                           
                        </Descriptions.Item>
                    </Descriptions>
            </div>
            {/* <Footer footerArt="flipWoman" /> */}
        </div>
    )
}

export default BSDashhboard