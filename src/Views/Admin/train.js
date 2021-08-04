import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Box, Grid, Button} from '../../mui'
import TrainModal from './TrainModal';
import moment from 'moment';
import ActionButton from './ActionButton';

import { useDispatch, useSelector } from 'react-redux';


const columns = [
  { id: 'trainName', label: 'Train Name', minWidth: 140 },
  { id: 'trainNumber', label: 'Train Number', minWidth: 130 },
  {
    id: 'source',
    label: 'Source',
    minWidth: 150
  },
  {
    id: 'destination',
    label: 'Destination',
    minWidth: 150
  },
  {
    id: 'departure',
    label: 'Departure',
    minWidth: 250
  },
  {
    id: 'arrival',
    label: 'Arrival',
    minWidth: 250
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 100
  },
  
];



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Train() {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

const [toggle, setToggle] = React.useState(false);

  
  const { data, isLoading, pageSize } = useSelector(state => state.train)
  

  



  const handleClickOpen = () => {
    setToggle(true);
  };
  const handleClosse = () => {
    setToggle(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Box>
       
      <Grid container justify="flex-start" alignContent="flex-start" spacing={1}>
        <Grid item xs={12} sm={3}>
          <Box mb={4}>
<Button variant="contained" color="secondary" onClick={handleClickOpen} fullWidth>add train</Button>
          </Box>
            
                    </Grid>
      
            </Grid>
            
              
      <Paper className={classes.root}>
        <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
              <TableBody>
                
             {!isLoading ? Array.isArray(data) && data.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.trainId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const key = column.id;
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {  key === 'action' ? <ActionButton id={row.trainId} row={row}/> : key === 'departure' ? moment(value).format('MMM Do YYY, h:mm:ss a') :
                        key === 'arrival' ?  moment(value).format('MMM Do YYY, h:mm:ss a'):   value}
                        
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            }): 'No Record Found'}
          </TableBody>
        </Table>
          </TableContainer>
          </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={pageSize}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
      <TrainModal handleClose={handleClosse} handleOpen={handleClickOpen} open={toggle} />
      
    </Box>
    
  );
}
