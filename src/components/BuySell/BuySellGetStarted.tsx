import React from 'react';
import Email from "../../assets/arts/Email.svg";
import PasswordEye from "../../assets/arts/PasswordEye.svg";

// import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';



// interface Props {
//     setScreenName: (value: string | ((prevVar: string) => string)) => void;
//     setToggleChart: (value: boolean | ((prevVar: boolean) => boolean)) => void;
// }
// { setScreenName, setToggleChart }

const BuySellGetStarted = () => {
    const navigate = useNavigate();

    return (
        <div className='d-flex flex-direction-column'>
            <h1 className='text-center margin-lr-auto'>Get Started</h1>
            <div className="bs_container bs_form card">
                <div className="form_element email position-relative">
                    <label>Email</label>
                    <div className="control-input"><input type="email" name="email" />
                        <span className="input_icon"><img src={Email} alt="emailIcon" /></span></div>
                </div>
                <div className="form_element password position-relative padding-tb-2x">
                    <label>Password</label>
                    <div className="control-input"><input type="password" name="password" autoComplete='off' />
                        <span className="input_icon"><img src={PasswordEye} alt="PasswordEye" /></span>
                    </div>
                </div>
                <div className="form_element referral">
                    <label>Referral Code (Optional)</label>
                    <div className="control-input"><input type="number" name="refferral" /></div>
                </div>
                <div className="form_element d-flex terms_conditions_container">
                    <div className="control-input"><input type="checkbox" name="checkbox" /></div>
                    <div className="terms_conditions">I am over 18 years old and I have read, understand and agree to the<Link to="" className="text_link"> indexx.ai Terms of Use, Privacy Policy, </Link>and <Link to="" className="text_link"> Biometric Data Policy.</Link> </div>
                </div>
                {/* onClick={() => setScreenName("EmailAuth")}  */}
                <Button type="primary" className="ant-btn ant-btn-primary ant-btn-block atn-btn atn-btn-round margin-b-1x" block onClick={() => navigate("email-auth")} >Create Account</Button>
                <div className="d-flex justify-center padding-tb-2x" >Already have an account? &nbsp;
                    <Link to="/indexx-exchange/buy-sell/login" className="text_link"> Log in.</Link>
                </div>
            </div>
        </div>

    )
}

export default BuySellGetStarted;