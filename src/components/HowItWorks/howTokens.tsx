import {  Image, Button } from "antd";
import tokens from "../../assets/how-it-works/tokens.png";
import inex from "../../assets/how-it-works/inex.png";
import dt from "../../assets/how-it-works/discounttable.png";
import in5 from "../../assets/how-it-works/index500.png";
import incr from "../../assets/how-it-works/incr.png";
import inu from "../../assets/how-it-works/inu.png";
import Footer from "../Footer/Footer";


const HowTokens = () => {
  


  return (
    <>
      <div className="scan-container how-it-works flex-direction-column">
        <Image
          preview={false}
          src={tokens}
          className="rounded mx-auto d-block"
          style={{ width: "70px", paddingTop: 40, display: "flex" }}
        ></Image>

        <p
          className="text-center"
          style={{
            fontSize: 30,
            fontWeight: 500,
            paddingTop: 10,
            lineHeight: "normal",
          }}
        >
          indexx
          <br />
          Tokens
        </p>

        <Image
          preview={false}
          src={inex}
          className="rounded mx-auto d-block"
          style={{ paddingTop: 40, display: "flex" }}
        ></Image>

        <p
          className="text-center"
          style={{
            fontSize: 30,
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          <br />
          indexx Exchange
        </p>

        <div className="row">
          <div className="col-sm-3"></div>
          <p
            className="col-sm-6 text-center"
            style={{ textAlign: "center", fontSize: "20px" }}
          >
            <br />
            We will issue our token, called the Indexx Exchange Token. A strict
            limit of 200MM INEX will be created, never to be increased. INEX
            will run natively on the Binance blockchain with BEP. <br /> <br />
            <p
              className="text-center"
              style={{
                fontSize: 30,
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              <br />
              INEX Value & Repurchasing Plan
            </p>
            You can use INEX to pay for any fees on our platform, including but
            not limited to:
            <br />
            Exchange fees
            <br />
            Withdraw fees
            <br />
            Listing fees
            <br />
            Any other fee
            <br />
            Earn while trading
            <br />
            <br />
            When you use INEX to pay for fees, you will receive a significant
            discount:
          </p>

          <Image
            preview={false}
            src={dt}
            className="rounded mx-auto d-block"
            style={{ width: 721, paddingTop: 40, display: "flex" }}
          ></Image>
          <Image
            preview={false}
            src={in5}
            className="rounded mx-auto d-block"
            style={{ width: 100, paddingTop: 40, display: "flex" }}
          ></Image>

          <p
            className="text-center"
            style={{
              fontSize: 30,
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            <br />
            indexx500
          </p>

          <div className="row">
            <div className="col-sm-3"></div>
            <p
              className="col-sm-6 text-center"
              style={{ textAlign: "center", fontSize: "20px" }}
            >
              <br />
              Indexx 500 stock tokens are assets that move across the blockchain
              just as easily as other digital currencies but that are pegged to
              S&P 500 index on a 1-to-1,000 basis.
              <br /> <br />
              Indexx 500 stock tokens are referred to as reliable coins because
              they offer price reliable as they are pegged to a S&P 500 index of
              US stock market, This offers traders, merchants and funds a low
              volatility solution when exiting positions in the market.
              <br />
              <br />
              All Indexx 500 stock tokens are pegged at 1-to-1,000 with a
              matching S&P 500 (e.g., 1 INXS = 1,000 Share of S&P 500 Index) and
              are backed 100% by Indexx’s reserves.
            </p>
          </div>
          <Image
            preview={false}
            src={incr}
            className="rounded mx-auto d-block"
            style={{ width: 100, paddingTop: 40, display: "flex" }}
          ></Image>
          <p
            className="text-center"
            style={{
              fontSize: 30,
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            <br />
            indexx Crypto
          </p>

          <div className="row">
            <div className="col-sm-3"></div>
            <p
              className="col-sm-6 text-center"
              style={{ textAlign: "center", fontSize: "20px" }}
            >
              <br />
              This indexx crypto token holds the top 10 blue chip cryptoassets,
              allowing the token price to track movements of the broader crypto
              market. The token's holdings are re-balanced on a weekly basis
              (with no asset taking up over 10%). This greatly simplifies the
              effort required to track the broader market's performance.
            </p>
          </div>

          <Image
            preview={false}
            src={inu}
            className="rounded mx-auto d-block"
            style={{ width: 100, paddingTop: 40, display: "flex" }}
          ></Image>
          <p
            className="text-center"
            style={{
              fontSize: 30,
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            <br />
            indexx USD+
          </p>

          <div className="row">
            <div className="col-sm-3"></div>
            <p
              className="col-sm-6 text-center"
              style={{ textAlign: "center", fontSize: "20px" }}
            >
              <br />
              indexx USD+ includes 3 components:
              <p
                className="text-center"
                style={{
                  fontSize: 30,
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                <br />
                1. PEGGED TO USDT 1 : 1
              </p>
              <br />
              100% collateralized with assets immediately convertable into USDT
              'Risk-first portfolio', i.e. assets are picked primarily to avoid
              losses on a daily basis (3-4 sigmas away from 0), no exposure to
              algorithmic stables <br />
              <br />
              USD+ can replace USDT in pools and lending protocols
              <br />
              <p
                className="text-center"
                style={{
                  fontSize: 30,
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                <br />
                2. YIELD GENERATING
              </p>
              Collateral consists of yield-bearing strategies, including lending
              and stable-to-stable pools <br />
              Portfolio allocation decentrally controlled (community proposals,
              veto power by token stakers/insurance providers)
              <br />
              Portfolio strategy executed decentrally via smart-contracts
              <br />
              Profit paid out daily in indexxUSD+ via rebase
              <br />
              <p
                className="text-center"
                style={{
                  fontSize: 30,
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                <br />
                2. INSURANCE
              </p>
              coming soon
            </p>
          </div>
        </div>

        <div className="text-center" style={{ width: 300, marginTop: 100 }}>
          <a href="https://tokens.indexx.ai/">
            <Button
              danger
              type="primary"
              shape="round"
              size="large"
              className="btn_xl btn-primary w-100 p-10 "
            >
              Trade To Earn
            </Button>
          </a>

          <br />
          <br />
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default HowTokens;
