import React from 'react';

import PropTypes from 'prop-types';
import { Box } from '../../mui'
import Snackbars from '../../helpers/Snackbar/Snackbar'
//import Clerk from './clerk';
import Train from './train'
import { useDispatch, useSelector } from 'react-redux';

import {destroyTrainRefresh, postTrainRefresh, amendTrainRefresh} from '../../store/actions'

const Admin = () => {
    const { data, error, message, isLoading, pageSize } = useSelector(state => state.train)
      const dispatch = useDispatch();

      const onHandleSnack = () => {
  dispatch(destroyTrainRefresh())
    }
    
    console.log(message,'message')


    return (
        <Box mt={5} mx={{ xs: 5, sm: 15, md: 5 }}>
            
            <Box my={5} >
                {/* <Clerk /> */}
                <Train />
                <Box>
        <Snackbars
                    variant={'success'}
                    handleClose={onHandleSnack}
                    message={message}
                    isOpen={error === false}
            />
                  <Snackbars
                    variant={"error"}
                    handleClose={onHandleSnack}
                    message={message}
                    isOpen={error === true}
                />
       </Box>  
            </Box>
        </Box>
    );
}
Admin.propTypes = {};
 
export default Admin;