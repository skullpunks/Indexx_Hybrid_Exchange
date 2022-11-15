
import { Image } from "antd";
import camera from "../../assets/arts/camera.png";
import you1 from "../../assets/arts/youtube1.webp";

const vlog = () => {

  return (
    <>
      <div className="scan-container trade-to-earn flex-direction-column ">
        <div className="row">
          <div className="col" style={{ justifyContent: "normal" }}>
            <Image
              src={camera}
              className="float-left "
              preview={false}
              style={{ width: 80, height: 52, marginTop: -20 }}
            >
              Vlog
            </Image>
            <span
              className="opacity-80 p-100"
              style={{
                paddingLeft: 30,
                marginTop: 100,
                paddingTop: 100,
                fontWeight: 500,
                fontSize: 60,
              }}
            >
              VLOG
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col">
          <a href="https://www.youtube.com/watch?v=kfbl3WqJy3E&ab_channel=IndexxAi">
         <Image
              src={you1}
              className="align-left float-left"
              preview={false}
              style={{  width:587, height:330,marginTop:50 }}
              
            >
              Vlog
            </Image>
            <p className="opacity-75" style={{fontSize:40,fontWeight:400,marginLeft:30}}> Indexx Trade to Earn launch</p>


        </a>
        </div>
          </div>
       
  
     
          
        </div>
   
      {/* <Footer></Footer> */}
    </>
  );
};

export default vlog;
