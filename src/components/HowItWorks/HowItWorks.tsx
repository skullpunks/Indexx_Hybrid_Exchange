import { Card, Image, Button, Input } from 'antd'
import { Divider } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import firstcoin from "../../assets/how-it-works/indexxlogo.png";
import tradetoearn from "../../assets/how-it-works/tradetoearn.png";
import tokens from "../../assets/how-it-works/tokens.png";
import indexxfortune from "../../assets/how-it-works/indexxfortune.png";
import finalsquare from "../../assets/how-it-works/finalsquare.png";
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const HowItWorks = () => {
  const navigate = useNavigate();

  const navigateUser = (path: any) => {
    window.localStorage.setItem("redirect", window.location.pathname);
    navigate(path);
  }

  return (
    <>
        <div className='scan-container how-it-works flex-direction-column' >
        <Text className='card__title' style={{ marginBottom:100,color: "#5F5F5F", fontSize: "70px", lineHeight: "1em", marginTop:50 }}>How it Works? </Text>

        <div className='row'>
        <div className='col-lg-4 text-center'>
          <Link to='/indexx-exchange/how-it-works/centralized' style={{textDecoration:"none"}}>
          <img src={firstcoin} alt="indexxcoin"  /><br />
                            <span className='employee_name'>
                                <strong >indexx<br />Centralized</strong>
                                
                            </span>
                            
          </Link>
               
                          
                        </div>
                        <div className='col-lg-4 text-center'>
                            <img src={firstcoin} alt="indexxcoin" /><br />
                            <span className='employee_name' >
                            <strong>indexx<br />Decentralized</strong>
                            </span>
                        </div>
                        <div className='col-lg-4 text-center'>
                            <img src={tradetoearn} alt="indexxcoin" style={{marginBottom:-20}}/><br />
                            <span className='employee_name'>
                            <strong>indexx<br />Trade To Earn</strong>
                            </span>
                        </div>
                        <div className='col-lg-4 text-center'>
                            <img src={tokens} alt="indexxcoin" style={{marginTop:50}} /><br />
                            <span className='employee_name'>
                              <strong>
                              indexx<br/> Tokens
                              </strong>
                          
                              </span>
                        </div>
                        <div className='col-lg-4 text-center'>
                            <img src={indexxfortune} alt="indexxcoin" style={{marginTop:50}} /><br />
                            <span className='employee_name'>
                              <strong> indexx<br />
                              Fortune<br /></strong>
                           </span>
                                <Text style={{opacity:"50%", fontWeight:"400"}}>(coming soon)</Text>
                        </div>
                        <div className='col-lg-4 text-center'>
                            <img src={finalsquare} alt="indexxcoin" style={{marginTop:50}} /><br />
                            <span className='employee_name'>
                              <strong>
                              indexx<br />
                              Bank<br />
                              </strong>
                           </span>
                                <Text style={{opacity:"50%", fontWeight:"400"}}>(coming soon)</Text>
                        </div>


        </div>
        
        </div>
     
      <Footer></Footer>
    </>

  )
  
}

export default HowItWorks;