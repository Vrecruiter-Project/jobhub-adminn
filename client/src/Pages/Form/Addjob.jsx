import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const JobForm = () => {
  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    jobTitle: "",
    jobRole: "",
    numberOfPosition: "",
    jobType: "",
    workType: "",
    salary: "",
    benefits: "",
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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Convert benefits to an array
    const formattedJobDetails = {
      ...jobDetails,
      benefits: jobDetails.benefits.split(",").map((b) => b.trim()),
    };

    try {
      const response = await fetch(
        "https://jobhub-project-official-1.onrender.com/api/v1/jobs/create-job-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobDetails: formattedJobDetails }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Job created successfully!");
        setJobDetails({
          companyName: "",
          jobTitle: "",
          jobRole: "",
          numberOfPosition: "",
          jobType: "",
          workType: "",
          salary: "",
          benefits: "",
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
      } else {
        setMessage(data.message || "Failed to create job.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // MUI Dark/Light Theme
  const theme = createTheme({
    palette: {
      mode: "dark", // or 'light'
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        component={Paper}
        sx={{
          maxWidth: "800px",
          margin: "auto",
          padding: "24px",
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create a New Job
        </Typography>
        {message && (
          <Typography color={message.includes("success") ? "success.main" : "error.main"}>
            {message}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            <TextField
              name="companyName"
              label="Company Name"
              value={jobDetails.companyName}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="jobTitle"
              label="Job Title"
              value={jobDetails.jobTitle}
              onChange={handleChange}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Job Role</InputLabel>
              <Select
                name="jobRole"
                value={jobDetails.jobRole}
                onChange={handleChange}
                required
              >
                <MenuItem value="">Job Role</MenuItem>
                <MenuItem value="telecaller">TeleCaller</MenuItem>
                <MenuItem value="document-verification">Document-Verification</MenuItem>
                <MenuItem value="data-entry">Data_Entry</MenuItem>
                <MenuItem value="web-designer">Web-Designer</MenuItem>
                <MenuItem value="graphic-designer">Graphic-Designer</MenuItem>
                <MenuItem value="web-developer">Web-Developer</MenuItem>
                <MenuItem value="construction">Construction</MenuItem>
                <MenuItem value="front-office">Front-Office</MenuItem>
                <MenuItem value="back-office">Back-Office</MenuItem>
                <MenuItem value="house-keeping">House-Keeping</MenuItem>
                <MenuItem value="delivery">Delivery</MenuItem>
                <MenuItem value="security-guard">Security-Guard</MenuItem>
                <MenuItem value="hotel-staff">Hotel-Staff</MenuItem>
                <MenuItem value="warehouse-staff">Ware-House-Staff</MenuItem>
                <MenuItem value="factory-workers">Factory-Workers</MenuItem>
                <MenuItem value="digital-marketing">Digital-Marketing</MenuItem>
                <MenuItem value="content-writing">Content Writing</MenuItem>
                <MenuItem value="seo">Seo (Search Engine Optimization)</MenuItem>
                <MenuItem value="video-editing">Video-Editing</MenuItem>
                <MenuItem value="photography">Photography</MenuItem>
                <MenuItem value="photo-editing">Photo Editing</MenuItem>
                <MenuItem value="accounting">Accounting</MenuItem>
                <MenuItem value="hr">HR (Human Resources)</MenuItem>
                <MenuItem value="electrical">Electrical</MenuItem>
                <MenuItem value="plumbing">Plumbing</MenuItem>
                <MenuItem value="mechanical">Mechanical</MenuItem>
                <MenuItem value="technical">Technical</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="numberOfPosition"
              label="Number of Positions"
              value={jobDetails.numberOfPosition}
              onChange={handleChange}
              type="number"
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select
                name="jobType"
                value={jobDetails.jobType}
                onChange={handleChange}
                required
              >
                <MenuItem value="">Job Type</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time/Full-time">Part-time/Full-time</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Work Type</InputLabel>
              <Select
                name="workType"
                value={jobDetails.workType}
                onChange={handleChange}
                required
              >
                <MenuItem value="">Work Type</MenuItem>
                <MenuItem value="work-from-office">Work-From-Office</MenuItem>
                <MenuItem value="work-from-home">Work-From-Home</MenuItem>
                <MenuItem value="work-from-office-home">Work-From-Office/Work-From-Home</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="salary"
              label="Salary"
              value={jobDetails.salary}
              onChange={handleChange}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Benefits</InputLabel>
              <Select
                name="benefits"
                value={jobDetails.benefits}
                onChange={handleChange}
                required
              >
                <MenuItem value="">Benefits (comma separated)</MenuItem>
                <MenuItem value="Health Insurance">Health Insurance</MenuItem>
                <MenuItem value="Retirement Plans">Retirement Plans</MenuItem>
                <MenuItem value="Paid Time Off">Paid Time Off</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="jobLocation"
              label="Job Location"
              value={jobDetails.jobLocation}
              onChange={handleChange}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Education Requirement</InputLabel>
              <Select
                name="education"
                value={jobDetails.education}
                onChange={handleChange}
                required
              >
                <MenuItem value="">Education Requirement</MenuItem>
                <MenuItem value="10th">10th</MenuItem>
                <MenuItem value="12th">12th</MenuItem>
                <MenuItem value="masters">Masters</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="english"
              label="English Requirement"
              value={jobDetails.english}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="experience"
              label="Experience"
              value={jobDetails.experience}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="gender"
              label="Gender Requirement"
              value={jobDetails.gender}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="age"
              label="Age Requirement"
              value={jobDetails.age}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="description"
              label="Job Description"
              value={jobDetails.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
              fullWidth
              sx={{ gridColumn: "1 / -1" }}
            />
            <TextField
              name="interviewMode"
              label="Interview Mode"
              value={jobDetails.interviewMode}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="communication"
              label="Communication Requirement"
              value={jobDetails.communication}
              onChange={handleChange}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ gridColumn: "1 / -1", mt: 2 }}
            >
              {loading ? "Submitting..." : "Create Job"}
            </Button>
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default JobForm;