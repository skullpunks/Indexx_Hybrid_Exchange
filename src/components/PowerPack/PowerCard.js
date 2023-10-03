import React, { useState } from 'react'
import { Box, Button, Grid, Grow, Typography } from '@mui/material';
import ReactCardFlip from "react-card-flip";
import { Link } from 'react-router-dom';

const PowerCard = ({ card }) => {
    const [flip, setFlip] = useState(false);

    const parsedId = parseInt(card.id) * 100;

    return (
        <Grow
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 1000 + parsedId } : {})}
        >
            <Grid item xs={1} sm={6} md={3} zIndex={1000}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }} mt={2} mb={15}>
                    <ReactCardFlip isFlipped={flip}
                        flipDirection="horizontal">
                        <Box style={{
                            width: '260px',
                            height: '545px',
                            // margin: '20px',
                            borderRadius: 0,
                            border: "1px solid #A1A1A1",
                            textAlign: 'center',
                            padding: '20px'
                        }}>

                            <Typography variant="text" component="p" fontSize={"27px"} fontWeight={600} lineHeight={2.1} mb={3}
                                style={{ color: `${card.level === "Captain Bee" ? "#FFB300" : "inherit"}` }}
                            >
                                {card.name}
                            </Typography>

                            <img alt="" src={card.photo} width={"180px"} style={{ marginBottom: "15px" }} />

                            <Typography variant="text" component="p" fontSize={"50px"} fontWeight={400} mb={7} mt={3}>
                                ${card.price}
                            </Typography>

                            <Typography variant="text" component="p" fontSize={"20px"} fontWeight={400} mb={1}>
                                Features
                            </Typography>

                            {card.level === "Captain Bee" ?
                                <>
                                    <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200} style={{ color: "#FFB300" }}>
                                        {card.level} Level
                                    </Typography>
                                    {card.features.slice(0, 2).map((item) =>
                                        <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200}>
                                            {item}
                                        </Typography>
                                    )}
                                </>
                                :
                                <>

                                    {card.features.slice(0, 3).map((item) =>
                                        <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200}>
                                            {item}
                                        </Typography>
                                    )}
                                </>

                            }


                            {card.flip &&
                                <Button
                                    onClick={() => setFlip(!flip)}
                                    disableTouchRipple
                                    sx={{
                                        fontSize: "13px",
                                        color: "#11BE6A",
                                        textTransform: "none",
                                        backgroundColor: "transparent",
                                        boxShadow: 'none',
                                        mt: 5,
                                        width: "fit-content",
                                        height: "fit-content",
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            boxShadow: 'none',
                                            color: "#0ea55a",
                                        },
                                    }}
                                >
                                    See more...
                                </Button>
                            }
                        </Box>

                        <Box style={{
                            width: '260px',
                            height: '545px',
                            // margin: '20px',
                            borderRadius: 0,
                            border: "1px solid #A1A1A1",
                            textAlign: 'center',
                            padding: '20px'
                        }}>

                            <img alt="" src={card.photo} width={"82px"} style={{ marginBottom: "15px" }} />

                            <Typography variant="text" component="p" fontSize={"20px"} fontWeight={600} lineHeight={2.1} mb={2}
                                style={{ color: `${card.level === "Captain Bee" ? "#FFB300" : "inherit"}` }}
                            >
                                {card.name}
                            </Typography>


                            <Typography variant="text" component="p" fontSize={"25px"} fontWeight={400} mb={1}>
                                ${card.price}
                            </Typography>

                            {card.level === "Captain Bee" ?
                                <div style={{
                                    minHeight: "286px", display: "flex",
                                    justifyContent: "flex-end", flexDirection: "column"
                                }}>
                                    <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200} style={{ color: "#FFB300" }}>
                                        {card.level} Level
                                    </Typography>

                                    {card.features.map((item) =>
                                        <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200}>
                                            {item}
                                        </Typography>
                                    )}
                                </div>
                                :
                                <div style={{
                                    minHeight: "286px", display: "flex",
                                    justifyContent: "flex-end", flexDirection: "column"
                                }}>

                                    {card.features.map((item) =>
                                        <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200}>
                                            {item}
                                        </Typography>
                                    )}
                                </div>

                            }


                            {card.flip &&
                                <Button
                                    onClick={() => setFlip(!flip)}
                                    disableTouchRipple
                                    sx={{
                                        fontSize: "13px",
                                        color: "#11BE6A",
                                        textTransform: "none",
                                        backgroundColor: "transparent",
                                        boxShadow: 'none',
                                        // mt:5,
                                        width: "fit-content",
                                        height: "fit-content",
                                        position: "relative",
                                        bottom: "-37px",
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            boxShadow: 'none',
                                            color: "#0ea55a",
                                        },
                                    }}
                                >
                                    See less...
                                </Button>
                            }
                        </Box>
                    </ReactCardFlip>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Button
                            sx={{
                                backgroundColor: "transparent",
                                color: "#5f5f5f",
                                border: "1px solid #A1A1A1",
                                borderRadius: "0",
                                px: 4,
                                mt: 2,
                                width: "260px",
                                height: "36px",
                                fontSize: "13px",
                                fontWeight: "100",
                                textTransform: "none",
                                zIndex: "5",
                                "&:hover": {
                                    background: "#11BE6A",
                                    color: "#ffffff",
                                    borderColor: "#11BE6A",
                                },
                            }}
                        >
                            Buy Stock Token
                        </Button>
                    </Link>
                </Box>
            </Grid>
        </Grow>
    )
}

export default PowerCard