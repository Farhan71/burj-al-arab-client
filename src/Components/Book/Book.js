import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useState } from 'react';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(), 
        checkOut: new Date()
    });
    const handleCheckInDate = (date) => {
        const newDates = {...selectedDate}
        newDates.checkIn = date
        setSelectedDate(newDates);
     };
     const handleCheckOutDate = (date) => {
        const newDates = {...selectedDate}
        newDates.checkOut = date
        setSelectedDate(newDates);
     };

     const handleBooking = () => {
            const newBooking = {...loggedInUser, ...selectedDate}
            fetch('http://localhost:5000/addBooking',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newBooking)
            })
            .then( res => res.json())
            .then( result => {
                console.log(result)
            })
     }
    return (
        <div style={{textAlign: 'center'}}>
            <h1> Hello, {loggedInUser.name}!!! <br /> Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>


      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="CheckIn Date"
          value={selectedDate.checkIn}
          onChange={handleCheckInDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="CheckOut Date"
          value={selectedDate.checkOut}
          onChange={handleCheckOutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    
    <Button variant="contained" color="primary" onClick={handleBooking}>
    Book Now
      </Button>

      <Bookings></Bookings>
        </div>
    );
};

export default Book;