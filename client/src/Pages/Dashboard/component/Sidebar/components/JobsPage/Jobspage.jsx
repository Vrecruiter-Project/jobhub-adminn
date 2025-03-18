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
  Box,
  InputAdornment,
  TextField,
  styled,
  tableCellClasses,
  CircularProgress,
  Button,
} from "@mui/material";
import * as XLSX from "xlsx";
import { JOBHUB_BASE_URL } from "../../../../../../api/api";
import useOnline from "../../../../../../../utils/useOnline";
import Btn from "../../../Button/Btnn";
import SearchIcon from "@mui/icons-material/Search";
import { NotFound } from "../../../../../../../utils/Error";
import Addjob from "../../../../../Form/Addjob";
import BasicModal from "../../../Model/Model";
import { Modal, Typography } from "@mui/material";
import CandidateModal from "../../../../../Form/AppliedCandidate";
// Utility function to capitalize first letter of each word
const capitalizeWords = (str) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

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
const Job = ({ count, jobTitle, jobRole, numberOfPosition, companyName, jobLocation, experience, salary, english, students }) => {
  const [isEnroll, setIsEnroll] = useState(students);
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State to track selected item

  // Function to handle opening the modal
  const handleOpenModal = (item) => {
    setSelectedItem(item); // Set the selected item
    setOpenModal(true); // Open the modal
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedItem(null); // Clear the selected item
  };

  return (
    <>
      <StyledTableRow>
        <StyledTableCell>{count}</StyledTableCell>
        <StyledTableCell>{capitalizeWords(jobTitle)}</StyledTableCell>
        <StyledTableCell>{capitalizeWords(jobRole)}</StyledTableCell>
        <StyledTableCell>{numberOfPosition}</StyledTableCell>
        <StyledTableCell>{capitalizeWords(companyName)}</StyledTableCell>
        <StyledTableCell>{capitalizeWords(jobLocation)}</StyledTableCell>
        <StyledTableCell>{capitalizeWords(experience)}</StyledTableCell>
        <StyledTableCell>{salary}</StyledTableCell>
        <StyledTableCell>{capitalizeWords(english)}</StyledTableCell>
        <StyledTableCell>
          <Button variant="contained" style={{ backgroundColor: "#4caf50" }} size="small">
            Edit
          </Button>
        </StyledTableCell>
        <StyledTableCell>
          <Button variant="contained" style={{ backgroundColor: "#4caf50" }} size="small">
            Delete
          </Button>
        </StyledTableCell>
        <StyledTableCell>
          {isEnroll.length === 0 ? "No data" :
            isEnroll.map((item, index) => (
            <Button
              key={index}
              variant="contained"
              style={{ backgroundColor: "#4caf50", margin: "2px" }}
              size="small"
              onClick={() => handleOpenModal(item)} // Open modal on button click
            >
              Applied
            </Button>
          ))}
        </StyledTableCell>
      </StyledTableRow>

      <CandidateModal
        open={openModal}
        onClose={handleCloseModal}
        selectedItem={selectedItem}
      />
    </>
  );
};

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
  students:PropTypes.string.isRequired,
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
      Job_Title: capitalizeWords(job.jobTitle),
      Job_Role: capitalizeWords(job.jobRole),
      Positions: job.numberOfPosition,
      Company: capitalizeWords(job.companyName),
      Location: capitalizeWords(job.jobLocation),
      Experience: capitalizeWords(job.experience),
      Salary: job.salary,
      English: capitalizeWords(job.english),
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
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "300px" }}
        />
        <Box sx={{ display: "flex", gap: "10px" }}>
          <BasicModal btn={<Btn text="Add Data"/>} form={<Addjob/>}/>
          <Btn text="Download Excel" click={handleDownloadExcel} />
          
        </Box>
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
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
              <StyledTableCell>Applied Candidate</StyledTableCell>
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
                  <NotFound />
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
