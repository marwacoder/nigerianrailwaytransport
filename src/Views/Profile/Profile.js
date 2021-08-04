import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { amendProfile, amendAuth } from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux'
import {Box,MenuItem,Select,Button, Visibility, VisibilityOff, Grid, OutlinedInput, InputLabel,
  InputAdornment, FormControl, IconButton, Person
} from '../../mui'
    


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
const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '40ch',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    },
    profilePicContainer: {
    
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    },
    profilePic: {
        width: 100,
        height: 100
    },
    editIcon: {
    position: 'absolute',
    top: '26%',
    left: '52%',
    zIndex: 50,
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('sm')]: {
      left: '54%',
      top: '26%'
    }
    },
    btn: {
        [theme.breakpoints.down('xs')]: {
            marginTop: -10
        }
    }
}));

const roles = ["Admin", "User", "Passenger"];

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.isAuthenticated.data[0]);
  const isLoggedIn = useSelector(state => state.isAuthenticated.isLoggedIn);
 
  const [profile, setProfile] = React.useState({
    id: auth.profile.profileId,
    gender: auth.profile.gender,
    phoneNumber: auth.profile.phoneNumber,
    contactAdd: auth.profile.contactAdd,
  });
  const [editInfo, setEditInfo] = React.useState({
    name: auth.name,
    email: auth.email,
    password: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [role, setRole] = React.useState('')

  React.useEffect(() => {
    if (isLoggedIn === false) {
     console.log(props.history,'history')
    }
  })
    const handleEditInfo = (event) => {
    const {id, value } = event.target;
        setEditInfo({...editInfo, [id]: value});
  }
const handleProfile = (event) => {
  const {id, value } = event.target;
        setProfile({...profile, [id]: value});
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const { id, gender, contactAdd, phoneNumber } = profile;
    const { name, email, password } = editInfo;
    const authId = auth.authId;
    dispatch(amendProfile(id, gender, contactAdd, phoneNumber));
    dispatch(amendAuth(authId, name, email, password));
    props.history.push('/dashboard');
    console.log(id, authId, name, email, password, gender, contactAdd, phoneNumber);
  }
  
  const handleRole = (event) => {
        setRole(event.target.value);
}

const handleClickShowPassword = () => {
    setShowPassword((prevState)=> !prevState);
  };

    return (
        <Box mx={{ xs: 3, sm: 8, md: 38 }} my={4}>
        
            <form onSubmit={handleSubmit} >
                <Box >
                   
                    
                    
                <Grid container justify='flex-start' alignContent="flex-start" spacing={1}>
                        
                    <Grid item xs={12} sm={6}>
                                <FormControl  variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
          <OutlinedInput
            id="name"
                    type={'text'}
                    onChange={handleEditInfo}
                    value={editInfo.name}
            labelWidth={70}
                        />
                    </FormControl>
                    </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Phone Number</InputLabel>
          <OutlinedInput
            id="phoneNumber"
            type={ 'text' }
                    labelWidth={70}
                     onChange={handleProfile}
                    value={profile.phoneNumber}
          />
                                </FormControl></Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="email"
            type={ 'text' }
                    labelWidth={70}
                     onChange={handleEditInfo}
                    value={editInfo.email}
          />
                                </FormControl></Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Gender</InputLabel>
          <OutlinedInput
            id="gender"
            type={ 'text' }
                    labelWidth={70}
                     onChange={handleProfile}
                    value={profile.gender}
          />
                                </FormControl></Grid>
                            
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">contactAdd</InputLabel>
                  <OutlinedInput
                    multiline
            id="contactAdd"
            type={ 'text' }
                    labelWidth={70}
                     onChange={handleProfile}
                    value={profile.contactAdd}
          />
                </FormControl></Grid>
              <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="password"
                    type={showPassword ? 'text' : 'password'}
                     onChange={handleEditInfo}
                    value={editInfo.password}
                    labelWidth={70}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  //onMouseDown={handleMouseDownPassword}
                  edge="end"
                        >
                     {showPassword ? <Visibility /> : <VisibilityOff />}     
                </IconButton>
                   
              </InputAdornment>
            }
                  />
                   
                </FormControl></Grid>
              {/* <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Select Role</InputLabel>
                    <Select
                        id="role"
                        onChange={handleRole}
                        fullWidth
                        MenuProps={MenuProps}
                        variant="outlined"
                        
                        value ={role}
                >
                {roles.map((item, index) => (
                    <MenuItem value={item} key={index}>
                       {item}
                    </MenuItem>
                ))}            
                
                  </Select>
                  </FormControl>
                </Grid> */}
              
                        <Grid item xs={12} sm={4}>
                            
                            </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box component="div" >
                  </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                <Box component="div" >
                  <Button variant="contained" color="secondary" type='submit' fullWidth>update</Button></Box>
                                </Grid>
        </Grid>
                   </Box>         
                </form>
            
            </Box>
  );
}


