import React from 'react'
import man from "../../assets/man paint 1.svg"
import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
    return (
        <Box mt={18}>
            <Box mx={"auto"} sx={{
                justifyContent: "center",
                display: "flex",
                flexDirection:"column",
                alignItems:"center"
            }}>
                <img src={man} alt="man" width={"350px"}/>
                <Typography variant="text" component="p" fontSize={"62px"} fontWeight={600}>
                    Congratulations
                </Typography>
                <Typography variant="text" component="p" fontSize={"40px"} fontWeight={400}>
                on purchasing the 
                </Typography>
                <Typography variant="text" component="p" fontSize={"40px"} fontWeight={400}>
                Power Pack
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
                  width: '444.61px',
                  mt: 6,
                }}
              >
              <Link to='/indexx-exchange/buy-sell/'>

                <Button
                  disableTouchRipple
                  sx={{
                    backgroundColor: "transparent",
                    color: "#5f5f5f",
                    border: "1px solid #A1A1A1",
                    borderRadius: "0",
                    width: '100%',
                    px: 8,
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
                  Start Trading
                </Button>
              </Link>
              <Link to='/indexx-exchange/buy-sell/wallet'>

                <Button
                  disableTouchRipple
                  sx={{
                    backgroundColor: "transparent",
                    color: "#5f5f5f",
                    border: "1px solid #A1A1A1",
                    borderRadius: "0",
                    width: '100%',
                    px: 11,
                    textTransform: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    boxShadow: 'none',
                    //   mt:3,
                    '&:hover': {
                      backgroundColor: '#FFB300',
                      borderColor: "#FFB300",
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