import React from 'react';
import './Notification.css'
import NotificationLeftNav from './NotificationLeftNav';
import { Collapse } from 'antd';
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import AllNotification from './AllNotification';
import Activity from './Activity';
const { Panel } = Collapse;
const Notification = () => {
  return (
    <div>


             <>
            
            <div className='nav_container' style={{paddingTop:120}}><h2 className='border-bottom padding-b-1x font_40x' style={{marginBottom:0}}>Notifications</h2>
            <div className=" d-flex help_main_page d-md-flex d-none">

            
                <NotificationLeftNav />
                <Outlet />
                <div className=" d-flex help_main_page d-md-none">
                <Collapse>




                    <Panel header=" indexx Swap Intro" key="1">

                        < AllNotification/>

                    </Panel>
                    <Panel header="indexx Swap Team" key="2">

                       <Activity/>

                    </Panel>
                    <Panel header="Contact Us" key="3">

                        {/* <ContactUs /> */}

                    </Panel>
                </Collapse>

            </div>
            </div>

            </div>
          


            <Footer helpIcon={false} />
        </>


    </div>
  )
}

export default Notification