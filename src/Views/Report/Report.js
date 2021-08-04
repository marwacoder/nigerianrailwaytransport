import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {getTrainTicket, destroyTrainBookingRefresh, destroyTicket} from '../../store/actions/'
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Box, Grid, Button } from '../../mui'
import ActionButton from './payAction'
import Snackbar from '../../helpers/Snackbar/Snackbar'

const columns = [
  { id: 'trainNameNumber', label: 'Train Number', minWidth: 170 },
  { id: 'source', label: 'Source', minWidth: 100 },
  {
    id: 'destination',
    label: 'Destination',
    minWidth: 170
  },
  {
    id: 'departure',
    label: 'Departure',
    minWidth: 170
  },
  {
    id: 'arrival',
    label: 'Arrival',
    minWidth: 250
  },
  {
    id: 'class',
    label: 'Class',
    minWidth: 100
  },
  {
    id: 'fare',
    label: 'Fare',
    minWidth: 100
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 100
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const id = useSelector(state => state.isAuthenticated.data[0].passengerId)
  const rows = useSelector(state => state.booking)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log(rows,'op')

  React.useEffect(() => {
  dispatch(getTrainTicket(id))
},[])

  const { error, message } = useSelector(state => state.booking)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onHandleSnack = () => {
    dispatch(destroyTrainBookingRefresh())
}

  return (
    <Box>
      <Snackbar
                    variant={'success'}
                    handleClose={onHandleSnack}
                    message={message}
                    isOpen={error === false}
            />
                  <Snackbar
                    variant={"error"}
                    handleClose={onHandleSnack}
                    message={message}
                    isOpen={error === true}
                />
      <Box mx={10}>
<Paper className={classes.root}>
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
            {Array.isArray(rows.data) && rows.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : column.id === 'departure' ?
                          moment(value).format('MMMM Do YYYY, h:mm a') :
                          column.id === 'arrival' ? moment(value).format('MMMM Do YYYY, h:mm a') : column.id === 'action'
                            ? <ActionButton id={ row.paymentId}/> : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.pageSize}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
      </Box>
       
      </Box>
  );
}
