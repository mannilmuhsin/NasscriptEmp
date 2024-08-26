import React from 'react';
import { Typography, Box } from '@material-ui/core';

const Footer = () => {
  return (
    <Box component="footer" bgcolor="text.secondary" color="white" py={2} textAlign="center">
      <Typography variant="body2">
        © {new Date().getFullYear()} Employee Management System. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;