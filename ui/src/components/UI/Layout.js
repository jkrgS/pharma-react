import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BugReportIcon from '@material-ui/icons/BugReport';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '15px',
  },
  navBar: {
    position: 'static',
    backgroundColor: '#0b99a1',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const LayoutNav = ({ children }) => {
  // get the route location without special characters for breadcrumb usage
  const location = useLocation().pathname.split('/');

  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleLogout = (event) => {
    localStorage.removeItem('token');
    history.push('/authentication');
    handleClose();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.navBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="home"
          >
            <BugReportIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {process.env.REACT_APP_APP_NAME}
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Breadcrumbs style={styles.breadcrumb} aria-label="breadcrumb">
        <Typography className="capitalize" color="textPrimary">
          {location}
        </Typography>
      </Breadcrumbs>
      <div className="siteLayoutContent">{children}</div>
    </div>
  );
};

// local styling
const styles = {
  breadcrumb: {
    margin: '15px',
  },
};

export default LayoutNav;
