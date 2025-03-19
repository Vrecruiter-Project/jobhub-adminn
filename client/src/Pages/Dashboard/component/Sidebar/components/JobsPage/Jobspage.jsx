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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
import { upCompany } from "../CompanyPage/Component/Updatecompany";
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
const Job = ({
  count,
  _id,
  jobTitle,
  jobRole,
  numberOfPosition,
  companyName,
  jobLocation,
  experience,
  salary,
  english,
  students,
}) => {
  const [isEnroll, setIsEnroll] = useState(students);
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State to track selected item
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal visibility
  const [selectedCompany, setSelectedCompany] = useState({
    _id: "",
    count: 0,
    companyName: "",
    jobTitle: "",
    jobRole: "",
    numberOfPosition: 0,
    jobType: "",
    workType: "",
    ExpireJob: "",
    benefits: "",
    salary: "",
    jobLocation: "",
    education: "",
    english: "",
    experience: "",
    gender: "",
    age: "",
    description: "",
    interviewMode: "",
    communication: "",
  });

  // Function to handle opening the modal
  const handleOpenModal = (item) => {
    setSelectedItem(item); 
    setOpenModal(true); 
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false); 
    setSelectedItem(null); 
  };

  // Function to handle opening the edit modal
  const handleEditClick = () => {
    setSelectedCompany({
      _id,
      count,
      companyName,
      jobTitle,
      jobRole,
      numberOfPosition,
      jobType: "", 
      workType: "",
      ExpireJob: "",
      benefits: "", 
      salary,
      jobLocation,
      education: "", 
      english,
      experience,
      gender: "", 
      age: "", 
      description: "", 
      interviewMode: "", 
      communication: "", 
    });
    setIsEditModalOpen(true);
  };

  // Function to handle changes in the edit dialog
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCompany((prevState) => ({
      ...prevState,
      [name]: value, 
    }));
  };

  // Function to handle saving changes
const handleSave = () => {
  const updatedCompany = {
    _id: selectedCompany._id,
    jobTitle: selectedCompany.jobTitle,
    jobRole: selectedCompany.jobRole,
    numberOfPosition: selectedCompany.numberOfPosition,
    companyName: selectedCompany.companyName,
    jobLocation: selectedCompany.jobLocation,
    experience: selectedCompany.experience,
    salary: selectedCompany.salary,
    english: selectedCompany.english,
    students: selectedCompany.students.benefits.split(", "),
    benefits: selectedCompany.benefits.benefits.split(", "),
  };
  
    upCompany(updatedCompany)
      // to check data updated use param { data }
      .then(() => {
        console.log("Company updated successfully");
        alert("Company updated successfully")
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Failed to update company:", error);
      });
  };

  // Function to handle closing the edit modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
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
          <Button
            variant="contained"
            style={{ backgroundColor: "#4caf50" }}
            size="small"
            onClick={handleEditClick} // Open edit modal on button click
          >
            Edit
          </Button>
        </StyledTableCell>
        <StyledTableCell>
          {isEnroll.length === 0 ? (
            "No data"
          ) : (
            isEnroll.map((item, index) => (
              <Button
                key={index}
                variant="contained"
                style={{ backgroundColor: "#4caf50", margin: "2px" }}
                size="small"
                onClick={() => handleOpenModal(item)} // Open modal on button click
              >
                See
              </Button>
            ))
          )}
        </StyledTableCell>
      </StyledTableRow>

      {/* Candidate Modal */}
      <CandidateModal
        open={openModal}
        onClose={handleCloseModal}
        selectedItem={selectedItem}
      />

      {/* Edit Company Dialog */}
      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle sx={{ fontSize: "30px" }}>Edit Job</DialogTitle>
        <DialogContent>
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            name="companyName"
            value={selectedCompany.companyName}
            onChange={handleChange}
            sx={{ marginBottom: "16px", marginTop: "13px" }}
          />
          <TextField
            label="Job Title"
            variant="outlined"
            fullWidth
            name="jobTitle"
            value={selectedCompany.jobTitle}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Job Role"
            variant="outlined"
            fullWidth
            name="jobRole"
            value={selectedCompany.jobRole}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Number of Positions"
            variant="outlined"
            fullWidth
            name="numberOfPosition"
            value={selectedCompany.numberOfPosition}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Salary"
            variant="outlined"
            fullWidth
            name="salary"
            value={selectedCompany.salary}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Job Location"
            variant="outlined"
            fullWidth
            name="jobLocation"
            value={selectedCompany.jobLocation}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Experience"
            variant="outlined"
            fullWidth
            name="experience"
            value={selectedCompany.experience}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="English Proficiency"
            variant="outlined"
            fullWidth
            name="english"
            value={selectedCompany.english}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
Job.propTypes = {
  _id: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  jobRole: PropTypes.string.isRequired,
  numberOfPosition: PropTypes.number.isRequired,
  jobType: PropTypes.string.isRequired,
  workType: PropTypes.string.isRequired,
  ExpireJob: PropTypes.string.isRequired,
  benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
  salary: PropTypes.string.isRequired,
  jobLocation: PropTypes.string.isRequired,
  education: PropTypes.string.isRequired,
  english: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  interviewMode: PropTypes.string.isRequired,
  communication: PropTypes.string.isRequired,
  students: PropTypes.arrayOf(PropTypes.string).isRequired,
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
              <StyledTableCell>Applicants</StyledTableCell>
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