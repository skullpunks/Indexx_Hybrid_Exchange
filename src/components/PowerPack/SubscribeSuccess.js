import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import man from "../../assets/man paint 1.svg";

const SubscribeSuccess = () => {

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
          for subscribing to the 
        </Typography>
        <Typography variant="text" component="p" fontSize={"40px"} fontWeight={400}>
          Monthly INEX Purchase plan.
        </Typography>
        <Typography variant="text" component="p" fontSize={"15px"} lineHeight={"30px"}>
          Subscription Plan: $300 Monthly Purchase
        </Typography>
        <Typography variant="text" component="p" fontSize={"15px"} lineHeight={"30px"}>
          Next Billing Date :  {"date"}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            width: '446px',
            mt: 6,
            gap: 2
          }}
        >
          <Link to='/indexx-exchange/dashboard'>

            <Button
              disableTouchRipple
              sx={{
                backgroundColor: '#FFB300',
                color: "#5f5f5f",
                border: "1px solid #FFB300",
                borderRadius: "0",
                width: '219px',
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
              Waggle Dance / Dashboard
            </Button>
          </Link>
          <Link to='/indexx-exchange/buy-sell'>

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
              Exchange
            </Button>
          </Link>

        </Box>
      </Box>
    </Box>
  )
}

export default SubscribeSuccess