import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Snack = ({ snackbar, onSnackbarStatus }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(snackbar?.status || false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    onSnackbarStatus(false);
  };

  useEffect(() => {
    console.log({
      snack: {
        status: snackbar?.status,
        message: snackbar?.message,
        severity: snackbar?.severity,
      },
    });

    setOpen(snackbar?.status);
  }, [snackbar]);

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbar?.severity}>
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    snackbar: state?.term?.snackbar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSnackbarStatus: (status) => dispatch(actions.snackbar(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Snack);
