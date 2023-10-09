import { Box, Button, Grid, Grow, Typography, Collapse, TextField } from '@mui/material';
import { useState } from 'react';
import ReactCardFlip from "react-card-flip";
import { createPowerPackOrder, getDiscountCode } from '../../services/api';
import inex from '../../assets/INEX 5.svg';

const PowerCard = ({ card }) => {
    const [flip, setFlip] = useState(false);
    const [loadings, setLoadings] = useState(false);
    const parsedId = parseInt(card.id) * 100;
    const [message, setMessage] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0); // the discount amount
    const [finalAmount, setFinalAmount] = useState(stringPriceToNumber(card?.price));
    const [isApplyClicked, setIsApplyClicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    function stringPriceToNumber(price) {
        return parseFloat(price.replace(/,/g, ''));
    }

    // Create an order and PaymentIntent as soon as the confirm purchase button is clicked
    const createNewBuyOrder = async (card) => {
        console.log("purchasedCard", card);
        setLoadings(true);
        let purchasedProduct = card.name;
        let paymentMethodUsed = "Paypal";
        let powerPackAmountInNumber = stringPriceToNumber(card?.price);
        let powerPackAmount = card?.price;
        
        console.log(
            paymentMethodUsed,
            purchasedProduct,
            powerPackAmountInNumber,
            powerPackAmount,
            discountCode
        )
        let res = await createPowerPackOrder(purchasedProduct,
            paymentMethodUsed,
            purchasedProduct,
            powerPackAmountInNumber,
            powerPackAmount,
            discountCode);
        if (res.status === 200) {
            setLoadings(false);
            //--Below code is to enable paypal Order---

            for (let i = 0; i < res.data.links.length; i++) {
                if (res.data.links[i].rel.includes("approve")) {
                    window.location.href = res.data.links[i].href;
                }
            }
            //getStripePaymentIntent(res.data.orderId, res.data.user.email);
        } else {
            setLoadings(false);
            // openNotificationWithIcon2('error', res.data);
            setIsModalOpen(true);
            setMessage(res.data);
        }
    };

    const applyDiscount = async () => {
        let validateDiscountCode = await getDiscountCode(discountCode);
        if (validateDiscountCode.status === 200) {
            const discount = parseFloat(card?.price) * validateDiscountCode.data.discountPercentage;
            setDiscountAmount(discount);
            setFinalAmount(parseFloat(card?.price) - discount);
            setErrorMessage(""); // Clear any previous error messages
        } else {
            setErrorMessage("Invalid code");  // 2. Set the error message when the code is invalid
            const discount = parseFloat(card?.price) * 0;
            setDiscountAmount(discount);
            setFinalAmount(parseFloat(card?.price) - discount);
        }
    };

    return (
        <Grow
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 1000 + parsedId } : {})}
        >
            <Grid item xs={1} sm={6} md={3} >
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

                            <Typography variant="text" component="p" fontSize={"27px"} fontWeight={600} lineHeight={2.1} mb={2}
                                style={{ color: `${card.level === "Captain Bee" ? "#FFB300" : "inherit"}` }}
                            >
                                {card.name}
                            </Typography>

                            <img alt="" src={card.photo} width={"180px"} style={{ marginBottom: "15px" }} />

                            <Typography variant="text" component="p" fontSize={"50px"} fontWeight={600} mb={5} mt={1}>
                                ${card.price}
                            </Typography>

                            <Typography variant="text" component="p" fontSize={"20px"} fontWeight={400} >
                                Features
                            </Typography>

                            <Typography variant="text" component="p" fontSize={"13px"} fontWeight={300} style={{ color: "#FFB300" }} lineHeight={"22.8px"} my={1}>
                                {card.level === "Captain Bee" ? `${card.level} Level` : '\u00A0'}
                            </Typography>

                            <Typography variant="text" component="p" fontSize={"15px"} fontWeight={800} mb={0.5} lineHeight={"22.8px"}>
                                <img src={inex} alt="inex" style={{ paddingRight: "4px" }} />
                                {card.coins}  INEX Tokens ($2 each)
                            </Typography>
                            {card.features.slice(1, 3).map((item) =>
                                <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200}>
                                    {item}
                                </Typography>
                            )}

                            {/* {card.level === "Captain Bee" ?
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
                                    <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200} style={{ color: "#FFB300" }}>
                                    {" "}
                                    </Typography>
                                    {card.features.slice(0, 3).map((item) =>
                                        <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200}>
                                            {item}
                                        </Typography>
                                    )}
                                </>

                            } */}


                            {card.flip &&
                                <Button
                                    onClick={() => setFlip(!flip)}
                                    disableTouchRipple
                                    sx={{
                                        fontSize: "13px",
                                        color: "#FFB300",
                                        textTransform: "none",
                                        backgroundColor: "transparent",
                                        boxShadow: 'none',
                                        mt: 5,
                                        width: "fit-content",
                                        height: "fit-content",
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            boxShadow: 'none',
                                            color: "#ffa200",
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

                            {/* {card.level === "Captain Bee" ? */}
                            <div style={{
                                minHeight: "306px", display: "flex",
                                justifyContent: "flex-start", flexDirection: "column"
                            }}>
                                <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200} style={{ color: "#FFB300" }}>
                                    {card.level === "Captain Bee" ? `${card.level} Level` : '\u00A0'}
                                </Typography>

                                {card.features.map((item) =>
                                    <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200}>
                                        {item}
                                    </Typography>
                                )}
                            </div>
                            {/* :
                                <div style={{
                                    minHeight: "306px", display: "flex",
                                    justifyContent: "flex-start", flexDirection: "column"
                                }}>
                                    {card.features.map((item) =>
                                        <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200}>
                                            {item}
                                        </Typography>
                                    )}
                                </div>
                            } */}


                            {card.flip &&
                                <Button
                                    onClick={() => setFlip(!flip)}
                                    disableTouchRipple
                                    sx={{
                                        fontSize: "13px",
                                        color: "#FFB300",
                                        textTransform: "none",
                                        backgroundColor: "transparent",
                                        boxShadow: 'none',
                                        // mt:5,
                                        width: "fit-content",
                                        height: "fit-content",
                                        position: "relative",
                                        bottom: "-17px",
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            boxShadow: 'none',
                                            color: "#ffa200",
                                        },
                                    }}
                                >
                                    See less...
                                </Button>
                            }
                        </Box>
                    </ReactCardFlip>

                    <Button onClick={() => setIsApplyClicked(!isApplyClicked)} style={{ marginBottom: '10px' }} sx={{
                        backgroundColor: "transparent",
                        color: "#FFB300",  // Adjusted color
                        px: 4,
                        mt: 2,
                        width: "260px",
                        height: "36px",
                        fontSize: "13px",
                        fontWeight: "100",
                        textTransform: "none",
                        marginBottom: '10px',
                        "&:hover": {
                            background: "transparent",
                            color: "#FFA200",
                        },
                    }}>
                        Apply Discount
                    </Button>

                    <Collapse in={isApplyClicked} sx={{width:"260px"}} className='power-input'>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            placeholder="Enter discount code"
                            sx={{
                                width: '260px',
                                textAlign: 'center',
                                borderRadius:"0px",
                            }}
                            InputProps={{
                                style: {
                                   borderRadius: 0,
                                },
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={applyDiscount}
                            disabled={!discountCode}
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
                                boxShadow: 'none',
                                textTransform: "none",
                                zIndex: "5",
                                "&:hover": {
                                    boxShadow: 'none',
                                    background: "#FFB300",
                                    borderColor: "#FFB300",
                                },
                            }}
                        >
                            Apply
                        </Button>
                        {/* Display discount and final amount */}
                        <div>
                            <Box style={{ marginTop: '10px', textAlign: 'center', marginLeft: "-43px" }}>
                                <Typography variant="body2" fontSize={"15px"} fontWeight={800}>Discount Applied: ${discountAmount}</Typography>
                                <Typography variant="body2" fontSize={"15px"} fontWeight={800} style={{ fontWeight: 'bold' }}>Final Amount: ${finalAmount}</Typography>
                            </Box>
                            {errorMessage && (
                                <Box style={{ marginTop: '10px', textAlign: 'center', color: 'red', marginLeft: "-43px" }}>
                                    {errorMessage}
                                </Box>
                            )}
                        </div>
                    </Collapse>
                    <Button
                        onClick={() => {
                            createNewBuyOrder(card);
                        }}
                        loading={loadings}
                        sx={{
                            backgroundColor: "transparent",
                            color: "var(--body_color)",
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
                                background: "#FFB300",
                                borderColor: "#FFB300",
                            },
                        }}
                    >
                        Buy Power Pack
                    </Button>
                </Box>
            </Grid>
        </Grow>
    )
}

export default PowerCard