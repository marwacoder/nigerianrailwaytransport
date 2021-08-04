import React from 'react';
import {useDispatch} from 'react-redux'
import { PaystackConsumer } from "react-paystack";
import {useSelector} from 'react-redux'
import { Typography, Grid, Box, Button } from '../../mui/index.jsx';
import moment from 'moment';
import {bookTrain} from '../../store/actions/'
import classNames from 'classnames';



export default function Review(props) {
  const dispatch = useDispatch()
    const auth = useSelector(state => state.isAuthenticated.data ? state.isAuthenticated.data[0]: {})

  const { items, className } = props;
  const config = {
    reference: new Date().getTime().toString(),
    email: auth.email,
    amount: className.fare * 100,
    publicKey: "pk_test_e30a5bb6609528ba8916e7d98043b62e8ef4d5af",
  };

  
  
  // you can call this function anything
  const handleSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    dispatch(bookTrain({
      passengerId: auth.passengerId,
      trainNameNumber: items.name + items.number,
      classes: className.className,
      fare: className.fare,
      source: items.from,
      destination: items.to,
      departure: items.departure,
      arrival: items.arrival
    }))
    props.handleNext()
  };
  
  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  
    const componentProps = {
      ...config,
      text: "Paystack Button Implementation",
      onSuccess: (reference) => handleSuccess(reference),
      onClose: handleClose,
    };
  
  


  return (
    <Box ml={2}>
      <Grid container spacing={1} justify='center' alignContent='center'>
        <Grid item xs={12} sm={6}>
        <Typography  component='h3' component={'span'}>Name / Email Address</Typography>
        </Grid>        
        <Grid item xs={12} sm={6}>
                  <Typography component='h2' component={'span'}>{auth.name} {"-->"} {auth.email }</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography  component='h3' component={'span'}>Train Name /Number</Typography>
        </Grid>
        <Grid xs={12} sm={6} >
                  <Typography component='h2' component={'span'}>{items.name} {"--> #"} {items.number }</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
          <Typography  component='h3' component={'span'}>Source / Destination</Typography>
        </Grid>
        <Grid xs={12} sm={6} >
                <Typography component='h2' component={'span'}>{items.from }{ "--> #"}{ items.to}</Typography>  
              </Grid>
              <Grid item xs={12} sm={6}>
          <Typography  component='h3' component={'span'}>Departure/Arrival</Typography>
        </Grid>
        <Grid xs={12} sm={6} >
          <Typography component='h2' component={'span'}>
                     {moment(items.departure).format('MMMM Do YYYY, h:mm a') }{"--> "}{ moment(items.arrival).format('MMMM Do YYYY, h:mm a')}
          </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
          <Typography  component='h3' component={'span'}>Class</Typography>
        </Grid>
        <Grid xs={12} sm={6} >
          <Typography component='h2' component={'span'}>
            {className.className}
           </Typography>
         
        </Grid>
              <Grid item xs={12} sm={6}>
          <Typography  component='h3' component={'span'}>Fare</Typography>
        </Grid>
        <Grid xs={12} sm={6} >
          <Typography component='h2' component={'span'}>
            {"#" }{className.fare}
           </Typography>
                  
        </Grid>
       <Grid xs={12} sm={6} >
          <Box mb={4} mt={4}>
          <PaystackConsumer {...componentProps}>
        {({ initializePayment }) => (
          <Button fullWidth variant="contained" color="secondary"  onClick={() => initializePayment(handleSuccess, handleClose)}>
            Pay
          </Button>
        )}
      </PaystackConsumer>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

