import React,{useEffect, useLayoutEffect} from 'react';

import {
  makeStyles, Hidden, ToggleButton, DateRangeIcon, Button,
  Paper, Card, Menu, MenuItem, NavigateNext, ButtonGroup,
  ArrowDropDownIcon, IconButton, Typography,ToggleButtonGroup,
  Box, Grid, AppBar, Toolbar, NavigateBefore,
} from '../../mui';
import { indigo } from '@material-ui/core/colors';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getTrain } from '../../store/actions';
import BookingForm from '../TrainPaymentDetails/Checkout'
import Snackbars from '../../helpers/Snackbar/Snackbar'
import TrainInfo from './TrainInfo'
import classNames from 'classnames';
import { ExpandLessRounded } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
  expandMore: {
    marginLeft: 170,
    [theme.breakpoints.down('md')]: {
      marginLeft: 130
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 200,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 200
    }
  },
  icons: {
    fontSize: 50,
    [theme.breakpoints.down('md')]: {
      fontSize: 30
    }
  },
  fontSize: {

  },
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
    marginTop: '23px',
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
    marginTop: '22px',
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
    marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
      marginTop: 40,
      
    },
    
  },
  action: {
    marginTop: '23px',
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
  trainSchedule: {
    marginTop: -145,
    marginLeft: 100
  }
  
  
}))

const Train = () => {
  const [toggle, setToggle] = React.useState(false);
  const [logError, setLogError] = React.useState(false);

  const classes = useStyles()
 const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getTrain())
  }, []) 

  const trainData = useSelector(state => state.train);
  const isLoggedIn = sessionStorage.getItem('user-token')

  console.log(isLoggedIn,'loggedin')
const handleClickOpen = () => {
  if(isLoggedIn === null) {
    setLogError(true)
    setTimeout(()=>{
      setLogError(false)
    }, 2000)
  }
   else setToggle(true);
  };
  const handleClose = () => {
    setToggle(false);
  };
  
  return (
    <Box mx={2} mt={2}>
      
      <Box mb={2}>
        
        <Paper   elevation={0}  variant="outlined">
          <Box mx={2}  >
            <AppBar  color="primary" position="static" >
          <Toolbar>
                <Box>TRAINS INFORMATION
            </Box>
          </Toolbar>
        </AppBar>
          </Box>
        
          
          
          <Box margin={2} >
            
            <Hidden xsDown>
              
               <Box mb={3}>
            <Paper elevation={0} variant='outlined'>
                
                <Box ml={1}>
                  <Grid container alignContent="center" justify="flex-start" spacing={2} >
          
            <Grid  item xs={12} sm={2}><Box fontWeight="fontWeightBold">Source</Box></Grid>
          <Grid item  xs={12} sm={2} ><Box fontWeight="fontWeightBold">Destination</Box></Grid>
        <Grid item xs={12}  sm={2}><Box fontWeight="fontWeightBold">Date/Time</Box></Grid>
        <Grid item xs={12}  sm={1} ><Box fontWeight="fontWeightBold" >Train</Box></Grid>
        
          
        </Grid>
        </Box>
              </Paper>
              </Box>
              
            <Box mb={3}>
            <Paper elevation={0} variant='outlined'>
                {Array.isArray(trainData.data) === true ? trainData.data.map((train, index) => (
                  
                <Box ml={1} key={index}>
                  <Grid container alignContent="center" justify="flex-start" spacing={2} >
          
                      <Grid item xs={12} sm={2}><Box >{train.source}</Box></Grid>
          <Grid item  xs={12} sm={2} ><Box >{train.destination}</Box></Grid>
                      <Grid item xs={12} sm={2}><Box >{moment(train.departure).format('MMMM Do YYYY, h:mm a')}</Box></Grid>
        <Grid item xs={12}  sm={1} ><Box  >{train.trainNumber}</Box></Grid>
        
          
        </Grid>
                  </Box>
                  )): null}
              </Paper>
            </Box>
           
           </Hidden> 

            <Hidden smUp>
              
              <Box mb={3}>
                {Array.isArray(trainData.data) === true ? trainData.data.map((train, index) => (
                  <Box mb={1} key={index}>
            <Paper elevation={0} variant='outlined'>
                
                  
                  <Box ml={1}>
                   <Box mt={1}>
                    <Grid container alignContent="center" justify="flex-start" spacing={2} >
                      
           <Grid  item xs={12} sm={2}><Box fontWeight="fontWeightBold">Source</Box></Grid>
          <Grid item  xs={12} sm={2} ><Box fontWeight="fontWeightBold">Destination</Box></Grid>
        <Grid item xs={12}  sm={2}><Box fontWeight="fontWeightBold">Date/Time</Box></Grid>
                      <Grid item xs={12} sm={1} ><Box fontWeight="fontWeightBold" >Train</Box></Grid>
                      </Grid>
                    </Box>
                      <Box className={classes.trainSchedule}>
                      <Grid container alignContent="center" justify="flex-start" spacing={2} >
                      <Grid item xs={12} sm={2}><Box >{train.source}</Box></Grid>
          <Grid item  xs={12} sm={2} ><Box >{train.destination}</Box></Grid>
                      <Grid item xs={12} sm={2}><Box >{moment(train.departure).format('MMMM Do YYYY, h:mm a')}</Box></Grid>
                        <Grid item xs={12} sm={1} ><Box  >{train.trainNumber}</Box></Grid>
             </Grid>           
        </Box>
          
        
                  </Box>
                 
                    </Paper>
                    </Box>
                   )): null}
                    
            </Box>
            
           </Hidden> 
          <Grid container spacing={4} justify="center" alignItems="center">
            
        <Grid container justify="center"  alignItems="center" item   spacing={2}>
         <Grid item xs sm={6} md={3}>
                       </Grid>
        <Grid item xs sm={6} md={3}>
              
        </Grid>
        
        <Grid item  xs sm={3}>
                <Paper >
                  <Grid container item xs={4} direction="row" justify="flex-start" alignItems="center">
                    
                    <Grid  item container xs={6} direction="column" justify="flex-start" alignItems="center">
                      <Grid item xs={6}>
                      
                      </Grid>
                      <Grid item xs={6}>
                        
                      </Grid>
                      
                    </Grid>
                    <Grid item xs={6}>
                      
                      
                    </Grid>
                    
                  </Grid>
          </Paper>
              </Grid>
              <Grid item xs sm={3}>
              
                  <Grid container item xs={4} direction="row" justify="flex-start" alignItems="center">
                    
                    <Grid  item container xs={6} direction="column" justify="flex-end" alignItems="center">
                      <Grid item xs>
                     
                      </Grid>
                      <Grid item xs>
                        
                      </Grid>
                      
                    </Grid>
                    <Grid item xs sm={6}>
                      <Box  component="div" width={150}>
                        <Button fullWidth color="secondary" onClick={ handleClickOpen} variant="contained">Book Now</Button>
                        </Box>
                      
                    </Grid>
                    
                  </Grid>
      
              </Grid>
              
        </Grid>
          </Grid>
          </Box>
      
          
        </Paper>
        <Box ml={5}>{trainData.pageSize}</Box>
        <BookingForm open={toggle} handleClose={handleClose} handleClickOpen={ handleClickOpen}/>
      </Box>
      
                  <Snackbars
                    variant={"error"}
                    message={'Kindly login'}
                    isOpen={logError === true}
                />
      </Box>

  );
}

export default Train;