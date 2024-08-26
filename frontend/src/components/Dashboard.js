import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, Grid, Card, CardContent, 
  Typography, TextField, Select, MenuItem, TablePagination, Box 
} from '@material-ui/core';
import axios from 'axios';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    medicalPending: 0,
    visaPrinting: 0,
    idPrinting: 0,
    foodMedical: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    fetchEmployees();
  }, [page, rowsPerPage]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/employees?page=${page + 1}&limit=${rowsPerPage}`);
      setEmployees(res.data.employees);
      setFilteredEmployees(res.data.employees);
      setTotalEmployees(res.data.totalEmployees);
      calculateSummary(res.data.employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    const results = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterBranch === '' || employee.workingBranch === filterBranch)
    );
    setFilteredEmployees(results);
    calculateSummary(results);
  }, [searchTerm, filterBranch, employees]);

  const calculateSummary = (data) => {
    const summary = data.reduce((acc, employee) => {
      acc.total++;
      if (employee.status.medical === 'pending') acc.medicalPending++;
      if (employee.status.visaPrinting === 'pending') acc.visaPrinting++;
      if (employee.status.idPrinting === 'pending') acc.idPrinting++;
      if (employee.status.foodMedical === 'pending') acc.foodMedical++;
      return acc;
    }, { total: 0, medicalPending: 0, visaPrinting: 0, idPrinting: 0, foodMedical: 0 });
    setSummary(summary);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const branches = [...new Set(employees.map(employee => employee.workingBranch))];

  return (
    <Box p={4}>
      <Typography variant="h4" component="h1" gutterBottom className="font-bold">
        Employee Dashboard
      </Typography>
      
      {/* Summary Section */}
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Employees
              </Typography>
              <Typography variant="h5" component="h2">
                {summary.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Medical
              </Typography>
              <Typography variant="h5" component="h2">
                {summary.medicalPending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Visa Printing
              </Typography>
              <Typography variant="h5" component="h2">
                {summary.visaPrinting}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending ID Printing
              </Typography>
              <Typography variant="h5" component="h2">
                {summary.idPrinting}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter Section */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} mb={12}>
          <Select
            fullWidth
            variant="outlined"
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Branches</MenuItem>
            {branches.map((branch) => (
              <MenuItem key={branch} value={branch}>{branch}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      {/* Employee Table Section */}
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>VP Number</TableCell>
                <TableCell>Visa Number</TableCell>
                <TableCell>Medical Status</TableCell>
                <TableCell>Visa Printing</TableCell>
                <TableCell>ID Printing</TableCell>
                <TableCell>Food Medical</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.workingBranch}</TableCell>
                  <TableCell>{employee.status.vpNumber}</TableCell>
                  <TableCell>{employee.status.visaNumber}</TableCell>
                  <TableCell>{employee.status.medical}</TableCell>
                  <TableCell>{employee.status.visaPrinting}</TableCell>
                  <TableCell>{employee.status.idPrinting}</TableCell>
                  <TableCell>{employee.status.foodMedical}</TableCell>
                  <TableCell align="center">
                    <Link to={`/edit/${employee._id}`}>
                      <Button variant="contained" color="primary" size="small">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalEmployees}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Dashboard;
