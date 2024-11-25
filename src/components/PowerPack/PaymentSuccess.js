import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import man from "../../assets/man paint 1.svg";
import { baseAcademyUrl, decodeJWT, encrypt, getOrderDetails } from '../../services/api';
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

const PaymentSuccess = () => {

  const [orderID, setOrderId] = useState("");
  const [orderId] = useSearchParams();
  const [url, setUrl] = useState();
  useEffect(() => {
    setOrderId(String(orderId.get("orderId")));
    if (orderId.get("orderId") !== undefined) {
      let access_token = String(localStorage.getItem("access_token"));
      let decoded = decodeJWT(access_token);
      getOrderDetails(decoded.email, String(orderId.get('orderId'))).then((res) => {
        const userEmail = decoded.email;
        const userKey = localStorage.getItem("userkey");
        const userType = localStorage.getItem("userType");
        console.log("userEmail", userEmail);
        console.log("userKey", userKey);

        const url = `${baseAcademyUrl}/authentication/?useremail=${userEmail}&userkey=${userKey}&usertype=${userType}`;
        setUrl(url)
        if (res.status === 200) {
          let orderData = res.data.data;
          console.log("orderData", orderData);
          const userEmail = decoded.email;
          const userKey = localStorage.getItem("userkey");
          console.log("userEmail", userEmail);
          console.log("userKey", userKey);
          const url = `${baseAcademyUrl}/authentication/?useremail=${userEmail}&userkey=${userKey}&usertype=${userType}`;
          setUrl(url)
        }
      });
    }
  }, [orderId])

  return (
    <Box mt={18}>
      <Box mx={"auto"} sx={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <img src={man} alt="man" width={"350px"} />
        <Typography variant="text" component="p" fontSize={"62px"} fontWeight={600}>
          Congratulations
        </Typography>
        <Typography variant="text" component="p" fontSize={"40px"} fontWeight={400}>
          on purchasing the
        </Typography>
        <Typography variant="text" component="p" fontSize={"40px"} fontWeight={400}>
          Power Pack. Your order ID is {orderID}
        </Typography>
        <Typography variant="text" component="p" fontSize={"15px"} lineHeight={"30px"}>
          The INEX tokens have been dropped automatically in your wallet.
        </Typography>
        <Typography variant="text" component="p" fontSize={"15px"} lineHeight={"30px"}>
          You can check them {" "}
          <a href='/indexx-exchange/buy-sell/wallet' className='hive_link '>
            here
          </a>
          . You will also receive an email with
        </Typography>
        <Typography variant="text" component="p" fontSize={"15px"} lineHeight={"30px"}>
          powerpack contents inside.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            width: '566px',
            mt: 6,
            gap: 2
          }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer">

            <Button
              disableTouchRipple
              sx={{
                backgroundColor: '#FFB300',
                color: "#5f5f5f",
                border: "1px solid #FFB300",
                borderRadius: "0",
                width: '185px',
                // px: 8,
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#FFB300',
                  borderColor: "#FFB300",
                  boxShadow: 'none',
                },
              }}
            >
              Learn Trading
            </Button>
          </a>
          <Link to='/indexx-exchange/buy-sell/'>

            <Button
              disableTouchRipple
              sx={{
                backgroundColor: '#FFB300',
                color: "#5f5f5f",
                border: "1px solid #FFB300",
                borderRadius: "0",
                width: '185px',
                // px: 8,
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#FFD000',
                  borderColor: "#FFD000",
                  boxShadow: 'none',
                },
              }}
            >
              Start Trading
            </Button>
          </Link>
          <Link to='/indexx-exchange/buy-sell/wallet'>

            <Button
              disableTouchRipple
              sx={{
                backgroundColor: '#FFB300',
                color: "#5f5f5f",
                border: "1px solid #FFB300",
                borderRadius: "0",
                width: '100%',
                px: 8,
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 500,
                boxShadow: 'none',
                //   mt:3,
                '&:hover': {
                  backgroundColor: '#FFD000',
                  borderColor: "#FFD000",
                  boxShadow: 'none',
                },
              }}
            >
              Wallet
            </Button>
          </Link>

        </Box>
      </Box>
    </Box>
  )
}

export default PaymentSuccess