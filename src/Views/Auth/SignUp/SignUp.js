import React from 'react';
import clsx from 'clsx';
import {useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import {
  IconButton, OutlinedInput, InputLabel, Button,
  InputAdornment, FormControl, Paper,Box,
  Person, VisibilityOff, Visibility,
} from '../../../mui';
import {signUp} from '../../../store/actions'



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
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
    }));
export default function CustomizedDialogs(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
    
    
    const [values, setValues] = React.useState({
      name: '',
      email: '',
      userImage: '',
      phoneNumber: '',
      address: '',
      gender: '',
      role: '',
    password: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUp(values.name, values.email, values.password))

  }

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
      <Paper elevation={0}>
                  <form onSubmit={handleSubmit}>
                    
                      <div>
                          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
              type={'text'}
              onChange={handleChange('name')}
              value={values.name}
            endAdornment={
              <InputAdornment position="end">
                   <Person />
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
              </div>
              <div>
                          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
              type={'text'}
              onChange={handleChange('email')}
              value={values.email}
            endAdornment={
              <InputAdornment position="end">
                   <EmailIcon />
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        </div>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>

                          
                          
         <Box pt={4}> <Button type="submit" fullWidth  color="secondary" variant="contained">
                     <span style={{color: '#fff'}}>Sign Up</span> 
                          </Button></Box>
            
          </form>
              </Paper>
  );
}