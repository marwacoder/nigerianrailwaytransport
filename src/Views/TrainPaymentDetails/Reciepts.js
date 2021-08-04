import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import {Box, Hidden} from '../../mui'

// const useStyles = makeStyles((theme) => ({
//   root: {
//         width: '100%',
     
//     },
  
// }));
export default class ComponentToPrint extends React.PureComponent {

  render() {
      
      const { className, items, auth } = this.props;
      
      return (
        <Box>
          <Hidden mdUp>
            <Box mx={5}>
          <Box >RECEIPT</Box>
            <table>
                <thead>
              <tr>
                <th >Name </th>
                
                <th >Email Address </th>
                        <th >Train Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{auth.name}</td>
                <td>{auth.email}</td>
                <td>{items.name + items.number}</td>
              </tr>
            </tbody>
            <thead>
               <tr>
                <th >Source</th>
                <th >Destination</th>
                        <th >Departure</th>
                    </tr>
            </thead>
            <tbody>
              <tr>
                <td>{items.from}</td>
                <td>{items.to}</td>
                <td>{moment(items.departure).format('MMMM Do YYYY, h:mm a')}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                  <th >Arrival</th>
                <th >Class</th>
                <th >Fare</th>
                </tr>
            </thead>
            
               <tbody>
              <tr>
                <td>{moment(items.arrival).format('MMMM Do YYYY, h:mm a')}</td>
                <td>{className.className}</td>
                <td>{className.fare}</td>
              </tr>
            </tbody>
            </table>
            </Box>
          </Hidden>
          <Hidden mdDown>
            <Box mx={10}>
          <Box >RECEIPT</Box>
            <table>
                <thead>
              <tr>
                <th >Name </th>
                
                <th >Email Address </th>
                        <th >Train Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{auth.name}</td>
                <td>{auth.email}</td>
                <td>{items.name + items.number}</td>
              </tr>
            </tbody>
            <thead>
               <tr>
                <th >Source</th>
                <th >Destination</th>
                        <th >Departure</th>
                    </tr>
            </thead>
            <tbody>
              <tr>
                <td>{items.from}</td>
                <td>{items.to}</td>
                <td>{moment(items.departure).format('MMMM Do YYYY, h:mm a')}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                  <th >Arrival</th>
                <th >Class</th>
                <th >Fare</th>
                </tr>
            </thead>
            
               <tbody>
              <tr>
                <td>{moment(items.arrival).format('MMMM Do YYYY, h:mm a')}</td>
                <td>{className.className}</td>
                <td>{className.fare}</td>
              </tr>
            </tbody>
            </table>
            </Box>
          </Hidden>
          <p class="centered">Thanks for your purchase!
                {/* <br>parzibyte.me/blog</br> */}
                </p>
        </Box>
    );
  }
}

