import { Box, Button, Grid, Grow, Typography, Collapse, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EliteCard = ({ card }) => {
    const parsedId = parseInt(card.id) * 100;

    return (
        <Grow
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 1000 + parsedId } : {})}
        >
            <Grid item xs={1} sm={6} md={3} style={{display:"flex", alignItems:"self-end"}} >
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center" }} mt={2} mb={5}>
                    <img alt="" src={card.photo} width={"90%"} style={{ marginBottom: "15px" }} />
                    <Link to={`/indexx-exchange/elite-learn/${card.id}`}>
                    <Button
                        // onClick={}
                        sx={{
                            background: "#000",
                            color: "#fff",
                            border: "1px solid #5E5E5E",
                            borderRadius: "5px",
                            // px: 4,
                            mt: 2,
                            width: "148px",
                            height: "36px",
                            fontSize: "13px",
                            fontWeight: "100",
                            textTransform: "none",
                            zIndex: "5",
                            "&:hover, &:active, &:focus" : {
                                background: "#3E3E3E",
                                borderColor: "#3E3E3E",
                            },
                        }}
                    >
                        {card.name} Member
                    </Button>
                    </Link>
                </Box>
            </Grid>
        </Grow>
    )
}

export default EliteCard