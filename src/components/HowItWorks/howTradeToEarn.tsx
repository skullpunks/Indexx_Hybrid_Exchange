import {  Image, Button } from "antd";

import { useNavigate } from "react-router-dom";
import t2e from "../../assets/how-it-works/tradetoearncoin.png";
import phase1 from "../../assets/how-it-works/phase1.png";
import phase2 from "../../assets/how-it-works/phase2.png";
import Footer from "../Footer/Footer";


const HowTradeToEarn = () => {
  const navigate = useNavigate();

  const navigateUser = (path: any) => {
    window.localStorage.setItem("redirect", window.location.pathname);
    navigate(path);
  };

  return (
    <>
      <div className="scan-container how-it-works flex-direction-column">
        <Image
          preview={false}
          src={t2e}
          className="rounded mx-auto d-block"
          style={{ paddingTop: 40, display: "flex" }}
        ></Image>
        <p
          className="text-center"
          style={{
            fontSize: 30,
            fontWeight: 500,
            marginTop: -10,
            lineHeight: "normal",
          }}
        >
          indexx
          <br />
          Trade To Earn
          <br />
          <br />
          <br />
          <br />
          Trade To Earn
        </p>
        <div className="row">
          <div className="col-sm-3"></div>
          <p
            className="col-sm-6 text-center"
            style={{ textAlign: "center", fontSize: "20px" }}
          >
            <br />
            Each day you trade (buy or sell INDEXX TOKENS) a percentage of USD
            worth or more of from our token collection within the INDEXX
            protocol will result in INDEXX tokens delivered to your wallet.‍ At
            the end of each day, you’ll be rewarded INDEXX tokens based upon the
            proportion of your trading volume to the total trading volume <br />{" "}
            <br />
            The daily amount of INEX tokens available for distribution will
            depend on the total transaction volume on that day.
          </p>
        </div>
        <p
          className="text-center"
          style={{
            fontSize: 30,
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          <br />
          Rewards Management:
        </p>
        <p
          className="col-sm-6 text-center"
          style={{ textAlign: "center", fontSize: "20px" }}
        >
          <br />
          Tokens we can give out as Earnings and rewards for trading: indexxEX.
          <br />
          The percentage earning will decrease on 100 transactions per user So
          if a user does 100 transactions, the percentage earning will decrease
          by 5% The minimum percentage set at the end will be 5% You will only
          be rewarded this earning if you do a transaction equal to or greater
          than 50$.
        </p>

        <p
          className="text-center"
          style={{
            fontSize: 30,
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          <br />
          Current Phases:
        </p>
        <p
          className="col-sm-6 text-center"
          style={{ textAlign: "center", fontSize: "20px" }}
        >
          <br />
          Phase1 (Oct 21 to Nov 15 2022)
        </p>
        <Image
          preview={false}
          src={phase1}
          className="rounded mx-auto d-block"
          style={{ paddingTop: 40, display: "flex" }}
        ></Image>
        <p
          className="col-sm-6 text-center"
          style={{ textAlign: "center", fontSize: "20px" }}
        >
          <br />
          Phase2 (Nov 16 to Dec 15, 2022)
        </p>
        <Image
          preview={false}
          src={phase2}
          className="rounded mx-auto d-block"
          style={{ paddingTop: 40, display: "flex" }}
        ></Image>
        <p
          className="col-sm-6 text-center"
          style={{ textAlign: "center", fontSize: "20px" }}
        >
          <br />
          When they have a minimum of 100 Index Exchange Tokens earned, they
          will be able to send a request to the admins and send their Wallet
          address, after verification we can airdrop the amount to them on their
          wallet address.
          <br />
          <br />
          Users will be able to spend tokens earned on derivatives and will be
          able to withdraw and exchange them with other tokens.
        </p>
        <div className="text-center" style={{ width: 300, marginTop: 100 }}>
        <Button
          danger
          type="primary"
          shape="round"
          size="large"
          className="btn_xl btn-primary w-100 p-10 "
          onClick={() => navigateUser("/indexx-exchange/trade-to-earn")}
        >
          Trade To Earn
        </Button>
        <br />
        <br />
      </div>
      </div>
      

      <Footer></Footer>
    </>
  );
};

export default HowTradeToEarn;
