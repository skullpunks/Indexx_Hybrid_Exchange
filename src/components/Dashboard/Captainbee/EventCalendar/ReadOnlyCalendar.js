import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './ReadOnlyCalendar.css'

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: 'Chinese New Year',
    start: new Date(2024, 1, 10, 0, 0),
    end: new Date(2024, 1, 10, 23, 59),
    type: 'Type1',
  },
  {
    id: 2,
    title: 'Valentine’s Day',
    start: new Date(2024, 1, 14, 0, 0),
    end: new Date(2024, 1, 14, 23, 59),
    type: 'Type1',
  },
  {
    id: 3,
    title: 'St Patrick’s Day',
    start: new Date(2024, 2, 17, 0, 0),
    end: new Date(2024, 2, 17, 23, 59),
    type: 'Type1',
  },
  {
    id: 4,
    title: 'Easter Sunday',
    start: new Date(2024, 2, 31, 0, 0),
    end: new Date(2024, 2, 31, 23, 59),
    type: 'Type1',
  },
  {
    id: 5,
    title: 'Mother’s Day',
    start: new Date(2024, 4, 12, 0, 0),
    end: new Date(2024, 4, 12, 23, 59),
    type: 'Type1',
  },
  {
    id: 6,
    title: 'Memorial Day',
    start: new Date(2024, 4, 27, 0, 0),
    end: new Date(2024, 4, 27, 23, 59),
    type: 'Type1',
  },
  {
    id: 7,
    title: 'Father’s Day',
    start: new Date(2024, 5, 16, 0, 0),
    end: new Date(2024, 5, 16, 23, 59),
    type: 'Type1',
  }
];

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height:'500px',
  },
  calendar: {
    flex: 1,
    marginRight: '10px',
    width: '50%',
    minWidth:"260px",
  },
  eventList: {
    flex: 0.5,
    color:"var(--body_color) !important",
    padding: '10px',
    width: '400px',
    boxShadow:'none !important',
    marginTop:"54px",
    backgroundColor:"var(--body_background) !important"
  },
  '@media (max-width: 767px)': {
    container: {
      flexDirection: 'column',
      height:'750px',
    },
    calendar: {
      width: '100%', // Adjust the width for mobile screens
      marginRight: 0, // Remove right margin for mobile screens if needed
      minWidth:"300px",

    },
    eventList: {
      width: '100%', // Adjust the width for mobile screens
    },
  },
}));

// const CircleEvent = ({ event }) => {
//   return <div style={{ backgroundColor: 'red', borderRadius: '50%', width: '10px', height: '10px' }} />;
// };

const CustomEvent = ({ event }) => {
  const eventTypeColors = {
    Type1: '#1677FF',
    Type2: 'green',
  };

  const eventType = event.type || 'default'; // Assume a default type if none is specified
  const backgroundColor = eventTypeColors[eventType] || 'blue'; // Use blue if the type is not recognized
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: '8px', 
          height: '20px', 
          backgroundColor: backgroundColor,
          marginRight: '5px',
        }}
      ></div>
      <span>{event.title}</span>
    </div>

  );
};

const CircleEvent = ({ event }) => {
  const eventTypeColors = {
    Type1: '#1677FF',
    Type2: 'green',
    // Add more event types and colors as needed
  };

  const eventType = event.type || 'default'; // Assume a default type if none is specified
  const backgroundColor = eventTypeColors[eventType] || 'blue'; // Use blue if the type is not recognized

  return <div style={{ backgroundColor, borderRadius: '50%', width: '10px', height: '10px' }} />;
};

const CustomToolbar = ({ label, onNavigate }) => {
  const handlePrevYear = () => {
    const currentDate = new Date(label);
    const prevYearDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
    onNavigate('DATE', prevYearDate);
  };

  const handleNextYear = () => {
    const currentDate = new Date(label);
    const nextYearDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
    onNavigate('DATE', nextYearDate);
  };

  return (
    <div className='d-flex justify-content-around w-100'>
      <button className='toolbar-btn' onClick={handlePrevYear}>&lt;&lt;</button>
      <button className='toolbar-btn' onClick={() => onNavigate('PREV')}>&lt;</button>
      <span className='toolbar-text'>{label}</span>
      <button className='toolbar-btn' onClick={() => onNavigate('NEXT')}>&gt;</button>
      <button className='toolbar-btn' onClick={handleNextYear}>&gt;&gt;</button>
    </div>
  );
};


const ReadOnlyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(moment().toDate());
  const classes = useStyles();

  const eventsForSelectedDate = events.filter(
    (event) =>
      moment(event.start).isSame(selectedDate, 'day') ||
      moment(event.end).isSame(selectedDate, 'day')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event) => {
    handleDateChange(event.start);
  };

  const handleNavigate = (date, view) => {
    if (view === 'month') {
      handleDateChange(date);
    }
  };

  const eventPropGetter = (event) => {
    return {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      },
    };
  };

  const components = {
    event: CircleEvent,
    toolbar: CustomToolbar, // Use the custom toolbar component
  };

  return (
    <div className={classes.container}>
      <div className={classes.calendar}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          // style={{ height: 500 }}
          views={['month']}
          onSelectEvent={handleEventClick}
          onNavigate={handleNavigate}
          onSelectSlot={(slotInfo) => handleDateChange(slotInfo.start)}
          eventPropGetter={eventPropGetter}
          selectable
          components={components}
        />
      </div>

      {selectedDate && (
        <Paper elevation={3} className={classes.eventList}>
          <Typography variant="h6" gutterBottom>
            Events for 
            <div className='fw-bold'>
            {moment(selectedDate).format('MMMM D, YYYY')}
            </div>
          </Typography>
          {eventsForSelectedDate.length === 0 ? (
            <Typography mt={5}>No events for selected date</Typography>
          ) : (
            eventsForSelectedDate.map((event) => (
              <div key={event.id} className="event-list-item mt-5">
                <CustomEvent event={event} />
              </div>
            ))
          )}
        </Paper>
      )}
    </div>
  );
};

export default ReadOnlyCalendar;
