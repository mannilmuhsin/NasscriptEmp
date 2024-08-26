import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const EditEmployee = () => {
  const { id } = useParams(); // Get employeeId from URL parameters
  const [employee, setEmployee] = useState(null);
  // const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
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
        const response = await axios.get(
          `http://localhost:5000/api/employees/${id}`
        );
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

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);

  const handleOpenStatus = () => setOpenStatus(true);
  const handleCloseStatus = () => setOpenStatus(false);

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

  // const handleUpdate = async () => {
  //   try {
  //     await axios.put(`http://localhost:5000/api/employees/${id}`, formData);
  //     setEmployee(formData); // Update displayed data after successful update
  //     handleClose();
  //   } catch (error) {
  //     console.error("Error updating employee data", error);
  //   }
  // };
  const handleUpdateDetails = async () => {
    try {
      const updatedDetails = {
        ...formData,
        status: employee.status, // Preserve original status
      };
      await axios.put(
        `http://localhost:5000/api/employees/${id}`,
        updatedDetails
      );
      setEmployee(updatedDetails); // Update displayed data after successful update
      handleCloseDetails();
    } catch (error) {
      console.error("Error updating employee details", error);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const updatedStatus = {
        status: formData.status,
      };
      await axios.put(
        `http://localhost:5000/api/employees/${id}`,
        updatedStatus
      );
      setEmployee((prevData) => ({
        ...prevData,
        status: updatedStatus.status,
      })); // Update status after successful update
      handleCloseStatus();
    } catch (error) {
      console.error("Error updating employee status", error);
    }
  };

  if (!employee) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ maxWidth: 800, margin: "auto" }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Avatar
                alt={employee.name}
                src={employee.profilePhoto || "/default-profile.png"}
                sx={{ width: 150, height: 150, margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" gutterBottom>
                {employee.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Designation:</strong> {employee.designation}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Branch:</strong> {employee.workingBranch}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Contact:</strong> {employee.contact}
              </Typography>
              {/* <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2 }}>
                Update Details
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenDetails}
                sx={{ mt: 2 }}
              >
                Update Details
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpenStatus}
                sx={{ mt: 2, ml: 2 }}
              >
                Update Status
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>SL No:</strong> {employee.slNo}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>ID No:</strong> {employee.idNo}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>File No:</strong> {employee.fileNo}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Contract:</strong> {employee.contract}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Passport No:</strong> {employee.passportNo}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Passport Expiry:</strong>{" "}
                {new Date(employee.passportExpiry).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Visa Expiry:</strong>{" "}
                {new Date(employee.visaExpiry).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Medical Expiry:</strong>{" "}
                {new Date(employee.medicalExpiry).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>gatePass Expiry:</strong>{" "}
                {new Date(employee.gatePassExpiry).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Join Date:</strong>{" "}
                {new Date(employee.joinDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Arrived Date:</strong>{" "}
                {new Date(employee.arrivedDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Nation:</strong> {employee.nation}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                <strong>Home Address:</strong> {employee.homeAddress}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Status Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>VP Number:</strong> {employee.status.vpNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Visa Number:</strong> {employee.status.visaNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Medical:</strong> {employee.status.medical}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Visa Printing:</strong> {employee.status.visaPrinting}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>ID Printing:</strong> {employee.status.idPrinting}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Food Medical:</strong> {employee.status.foodMedical}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Modal for updating general details */}
      <Dialog open={openDetails} onClose={handleCloseDetails}>
        <DialogTitle>Update Employee Details</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="slNo"
            label="SL No"
            fullWidth
            variant="outlined"
            value={formData.slNo}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="fileNo"
            label="File No"
            fullWidth
            variant="outlined"
            value={formData.fileNo}
            onChange={handleChange}
          />
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
          <TextField
            margin="dense"
            name="passportNo"
            label="Passport No"
            fullWidth
            variant="outlined"
            value={formData.passportNo}
            onChange={handleChange}
          />
          <DatePicker
            label="Passport Expiry"
            value={formData.passportExpiry}
            onChange={(date) =>
              setFormData({ ...formData, passportExpiry: date })
            }
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="dense" />
            )}
          />
          <TextField
            margin="dense"
            name="designation"
            label="Designation"
            fullWidth
            variant="outlined"
            value={formData.designation}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="idNo"
            label="ID No"
            fullWidth
            variant="outlined"
            value={formData.idNo}
            onChange={handleChange}
          />
          <DatePicker
            label="Visa Expiry"
            value={formData.visaExpiry}
            onChange={(date) => setFormData({ ...formData, visaExpiry: date })}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="dense" />
            )}
          />
          <DatePicker
            label="Medical Expiry"
            value={formData.medicalExpiry}
            onChange={(date) =>
              setFormData({ ...formData, medicalExpiry: date })
            }
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="dense" />
            )}
          />
          <DatePicker
            label="Gate Pass Expiry"
            value={formData.gatePassExpiry}
            onChange={(date) =>
              setFormData({ ...formData, gatePassExpiry: date })
            }
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="dense" />
            )}
          />
          <TextField
            margin="dense"
            name="workingBranch"
            label="Working Branch"
            fullWidth
            variant="outlined"
            value={formData.workingBranch}
            onChange={handleChange}
          />
          <DatePicker
            label="Join Date"
            value={formData.joinDate}
            onChange={(date) => setFormData({ ...formData, joinDate: date })}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="dense" />
            )}
          />
          <DatePicker
            label="Arrived Date"
            value={formData.arrivedDate}
            onChange={(date) => setFormData({ ...formData, arrivedDate: date })}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="dense" />
            )}
          />
          <TextField
            margin="dense"
            name="contact"
            label="Contact"
            fullWidth
            variant="outlined"
            value={formData.contact}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="homeAddress"
            label="Home Address"
            fullWidth
            variant="outlined"
            value={formData.homeAddress}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="contract"
            label="Contract"
            fullWidth
            variant="outlined"
            value={formData.contract}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateDetails} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for updating status */}
      <Dialog open={openStatus} onClose={handleCloseStatus}>
        <DialogTitle>Update Employee Status</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="vpNumber"
            label="VP Number"
            fullWidth
            variant="outlined"
            value={formData.status.vpNumber}
            onChange={handleStatusChange}
          />
          <TextField
            margin="dense"
            name="visaNumber"
            label="Visa Number"
            fullWidth
            variant="outlined"
            value={formData.status.visaNumber}
            onChange={handleStatusChange}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Medical Status</InputLabel>
            <Select
              name="medical"
              value={formData.status.medical}
              onChange={handleStatusChange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="complete">Complete</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Visa Printing Status</InputLabel>
            <Select
              name="visaPrinting"
              value={formData.status.visaPrinting}
              onChange={handleStatusChange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="complete">Complete</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>ID Printing Status</InputLabel>
            <Select
              name="idPrinting"
              value={formData.status.idPrinting}
              onChange={handleStatusChange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="complete">Complete</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Food Medical Status</InputLabel>
            <Select
              name="foodMedical"
              value={formData.status.foodMedical}
              onChange={handleStatusChange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="complete">Complete</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatus} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateStatus} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditEmployee;
