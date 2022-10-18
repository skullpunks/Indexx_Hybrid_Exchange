
import MobileIcon from "../../assets/arts/MobileIcon.svg";
import {

  Col,
  Input,
  Row,
  Select
} from 'antd';
import { useNavigate } from "react-router-dom";

// interface Props {
//   setScreenName: (value: string | ((prevVar: string) => string)) => void;
//   setToggleChart: (value: boolean | ((prevVar: boolean) => boolean)) => void;
// }

const BuySellMobiAuth = () => {
  // setToggleChart(false);
  const navigate = useNavigate();
  // const { Option } = Select;
  return (<div className='d-flex flex-direction-column'>
    <h1 className='text-center margin-lr-auto top_heading'>Get Started</h1>

    <div className="bs_container bs_form card">
      <br />
      <img src={MobileIcon} alt="MobileIcon" width="58" height="87" className="margin-lr-auto margin-t-1_5x" />
      <h1 className="margin-lr-auto padding-t-2x">SMS Authentication</h1>
      <div className="text-center margin-lr-auto  font_20x padding-tb-2x ">
        Enable mobile 2-Factor-Authentication</div>
      <br />
      <div className="padding-b-1x phone_container">

        <Row gutter={12}>
          <Col >
            <label>Country</label>
          </Col>
          <Col >
            <label>Phone Number</label>
          </Col>
        </Row>

        <div className="site-input-group-wrapper">
          <Input.Group size="large">

            <Row gutter={12}>

              <Col >
                <Select defaultValue=" ">
                  {/* <Option value="usa">USA</Option>
                  <Option value='uk'>UK</Option>
                  <Option value="in">India</Option> */}
                </Select>
              </Col>
              <Col className="phone_container_right" >
                <Input placeholder="Phone number" />
              </Col>
            </Row>
          </Input.Group>
        </div>


      </div>
      <br />
      <br />
      <div className="send_code">
        <button onClick={() => navigate("/indexx-exchange/buy-sell/get-started/sms-verify")}>Send Code</button>
      </div>
    </div>
  </div>
  )
}
export default BuySellMobiAuth;