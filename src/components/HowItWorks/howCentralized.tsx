import { Card, Image, Button, Input } from 'antd'
import { Divider } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import firstcoin from "../../assets/how-it-works/indexxlogo.png";

import Footer from '../Footer/Footer';

const { Text } = Typography;

const howCentralized = () => {
  const navigate = useNavigate();

  const navigateUser = (path: any) => {
    window.localStorage.setItem("redirect", window.location.pathname);
    navigate(path);
  }

  return (
    <>
        <div className='scan-container how-it-works flex-direction-column' >
        <Text className='card__title' style={{ marginBottom:100,color: "#5F5F5F", fontSize: "70px", lineHeight: "1em", marginTop:50 }}>Centralized </Text>

       
        </div>
     
      <Footer></Footer>
    </>

  )
  
}

export default howCentralized;