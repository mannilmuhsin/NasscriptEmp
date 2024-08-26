import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import axios from 'axios';

const Reports = () => {
  const [reportType, setReportType] = useState('');
  const [reportData, setReportData] = useState([]);

  const reportTypes = [
    { value: 'idExpiry', label: 'Employee ID Expiry Details' },
    { value: 'passportExpiry', label: 'Employee Passport Expiry' },
    { value: 'medicalExpiry', label: 'Employee Medical Expiry' },
    { value: 'vacation', label: 'Employee Vacation' },
    { value: 'branchWise', label: 'Branch Wise Employee' },
    { value: 'designationWise', label: 'Designation Wise Employee' },
    { value: 'gatePass', label: 'Employee Gate Pass' },
  ];

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const fetchReportData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reports/${reportType}`);
      setReportData(res.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
      alert('Error fetching report data');
    }
  };

  useEffect(() => {
    if (reportType) {
      fetchReportData();
    }
  }, [reportType]);

  return (
    <div className="p-4">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Report Type"
            value={reportType}
            onChange={handleReportTypeChange}
          >
            {reportTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          {reportData.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {Object.keys(reportData[0]).map((key) => (
                      <TableCell key={key}>{key}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.map((row, index) => (
                    <TableRow key={index}>
                      {Object.values(row).map((value, i) => (
                        <TableCell key={i}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Reports;