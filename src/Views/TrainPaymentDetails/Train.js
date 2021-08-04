import React from 'react';
import {useSelector} from 'react-redux'
import {
    Box, Typography, Input, Grid, FormControl,
    TrainIcon, InputAdornment,
    FormControlLabel, FormHelperText,
    Select, InputLabel, MenuItem, ListItemText
} from '../../mui';
import moment from 'moment'


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



const TrainForm = (props) => {
    const {items, setClassName, setItem} = props
    const trains = useSelector(state => state.train.data)
    
    
    return (
        <Box mx={3} mb={4}>
            <Typography variant="h6" component={'span'} gutterBottom>
                Book Train
      </Typography>
            <form>
            <Grid container spacing={2} alignContent='center' justify='center'>
                <Grid item xs={12} md={12}>
                        <FormControl fullWidth>
                            <InputLabel style={{marginLeft: 10}}>From</InputLabel>

                    <Select
                        id="from"
                            type="text"
                        // onChange={handleChange('from')}
                        fullWidth
                        variant="standard"
                                MenuProps={MenuProps}
            //                     endAdornment={
            //   <InputAdornment position="end">
            //        <TrainIcon />
            //   </InputAdornment>
            // }
                        value={items.from}
                >
            {Array.isArray(trains) && trains.map((item, index) => (
                <MenuItem value={item.source} key={index} onClick={() =>
                    setItem({
                        name: item.trainName, number: item.trainNumber,
                        from: item.source, to: item.destination, class: item.classes,
                        departure: item.departure,
                        arrival: item.arrival
                    })}>
                    <ListItemText primary={ item.source}/>
                    </MenuItem>
                    
                ))}            
                
                            </Select>
                            </FormControl>
                </Grid>
 <Grid item xs={12} md={12}>
                        <FormControl fullWidth>
                            <InputLabel style={{marginLeft: 10}}>To</InputLabel>

                    <Select
                        id="to"
                            type="text"
                        // onChange={handleChange('to')}
                        fullWidth
                        variant="standard"
                        MenuProps={MenuProps}
                        value={items.to}
                >
                    <MenuItem value={items.to} >
                    <ListItemText primary={items.to }/>
                    </MenuItem>
                
                            </Select>
                            </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth>
                            <InputLabel style={{marginLeft: 10}}>Class</InputLabel>

                    <Select
                        id="class"
                            type="text"
                        //onChange={()=>setItem('class')}
                        fullWidth
                        variant="standard"
                        MenuProps={MenuProps}
                        value={items.class.className}
                >
           {Array.isArray(items.class) && items.class.map((item, index) => (
                    <MenuItem value={item.className} key={index} onClick={()=> setClassName(item)}>
                    <ListItemText primary={ item.className}/>
                    </MenuItem>
                    
                ))}   
                
                            </Select>
                            </FormControl>
                </Grid>
                
 
                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth>
                            <InputLabel style={{marginLeft: 10}}>Date</InputLabel>

                            <Input fullWidth={true} variant="standard" id='departure' value={items.departure === '' ?
                                  '' : moment(items.departure).format('MMMM Do YYYY, h:mm a')} />
                            </FormControl>
                </Grid>
        
                </Grid>
                </form>
        </Box>
    );
}

export default TrainForm