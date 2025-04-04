import { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useStyles = makeStyles((theme) => ({
  listItemText: {
    fontSize: '16px',
    fontWeight: 500,
    margin: '0',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
  },
  goBackIcon: {
    color: theme.palette.text.primary,
    cursor: 'pointer',
    fontSize: '32px',
    marginLeft: '24px',
    marginBottom: '30px',
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));

const CustomDrawer = ({ faqs, activeId }) => {
  const theme = useTheme();
  const classes = useStyles();
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
      <Box sx={{ marginTop: '14px' , marginBottom:'20px'}}>
        <a
          className={classes.goBackIcon}
          onClick={() => navigate('/support-center')}
        >
          <ArrowBackIcon fontSize='32px'/>
        </a>
      </Box>

      <List>
        {faqs.map((faq) => (
          <ListItem
            button
            key={faq.id}
            onClick={() => handleSelect(faq.id)}
            sx={{
              marginBottom: '8px',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                borderRadius: '8px',
              },
              backgroundColor:
                currentActiveId === faq.id
                  ? theme.palette.action.selected
                  : 'transparent',
              borderRadius: currentActiveId === faq.id ? '8px' : '0px',
              padding: '12px 24px',
            }}
          >
            <ListItemIcon sx={{ minWidth: '28px' }}>
              <img
                src={faq.icon}
                alt={faq.title}
                style={{ width: '24px', height: '24px' }}
              />
            </ListItemIcon>
            <h3 className={classes.listItemText}>{faq.title}</h3>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CustomDrawer;
