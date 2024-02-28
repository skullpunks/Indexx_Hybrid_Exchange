import React, { useEffect, useState } from "react";
import { Typography, Container, Grid, Paper, Button, Modal } from "@mui/material";
import img from "../../../assets/lottery/htpf.png";
import wc from "../../../assets/lottery/wcF.png";
import pf from "../../../assets/lottery/prize funds new.png";
import guide from "../../../assets/lottery/gggg.png";
import left from "../../../assets/lottery/left.png";
import right from "../../../assets/lottery/right.png";
// Import other necessary components and libraries

const Section3 = () => {
  // Dummy Data
  const winningNumber = "123456";
  const imgURL = {
    number1: require(`../../../assets/lottery/${winningNumber[0]}.png`).default,
    number2: require(`../../../assets/lottery/${winningNumber[1]}.png`).default,
    number3: require(`../../../assets/lottery/${winningNumber[2]}.png`).default,
    number4: require(`../../../assets/lottery/${winningNumber[3]}.png`).default,
    number5: require(`../../../assets/lottery/${winningNumber[4]}.png`).default,
    number6: require(`../../../assets/lottery/${winningNumber[5]}.png`).default,
  };

  const [numOfPlayer, setNumOfPlayer] = useState(400);
  const [prizePot, setPrizePot] = useState(101899);
  const [winningDetails, setWinningDetails] = useState({
    count: [202, 109, 22, 20, 0, 0],
    amountInINEX: [294, 441, 735, 1471, 2941, 5882],
    amountInUSD: [1380, 1380, 1380, 1380, 1380, 0],
  });

  const lotteryId=23;
  const isModalOpen = false; // Replace with your state logic for modal

  const handleClose = () => {
    // Add your logic to handle modal close
  };

  return (
    <>
      <Container sx={{ py: 1, display: "flex", flexDirection: "column", alignItems: "center", pt: [9, 32, 16], pb: [5, 96, 40], width: "full" }}>
        <Typography variant="h2" sx={{ textHover: true, fontSize: [ "5xl", "5xl", "xl" ], py: 9, textAlign: "center" }}>
          Finished Rounds
        </Typography>
        <Paper elevation={3} sx={{ p: 3, background: "white", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "sm", mb: [96, 40], width: ["964px", "964px", "350px"] }}>
          <Grid container>
            <Grid item xs={12} sm={1}>
              {/* Left side empty space */}
            </Grid>
            <Grid item xs={12} sm={10}>
              {/* Content */}
              <Typography variant="h5" sx={{ fontSize: ["lg", "lg", "xs"], pt: 2, color: "grey", pb: 2 }}>
                Round {lotteryId}
              </Typography>
              <div sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
                <img src={left} alt="tickets" sx={{ width: ["20px", "20px", "13px"], height: ["10px", "15px"] }} />
                <img src={right} alt="tickets" sx={{ width: ["20px", "20px", "13px"], height: ["10px", "15px"], ml: 1 }} />
              </div>
              {/* ... Other Rows ... */}
            </Grid>
            <Grid item xs={12} sm={1}>
              {/* Right side empty space */}
            </Grid>
          </Grid>
        </Paper>
      </Container>
      
      
      <Modal open={isModalOpen} onClose={handleClose}>
        <Container sx={{ p: 3, width: "400px" }}>
          <Typography variant="h6" component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Your Modal Title
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Your modal content goes here.
          </Typography>
        </Container>
      </Modal>
    </>
  );
};

export default Section3;
