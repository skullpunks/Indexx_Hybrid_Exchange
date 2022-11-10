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
      <div className="scan-container trade-to-earn flex-direction-column ">
        <div className="row" style={{ paddingLeft: 70, paddingTop: 60 }}>
          <p style={{ fontWeight: 50, fontSize: 48 }}>Task Center</p> <br />
          <p style={{ fontWeight: 50, paddingTop: 10, fontSize: 32 }}>
            Limited Tasks
          </p> <br/><br/><br/><br/><br/>
          <p className="opacity-50" style={{ fontWeight: 50, paddingTop: 10, fontSize: 20 }}>
          Once you receive the task, you can start completing it. Complete your task within the deadline to get your reward.
          </p>
          <Card className="w-75 shadow-sm p-3 mb-5 bg-white rounded " style={{marginTop:20}}>
              <div className="row">
              <div className="col-2">
                <Image preview={false} src={exgcoin} width={79}></Image>
              </div>
              <div className="col-7">
                <Text style={{fontSize:20,fontWeight:100}} >Invite 3 users using the indexx Affiliate System.</Text> 
                <Progress />
                <p className="opacity-50"style={{fontSize:15}}>Expired Time:2022-10-2823:53:13(UTC + 5)</p> 
              </div>
              <div className="col" style={{alignContent:"end",alignItems:"end",paddingLeft:70,paddingTop:15}} >
              <Button
                  danger
                  type="primary"
                  shape="round"
                  size="small"
                  className="btn_xl buy_sell_button "
                  style={{width:156}}
                >
                  Complete
                </Button>
              </div>
            </div>
          <Divider></Divider>
          <div className="row">
              <div className="col-2">
                <Image  preview={false} src={exgcoin} width={79}></Image>
              </div>
              <div className="col-7">
                <Text style={{fontSize:20,fontWeight:100}} >Make a transaction on indexx Exchange!</Text> 
                <Progress />
                <p className="opacity-50"style={{fontSize:15}}>Expired Time:2022-10-2823:53:13(UTC + 5)</p> 
              </div>
              <div className="col" style={{alignContent:"end",alignItems:"end",paddingLeft:70,paddingTop:15}} >
              <Button
                  danger
                  type="primary"
                  shape="round"
                  size="small"
                  className="btn_xl buy_sell_button "
                  style={{width:156}}
                >
                  Complete
                </Button>
              </div>
            </div>
          </Card>

          

        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default TaskCenter;
