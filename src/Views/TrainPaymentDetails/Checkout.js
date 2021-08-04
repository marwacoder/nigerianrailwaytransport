import React, { useRef } from 'react';
//import ReactToPrint from 'react-to-print';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Review from './Review';
import TrainForm from './Train'
import {Box, Paper, Dialog, DialogContent, DialogTitle, CssBaseline, IconButton, PrintIcon, CloseIcon} from '../../mui'
import PrintTable from './Print'


const useStyles = makeStyles((theme) => ({
  root: {
        width: '100%',
      marginTop: '-5%'
    },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Train Booking', 'Review'];
}



export default function HorizontalLabelPositionBelowStepper(props) {
    const { handleClose, open, handleClickOpen} = props
    const classes = useStyles();
    const [className, setClassName] = React.useState(null);
    const [items, setItem] = React.useState({
        name: '',
        number: '',
        from: '',
        to: '',
        class: '',
        departure: '',
        fare: ''
    })
    


    function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
          return <TrainForm items={items} className={className} setClassName={ setClassName} setItem={ setItem}/>;
      case 1:
          return <Review items={items} className={ className} handleNext={ handleNext}/>;
    default:
      return 'Unknown stepIndex';
  }
    }
    
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        
    };

    return (
        <Box>
    
      <Paper>
        
                <Dialog aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
                    <Box ml={'xs:85%'}>
                       <DialogTitle id="customized-dialog-title" open={open} >
                        <IconButton onClick={handleClose}>
                            <CloseIcon color='primary'/>
                        </IconButton>
                 </DialogTitle> 
                    </Box>
                    
                  <DialogContent >
                      <Box>
             <React.Fragment>
      <CssBaseline />
      <main >
        <Box className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                                                <div>
                                                    <Box textAlign="center"><PrintTable items={items} className={className} /></Box>
                        <Typography className={classes.instructions} component={'span'}>All steps completed</Typography>
                                                   
                                                    <Button onClick={handleReset}>Reset</Button>
                                                    
                                        
      
                                                   
                                                    
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions} component={'span'}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
              </Button>
                           { activeStep === 0  && <Button variant="contained" color="primary" onClick={handleNext}>
                                {  'Next'}
                            </Button>}
                        </div>
                    </div>
                )}
            </div>
        </Box>
          </main>
    </React.Fragment>
                      </Box>
                      
        </DialogContent>
              </Dialog>
          </Paper>
    </Box>
    );
}