import React from 'react';
import clsx from 'clsx';
import {
    makeStyles, IconButton, OutlinedInput, InputLabel,Button,
    InputAdornment, FormControl, Paper, Person, Visibility, VisibilityOff
} from '../../../mui'
import { useDispatch } from 'react-redux';
import { login } from '../../../store/actions';




const styles = (theme) => ({
  root: {
    margin: 0,
        padding: theme.spacing(2),
        width: 100,
textField: {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    },
  
});




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
const  SignIn =(props) =>{
const classes = useStyles();
    const dispatch = useDispatch();
    
    const [values, setValues] = React.useState({
    email: "",
    password: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault()
   
    dispatch(login(values.email,values.password))
  }


  return (
      <Paper elevation={0}>
                  <form onSubmit={handleSubmit}>
                    
                      <div>
                          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={ 'text' }
            value={values.email}
            onChange={handleChange('email')}
            endAdornment={
              <InputAdornment position="end">
                   <Person />
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
        <div>
                          
                          
         <div style={{paddingBottom: 10}}> <Button type="submit" fullWidth  color="secondary" variant="contained">
                     <span style={{color: '#fff'}}>Sign In</span> 
                          </Button></div>
                      
                      </div>
          </form>
              </Paper>
  );
}

export default SignIn;