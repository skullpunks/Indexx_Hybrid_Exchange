import {
  CheckCircleFilled,
  CloseCircleFilled,
  CopyOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Divider,
  Image,
  Progress,
  Table,
  Typography,
  notification,
} from 'antd';
import { getUserDetails } from '../../services/api';
import down from "../../assets/rewardcenter/whol.png";
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import iusd from '../../assets/rewardcenter/iusd.png';
import { baseCEXURL } from '../../services/api';


import {
  decodeJWT,
  getTaskCenterDetails,
  getUserCreatedBugs,
  enableTradeToEarn,
} from '../../services/api';
// import Footer from '../Footer/Footer';
import OpenNotification from '../OpenNotification/OpenNotification';
import taskTop from '../../assets/rewardcenter/top.png';
import useCopyToClipboard from '../../utils/useCopyToClipboard';

const { Text } = Typography;

const TaskCenter = () => {
  //const [completedOrders, setCompletedOrders] = useState([]);

  const [bugsData, setBugsData] = useState([]);
  const [hasOpenedBug, sethasOpenedBug] = useState<boolean>(false);
  const [copiedValue, copy] = useCopyToClipboard();
  const [userData, setUserData] = useState() as any;

  const [taskCenterDetails, setTaskCenterDetails] = useState() as any;
  const [isLocked, setIsLocked] = useState(true);
  const [pointsHistory, setPointHistory] = useState() as any;
  const [loadings, setLoadings] = useState<boolean>(false);

  interface DataType {
    date: string;
    type: string;
    points: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'ascend',
      sorter: (a: any, b: any) => moment(a.date).unix() - moment(b.date).unix(),
      render: (text: any) => (
        <span>{moment(text).format('MM/DD/YYYY hh:mm:ss a')}</span>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: any) => {
        return <Text>{text}</Text>;
      },
    },
    {
      title: 'IUSD+',
      dataIndex: 'points',
      key: 'points',
      render: (text: any) => {
        return <Text>{text}</Text>;
      },
    },
  ];

  // const data: DataType[] = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //     tags: ['loser'],
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];

  const [email, setEmail] = useState('');
  // const checkUserCompletedOrder = async () => {
  //   const access_token = String(localStorage.getItem("access_token"));
  //   const decoded: any = await decodeJWT(access_token);
  //   let res = await getUserCompletedOrder(String(decoded.email));
  //   if (res.status === 200) {
  //     setCompletedOrders(res.data);
  //   }
  // }

  const checkUserCreatedBugs = async () => {
    const access_token = String(localStorage.getItem('access_token'));
    const decoded: any = await decodeJWT(access_token);
    let res = await getUserCreatedBugs(String(decoded.email));
    setEmail(String(decoded.email));
    if (res.data.status === 200) {
      setBugsData(res.data.data);
      res.data.data.forEach((element: any) => {
        if (element.bugStatus === 'Open') {
          sethasOpenedBug(true);
        }
      });
    }
  };

  const getTaskCenterDetailsData = async () => {
    const access_token = String(localStorage.getItem('access_token'));
    const decoded: any = await decodeJWT(access_token);
    let res = await getTaskCenterDetails(String(decoded.email));
    if (res.status === 200) {
      setTaskCenterDetails(res.data.data);
      setPointHistory(res.data.data.pointsHistory);
      if (res.data.data.totalPoints >= 100) setIsLocked(false);
    }
  };

  useEffect(() => {
    let access_token = String(localStorage.getItem('access_token'));
    let decoded: any = decodeJWT(access_token);

    setEmail(decoded.email);
    getUserDetails(decoded.email).then((res) => {
      if (res.status === 200) {
        console.log('res.data', res.data);
        setUserData(res.data);
      }
    });
  }, [email]);

  const enableTradetoEarnButton = async () => {
    setLoadings(true);
    const access_token = String(localStorage.getItem('access_token'));
    const decoded: any = await decodeJWT(access_token);
    let res = await enableTradeToEarn(String(decoded.email));

    if (res.status === 200) {
      setLoadings(false);
      getTaskCenterDetailsData();
      OpenNotification('success', 'Trade to Earn is enabled');
    } else {
      setLoadings(false);
      OpenNotification('error', 'Something went wrong. Please contact admin');
    }
  };

  useEffect(() => {
    //checkUserCompletedOrder();
    checkUserCreatedBugs();
    getTaskCenterDetailsData();
  }, []);

  return (
    <>
      <div className="scan-container trade-to-earn flex-direction-column d-flex justify-content-center">
        <div className="row">
        <div className="text-center">
  <Image src={taskTop} width={250} preview={false}/>
  <p style={{ fontWeight: 110, fontSize: 50 }}>
    <b>Reward Center</b>
  </p>
  <br/>
  <br/>
  <p style={{ fontWeight: 200, fontSize: 32 }}>
    <div className="padding-lr-1x d-flex align-items-center justify-content-center text-center">
      <span> Referral Link: {userData?.referralCode}</span>
      <CopyOutlined
  className="padding-lr-1x hover_icon"
  onClick={() => {
    const referralLink = `${baseCEXURL}/indexx-exchange/buy-sell/get-started?referralCode=${userData?.referralCode}`;
    copy(referralLink);
    notification.success({
      message: 'Referral Link Copied',
      description: 'Your referral link has been copied to the clipboard.',
      placement: 'bottom',
    });
  }}
/>
    </div>
  </p>
  <p style={{ fontWeight: 200, fontSize: 17 }}>
    Invite people using your referral code to earn rewards.
  </p>

  <br />


</div>
          <div className="d-flex justify-content-center">
            <Card
              className="w-55 shadow-sm p-3 mb-5 bg-white rounded "
              style={{ marginTop: 20 }}
            >
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={iusd} width={60}></Image>
                </div>
                <div className="col-5">
                  <Text style={{ fontSize: 20, fontWeight: 100 }}>
                    Invite 5 normal to Sign Up using your refferal code
                  </Text>
                  <Progress
                    style={{ width: 439 }}
                    percent={
                      Math.floor(
                        (taskCenterDetails?.inivitedUsersCount / 3) * 100 * 100
                      ) / 100
                    }
                  />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 50, fontWeight: 50, marginTop: -20 }}
                  >
                    100
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: 100, marginTop: 20 }}
                  >
                    IUSD+
                  </Text>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: 'end',
                    alignItems: 'end',
                    paddingLeft: 70,
                  }}
                >
                
                    <Button
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 150 }}
                      size={'large'}
                      onClick={() => {
                        const referralLink = `${baseCEXURL}/indexx-exchange/buy-sell/get-started?referralCode=${userData?.referralCode}`;
                        copy(referralLink);
                        notification.success({
                          message: 'Referral Link Copied',
                          description: 'Your referral link has been copied to the clipboard.',
                          placement: 'bottom',
                        });
                      }}
                    >
                    Copy Invite Link
                    </Button>
               
                </div>
                <div className="col-2" style={{ paddingLeft: 50 }}>
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={'large'}
                  >
                    Complete
                  </Button>
                </div>
              </div>
              <Divider></Divider>
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={iusd} width={60}></Image>
                </div>
                <div className="col-5">
                  <Text style={{ fontSize: 20, fontWeight: 100 }}>
                  Invite 7 normal to Sign Up using your refferal code

                  </Text>
                  <Progress
                    style={{ width: 439 }}
                    percent={
                      Math.floor(
                        (taskCenterDetails?.inivitedUsersCount / 7) * 100 * 100
                      ) / 100
                    }
                  />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 50, fontWeight: 50, marginTop: -20 }}
                  >
                  210
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: 100, marginTop: 20 }}
                  >
                    IUSD+
                  </Text>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: 'end',
                    alignItems: 'end',
                    paddingLeft: 70,
                  }}
                >
                
                    <Button
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 150 }}
                      size={'large'}
                      onClick={() => {
                        const referralLink = `${baseCEXURL}/indexx-exchange/buy-sell/get-started?referralCode=${userData?.referralCode}`;
                        copy(referralLink);
                        notification.success({
                          message: 'Referral Link Copied',
                          description: 'Your referral link has been copied to the clipboard.',
                          placement: 'bottom',
                        });
                      }}
                    >
