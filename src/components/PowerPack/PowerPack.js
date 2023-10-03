import React, { useEffect, useState } from 'react'
import PowerCard from './PowerCard'
import { Box, Grid, Typography } from '@mui/material'
import { PackData } from './PackData'

const PowerPack = () => {
    const [cards, setCards] = useState([]);
    useEffect(() => {
        setCards(PackData);
      }, []);

    return (
        <Box mt={18} pb={5}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    // maxWidth: `${isMobile ? "100%" : "75%" }`,
                    width: "100%",
                    objectFit: "scale-down",
                    // maxHeight: "auto"
                    // my: 12,
                    my: 2,
                    flexDirection: "column",
                    gap: 3,
                }}
            >
                <Box width={"62%"} sx={{ textAlign: "center" }}>
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