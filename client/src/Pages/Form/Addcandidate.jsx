import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { JOBHUB_BASE_URL } from "../../api/api";

const registerCandidate = async (formData) => {
  try {
    const response = await axios.post(
      `${JOBHUB_BASE_URL}/candidates/registercandidate`,
      formData,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_API_SECRET_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "An unexpected error occurred";
  }
};

const RegistrationPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    jobprofile: "",
    dob: "",
    number: "",
    qualification: "",
    gender: "",
    address: "",
    // remark:"",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerCandidate(formData);
      alert("Registration Successful!");
    } catch (error) {
      alert(error.message || "Registration failed.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#f4f4f4",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: "10px",
          backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "white",
          padding: "40px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography
          sx={{ mb: 3, color: theme.palette.text.primary }}
          variant="h5"
          component="h1"
          fontWeight="bold"
          textAlign="center"
        >
          Candidate Registration Form
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {["fullname", "email", "jobprofile", "dob", "number", "qualification", "address"].map((field) => (
            <Box sx={{ mb: 3 }} key={field}>
              <TextField
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                type={field === "dob" ? "date" : "text"}
                variant="outlined"
                value={formData[field]}
                onChange={handleInputChange}
                required
                InputLabelProps={field === "dob" ? { shrink: true } : {}}
                sx={{
                  input: {
                    color: theme.palette.text.primary,
                  },
                  label: {
                    color: theme.palette.text.secondary,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>
          ))}

          <Box sx={{ mb: 3 }}>
            <Select
              fullWidth
              displayEmpty
              variant="outlined"
              value={formData.gender}
              onChange={handleSelectChange}
              name="gender"
              required
              sx={{
                color: theme.palette.text.primary,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Gender
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ width: "100%", mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default RegistrationPage;
