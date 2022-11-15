import React from 'react';
import paper from "../../assets/arts/paper.svg";

const SystemMsg = () => {
    return (
        <div className="help_content_page notification_container" style={{ height: "max-content" }}>
            <div className="nav_main_header ">
               
                
                <div className='padding-b-2x border-b '>
                    <div className='d-flex flex-justify-between'>
                        <div className='d-flex'>
                        <img src={paper} alt="paper" />
                        <span className='font_25x padding-l-1x'>Login attempted from new IP
                        </span>
                        </div>
                        <div className='font_15x d-md-flex d-none'>
                    2022-11-11 08:33:40
                    </div>
                    </div>
                    <div>
                        <p className='font_15x'>The system has detected that your account is logged in from an unused IP address. Account: sunkuomk...

                        </p>
                    </div>
                    <div className='padding-t-1x text_link d-md-flex d-none'>
                        View more
                    </div>
                </div>
            </div>



        </div>
    )
}

export default SystemMsg;