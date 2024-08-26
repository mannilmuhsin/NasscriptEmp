import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Modal, } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from 'axios';

const LeaveVacation = () => {
  const [employees, setEmployees] = useState([]);
  const [leave, setLeave] = useState({
    employee: '',
    leaveStartDate: null,
    leaveEndDate: null,
    leaveDays: 0
  });
  const [leaveVacations, setLeaveVacations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get('http://localhost:5000/api/employees');
      setEmployees(res.data.employees);
    };

    const fetchLeaveVacations = async () => {
      const res = await axios.get('http://localhost:5000/api/leave-vacations');
      setLeaveVacations(res.data);
    };

    fetchEmployees();
    fetchLeaveVacations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name) => (date) => {
    setLeave(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const calculateLeaveDays = () => {
    if (leave.leaveStartDate && leave.leaveEndDate) {
      const diffTime = Math.abs(new Date(leave.leaveEndDate) - new Date(leave.leaveStartDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setLeave(prev => ({
        ...prev,
        leaveDays: diffDays
      }));
    }
  };

  useEffect(() => {
    calculateLeaveDays();
  }, [leave.leaveStartDate, leave.leaveEndDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/leave-vacations', leave);
      alert('Leave vacation created successfully');
      setOpen(false);
      // Fetch updated leave vacations list
      const res = await axios.get('http://localhost:5000/api/leave-vacations');
      setLeaveVacations(res.data);
    } catch (error) {
      console.error('Error creating leave vacation:', error);
      alert('Error creating leave vacation');
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="p-4">
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Leave Vacation
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
          <Typography variant="h6" gutterBottom>Create Leave Vacation</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Employee"
                  name="employee"
                  value={leave.employee}
                  onChange={handleChange}
                >
                  {employees.map((employee) => (
                    <MenuItem key={employee._id} value={employee._id}>
                      {employee.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  fullWidth
                  label="Leave Start Date"
                  value={leave.leaveStartDate}
                  onChange={handleDateChange('leaveStartDate')}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  fullWidth
                  label="Leave End Date"
                  value={leave.leaveEndDate}
                  onChange={handleDateChange('leaveEndDate')}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Leave Days"
                  name="leaveDays"
                  value={leave.leaveDays}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit Leave Vacation
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Box mt={4}>
      <Typography variant="h6" gutterBottom>Leave Vacations List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Arrived Date</TableCell>
              <TableCell>Leave Date</TableCell>
              <TableCell>Leave Days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveVacations.map((lv) => (
              <TableRow key={lv._id}>
                <TableCell>{lv.employee.name}</TableCell>
                <TableCell>{lv.employee.idNo}</TableCell>
                <TableCell>{lv.employee.designation}</TableCell>
                <TableCell>{lv.employee.workingBranch}</TableCell>
                <TableCell>{new Date(lv.employee.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(lv.employee.arrivedDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {new Date(lv.leaveStartDate).toLocaleDateString()} - {new Date(lv.leaveEndDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{lv.leaveDays}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </div>
  );
};

export default LeaveVacation;