Copy Invite Link
                    </Button>
               
                </div>
                <div className="col-2" style={{ paddingLeft: 50 }}>
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={'large'}
                  >
                    Complete
                  </Button>
                </div>
              </div>
              <Divider></Divider>
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={iusd} width={60}></Image>
                </div>
                <div className="col-5">
                  <Text style={{ fontSize: 20, fontWeight: 100 }}>
                  Invite 10 normal to Sign Up using your refferal code

                  </Text>
                  <Progress
                    style={{ width: 439 }}
                    percent={
                      Math.floor(
                        (taskCenterDetails?.inivitedUsersCount / 10) * 100 * 100
                      ) / 100
                    }
                  />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 50, fontWeight: 50, marginTop: -20 }}
                  >
                    500
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: 100, marginTop: 20 }}
                  >
                    IUSD+
                  </Text>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: 'end',
                    alignItems: 'end',
                    paddingLeft: 70,
                  }}
                >
                  
                    <Button
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 150 }}
                      size={'large'}
                      onClick={() => {
                        const referralLink = `${baseCEXURL}/indexx-exchange/buy-sell/get-started?referralCode=${userData?.referralCode}`;
                        copy(referralLink);
                        notification.success({
                          message: 'Referral Link Copied',
                          description: 'Your referral link has been copied to the clipboard.',
                          placement: 'bottom',
                        });
                      }}
                    >
