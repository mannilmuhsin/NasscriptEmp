import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams(); // Get employeeId from URL parameters
  const [employee, setEmployee] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    slNo: "",
    fileNo: "",
    name: "",
    nation: "",
    passportNo: "",
    passportExpiry: null,
    designation: "",
    idNo: "",
    visaExpiry: null,
    medicalExpiry: null,
    gatePassExpiry: null,
    workingBranch: "",
    joinDate: null,
    arrivedDate: null,
    contact: "",
    homeAddress: "",
    contract: "",
    status: {
      vpNumber: "",
      visaNumber: "",
      medical: "pending",
      visaPrinting: "pending",
      idPrinting: "pending",
      foodMedical: "pending",
    },
  });

  useEffect(() => {
    // Fetch employee data by ID
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setEmployee(response.data);
        setFormData({
          slNo: response.data.slNo,
          fileNo: response.data.fileNo,
          name: response.data.name,
          nation: response.data.nation,
          passportNo: response.data.passportNo,
          passportExpiry: response.data.passportExpiry,
          designation: response.data.designation,
          idNo: response.data.idNo,
          visaExpiry: response.data.visaExpiry,
          medicalExpiry: response.data.medicalExpiry,
          gatePassExpiry: response.data.gatePassExpiry,
          workingBranch: response.data.workingBranch,
          joinDate: response.data.joinDate,
          arrivedDate: response.data.arrivedDate,
          contact: response.data.contact,
          homeAddress: response.data.homeAddress,
          contract: response.data.contract,
          status: response.data.status,
        });
      } catch (error) {
        console.error("Error fetching employee data", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      status: {
        ...prevData.status,
        [name]: value,
      },
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, formData);
      setEmployee(formData); // Update displayed data after successful update
      handleClose();
    } catch (error) {
      console.error("Error updating employee data", error);
    }
  };

  if (!employee) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Employee Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>SL No:</strong> {employee.slNo}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>File No:</strong> {employee.fileNo}</Typography>
        </Grid>
        {/* Add more fields as needed */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Update
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Employee</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="nation"
            label="Nation"
            fullWidth
            variant="outlined"
            value={formData.nation}
            onChange={handleChange}
          />
          {/* Add more input fields as needed */}
          <TextField
            margin="dense"
            name="visaPrinting"
            label="Visa Printing Status"
            fullWidth
            variant="outlined"
            value={formData.status.visaPrinting}
            onChange={handleStatusChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditEmployee;
