import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { Image } from "antd";
import camera from '../../assets/arts/camera.png'
const vlog = () => {
  return (
    <>
      <div className="scan-container trade-to-earn flex-direction-column ">
        <div className="row">
            <div className="col-1">
            <Image src={camera} className="float-left " preview={false} style={{width:80,height:52,paddingLeft:20,marginTop:20}}>Vlog</Image>
            </div>
            <div className="col">
              <p className="opacity-80" style={{fontWeight:500, fontSize:60}}>VLOG</p>
             
            </div>

        </div>
        
        <div className="row">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/kfbl3WqJy3E" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </>
  );
};

export default vlog;
