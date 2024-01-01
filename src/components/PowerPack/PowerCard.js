import { Box, Button, Grid, Grow, Typography, Collapse, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import ReactCardFlip from "react-card-flip";
import { createPowerPackOrder, getDiscountCode } from '../../services/api';
import inex from '../../assets/INEX 5.svg';
import hive from '../../assets/powerpack/Hive Logo.png';
import './PowerCard.css'
import PaymentOptions from '../BuySell/Notification/PaymentOptions';
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
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [powerPackSelected, setPowerPackSelected] = useState();

    function stringPriceToNumber(price) {
        return parseFloat(price.replace(/,/g, ''));
    }
    // Convert string price to number and calculate exchange fee
    const originalPrice = parseFloat(card.price.replace(/,/g, ''));
    const exchangeFee = originalPrice * 0.03;
    const finalPrice = originalPrice + exchangeFee;

    useEffect(() => {
        if (!discountCode) {
            setErrorMessage('');
            setDiscountAmount(0);  // Clear the discount amount
            const originalPrice = parseFloat(card.price.replace(/,/g, ''));
            const exchangeFee = originalPrice * 0.03;
            const finalPrice = originalPrice + exchangeFee;
            //setFinalAmount(parseFloat((card?.price || '0').replace(/,/g, '')));  // Reset the final amount to the original price
            setFinalAmount(finalPrice);
        }
    }, [discountCode]);

    // Create an order and PaymentIntent as soon as the confirm purchase button is clicked
    const createNewBuyOrder = async () => {
        let userEmail = (localStorage.getItem('user'));
        console.log("userEmail", userEmail)
        if (userEmail !== null && userEmail !== "") {
            console.log('I AM HERE');
            console.log("purchasedCard", powerPackSelected);
            setLoadings(true);
            let purchasedProduct = powerPackSelected.name;
            let paymentMethodUsed = "Paypal";
            let powerPackAmountInNumber = stringPriceToNumber(powerPackSelected?.price);
            let powerPackAmount = powerPackSelected?.price;
            console.log(
                paymentMethodUsed,
                purchasedProduct,
                powerPackAmountInNumber,
                powerPackAmount,
                discountCode
            )
            debugger;
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
                setIsModalOpen(true);
                setMessage(res.data);
                setErrorMessage(res.data);
            }
        } else {
            console.log("Email not found ask user to login");
            // Save the current route
            localStorage.setItem('redirectRoute', window.location.pathname);

            // Redirect to the login page
            window.location.href = '/indexx-exchange/buy-sell/hive-login';
            //("save the current route history")
            //(go to login route, /indexx-exchange/buy-sell/hive-login)
            //("come back to this route after login")
        }
    };

    const applyDiscount = async () => {
        let validateDiscountCode = await getDiscountCode(discountCode, card.name);
        if (validateDiscountCode.status === 200) {
            const originalPrice = parseFloat((card?.price || '0').replace(/,/g, ''));
            const discount = originalPrice * validateDiscountCode.data.discountPercentage;
            const discountedPrice = originalPrice - discount;
            const exchangeFee = originalPrice * 0.03;
            const finalPriceWithExchangeFee = discountedPrice + exchangeFee;

            setDiscountAmount(discount);
            setFinalAmount(finalPriceWithExchangeFee);
            console.log(finalPriceWithExchangeFee);
            setErrorMessage(""); // Clear any previous error messages
        } else {
            setErrorMessage(validateDiscountCode?.data);  // Set the error message when the code is invalid
            const originalPrice = parseFloat((card?.price || '0').replace(/,/g, ''));
            const exchangeFee = originalPrice * 0.03;
            const finalPriceWithExchangeFee = originalPrice + exchangeFee;

            setDiscountAmount(0);
            setFinalAmount(finalPriceWithExchangeFee);
        }
    };


    const createBuyOrderForZelleAndWire = async (paymentMethod) => {
        setLoadings(true);
        let purchasedProduct = powerPackSelected.name;
        let paymentMethodUsed = paymentMethod;
        //let powerPackAmountInNumber = stringPriceToNumber(finalAmount);
        //let powerPackAmount = finalAmount;
        let powerPackAmountInNumber = stringPriceToNumber(powerPackSelected?.price);
        let powerPackAmount = powerPackSelected?.price;
        let res;
        console.log("paymentMethod", paymentMethod)
        res = await createPowerPackOrder(purchasedProduct,
            paymentMethodUsed,
            purchasedProduct,
            powerPackAmountInNumber,
            powerPackAmount,
            discountCode);
        if (res.status === 200) {
            // Return the order ID for Zelle and Wire
            return res.data.orderId;
        } else {
            setLoadings(false);
            // OpenNotification('error', res.data);
            setIsModalOpen(true);
            setMessage(res.data);
            return null;
        }
    };


    return (
        <>
            <Grow
                in={true}
                style={{ transformOrigin: "0 0 0" }}
                {...(true ? { timeout: 1000 + parsedId } : {})}
            >
                <Grid item xs={1} sm={6} md={3} >
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} mt={2} mb={15}
                        onMouseEnter={() => setIsHighlighted(true)}
                        onMouseLeave={() => setIsHighlighted(false)}

                    >
                        <ReactCardFlip isFlipped={flip}
                            flipDirection="horizontal">
                            <Box style={{
                                width: '260px',
                                height: '625px',
                                borderRadius: 0,

                                textAlign: 'center',
                                padding: '20px',
                                position: 'relative', // Add this style
                                border: card.level === "Captain Bee" ? "none" : "1px solid #A1A1A1",
                            }}
                                className={card.level === "Captain Bee" ? "highlighted-captain-bee-card" : ""}
                            >

                                <Typography variant="text" component="p" fontSize={"27px"} fontWeight={600} lineHeight={2.1} mb={2}
                                    style={{ color: `${card.level === "Captain Bee" ? "#FFB300" : "inherit"}` }}
                                >
                                    {card.name}
                                </Typography>

                                <img alt="" src={card.photo} width={"180px"} style={{ marginBottom: "15px" }} />

                                <Typography variant="text" component="p" fontSize={"50px"} fontWeight={600} mb={5} mt={1}>
                                    ${card.price}
                                </Typography>

                                {/* Exchange fee */}
                                <Typography variant="text" component="p" fontSize={"15px"} fontWeight={400} mb={1}>
                                    Exchange Fee (3%): ${exchangeFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Typography>

                                {/* Final price including exchange fees */}
                                <Typography variant="text" component="p" fontSize={"20px"} fontWeight={400} mb={1}>
                                    Final Price: ${finalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Typography>

                                <Typography variant="text" component="p" fontSize={"20px"} fontWeight={400} >
                                    <b>Investment Highlights</b>
                                </Typography>

                                <Typography variant="text" component="p" fontSize={"13px"} fontWeight={300} style={{ color: "#FFB300" }} lineHeight={"22.8px"} my={1}>
                                    {card.level === "Captain Bee" ? `Indexx Hive ${card.level} Level` : '\u00A0'}
                                </Typography>

                                <a href="https://indexx.ai/indexx-exchange/token-details/inex" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="text" component="p" fontSize={"20px"} fontWeight={1200} mb={0.5} lineHeight={"22.8px"}>
                                        <img src={inex} alt="inex" style={{ paddingRight: "4px" }} />
                                        {card.coins} INEX Tokens <br />($2 each)
                                    </Typography>
                                </a>
                                <a href="https://www.docdroid.net/wrk4t3t/indexx-exchange-tokenomics-v12-pdf" target="_blank" rel="noopener noreferrer"  >
                                    <Typography variant="text" component="p" fontSize={"13px"} fontWeight={200} mb={0.5} lineHeight={"22.8px"} sx={{

                                        color: "#FFB300",
                                        textTransform: "none",
                                        backgroundColor: "transparent",
                                        boxShadow: 'none',



                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            boxShadow: 'none',
                                            color: "#FFD000",
                                        },
                                    }} >

                                        Tokenomics
                                    </Typography>
                                </a>
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
                                            mt: -1,
                                            width: "fit-content",
                                            height: "fit-content",
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none',
                                                color: "#FFD000",
                                            },
                                        }}
                                    >
                                        See more...
                                    </Button>
                                }
                            </Box>

                            <Box style={{
                                width: '260px',
                                height: '625px',
                                // margin: '20px',
                                borderRadius: 0,
                                border: "1px solid #A1A1A1",
                                textAlign: 'center',
                                padding: '20px',
                                border: card.level === "Captain Bee" ? "none" : "1px solid #A1A1A1",
                            }}
                                className={card.level === "Captain Bee" ? "highlighted-captain-bee-card" : ""}>

                                <img alt="" src={card.photo} width={"82px"} style={{ marginBottom: "15px" }} />
                                {card.level === "Captain Bee" ? <img alt="" src={hive} width={"42px"} style={{ marginBottom: "15px" }} /> : <></>}

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
                                        {card.level === "Captain Bee" ? `Indexx Hive ${card.level} Level` : '\u00A0'}
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
                                                color: "#FFD000",
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
                                color: "#FFD000",
                            },
                        }}>
                            Apply Discount
                        </Button>

                        <Collapse in={isApplyClicked} sx={{ width: "260px" }} className='power-input'>
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
                                    borderRadius: "0px",
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
                                <Box style={{ marginTop: '10px', textAlign: 'center' }}>
                                    <Typography variant="body2" fontSize={"15px"} fontWeight={800}>Discount Applied: ${Math.floor(discountAmount * 100) / 100}</Typography>
                                    <Typography variant="body2" fontSize={"15px"} fontWeight={800} style={{ fontWeight: 'bold' }}>Final Amount: ${Math.floor(finalAmount * 100) / 100}</Typography>
                                </Box>
                                {errorMessage && (
                                    <Box style={{ marginTop: '10px', textAlign: 'center', color: 'red' }}>
                                        {errorMessage}
                                    </Box>
                                )}
                            </div>
                        </Collapse>
                        <Button
                            onClick={() => {

                                setIsModalOpen2(true)
                                setPowerPackSelected(card);
                                //createNewBuyOrder(card);
                            }}
                            loading={loadings}
                            sx={{
                                background: "#FFB300",
                                color: "var(--body_color)",
                                border: "1px solid #FFB300",
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
                                    background: "#FFD000",
                                    borderColor: "#FFD000",
                                },
                            }}
                        >
                            Buy Power Pack
                        </Button>
                    </Box>
                </Grid>
            </Grow>
            <div>
                <PaymentOptions
                    isVisible={isModalOpen2}
                    onClose={() => setIsModalOpen2(false)}
                    onConfirm={createNewBuyOrder}
                    onZelleAndWireConfirm={(paymentMethod) => createBuyOrderForZelleAndWire(paymentMethod)} // For Zelle and Wire
                    message={message}
                />
            </div>
        </>
    )
}

export default PowerCard