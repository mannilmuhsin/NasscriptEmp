import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: '#1f2937', // Equivalent to bg-gray-800
  },
  toolbar: {
    minHeight: '80px', // Increase the height of the Toolbar
  },
}));

const Header = ({ toggleSidebar }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Employee Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
