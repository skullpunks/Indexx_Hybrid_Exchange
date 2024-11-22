import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InProgressClock from "../../assets/arts/new_arts/clock green.svg";
import HiveInProgressClock from "../../assets/arts/new_arts/clock yellow hive.svg";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getPaypalOrder, getPaypalSubscription } from "../../services/api";
import CanStake from "./Notification/CanStake";

interface Props {
  setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BSBuyInProgress: React.FC<Props> = ({ setScreenName }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [outcurr, setOutcurr] = useState<string>("");
  const [outAmt, setOutAmt] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const orderCurrency = searchParams.get("orderCurrency") || "";
    const orderAmount = parseFloat(searchParams.get("orderAmount") || "0");
    const payCurrency = searchParams.get("payCurrency") || "";
    const payAmount = parseFloat(searchParams.get("payAmount") || "0");
    const token = searchParams.get("token");
    const subscriptionId = searchParams.get("subscription_id");

    if (subscriptionId && token) {
      getPaypalSubscription(subscriptionId).then((res) => {
        if (res.status === 200) {
          navigate(
            `/indexx-exchange/subscribe-success?subscription_id=${subscriptionId}`
          );
        }
      });
    } else if (token) {
      getPaypalOrder(token).then((res) => {
        if (res.status === 200) {
          const orderData = res.data.data;
          if (
            ["Buy", "Sell", "Convert"].includes(orderData?.orderType)
          ) {
            setOutAmt(orderData.breakdown.outAmount);
            setOutcurr(orderData.breakdown.outCurrencyName);
            setIsModalOpen(true);
          } else {
            navigate(
              `/indexx-exchange/powerpack-payment-success?orderId=${orderData?.orderId}`
            );
          }
        }
      });
    } else {
      setOutAmt(payAmount);
      setOutcurr(payCurrency);
    }
  }, [searchParams, navigate]);

  return (
    <div className="bs_container card">
      <div className="card__header flex-justify-between d-flex flex-align-center">
        <h1
          className="centered"
          style={{ color: "var(--body_color)" }}
        >
          <span
            className="cursor-pointer"
            style={{ fontSize: 20, paddingRight: 10 }}
            onClick={() => navigate("/indexx-exchange/buy-sell")}
          >
            &#60;
          </span>
          Purchase in Progress
        </h1>
      </div>
      <div className="card_body text-center">
        <img
          src={
            localStorage.getItem("userlogged") === "normal"
              ? InProgressClock
              : HiveInProgressClock
          }
          alt="InProgressClock"
          className="padding-t-2x"
          width={"90px"}
        />
        <div
          className="bs_curreny_left p-3"
          style={{
            transform: "scale(1)",
            paddingBottom: "50px",
            paddingTop: 0,
            alignItems: "baseline",
            color: "var(--body_color)",
          }}
        >
          <span
            className="font_20x"
            style={{ fontSize: 60 }}
          >
            {outAmt ? Math.floor(outAmt * 10000) / 10000 : 0}
          </span>
          <span
            className="font_20x"
            style={{
              color: "var(--conf-purchase)",
              paddingLeft: 10,
            }}
          >
            {outcurr}
          </span>
        </div>
        <div className="font_20x padding-b-2x">
          Your buy order is being processed. A confirmation email will
          be sent once the order is complete.
        </div>
        <Button
          type="primary"
          className="atn-btn atn-btn-round margin-b-1x"
          block
          onClick={() => navigate("/indexx-exchange/buy-sell/wallet")}
        >
          Go to Wallet
        </Button>
        <Link
          className="font_15x bs_link text-center d-block padding-t-3x"
          to="/indexx-exchange/buy-sell?type=buy"
        >
          New Buy
        </Link>
      </div>
      <div>
        <CanStake
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default BSBuyInProgress;
