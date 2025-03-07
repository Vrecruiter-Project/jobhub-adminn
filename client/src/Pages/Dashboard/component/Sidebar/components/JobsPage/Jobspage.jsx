import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box, InputAdornment,
  TextField,
  styled,
  tableCellClasses,
  CircularProgress,
} from "@mui/material";
import * as XLSX from "xlsx";
import { JOBHUB_BASE_URL } from "../../../../../../api/api";
import ShimmerEffect from "../../../../../../../utils/Shimmer";
import useOnline from "../../../../../../../utils/useOnline";
import Btn from "../../../Button/Btnn";
import SearchIcon from "@mui/icons-material/Search";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4CAF50",
    color: theme.palette.common.white,
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: "16px",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "12px",
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const Job = ({ count, jobTitle, jobRole, numberOfPosition, companyName, jobLocation, experience, salary, english }) => (
  <StyledTableRow>
    <StyledTableCell>{count}</StyledTableCell>
    <StyledTableCell>{jobTitle}</StyledTableCell>
    <StyledTableCell>{jobRole}</StyledTableCell>
    <StyledTableCell>{numberOfPosition}</StyledTableCell>
    <StyledTableCell>{companyName}</StyledTableCell>
    <StyledTableCell>{jobLocation}</StyledTableCell>
    <StyledTableCell>{experience}</StyledTableCell>
    <StyledTableCell>{salary}</StyledTableCell>
    <StyledTableCell>{english}</StyledTableCell>
  </StyledTableRow>
);

Job.propTypes = {
  count: PropTypes.number.isRequired,
  jobTitle: PropTypes.string.isRequired,
  jobRole: PropTypes.string.isRequired,
  numberOfPosition: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  jobLocation: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  english: PropTypes.string.isRequired,
};

const JobsPage = () => {
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCompanyData() {
      try {
        const response = await fetch(`${JOBHUB_BASE_URL}/v1/admins/alljobs`);
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const json = await response.json();
        setJobList(json.jobs || []);
      } catch (error) {
        console.error(error);
        alert("Failed to load data, please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getCompanyData();
  }, []);

  const off = useOnline();
  if (!off) return <h1>You are Offline, please connect to the internet!</h1>;

  const handleDownloadExcel = () => {
    if (jobList.length === 0) {
      alert("No data available to download.");
      return;
    }
    const data = jobList.map((job, index) => ({
      S_No: index + 1,
      Job_Title: job.jobTitle,
      Job_Role: job.jobRole,
      Positions: job.numberOfPosition,
      Company: job.companyName,
      Location: job.jobLocation,
      Experience: job.experience,
      Salary: job.salary,
      English: job.english,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");
    XLSX.writeFile(workbook, "JobsData.xlsx");
  };

  const filteredJobs = useMemo(() => {
    return jobList.filter((job) =>
      Object.values(job).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, jobList]);

  return (
    <div style={{ padding: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
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
        <Btn text="Download Excel" click={handleDownloadExcel} />
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>S_No</StyledTableCell>
              <StyledTableCell>Job Title</StyledTableCell>
              <StyledTableCell>Position</StyledTableCell>
              <StyledTableCell>No.of Position</StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Experience</StyledTableCell>
              <StyledTableCell>Salary</StyledTableCell>
              <StyledTableCell>English</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <h3>No results found</h3>
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job, index) => <Job key={index} count={index + 1} {...job} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default JobsPage;