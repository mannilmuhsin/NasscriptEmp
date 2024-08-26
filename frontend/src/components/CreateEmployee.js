import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const UploadSection = ({ getRootProps, getInputProps, fileName, label }) => (
  <Paper
    elevation={3}
    {...getRootProps()}
    style={{
      border: "2px dashed #3f51b5",
      borderRadius: "8px",
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
      marginBottom: "20px",
    }}
  >
    <input {...getInputProps()} />
    <IconButton color="primary" component="span">
      <CloudUploadIcon style={{ fontSize: 50 }} />
    </IconButton>
    <Typography variant="h6" color="textSecondary">
      {fileName
        ? fileName
        : `Drag & drop ${label} here, or click to select file`}
    </Typography>
  </Paper>
);

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
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
    profilePhoto: null,
    passportPhoto: null,
    idPhoto: null,
    medicalPhoto: null,
    gatePassPhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name) => (date) => {
    setEmployee((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleFileDrop = (name) => (acceptedFiles) => {
    setEmployee((prev) => ({
      ...prev,
      [name]: acceptedFiles[0],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in employee) {
      if (key === "status") continue; // Skip nested objects
      if (
        !employee[key] &&
        key !== "passportExpiry" &&
        key !== "visaExpiry" &&
        key !== "medicalExpiry" &&
        key !== "gatePassExpiry" &&
        key !== "joinDate" &&
        key !== "arrivedDate"
      ) {
        newErrors[key] = "This field is required";
      }
    }
    if (!employee.profilePhoto)
      newErrors.profilePhoto = "Profile photo is required";
    if (!employee.passportPhoto)
      newErrors.passportPhoto = "Passport photo is required";
    if (!employee.idPhoto) newErrors.idPhoto = "ID photo is required";
    if (!employee.medicalPhoto)
      newErrors.medicalPhoto = "Medical photo is required";
    if (!employee.gatePassPhoto)
      newErrors.gatePassPhoto = "Gate pass photo is required";

    setErrors(newErrors);
    setFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    if (!formValid) return;

    const formData = new FormData();
    for (const key in employee) {
      if (employee[key] instanceof Date) {
        formData.append(key, employee[key].toISOString());
      } else {
        formData.append(key, employee[key]);
      }
    }
    try {
      await axios.post("http://localhost:5000/api/employees", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Employee created successfully");
      // Reset form or redirect
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Error creating employee");
    }
  };

  const {
    getRootProps: getProfileRootProps,
    getInputProps: getProfileInputProps,
  } = useDropzone({
    onDrop: handleFileDrop("profilePhoto"),
    accept: "image/*",
  });

  const {
    getRootProps: getPassportRootProps,
    getInputProps: getPassportInputProps,
  } = useDropzone({
    onDrop: handleFileDrop("passportPhoto"),
    accept: "image/*",
  });

  const { getRootProps: getIdRootProps, getInputProps: getIdInputProps } =
    useDropzone({
      onDrop: handleFileDrop("idPhoto"),
      accept: "image/*",
    });

  const {
    getRootProps: getMedicalRootProps,
    getInputProps: getMedicalInputProps,
  } = useDropzone({
    onDrop: handleFileDrop("medicalPhoto"),
    accept: "image/*",
  });

  const {
    getRootProps: getGatePassRootProps,
    getInputProps: getGatePassInputProps,
  } = useDropzone({
    onDrop: handleFileDrop("gatePassPhoto"),
    accept: "image/*",
  });

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="SL No"
            name="slNo"
            value={employee.slNo}
            onChange={handleChange}
            error={!!errors.slNo}
            helperText={errors.slNo}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="File No"
            name="fileNo"
            value={employee.fileNo}
            onChange={handleChange}
            error={!!errors.fileNo}
            helperText={errors.fileNo}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nation"
            name="nation"
            value={employee.nation}
            onChange={handleChange}
            error={!!errors.nation}
            helperText={errors.nation}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Passport No"
            name="passportNo"
            value={employee.passportNo}
            onChange={handleChange}
            error={!!errors.passportNo}
            helperText={errors.passportNo}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Designation"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            error={!!errors.designation}
            helperText={errors.designation}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ID No"
            name="idNo"
            value={employee.idNo}
            onChange={handleChange}
            error={!!errors.idNo}
            helperText={errors.idNo}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Working Branch"
            name="workingBranch"
            value={employee.workingBranch}
            onChange={handleChange}
            error={!!errors.workingBranch}
            helperText={errors.workingBranch}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Contact"
            name="contact"
            value={employee.contact}
            onChange={handleChange}
            error={!!errors.contact}
            helperText={errors.contact}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Home Address"
            name="homeAddress"
            value={employee.homeAddress}
            onChange={handleChange}
            error={!!errors.homeAddress}
            helperText={errors.homeAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Contract"
            name="contract"
            value={employee.contract}
            onChange={handleChange}
            error={!!errors.contract}
            helperText={errors.contract}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Passport Expiry"
            value={employee.passportExpiry}
            onChange={handleDateChange("passportExpiry")}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!errors.passportExpiry}
                helperText={errors.passportExpiry}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Visa Expiry"
            value={employee.visaExpiry}
            onChange={handleDateChange("visaExpiry")}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!errors.visaExpiry}
                helperText={errors.visaExpiry}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Medical Expiry"
            value={employee.medicalExpiry}
            onChange={handleDateChange("medicalExpiry")}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!errors.medicalExpiry}
                helperText={errors.medicalExpiry}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Gate Pass Expiry"
            value={employee.gatePassExpiry}
            onChange={handleDateChange("gatePassExpiry")}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!errors.gatePassExpiry}
                helperText={errors.gatePassExpiry}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Join Date"
            value={employee.joinDate}
            onChange={handleDateChange("joinDate")}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!errors.joinDate}
                helperText={errors.joinDate}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Arrived Date"
            value={employee.arrivedDate}
            onChange={handleDateChange("arrivedDate")}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!errors.arrivedDate}
                helperText={errors.arrivedDate}
              />
            )}
          />
        </Grid>

        {/* Drag and drop sections */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Upload Photos
            </Typography>
            <UploadSection
              getRootProps={getProfileRootProps}
              getInputProps={getProfileInputProps}
              fileName={employee.profilePhoto ? employee.profilePhoto.name : ""}
              label="Profile Photo"
            />
            <UploadSection
              getRootProps={getPassportRootProps}
              getInputProps={getPassportInputProps}
              fileName={
                employee.passportPhoto ? employee.passportPhoto.name : ""
              }
              label="Passport Photo"
            />
            <UploadSection
              getRootProps={getIdRootProps}
              getInputProps={getIdInputProps}
              fileName={employee.idPhoto ? employee.idPhoto.name : ""}
              label="ID Photo"
            />
            <UploadSection
              getRootProps={getMedicalRootProps}
              getInputProps={getMedicalInputProps}
              fileName={employee.medicalPhoto ? employee.medicalPhoto.name : ""}
              label="Medical Photo"
            />
            <UploadSection
              getRootProps={getGatePassRootProps}
              getInputProps={getGatePassInputProps}
              fileName={
                employee.gatePassPhoto ? employee.gatePassPhoto.name : ""
              }
              label="Gate Pass Photo"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateEmployee;
