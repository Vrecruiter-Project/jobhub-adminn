import React from 'react'
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
export default function Search() {
  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: "340px",
          backgroundColor: "#fff",
          transition: "all 0.3s ease-in-out",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            paddingRight: "10px",
            "& fieldset": {
              borderColor: "#4CAF50",
            },
            "&:hover fieldset": {
              borderColor: "#388E3C",
              boxShadow: "0px 0px 6px rgba(56, 142, 60, 0.3)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2E7D32",
              boxShadow: "0px 0px 10px rgba(46, 125, 50, 0.5)",
            },
          },
          "& .MuiInputBase-input": {
            padding: "10px 12px", // Adjusted padding for alignment
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#4CAF50" }} />
            </InputAdornment>
          ),
        }}
      />

    </>
  )
}
