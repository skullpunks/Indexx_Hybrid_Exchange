import React from 'react';
import './Notification.css'
import NotificationLeftNav from './NotificationLeftNav';
import { Collapse } from 'antd';
// import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import AllNotification from './AllNotification';
import Activity from './Activity';
import SystemMsg from './SystemMsg';
const { Panel } = Collapse;
const Notification = () => {
    return (
        <div>


            <>

                <div className='nav_container' style={{ paddingTop: 180 }}>
                    <h1 className='border-bottom padding-b-1x font_40x d-md-flex d-none top_heading' style={{ marginBottom: 0 }}>Notifications</h1>
                    <div className=" d-flex help_main_page d-md-flex d-none">


                        <NotificationLeftNav />
                        <Outlet />
                    </div>
                    <div className=" nav_container d-flex help_main_page d-md-none notification_nav_container">
                        <Collapse>




                            <Panel header=" All" key="1">

                                < AllNotification />

                            </Panel>
                            <Panel header="Activities" key="2">

                                <Activity />

                            </Panel>
                            <Panel header="System messages" key="3">

                                <SystemMsg />

                            </Panel>
                        </Collapse>

                    </div>
                </div>





                {/* <Footer helpIcon={false} /> */}
            </>


        </div >
    )
}

export default Notification