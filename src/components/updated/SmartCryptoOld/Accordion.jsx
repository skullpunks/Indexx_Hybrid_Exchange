import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none', // Remove shadow
  backgroundColor: 'transparent', // Remove background
  borderBottom: `1px solid ${theme.palette.divider}`, // Add border bottom
  '&:before': {
    display: 'none', // Remove the default MUI divider line
  },
}));

export default function AccordionExpandDefault() {
  return (
    <div>
      <StyledAccordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>1. What is Smart Crypto?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Indexx Smart crypto is an AI self driving, hands off Vehicle of
            future money investment, taking you to a successful crypto paradise.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>
            2. What cryptocurrencies, stablecoins and fiat currencies are
            offered on Auto-Invest?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            For the full set of cryptocurrencies, stablecoins and fiat
            currencies supported.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>3. How does Auto-Invest work?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Step 1 - Choose the crypto you want to buy or a [Multi Assets]
            purchase. <br />
            Step 2 - Choose how much you want to buy. <br />
            Step 3 - Select a Payment Method. Step 5 - Invest
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
    </div>
  );
}
