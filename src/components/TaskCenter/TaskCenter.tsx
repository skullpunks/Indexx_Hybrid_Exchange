import { Card, Image, Button, Input, notification } from "antd";
import { Divider } from "antd";
import { Typography, Progress } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckCircleFilled } from "@ant-design/icons";
import exgcoin from "../../assets/arts/exgcoin.png";
import logo from "../../assets/arts/logo.png";
// import exglady from "../../assets/arts/exglady.png";
import exghands from "../../assets/arts/exghands.png";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";

const { Text } = Typography;

const TaskCenter = () => {
  const navigate = useNavigate();
  const navigateUser = (path: any) => {
    window.localStorage.setItem("redirect", window.location.pathname);
    navigate(path);
  };
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
              Complete your tasks to get <span style={{fontSize:40}}>30%</span>Trade Reward
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
                  <Progress style={{width:439}}/>
                </div>
                <div className="col-3 d-flex justify-content-center">
                <Text className="opacity-75" style={{  fontSize: 80, fontWeight: 50, marginTop:-30}}>
                    35
                  </Text>
                  <Text style={{  fontSize: 15, fontWeight: 100,marginTop:40}}>
                    Points Earned.
                  </Text>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: "end",
                    alignItems: "end",
                    paddingLeft: 70,
                    paddingTop: 15,
                  }}
                >
                  <Button
                    danger
                    type="primary"
                    style={{borderRadius:5}}
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
                  </Text> <br/>
                  <Progress style={{width:439}}/>
                
                </div>
                <div className="col-3 d-flex justify-content-center">
                <Text className="opacity-75" style={{  fontSize: 80, fontWeight: 100, marginTop:-30}}>
                    30
                  </Text>
                  <Text style={{  fontSize: 15, fontWeight: 100,marginTop:40}}>
                    Points Earned.
                  </Text>

                </div>


                <div
                  className="col-2"
                  style={{
                    alignContent: "end",
                    alignItems: "end",
                    paddingLeft: 70,
                    paddingTop: 15,
                  }}
                >
                  <Button
                    danger
                    type="primary"
                    style={{borderRadius:5}}
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
                    Report a bug on Indexx.ai.
                  </Text>
                  <Progress style={{width:439}}/>
                </div>
                <div className="col-3 d-flex justify-content-center">
                <Text className="opacity-75"style={{  fontSize: 80, fontWeight: 100, marginTop:-30}}>
                    30
                  </Text>
                  <Text style={{  fontSize: 15, fontWeight: 100,marginTop:40}}>
                    Points Earned.
                  </Text>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: "end",
                    alignItems: "end",
                    paddingLeft: 70,
                    paddingTop: 15,
                  }}
                >
                  <Button
                    danger
                    type="primary"
                    style={{borderRadius:5}}
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
                  <Progress style={{width:439}}/>
                </div>
                <div className="col-3 d-flex justify-content-center">
                <Text className="opacity-75"style={{  fontSize: 80, fontWeight: 100, marginTop:-30}}>
                    40
                  </Text>
                  <Text style={{  fontSize: 15, fontWeight: 100,marginTop:40}}>
                    Points Earned.
                  </Text>
                </div>
                <div
                  className="col-2"
                  style={{
                    alignContent: "end",
                    alignItems: "end",
                    paddingLeft: 70,
                    paddingTop: 15,
                  }}
                >
                <Button
                    danger
                    type="primary"
                    style={{borderRadius:5}}
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
            <Button
                    danger
                    type="primary"
                    style={{borderRadius:5,width:156}}
                    size={"large"}
                   
                  >
                    Complete
                  </Button>

            </div>
             </div>
          
          </div>

        
      </div>

      <Footer></Footer>
    </>
  );
};

export default TaskCenter;
