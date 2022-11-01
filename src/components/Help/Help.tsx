
import { Outlet } from "react-router-dom";
import "./Help.css";
import LeftNav from "./LeftNav";
import ContactUs from './ContactUs';

import Team from './Team';
import { Collapse } from 'antd';
const { Panel } = Collapse;


import Footer from "../Footer/Footer";
import Intro from "./Intro";

const Help = () => {
    return (
        <>
            <div className="nav_container d-flex help_main_page d-md-flex d-none">
                <LeftNav />
                <Outlet />

            </div>
            <div className="nav_container d-flex help_main_page d-md-none">
            <Collapse>
       
      
        
      
       <Panel header=" indexx Swap Intro" key="1">
          
      <Intro/>

      </Panel>
      <Panel header="indexx Swap Team" key="2">
          
      <Team/>

      </Panel>
      <Panel header="Contact Us" key="3">
          
      <ContactUs/>

      </Panel>
    </Collapse>

            </div>


            <Footer helpIcon={false} />
        </>

    )
}

export default Help