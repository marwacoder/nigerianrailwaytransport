import React from 'react'

import {makeStyles} from '../../mui'


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


const Home = () => {
     
    const classes = useStyles();


    return (
        <div>
           Home Layout
            
        </div>
    )
}

export default Home;

