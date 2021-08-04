import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {
    MoreIcon, DeleteIcon, EditIcon, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Slide,Grid, Select,
    Menu, MenuItem, ListItemIcon, ListItemText,Box,
    withStyles, TextField, Button, CheckBox, FormControl,
    FormControlLabel, FormHelperText, InputLabel 
} from '../../mui';


import {destroyTicket} from '../../store/actions/'




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









export default function CustomizedMenus(props) {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    
    const passengerId = useSelector(state => state.isAuthenticated.data[0].passengerId)

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

   
    
     
   
    

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
        setAnchorEl(null);
    };

    const handleClickCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        
    };

    
    
    
   

    const onDestroyHandler = () => {
    dispatch(destroyTicket(props.id, passengerId))  
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


   
    return (
        <div>
            <Button onClick={handleClickOpenDeleteDialog}>
            <DeleteIcon fontSize="small" color="primary"/>
            </Button>
            
            
            { destroy()}
           
        </div>
    );
}