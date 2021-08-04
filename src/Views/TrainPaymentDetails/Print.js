import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import {useSelector} from 'react-redux'
import { Button, PrintIcon, Box } from '../../mui'
import Reciept from './Reciepts';


const PrintButton = (props) => {
    const auth = useSelector(state =>state.isAuthenticated.data[0])
     const {items, className, handleNext} = props

      const componentRef = useRef();

      
      return(
          <Box >
              <Reciept items={items} auth={auth} className={className} ref={componentRef} handleNext={ handleNext}/>
              <ReactToPrint
          trigger={() => 
            <Button  startIcon={<PrintIcon color='secondary'/>}>Print Ticket</Button>
          }
          content={() => componentRef.current}
        />
        
      </Box>
      )
    }
    
export default PrintButton;