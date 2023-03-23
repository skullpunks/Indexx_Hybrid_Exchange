import secureIcon from '../../assets/arts/secureIcon.svg';
import { Button } from 'antd';
import completedCheck from '../../assets/arts/completedCheck.svg';
import inProgressIcon from '../../assets/arts/inProgressIcon.svg';
import futureIcon from '../../assets/arts/futureIcon.svg';
import { useNavigate } from 'react-router-dom';
// interface Props {
//     setScreenName: (value: string | ((prevVar: string) => string)) => void;
//     setToggleChart: (value: boolean | ((prevVar: boolean) => boolean)) => void;
// }

const BuySellSecureSteps = () => {
  // setToggleChart(false);
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-direction-column col-lg-5 col-md-12 flex-align-center responsive_container">
      <h1 className="text-center margin-lr-auto top_heading">Get Started</h1>

      <div className="bs_container bs_form card secure-steps">
        <br />
        <img
          src={secureIcon}
          alt="secureIcon"
          width="100"
          height="69"
          className="margin-lr-auto margin-t-1_5x"
        />
        <br />
        <h1 className="margin-lr-auto padding-t-2x">Just 2 More Steps to Go</h1>
        <br />
        <br />
        <div className="font_20x padding-l-1x d-flex flex-align-center">
          <img
            src={completedCheck}
            alt="completedCheck"
            className="padding-r-1_x"
          />
          <div>Create Your Account</div>
        </div>

        <div className="font_20x padding-t-1x padding-l-1x d-flex flex-align-center">
          <img
            src={inProgressIcon}
            alt="inProgressIcon"
            className="padding-r-1_x"
          />{' '}
          <div>Secure Your Account</div>
        </div>

        <div className="font_20x padding-t-1x padding-l-1x d-flex flex-align-center">
          <img src={futureIcon} alt="futureIcon" className="padding-r-1_x" />
          <div>Complete Identity Verification</div>
        </div>

        <br />
        <br />
        <br />
        {/* onClick={() => setScreenName("MobiAuth")} */}
        {/* style={{ height: 55, borderColor: "#11be6a", backgroundColor: "#11be6a", color: "#fff", fontSize: 20, borderRadius: 5 }} */}
        <Button
          type="primary"
          className="ant-btn ant-btn-primary ant-btn-block atn-btn atn-btn-round margin-b-1x"
          block
          onClick={() =>
            navigate('/indexx-exchange/buy-sell/get-started/sms-auth')
          }
        >
          Secure Account
        </Button>
      </div>
    </div>
  );
};
export default BuySellSecureSteps;
