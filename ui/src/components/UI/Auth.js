import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import loginImage from '../../assets/point-of-light.jpeg';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
      {process.env.REACT_APP_APP_NAME}
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

const LoginFields = () => (
  <>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
    />
    <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
    />
  </>
);

const RegisterFields = () => (
  <>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="confirm-password"
      label="Confirm Password"
      type="password"
      id="confirm-password"
    />
  </>
);

const ForgotFields = () => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    id="email"
    label="Email Address"
    name="email"
    autoComplete="email"
    autoFocus
  />
);

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${loginImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#2B525A',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: '#0b99a1',
    margin: theme.spacing(3, 0, 2),
    '&:hover': {
      backgroundColor: '#1A8783',
    },
  },
}));

const Auth = () => {
  const classes = useStyles();
  const [authStatus, setAuthStatus] = useState('Sign in');

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {authStatus === 'Forgot' ? 'Forgot password' : authStatus}
          </Typography>
          <form className={classes.form} noValidate>
            {authStatus === 'Sign in' && <LoginFields />}
            {authStatus === 'Sign up' && <RegisterFields />}
            {authStatus === 'Forgot' && <ForgotFields />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {authStatus === 'Forgot' ? 'Send email' : authStatus}
            </Button>
            <Grid container>
              {authStatus !== 'Forgot' && (
                <Grid item xs>
                  <Link onClick={() => setAuthStatus('Forgot')} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              )}
              <Grid item>
                <Link
                  onClick={() =>
                    setAuthStatus(
                      authStatus === 'Sign in' ? 'Sign up' : 'Sign in'
                    )
                  }
                  variant="body2"
                >
                  {authStatus === 'Sign in' && "Don't have an account? Sign Up"}
                  {authStatus === 'Sign up' &&
                    'Have already an account? Sign In'}
                  {authStatus === 'Forgot' && 'Back to Sign In'}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Auth;
