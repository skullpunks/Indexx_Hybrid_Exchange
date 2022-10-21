import { Card, Image, Button, Input } from 'antd'
import { Divider } from 'antd';
import { Typography } from 'antd';

import exgcoin from "../../assets/arts/exgcoin.png";
// import exglady from "../../assets/arts/exglady.png";
import exghands from "../../assets/arts/exghands.png";

import no1 from "../../assets/arts/no1.png";
import no2 from "../../assets/arts/no2.png";
import no3 from "../../assets/arts/no3.png";

import Footer from '../Footer/Footer';
import { decodeJWT, getUserRewards } from '../../services/api';


const { Text } = Typography;

const TradeToEarn = () => {

  let totalTokensBalInUSD = 0;
  let access_token = String(localStorage.getItem("access_token"));
  let decoded :any= decodeJWT(access_token);
  // onChange =>()= {
  // let userWallets = await getUserWallets(decoded.email);
  // // }
  // useEffect( async() {
  // await getUserWallets(decoded.email);
  // }, []);

  // getUserWallets(decoded.email).then((userWallets) => {
  //     data = userWallets.data;
  //     userWallets.data.map((wallet: any) => {
  //         totalBalanceInUSD += parseFloat(wallet.coinWalletBalanceInUSD);
  //     })
  //     console.log("data", data);
  // })

  getUserRewards(decoded.email).then((userRewards) => {
    console.log("userRewards", userRewards);
    totalTokensBalInUSD = userRewards.data.rewardTokenBalanceInUSD;
    console.log("totalTokensBalInUSD", totalTokensBalInUSD);
  })

  return (
    <>
      <div className='scan-container trade-to-earn flex-direction-column '>
        <br /><br /><br />
        <p className='card__title' style={{ color: "#5F5F5F", fontSize: "50px", lineHeight: "1em", margin: -19 }}>Trade To Earn </p>
        <p style={{ marginLeft: 320 }}>&trade;</p>
        <br></br>
        <Card>
          <h2 className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "30px" }}>Withdraw Earnings</h2>
          <Divider />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

          }}>
            <Image src={exgcoin} width={120} preview={false}></Image>
          </div>
          <h2 className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "25px" }}>indexx Exchange (INEX)</h2>
          <h1 style={{ display: 'flex', marginTop: 0, justifyContent: 'center', alignItems: 'center', opacity: "20%", color: "#5F5F5F", fontSize: "90px" }}>$0</h1>
          <Text className='centered' style={{ marginBottom: 0, color: "#5F5F5F", fontSize: "15px" }}>Minimum limit:100</Text>
          <br /> <br></br>
          <Button type="primary" block shape="round" size="large" className="btn_xl" style={{
            height: "55px",
            borderRadius: "5px",

          }}>Withdraw Tokens</Button>

          <br /><br />

          <Input.Group compact style={{ paddingTop: "40px" }}>
            <Input size={"middle"} style={{ width: '100%', marginBottom: "10px" }} defaultValue="Enter Wallet Address" />
            <Button type="primary" block shape="round" size="large" className="btn_xl" style={{
              height: "55px", borderRadius: "5px",
            }}>Submit Wallet Address</Button>
          </Input.Group>
          <br />

        </Card>

        <Image preview={false} src={exghands} style={{ paddingTop: 100, display: 'flex', justifyContent: 'center', width: 400, alignItems: 'center' }}></Image>
        <Image preview={false} src={no1} style={{ display: 'flex', justifyContent: 'center', width: 500, alignItems: 'center' }}></Image>
        <Image preview={false} src={no2} style={{ display: 'flex', justifyContent: 'center', width: 500, alignItems: 'center' }}></Image>
        <Image preview={false} src={no3} style={{ paddingLeft: 10, display: 'flex', justifyContent: 'center', width: 480, alignItems: 'center' }}></Image>

      </div>

      <Footer></Footer>
    </>


  )
}

export default TradeToEarn