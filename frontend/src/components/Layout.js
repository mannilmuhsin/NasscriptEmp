import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Box } from '@material-ui/core';
import { Add as AddIcon, EventNote as EventNoteIcon, Assessment as AssessmentIcon, Home as HomeIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/' },
    { text: 'Create Employee', icon: <AddIcon />, path: '/create' },
    { text: 'Leave Vacation', icon: <EventNoteIcon />, path: '/leave' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
  ];

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header toggleSidebar={toggleSidebar} />

      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleSidebar}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Container component="main" style={{ flexGrow: 1, padding: '20px 0' }}>
        {children}
      </Container>

      <Footer />
    </Box>
  );
};

export default Layout;