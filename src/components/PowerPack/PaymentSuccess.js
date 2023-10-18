import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import man from "../../assets/man paint 1.svg";
import { decodeJWT, getOrderDetails } from '../../services/api';

const PaymentSuccess = () => {

  const [orderID, setOrderId] = useState("");
  const [orderId] = useSearchParams();

  useEffect(() => {
    setOrderId(String(orderId.get("orderId")));
    if (orderId.get("orderId") !== undefined) {
      let access_token = String(localStorage.getItem("access_token"));
      let decoded = decodeJWT(access_token);
      getOrderDetails(decoded.email, String(orderId.get('orderId'))).then((res) => {

        if (res.status === 200) {
          let orderData = res.data.data;
          console.log("orderData", orderData)
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
          Power Pack. Your orderId is {orderID}
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
            gap:2
          }}
        >
        <Link to='https://academy.indexx.ai/authentication/'>

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
            Learn Trading
          </Button>
          </Link>
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