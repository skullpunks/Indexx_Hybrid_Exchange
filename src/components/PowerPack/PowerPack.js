import React, { useEffect, useState } from 'react'
import PowerCard from './PowerCard'
import { Box, Grid, Typography } from '@mui/material'
import { PackData } from './PackData'
import powerp from "../../assets/powerpack/power page logo 1.svg";
import PowerPackHeader from './PowerPackHeader/PowerPackHeader';

const PowerPack = () => {
    const [cards, setCards] = useState([]);
    useEffect(() => {
        setCards(PackData);
      }, []);

    return (
        <Box mt={18} pb={5}>
        <PowerPackHeader/>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    width: "100%",
                    objectFit: "scale-down",
                    mt:25,
                    mb: 2,
                    flexDirection: "row",
                    gap: 3,
                }}
            >
                <Box
                    component={"img"}
                    src={powerp}
                    alt='logo'                
                />

                <Box sx={{ textAlign: "center" }}>
                    <Typography variant={"p"} fontWeight={600} fontSize={"37px"}>
                        Power Pack Pricing
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ mt: 5, width: "80%", mx:"auto", maxWidth:"1300px" }}>
                <Grid
                    container
                    columns={{ xs: 1, sm: 12, md: 12 }}
                    spacing={{ xs: 1, md: 2 }}
                >
                    {/* {cards.length === 0 ? (
                        [1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <TrendingSellersFB darkMode={darkMode} key={n} />
                        ))
                    ) : ( */}
                        <>
                            {cards.map((cr) => (
                                <PowerCard
                                    key={cr.id}
                                    card={cr}
                                />
                            ))}
                        </>
                    {/* )} */}
                </Grid>
            </Box>
        </Box>
    )
}

export default PowerPack