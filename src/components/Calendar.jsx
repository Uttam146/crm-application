import SideNav from './SideNav'
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch,useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import AddCalendarEvents from './AddCalendarEvents'

moment.locale("en-GB");
const localizer = momentLocalizer(moment);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Calendars() {
  const [eventsData, setEventsData] = useState(events);
  const calevents = useSelector(state =>state.calendar);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 

  const dispatch = useDispatch();
  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    setEventsData({start,end});
    handleOpen();
  };
  return (
    <>
      <NavBar />
      <Box sx={{ display: 'flex',backgroundColor: '#f7f7f7'}}>
        <SideNav />
        <Box component='main' sx={{ flexGrow: 1, p: 3, mt: '9rem',backgroundColor:'white' }}>
        <div>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddCalendarEvents closeEvent={handleClose} eventsData={eventsData}/>
                    </Box>
                </Modal>
          </div>
          <Calendar
            views={["day", "agenda", "work_week", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={calevents}
            style={{ height: "80vh" }}
            onSelectSlot={handleSelect}
          />
        </Box>
      </Box>
    </>
  );
}

export default Calendars;