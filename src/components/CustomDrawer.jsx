import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const CustomDrawer = ({ faqs, activeId }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentActiveId, setCurrentActiveId] = useState(activeId);

  useEffect(() => {
    setCurrentActiveId(activeId);
  }, [activeId]);

  const handleSelect = (id) => {
    setCurrentActiveId(id);
    navigate(`/faqs/${id}`);
  };

  return (
    <Box
      sx={{
        width: '240px',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: '5px',
        boxSizing: 'border-box',
        borderRadius: '8px',
        marginLeft: '5px',
      }}
    >
      <List>
        {faqs.map((faq) => (
          <ListItem
            button
            key={faq.id}
            onClick={() => handleSelect(faq.id)}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                borderRadius: '8px',
              },
              backgroundColor:
                currentActiveId === faq.id
                  ? theme.palette.action.selected
                  : 'transparent',
              borderRadius: currentActiveId === faq.id ? '8px' : '0px',
            }}
          >
            <ListItemText primary={faq.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CustomDrawer;
