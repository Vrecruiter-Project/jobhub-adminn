import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  Typography,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { JOBHUB_BASE_URL } from "../../api/api";
const JobForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobRole: "",
    numberOfPosition: "",
    jobType: "",
    workType: "",
    salary: "",
    benefits: [],
    jobLocation: "",
    ExpireJob: "",
    education: "",
    english: "",
    experience: "",
    gender: "",
    age: "",
    description: "",
    interviewMode: "",
    communication: "",
  });


  // Dropdown options
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const workTypes = ["On-site", "Remote", "Hybrid"];
  const educationLevels = ["High School", "Diploma", "Bachelor's", "Master's"];
  const englishLevels = ["Beginner", "Intermediate", "Advanced"];
  const experienceLevels = ["Fresher", "1-2 years", "3-5 years", "5+ years"];
  const genders = ["Male", "Female", "Any"];
  const interviewModes = ["Online", "Offline", "Hybrid"];
  const communicationLevels = ["Basic", "Good", "Excellent"];
  const benefitsOptions = [
    "Health Insurance",
    "Paid Time Off",
    "Remote Work",
    "Bonuses",
    "Retirement Plan",
  ];

  // Handle changes for input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle changes for multi-select dropdown
  const handleMultiSelectChange = (e) => {
    setFormData({ ...formData, benefits: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${JOBHUB_BASE_URL}/v1/jobs/create-job-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobDetails: formData }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: 4,
        boxShadow: 3,
        borderRadius: 3,
      }}
    >
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Create Job
      </Typography>

      {/* Text Inputs */}
      {[
        { label: "Company Name", name: "companyName", type: "text" },
        { label: "Job Title", name: "jobTitle", type: "text" },
        { label: "Job Role", name: "jobRole", type: "text" },
        { label: "Number of Positions", name: "numberOfPosition", type: "number" },
        { label: "Salary", name: "salary", type: "number" },
        { label: "Job Location", name: "jobLocation", type: "text" },
        { label: "Age Requirement", name: "age", type: "number" },
      ].map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          variant="outlined"
          type={field.type}
        />
      ))}

      {/* Dropdown Inputs */}
      {[
        { label: "Job Type", name: "jobType", options: jobTypes },
        { label: "Work Type", name: "workType", options: workTypes },
        { label: "Education Level", name: "education", options: educationLevels },
        { label: "English Level", name: "english", options: englishLevels },
        { label: "Experience Level", name: "experience", options: experienceLevels },
        { label: "Gender", name: "gender", options: genders },
        { label: "Interview Mode", name: "interviewMode", options: interviewModes },
        { label: "Communication Level", name: "communication", options: communicationLevels },
      ].map((field) => (
        <FormControl key={field.name} fullWidth margin="normal">
          <InputLabel>{field.label}</InputLabel>
          <Select
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required
          >
            {field.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}

      {/* Benefits (Multi-Select Dropdown) */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Benefits (Select up to 5)</InputLabel>
        <Select
          multiple
          value={formData.benefits}
          onChange={handleMultiSelectChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(", ")}
        >
          {benefitsOptions.map((benefit) => (
            <MenuItem key={benefit} value={benefit}>
              <Checkbox checked={formData.benefits.includes(benefit)} />
              <ListItemText primary={benefit} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Job Expiry Date */}
      <TextField
        label="Job Expiry Date"
        type="date"
        name="ExpireJob"
        value={formData.ExpireJob}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      {/* Job Description */}
      <TextField
        label="Job Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Submit Job
      </Button>
    </Box>
  );
};

export default JobForm;
