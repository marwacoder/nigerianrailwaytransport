import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Grid, Box, Select, MenuItem, Paper, TextField, Button, ListItemText, CheckBox, FormControl, FormControlLabel, FormHelperText, InputLabel } from '../../mui';
import { createTrain } from '../../store/actions';

import PropTypes from 'prop-types';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps : {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
}

const listRegex = RegExp('/^\d(,\d+)*$/');

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
}

const classInfo = [
    { id: 0, className: 'Normal', code: 'NA', fare: 0, availableSeat: 0 },
    { id: 1, className: 'Executive Anubhuti', code: 'EA', fare: 0, availableSeat: 0 },
    { id: 2, className: 'AC 2-tier', code: 'AC 2T', fare: 0, availableSeat: 0 }
]

const quotaInfo = ["General Quota (GN)","Ladies Quota (LD)","Defence Quota (DF)"]
const Admin = () => {

    
    const dispatch = useDispatch();
    
    const [trainInfo, setTrainInfo] = React.useState({
        trainName: '',
        source: '',
        destination: '',
        departure: '',
        arrival: '',
        capacity: 0,
        availableSeat: 0,
        className: [],
        quota: [],
        fare: 0,
        errors: {
        trainName: '',
        source: '',
        destination: '',
        departure: '',
        arrival: '',
        capacity: '',
        fare: '',
        availableSeat: '',
        className: '',
        quota: ''
        }
    })
    
    const [className, setClassName] = React.useState([])
    const [quota, setQuota] = React.useState([])
 
    const adminId = useSelector(state => state.isAuthenticated.data)

    const handleMultipleClasses = (event) => {
        const { id, value } = event.target;
        setClassName(event.target.value);
    }


    const handleMultipleQuota = (event) => {
        setQuota(event.target.value);
    }

    const handleChange = (event) => {
        const { id, value } = event.target;

        // let error = trainInfo.errors;
        // switch (id) {
        //     case 'fare':
        //         error.fare = listRegex.test(value) ? '' : value.length <= 0 ? 'cannot be empty':'Fare not valid must be comma separated';
        //         break;  
            
        //     default:
        //         break;
        // }
        setTrainInfo({ ...trainInfo,  [id]: value });
        console.log(trainInfo)
    }
    
    const onHandleSubmit = (event) => {
        event.preventDefault();

        const {trainName, trainNumber, departure, destination, arrival, source, capacity} = trainInfo
        let f = trainInfo.fare.split(',')
        let s = trainInfo.availableSeat.split(',')
        for (let i = 0; i < classInfo.length; i++) {
            
            if (s[i] === NaN || s[i] === undefined) {
               classInfo[i].availableSeat = 0
            }
            else {
                 classInfo[i].availableSeat = parseInt(s[i])
            }
            if (f[i] === NaN || f[i] === undefined) {
               classInfo[i].fare = 0
            }
            else {
                 classInfo[i].fare = parseInt(f[i])
            }
            trainInfo.capacity += classInfo[i].availableSeat
            
        }

      
            dispatch(createTrain({
            trainName,
            trainNumber,
            source,
            destination,
            departure,
            arrival,
            quota,
            capacity: trainInfo.capacity,
            classes: classInfo,
            adminId: adminId[0]['adminId']
        }));
        
        
    }

    
  
    return (
        <Box mt={5} mx={{ xs: 5, sm: 15, md: 5 }}>
            
            
             <form   onSubmit={onHandleSubmit}>
            <Grid container justify="flex-start" alignContent="flex-start" spacing={1}>
            
            <Grid item xs={12} sm={6}>
            <TextField
            id='trainName'
            variant="outlined"
                            label='Train Name'
                            type="text"
            onChange={handleChange}              
                        fullWidth 
             value={trainInfo.trainName}           
            />        
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
            id='source'
            variant="outlined"
                        fullWidth
                        type="text"
            onChange={handleChange}    
                        label='Source'   
             value={trainInfo.source}           
            />        
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
            id='destination'
            variant="outlined"
                        label='Destination'
                        type="text"
            onChange={handleChange}   
            fullWidth  
             value={trainInfo.destination}           
            />        
                </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
            fullWidth
            id='departure'
            variant="outlined"
                        label='Departure'   
                        type="datetime-local"
           
            onChange={handleChange}    
             value={trainInfo.departure}           
            />        
                    </Grid>
                    <Grid item xs={12} sm={6}>
            <TextField
            fullWidth
            id='arrival'
            variant="outlined"
                        label='Arrival'   
                        type="datetime-local"
           
            onChange={handleChange}    
             value={trainInfo.arrival}           
            />        
                </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel style={{marginLeft: 10}}>Select Class</InputLabel>
                        
                        <Select
                            
                            multiple
                            type="text"
                            id="className"
                        value={className}
                        onChange={handleMultipleClasses}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                            fullWidth
                            variant="outlined"
                >
                {classInfo.map((item, index) => (
                    <MenuItem key={index} value={item.className} >
                        <CheckBox value={item.className}   checked={className.indexOf(item.className) > - 1}/>
                        <ListItemText primary={item.className} />
                    </MenuItem>
                ))}            
                
                            </Select>
                            </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel style={{marginLeft: 10}}>Select Quota</InputLabel>
                        
                    <Select
                        id="quota"
                            multiple
                            type="text"
                        onChange={handleMultipleQuota}
                        fullWidth
                        renderValue={(selected) => selected.join(", ")}
                        variant="outlined"
                        MenuProps={MenuProps}
                        value={quota}
                >
                {quotaInfo.map((item, index) => (
                    <MenuItem value={item} key={index}>
                        <CheckBox value={item}  checked={quota.indexOf(item) > - 1}/>
                        <ListItemText primary={item} />
                    </MenuItem>
                    
                ))}            
                
                            </Select>
                            </FormControl>
                </Grid>
                    <Grid container alignContent="center" justify="center" spacing={1} item xs={12} sm={6}>
                        
                        <Grid item xs={12} sm={6}>
                         <TextField
            fullWidth
            id='fare'
            variant="outlined"
            label='Fare'  
            onChange={handleChange}            
             value={trainInfo.fare}           
                            />       
                            {trainInfo.errors.fare.length > 0 && <FormHelperText error={true}>{trainInfo.errors.fare}</FormHelperText>}
                    </Grid>
                <Grid item xs={12} sm={6}>
            <TextField
            fullWidth
            id='availableSeat'
            variant="outlined"
            label='Class Capacity'  
            onChange={handleChange}            
             value={trainInfo.availableSeat}        
                            />        
                            
                        </Grid>
                        <Grid item xs={12} sm={6}>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="secondary" type="submit" fullWidth>add train</Button>
                   </Grid>
                    </Grid>
                     
                    
                </Grid>
            </form> 
            </Box>
    );
}
 
Admin.propTypes = {};
 
export default Admin;