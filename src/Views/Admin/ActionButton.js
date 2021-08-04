import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {
    MoreIcon, DeleteIcon, EditIcon, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Slide,Grid, Select,
    Menu, MenuItem, ListItemIcon, ListItemText,Box,
    withStyles, TextField, Button, CheckBox, FormControl,
    FormControlLabel, FormHelperText, InputLabel 
} from '../../mui';
import { amendTrain, destroyTrain} from '../../store/actions/';






const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

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





const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);



export default function CustomizedMenus(props) {
    
    const { row } = props;
    let classInfo = row.classes;
    let quotaInfo = row.quota;
    let f = classInfo.map(item => item.fare)
        f = f.join(',');
        let s = classInfo.map(item => item.availableSeat)
        s = s.join(',');

    const [trainInfo, setTrainInfo] = React.useState({
        trainName: row.trainName,
        source: row.source,
        destination: row.destination,
        departure: row.departure,
        arrival: row.arrival,
        capacity: row.capacity,
        availableSeat: s,
        className: [],
        quota: [],
        fare: f,
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
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    const adminId = useSelector(state => state.isAuthenticated)
    const {error, message} = useSelector(state => state.train)
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openAmendDialog, setOpenAmendDialog] = React.useState(false);

   
    const handleMultipleClasses = (event) => {
        const { id, value } = event.target;
        setClassName(event.target.value);
}

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
        setAnchorEl(null);
    };

    const handleClickCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        
    };

    const handleClickOpenAmendDialog = () => {
        setOpenAmendDialog(true);
        setAnchorEl(null);
    };

    const handleClickCloseAmendDialog = () => {
        setOpenAmendDialog(false);
        
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMultipleQuota = (event) => {
        setQuota(event.target.value);
    }

    const onDestroyHandler = () => {
    dispatch(destroyTrain(props.id))  
    }

const handleChange = (event) => {
        const { id, value } = event.target;
        setTrainInfo({ ...trainInfo,  [id]: value });
        console.log(trainInfo)
    }

const onAmendHandler = (event) => {
        event.preventDefault();

        const {trainName, trainNumber, departure, destination, arrival, source, capacity} = trainInfo
        let f = trainInfo.fare.split(',')
        let s = trainInfo.availableSeat.split(',')
        for (let i = 0; i < classInfo.length; i++) {
            
            if ( isNaN(s[i]) || s[i] === undefined) {
               classInfo[i].availableSeat = 0
            }
            else {
                 classInfo[i].availableSeat = parseInt(s[i])
            }
            if ( isNaN(f[i]) || f[i] === undefined) {
               classInfo[i].fare = 0
            }
            else {
                 classInfo[i].fare = parseInt(f[i])
            }
            trainInfo.capacity += classInfo[i].availableSeat
            
        }

      
    dispatch(amendTrain({
            id: props.id,
            trainName,
            trainNumber,
            source,
            destination,
            departure,
            arrival,
            quota,
            capacity: trainInfo.capacity,
            classes: classInfo,
            adminId: adminId.data[0].adminId
        }));
        

    }

    const destroy = () => (
        <div>
        
            <Dialog
                open={openDeleteDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickCloseDeleteDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Delete This Record?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClickCloseDeleteDialog} color="primary">
                        Disagree
          </Button>
                    <Button onClick={onDestroyHandler} color="primary">
                        Agree
          </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    );


    const amend = () => (
        <Dialog
            open={openAmendDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClickCloseAmendDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
                
            <form onSubmit={onAmendHandler}>
                <DialogTitle id="alert-dialog-slide-title">{"Amend This Record?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
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
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel style={{ marginLeft: 10 }}>Select Class</InputLabel>
                        
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
                                                <CheckBox value={item.className} checked={className.indexOf(item.className) > - 1} />
                                                <ListItemText primary={item.className} />
                                            </MenuItem>
                                        ))}
                
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel style={{ marginLeft: 10 }}>Select Quota</InputLabel>
                        
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
                                                <CheckBox value={item} checked={quota.indexOf(item) > - 1} />
                                                <ListItemText primary={item} />
                                            </MenuItem>
                    
                                        ))}
                
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container alignContent="center" spacing={1} justify="center" item xs={12} sm={6}>
                        
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                               
                                        fullWidth
                                        id='fare'
                                        variant="outlined"
                                        label='Fare'
                                        onChange={handleChange}
                                        value={trainInfo.fare}
                                    />
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
                            </Grid>
                     
                    
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ marginRight: 20 }}>
                    <Button onClick={handleClickCloseAmendDialog} color="primary">
                        Disagree
          </Button>
                    <Button type="submit" color="primary">
                        Agree
          </Button>
                </DialogActions>
                        
            </form>
                 
        </Dialog>
    );
    return (
        <div>
            <Button onClick={handleClick}>
            <MoreIcon
                color="primary"
                
            />
            </Button>
            
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={handleClickOpenDeleteDialog}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </StyledMenuItem>
                <StyledMenuItem onClick={handleClickOpenAmendDialog}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                </StyledMenuItem>
               
            </StyledMenu>
            { destroy()}
            {amend()}
             
        </div>
    );
}