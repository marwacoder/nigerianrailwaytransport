import React,{useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../helpers/Spinner/Spinner';
import {
  makeStyles, Hidden, ToggleButton, ToggleButtonGroup, DateRangeIcon, Button,
  Paper, Card, Menu, MenuItem, NavigateNext, ButtonGroup,
  ArrowDropDownIcon, IconButton, Typography,
  Box, Grid, AppBar, Toolbar, NavigateBefore,
} from '../../mui';
import { indigo } from '@material-ui/core/colors';
import moment from 'moment';






const useStyles = makeStyles((theme) => ({
  avail: {
    cursor: 'pointer',
    margin: '3px 0px',
    textDecoration: 'underline',
    
  },
  appBarItem: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('sm')]: {
      marginLeft: -25
    }
  },
  secondAppBar: {
    backgroundColor: indigo[50],
    minHeight: 30,
    
    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#fff',
      
      
    }
  },
  tn: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 0
      
      
    }
  },
  trainBookInfo: {
    marginTop: '10px',

    [theme.breakpoints.down('xs')]: {
      marginTop: '-513px',
      marginLeft: '170px'
    }
  },
 
  heading: {
    
    [theme.breakpoints.down('sm')]: {
      marginBottom: '30px'
    }
  },
  card: {
    backgroundColor: theme.palette.background.paper
  },
  
  availProb: {
    marginTop: '8px',
    marginLeft: 60,
    [theme.breakpoints.down('sm')]: {
      
      fontSize: 14,
      marginLeft: 50,
      marginTop: 25,

    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  },
  duration: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 16
    }
  },
  classes: {
    marginTop: '8px',
    [theme.breakpoints.down('sm')]: {
      marginTop: 20,
      marginLeft: 20,
      width: 80
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 35,
      marginLeft: 0
    }
  },
  departure: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 20
    }
  },
  arrival: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 16
    }
  },
  fare: {
    marginTop: '8px',
    marginBottom: '8px',
    [theme.breakpoints.down('sm')]: {
      marginTop: 40,
      
    },
    
  },
  action: {
    marginTop: '8px',
    marginBottom: '8px',
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      marginTop: 15,
      width: 150
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  },
  buttonGroup: {
    
    [theme.breakpoints.down('sm')]: {
      width: 20
    }
  },
  btnAvail: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 12
    }
  },
  class: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 30
    }
  },
  availability: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 20
    }
  },
  headerAction: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 20
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 1
    }
  },
  headerArrival: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 5
    }
  },
  headerAvailability: {
    marginLeft: 60,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 20
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 1
    }
  },
  headerClasses: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 15
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 1
    }
  },
  headerDeparture: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: -15
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 1
    }
  },
  schedule: {
    marginTop: -500,
    marginLeft: 150,
    marginRight: 10
  }
  
  
}))
 
