import { Card, Image, Button, Divider, Typography, Progress } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import exgcoin from "../../assets/arts/exgcoin.png";
import { decodeJWT, getUserCreatedBugs, getTaskCenterDetails } from "../../services/api";
import Footer from "../Footer/Footer";
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';



const { Text } = Typography;





const TaskCenter = () => {

  //const [completedOrders, setCompletedOrders] = useState([]);
  const [bugsData, setBugsData] = useState([]);
  const [hasOpenedBug, sethasOpenedBug] = useState<boolean>(false);
  const [taskCenterDetails, setTaskCenterDetails] = useState() as any;
  const [isLocked] = useState(true);




  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
         
        </Space>
      ),
    },
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];








  // const checkUserCompletedOrder = async () => {
  //   const access_token = String(localStorage.getItem("access_token"));
  //   const decoded: any = await decodeJWT(access_token);
  //   let res = await getUserCompletedOrder(String(decoded.email));
  //   if (res.status === 200) {
  //     setCompletedOrders(res.data);
  //   }
  // }

  const checkUserCreatedBugs = async () => {
    const access_token = String(localStorage.getItem("access_token"));
    const decoded: any = await decodeJWT(access_token);
    let res = await getUserCreatedBugs(String(decoded.email));
    if (res.data.status === 200) {
      setBugsData(res.data.data);
      res.data.data.forEach((element: any) => {
        if (element.bugStatus === 'Open') {
          sethasOpenedBug(true);
        }
      });
    }
  }

  const getTaskCenterDetailsData = async () => {
    const access_token = String(localStorage.getItem("access_token"));
    const decoded: any = await decodeJWT(access_token);
    let res = await getTaskCenterDetails(String(decoded.email));
    if (res.status === 200) {
      setTaskCenterDetails(res.data.data);
    }
  } 

  useEffect(() => {
    //checkUserCompletedOrder();
    checkUserCreatedBugs();
    getTaskCenterDetailsData();
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
              <strong>{taskCenterDetails?.totalPoints}/100</strong>{" "}
              <span style={{ fontSize: 10 }}>Points</span>
              <span
                style={{ fontSize: 30, textAlign: "center", paddingLeft: 30 }}
              >
                {" "}
                <strong>{taskCenterDetails?.totalPoints}</strong>
                <span style={{ fontSize: 10 }}> Total Points</span>
              </span>
            </p>
          </div>
          <div className="d-flex justify-content-center"> 
          <Button
                      disabled={isLocked}
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 200 }}
                      size={"large"}
                    >
                      LOCKED
                    </Button>

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
                    style={{ fontSize: 50, fontWeight: 50, marginTop: -20 }}
                  >
                    {taskCenterDetails?.inivitedUserPoints}
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
                  <Progress style={{ width: 439 }} percent={((taskCenterDetails?.isTransactionCompletedInExchange) ? 100 : 0)} size="small" />
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
                      disabled={(taskCenterDetails?.isTransactionCompletedInExchange) ? true : false}
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
                    disabled={(taskCenterDetails?.isTransactionCompletedInExchange) ? true : false}
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
                    style={{ fontSize: 50, fontWeight: 100, marginTop: -20 }}
                  >
                   {taskCenterDetails?.reportedBugPoints}
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
                  <Link to="/indexx-exchange/report-bug">
                    <Button
                      danger
                      type="primary"
                      style={{ borderRadius: 5, marginTop: 15, width: 150 }}
                      size={"large"}
                      disabled={(hasOpenedBug ) ? true : false}
                    >
                      Report a bug
                    </Button>
                  </Link>

                </div>
                <div className="col-2">
                  <Button
                    danger
                    type="primary"
                    style={{ borderRadius: 5, width: 150, marginTop: 15 }}
                    size={"large"}
                    disabled={(hasOpenedBug ) ? true : false}
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
                    style={{ fontSize: 50, fontWeight: 100, marginTop: -20 }}
                  >
                    {taskCenterDetails?.lottoPoints}
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
                      disabled={true}
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
                    disabled={true}
                  >
                    Coming Soon
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
                  Complete KYC on Indexx Exchange
                  </Text>
                  <Progress style={{ width: 439 }} />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 52, fontWeight: 100, marginTop: -20 }}
                  >
                    20
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
                 Sign Up on Indexx Exchange
                  </Text>
                  <Progress style={{ width: 439 }} />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 52, fontWeight: 100, marginTop: -20 }}
                  >
                    10
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
                  Buy Indexx Tokens
                  </Text>
                  <Progress style={{ width: 439 }} />
                </div>
                <div className="col-1 d-flex justify-content-center">
                  <Text
                    className="opacity-75"
                    style={{ fontSize: 52, fontWeight: 100, marginTop: -20 }}
                  >
                    20
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
                      // disabled={(completedOrders && completedOrders.length > 0) ? true : false}
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
                  style={{ borderRadius: 5, width: 150,marginBottom:50 }}
                  size={"large"}
                >
                  How it Works
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
        <Table style={{margin:20,marginBlock:10,width:1510,marginLeft:80,marginBottom:10}} bordered={true} columns={columns} dataSource={data} />         
        </div>  
       
      </div>
               
      <Footer></Footer>
    </>
  );
};

export default TaskCenter;
