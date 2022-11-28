import { Card, Image, Button, Divider, Typography, Progress } from "antd";
import { useEffect, useState } from "react";
import exgcoin from "../../assets/arts/exgcoin.png";
import { decodeJWT, getUserCompletedOrder, getUserCreatedBugs } from "../../services/api";
import Footer from "../Footer/Footer";
const { Text } = Typography;

const TaskCenter = () => {

  const [completedOrders, setCompletedOrders] = useState([]);
  const [bugsData, setBugsData] = useState([]);
  const [hasOpenedBug, sethasOpenedBug] = useState<boolean>(false);

  const checkUserCompletedOrder = async () => {
    const access_token = String(localStorage.getItem("access_token"));
    const decoded: any = await decodeJWT(access_token);
    let res = await getUserCompletedOrder(String(decoded.email));
    if (res.status === 200) {
      setCompletedOrders(res.data);
    }
  }

  const checkUserCreatedBugs = async () => {
    const access_token = String(localStorage.getItem("access_token"));
    const decoded: any = await decodeJWT(access_token);
    let res = await getUserCreatedBugs(String(decoded.email));
    if (res.data.status === 200) {
      setBugsData(res.data.data);
      res.data.data.forEach((element: any) => {
        if (element.status === 'Open') {
          sethasOpenedBug(true);
        }
      });
    }
  }

  useEffect(() => {
    checkUserCompletedOrder();
    checkUserCreatedBugs();
  }, []);

  return (
    <>
      <div className="scan-container trade-to-earn flex-direction-column d-flex justify-content-center">
        <div className="row" style={{ paddingLeft: 70, paddingTop: 60 }}>
          <div className="text-center">
            <p style={{ fontWeight: 50, fontSize: 70 }}>Task Center</p>
            <p style={{ fontWeight: 60, fontSize: 32 }}>
              Earn Upto 100 Points to Unlock Trade To Earn
            </p>

            <br />

            <p style={{ fontSize: 20 }}>
              Complete your tasks to get{" "}
              <span style={{ fontSize: 40 }}>30% </span>Trade Reward
            </p>

            <br />
            <p style={{ fontSize: 30, textAlign: "center" }}>
              <strong>0/100</strong>{" "}
              <span style={{ fontSize: 10 }}>Points</span>
              <span
                style={{ fontSize: 30, textAlign: "center", paddingLeft: 30 }}
              >
                {" "}
                <strong>0</strong>
                <span style={{ fontSize: 10 }}> Total Points</span>
              </span>
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <Card
              className="w-55 shadow-sm p-3 mb-5 bg-white rounded "
              style={{ marginTop: 20 }}
            >
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={exgcoin} width={79}></Image>
                </div>
                <div className="col-5">
                  <Text style={{ fontSize: 20, fontWeight: 100 }}>
                    Invite 3 users using the indexx Affiliate System.
                  </Text>
                  <Progress style={{ width: 439 }} />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 52, fontWeight: 50, marginTop: -20 }}
                  >
                    35
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: 100, marginTop: 20 }}
                  >
                    Points
                  </Text>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: "end",
                    alignItems: "end",
                    paddingLeft: 70,

                  }}
                >
                  <a href="https://register.affiliate.indexx.ai/">
                    <Button
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 150 }}
                      size={"large"}
                    >
                      Get Affiliates
                    </Button>
                  </a>


                </div>
                <div className="col-2">
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={"large"}
                  >
                    Complete
                  </Button>

                </div>
              </div>
              <Divider></Divider>
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={exgcoin} width={79}></Image>
                </div>
                <div className="col-5">
                  <Text style={{ fontSize: 20, fontWeight: 100 }}>
                    Make a transaction on indexx Exchange.
                  </Text>{" "}
                  <br />
                  <Progress style={{ width: 439 }} percent={((completedOrders && completedOrders.length > 0) ? 100 : 0)} size="small" />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 52, fontWeight: 100, marginTop: -20 }}
                  >
                    30
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: 100, marginTop: 20 }}
                  >
                    Points
                  </Text>
                </div>

                <div
                  className="col-2"
                  style={{
                    alignContent: "end",
                    alignItems: "end",
                    paddingLeft: 70,

                  }}
                >
                  <a href="/indexx-exchange/buy-sell">
                    <Button
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 150 }}
                      size={"large"}
                      disabled={(completedOrders && completedOrders.length > 0) ? true : false}
                    >
                      Buy Tokens
                    </Button>
                  </a>

                </div>

                <div className="col-2">
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={"large"}
                    disabled={(completedOrders && completedOrders.length > 0) ? true : false}
                  >
                    Complete
                  </Button>

                </div>
              </div>
              <Divider></Divider>
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={exgcoin} width={79}></Image>
                </div>
                <div className="col-5">
                  <Text style={{ fontSize: 20, fontWeight: 100 }}>
                    Report a bug on Indexx.ai.
                  </Text>
                  <Progress style={{ width: 439 }} percent={(hasOpenedBug ? 100 : (bugsData.length > 0 ? 50 : 0))} />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 52, fontWeight: 100, marginTop: -20 }}
                  >
                    30
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: 100, marginTop: 20 }}
                  >
                    Points
                  </Text>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: "end",
                    alignItems: "end",
                    paddingLeft: 70,

                  }}
                >
                  <a href="/indexx-exchange/report-bug">
                    <Button
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 150 }}
                      size={"large"}

                    >
                      Report a bug
                    </Button>
                  </a>

                </div>
                <div className="col-2">
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={"large"}
                  >
                    Complete
                  </Button>
                </div>

              </div>
              <Divider></Divider>
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={exgcoin} width={79}></Image>
                </div>
                <div className="col-5">
                  <Text style={{ fontSize: 20, fontWeight: 100 }}>
                    Take part in Indexx Lotto.
                  </Text>
                  <Progress style={{ width: 439 }} />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 52, fontWeight: 100, marginTop: -20 }}
                  >
                    40
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: 100, marginTop: 20 }}
                  >
                    Points
                  </Text>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: "end",
                    alignItems: "end",
                    paddingLeft: 70,

                  }}
                >
                  <a href="/indexx-exchange/fortune-daily">
                    <Button
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 150 }}
                      size={"large"}
                    >
                      Fortune daily
                    </Button>
                  </a>

                </div>
                <div className="col-2">
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={"large"}
                  >
                    Complete
                  </Button>
                </div>

              </div>
            </Card>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <a href="/indexx-exchange/how-it-works">
                <Button
                  danger
                  type="primary"
                  style={{ borderRadius: 5, width: 150 }}
                  size={"large"}
                >
                  How it Works
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default TaskCenter;