const TrainInfo = (props) => {
const {trainData, className, departure, arrival, item} = props
  const [toggle, setToggle] = React.useState(false);
  const classes = useStyles();
  

  return (
    <Box>
    <Box>
        <Box   >
            <AppBar  color="primary" position="static" >
            <Toolbar >
              <Box  className={classes.appBarItem}>
              <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                <Grid item xs={3} >
                      <IconButton
                        color="inherit"
                          aria-label="toggle password visibility"
                        edge="end">
                        <NavigateBefore/>
                          </IconButton>
                </Grid>
                  
                    <Grid item xs={3} >
                      <DateRangeIcon  style={{ fontSize: 30, color: 'white' }} />
                    </Grid>
                  <Grid item xs={3}><Box width={110}>{moment(new Date).format('MMM Do YYYY')}</Box></Grid>
                    
                  <Grid item xs={3} ><Box ml={5} className={classes.nextBtn}>
                    <IconButton
                      color="inherit"
                          aria-label="toggle password visibility"
                          edge="end"><NavigateNext /></IconButton>
              </Box></Grid>
                </Grid>
                </Box>
          </Toolbar>
        </AppBar>
          </Box>
          
      </Box>
    <Hidden xsDown>
      <Box mt={2}>
         <Paper elevation={0} variant="outlined"  >
          
        <Box  ml={1}><Grid container alignContent="center" justify="flex-start" spacing={2} >
          
            <Grid  item xs={12} sm={2}><Box  fontWeight="fontWeightBold">Train Name & No.</Box></Grid>
          <Grid item  xs={12} sm={2} ><Box fontWeight="fontWeightBold">Departure</Box></Grid>
        <Grid item xs={12}  sm={2}><Box fontWeight="fontWeightBold">Arrival</Box></Grid>
              <Grid item xs={12} sm={1} ><Box fontWeight="fontWeightBold" >Duration</Box></Grid>
               <Grid item xs={12}  sm={1} ><Box fontWeight="fontWeightBold" >Class</Box></Grid>
        <Grid item xs={12} sm={1} ><Box   fontWeight="fontWeightBold" >Availability</Box></Grid>
        <Grid item xs={12}  sm={1} ><Box  fontWeight="fontWeightBold" >Fare</Box></Grid>
       
        
          
        </Grid>
        </Box>
        
        
        </Paper>
        </Box>
        {trainData.isLoading ? <Spinner/> : <Box >
        { Array.isArray(trainData.data) === true ? 
           trainData.data.map(({ classes, trainNumber, trainName, source, destination, departure, arrival }, index) => (
          
          <Box mt={1} key={index}>

        <Paper elevation={0} variant="outlined" >
              
            <Box ml={1} mb={-1}>
                <Grid container alignContent="center" spacing={1} justify="center" >
                  
                <Grid item xs={12} sm={2} >
                  <Box mt={1} className={classes.tn}>
                    <Box >{trainName} {" / #"}{trainNumber}</Box>
                   
                  </Box>
              
                </Grid>
                <Grid item xs={12} sm={2} >
                  <Box mt={1} className={classes.departure}>
                    <Box >{moment(departure).format('MMMM Do YYYY, h:mm a')}{" / "}{source}</Box>
                   
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Box mt={1} className={classes.arrival}>
                    <Box >{moment(arrival).format('MMMM Do YYYY, h:mm a')}{" / "}{destination}</Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={1} >
                        <Box mt={1} className={classes.duration}>12.3Hrs</Box>
                      </Grid>
                     <Grid item xs={12} sm={1} >
                       {Array.isArray(item) && item.map((val) => (
                         <Box mt={1} key={index}>
                           {val.code
                           }
                       </Box>)) }
                     </Grid>
                    <Grid item xs={12} sm={1} >
                    {Array.isArray(item) && item.map((val)=> (<Box mt={1} key={index}>
                           {val.availableSeat
                           }
                       </Box>)) }
                    </Grid>
                  
                  <Grid item xs={12} sm={1} >
                        {Array.isArray(item) && item.map((val)=> (<Box mt={1} key={index}>
                           {val.fare
                           }
                       </Box>))}
                </Grid>
                  <Grid item xs={12} sm={2} >
                    {/* <Box mt={1} mb={2} className={classes.action}>
                         <TrainPaymentDetails handleClickOpen={handleClickOpen}
                           name={trainName} number={trainNumber} source={source} destination={destination} departure={departure}
                           arrival={arrival}
                           item={item} open={toggle} handleClose={handleClose} />
                  </Box> */}
                      
                  </Grid>
              </Grid>
            </Box>
            
            </Paper>
            </Box>
        )) : <Box ml="50%" mt={5} >No Record Found</Box>}

        </Box>
}
            </Hidden>
      <Hidden smUp>
    
      
        <Box mt={2}>
          { Array.isArray(trainData.data) === true ? 
            trainData.data.filter((item) => {
              if (item.departure === departure && item.arrival === arrival) {
                return item
              }
              else if (arrival === "" || departure === "") {
                return item
              }
              
            }).map(({ classes, trainNumber, trainName, source, destination, departure, arrival }, index) => (
           <Box mb={2} key={index}>
        <Paper  elevation={0} variant="outlined" >
          
            
               <Box ml={1} my={2}>
             <Grid container alignContent="center" justify="flex-start" spacing={2} >
          
            <Grid  item xs={12} sm={2}><Box fontWeight="fontWeightBold">Train Name & No.</Box></Grid>
          <Grid item  xs={12} sm={2} ><Box fontWeight="fontWeightBold">Departure</Box></Grid>
        <Grid item xs={12}  sm={2}><Box fontWeight="fontWeightBold">Arrival</Box></Grid>
                    <Grid item xs={12} sm={1} ><Box fontWeight="fontWeightBold" >Duration</Box></Grid>
                    <Grid item xs={12}  sm={1} ><Box fontWeight="fontWeightBold" >Class</Box></Grid>
        <Grid item xs={12} sm={1} ><Box  fontWeight="fontWeightBold" >Availability</Box></Grid>
        <Grid item xs={12}  sm={1} ><Box  fontWeight="fontWeightBold" >Fare</Box></Grid>
        <Grid item xs={12}  sm={2} ><Box  fontWeight="fontWeightBold">Actions</Box></Grid>
        
          
        </Grid>
                </Box>
                
            <Box mt={-38} ml={20} mb={2}>
              
              <Grid container alignContent="center" spacing={2} justify="flex-start" >
                
                  <Box >
                  <Grid item xs={12} sm={2} >
                  <Box mt={1} >
                    <Box >{trainName} {" / #"}{trainNumber}</Box>
                   
                  </Box>
              
                </Grid>
                <Grid item xs={12} sm={2} >
                  <Box mt={2} >
                    <Box >{departure}{" / "}{source}</Box>
                   
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Box mt={2} >
                    <Box >{arrival}{" / "}{destination}</Box>
                  </Box>
                   </Grid>
               
                <Grid item xs={12} sm={2} >
                 <Box mt={2} >12.3Hrs</Box></Grid>
                  <Grid item xs={12} sm={1} >
                         {classes.flat().filter((item) => {
                      if (item.className === className) {
                         return item
                       }else if (className === "" ) {
                        return item.className === "Normal" 
                          }
                        
                      
                     }).map((item,index)=>  <Box mt={1} key={index}>{ item.code}</Box>)}
                        </Grid>
                <Grid item xs={12} sm={1} >
                  {classes.flat().filter((item) => {
                      if (item.className === className) {
                         return item
                       }else if (className === "" ) {
                        return item.className === "Normal" 
                      }
                      
                  }).map((item, index) => 
                    (
                      <Box mt={1} key={index}>
                        Avail {
                         
                          item.availableSeat
                        }</Box> 
                  ))}
                        
                    </Grid>
                    </Box>
                
                
                      <Grid item xs={12} sm={1} >
                        {classes.flat().filter((item) => {
                          if (item.className === className) {
                            return item
                          } else if (className === "" ) {
                            return 
                          
                      }
                    }).map((item, index) => <Box mt={1} key={index} className={classes.fare} mt={1} ml={1}>{item.fare}</Box>)}
                   
                      </Grid>
                <Grid item xs={12} sm={2} >
                  <Box  mb={2}>
                  </Box>
                </Grid>
             </Grid>
             </Box>
            
            </Paper>  
          </Box>
       )): null}   
       </Box>
     
      </Hidden>
      </Box>
  );
}
 
TrainInfo.propTypes = {};
 
export default TrainInfo;