Copy Invite Link
                    </Button>
                
                </div>
                <div className="col-2" style={{ paddingLeft: 50 }}>
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={'large'}
                  >
                    Complete
                  </Button>
                </div>
              </div>
              <Divider></Divider>

              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={iusd} width={60}></Image>
                </div>
                <div className="col-5">
                  <Text style={{ fontSize: 20, fontWeight: 100 }}>
                    Make a transaction on indexx Exchange.
                  </Text>{' '}
                  <br />
                  <Progress
                    style={{ width: 439 }}
                    percent={
                      taskCenterDetails?.isTransactionCompletedInExchange
                        ? 100
                        : 0
                    }
                    size="small"
                  />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 50, fontWeight: 100, marginTop: -20 }}
                  >
                    {taskCenterDetails?.transactionPoints}
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: 100, marginTop: 20 }}
                  >
                    IUSD+
                  </Text>
                </div>

                <div
                  className="col-2 "
                  style={{
                    alignContent: 'end',
                    alignItems: 'end',
                    paddingLeft: 70,
                  }}
                >
                  <a href="/indexx-exchange/buy-sell">
                    <Button
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 150 }}
                      size={'large'}
                      disabled={
                        taskCenterDetails?.isTransactionCompletedInExchange
                          ? true
                          : false
                      }
                    >
                      Buy Tokens
                    </Button>
                  </a>
                </div>

                <div className="col-2" style={{ paddingLeft: 50 }}>
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={'large'}
                    disabled={
                      taskCenterDetails?.isTransactionCompletedInExchange
                        ? true
                        : false
                    }
                  >
                    Complete
                  </Button>
                </div>
              </div>
              <Divider></Divider>
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={iusd} width={60}></Image>
                </div>
                <div className="col-5">
                  <Text style={{ fontSize: 20, fontWeight: 100 }}>
                    Report a bug on Indexx.ai.
                  </Text>
                  <Progress
                    style={{ width: 439 }}
                    percent={hasOpenedBug ? 100 : bugsData.length > 0 ? 50 : 0}
                  />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 50, fontWeight: 100, marginTop: -20 }}
                  >
                   30
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: 100, marginTop: 20 }}
                  >
                    IUSD+
                  </Text>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: 'end',
                    alignItems: 'end',
                    paddingLeft: 70,
                  }}
                >
                  <Link to="/indexx-exchange/report-bug">
                    <Button
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 150 }}
                      size={'large'}
                      disabled={hasOpenedBug ? true : false}
                    >
                      Report a bug
                    </Button>
                  </Link>
                </div>
                <div className="col-2" style={{ paddingLeft: 50 }}>
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={'large'}
                    disabled={hasOpenedBug ? true : false}
                  >
                    Complete
                  </Button>
                </div>
              </div>
              <Divider></Divider>
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={iusd} width={60}></Image>
                </div>
                <div className="col-5">
                  <Text style={{ fontSize: 20, fontWeight: 100 }}>
                   Buy a ticket in Fantasy Lotto.
                  </Text>
                  <Progress style={{ width: 439 }} />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 50, fontWeight: 100, marginTop: -20 }}
                  >
                    10
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: 100, marginTop: 20 }}
                  >
                    IUSD+
                  </Text>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: 'end',
                    alignItems: 'end',
                    paddingLeft: 70,
                  }}
                >
                  <a href="https://lotto.indexx.ai">
                    <Button
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 150 }}
                      size={'large'}
                      disabled={true}
                    >
                      Fantasy Lotto
                    </Button>
                  </a>
                </div>
                <div className="col-2" style={{ paddingLeft: 50 }}>
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={'large'}
                    disabled={true}
                  >
                    Coming Soon
                  </Button>
                </div>
              </div>

              {/* <Divider></Divider>
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={iusd} width={60}></Image>
                </div>
                <div className="col-5">
                  <Text style={{ fontSize: 20, fontWeight: 100 }}>
                    Complete KYC on Indexx Exchange
                  </Text>
                  <Progress
                    style={{ width: 439 }}
                    percent={
                      taskCenterDetails?.isKYCPass
                        ? 100
                        : bugsData.length > 0
                        ? 50
                        : 0
                    }
                  />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <span
                    className="opacity-75"
                    style={{ fontSize: 50, fontWeight: 100, marginTop: -10 }}
                  >
                    {taskCenterDetails?.KYCPoints}
                  </span>
                  <span style={{ marginTop: 30 }}>IUSD+</span>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: 'end',
                    alignItems: 'end',
                    paddingLeft: 70,
                  }}
                ></div>
                <div className="col-2" style={{ paddingLeft: 50 }}>
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={'large'}
                    disabled={taskCenterDetails?.isKYCPass}
                  >
                    Complete
                  </Button>
                </div>
              </div>
              <Divider></Divider>
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={iusd} width={60}></Image>
                </div>
                <div className="col-5">
                  <span style={{ fontSize: 20, fontWeight: 100 }}>
                    Sign Up on Indexx Exchange
                  </span>
                  <Progress
                    style={{ width: 439 }}
                    percent={taskCenterDetails?.email ? 100 : 0}
                  />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <span
                    className="opacity-75"
                    style={{ fontSize: 50, fontWeight: 100, marginTop: -10 }}
                  >
                    10
                  </span>
                  <span style={{ marginTop: 30 }}>IUSD+</span>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: 'end',
                    alignItems: 'end',
                    paddingLeft: 70,
                  }}
                ></div>
                <div className="col-2" style={{ paddingLeft: 50 }}>
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={'large'}
                    disabled={taskCenterDetails?.email}
                  >
                    Complete
                  </Button>
                </div>
              </div>
              <Divider></Divider>
              <div className="row">
                <div className="col-2 d-flex justify-content-center">
                  <Image preview={false} src={iusd} width={60}></Image>
                </div>
                <div className="col-5">
                  <Text style={{ fontSize: 20, fontWeight: 100 }}>
                    Buy Indexx Tokens
                  </Text>
                  <Progress
                    style={{ width: 439 }}
                    percent={taskCenterDetails?.isBuyIndexxTokens ? 100 : 0}
                  />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 50, fontWeight: 100, marginTop: -20 }}
                  >
                    {taskCenterDetails?.buyIndexxTokensPoints}
                  </Text>
                  <Text
                    style={{ fontSize: 15, fontWeight: 100, marginTop: 20 }}
                  >
                    IUSD+
                  </Text>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: 'end',
                    alignItems: 'end',
                    paddingLeft: 70,
                  }}
                >
                  <a href="/indexx-exchange/buy-sell">
                    <Button
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 150 }}
                      size={'large'}
                      disabled={taskCenterDetails?.isBuyIndexxTokens}
                    >
                      Buy Tokens
                    </Button>
                  </a>
                </div>
                <div className="col-2" style={{ paddingLeft: 50 }}>
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={'large'}
                    disabled={taskCenterDetails?.isBuyIndexxTokens}
                  >
                    Complete
                  </Button>
                </div>
              </div> */}
            </Card>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <a href="/indexx-exchange/how-it-works">
                <Button
                  danger
                  type="primary"
                  style={{ borderRadius: 5, width: 150, marginBottom: 50 }}
                  size={'large'}
                >
                  How it Works
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
  <Image src={down} preview={false}></Image>
        </div>

        <Divider style={{ width: 1430 ,marginTop:200}}>
          <b>IUSD+ History</b>
        </Divider>

        <div className="d-flex justify-content-center">
          <Table
            style={{
              margin: 20,
              marginBlock: 10,
              width: 1430,
              marginLeft: 80,
              marginBottom: 10,
            }}
            bordered={true}
            columns={columns}
            dataSource={pointsHistory}
          />
        </div>
      </div>

      {/* <Footer></Footer> */}
    </>
  );
};

export default TaskCenter;
