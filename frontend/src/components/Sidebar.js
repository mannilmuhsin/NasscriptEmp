import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AssessmentIcon from '@material-ui/icons/Assessment';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/' },
    { text: 'Create Employee', icon: <AddIcon />, path: '/create' },
    { text: 'Leave Vacation', icon: <EventNoteIcon />, path: '/leave' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
  ];

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleSidebar} >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleSidebar}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;