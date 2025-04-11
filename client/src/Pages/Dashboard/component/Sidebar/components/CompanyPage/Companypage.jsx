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
import Btn from "../../../Button/Btnn";
import { NotFound } from "../../../../../../../utils/Error";
import Modal from "./Component/Commodel";
import ShowCardInfo from "../../../../../Form/FullcompanyInfo";
import { upCompany } from "./Component/Updatecompany";
import { Grid } from "@mui/system";

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

// Utility function to capitalize first letter of each word
const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const Company = ({ _id, count, companyName, numberOfPosition, jobLocation, benefits, contactNumber }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({
    _id: "",
    count: 0,
    companyName: "",
    numberOfPosition: 0,
    jobLocation: "",
    benefits: "",
    contactNumber
  });

  const handleRowClick = () => {
    setIsInfoModalOpen(true); // Open the info modal when the row is clicked
  };

  const handleEditClick = () => {
    setSelectedCompany({
      _id,
      count,
      companyName,
      numberOfPosition,
      jobLocation,
      contactNumber,
      benefits: benefits.join(", "), // Convert array to string for the TextField
    });
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCompany((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSave = () => {
    const updatedCompany = {
      _id: selectedCompany._id,
      companyName: selectedCompany.companyName,
      numberOfPosition: selectedCompany.numberOfPosition,
      jobLocation: selectedCompany.jobLocation,
      contactNumber: selectedCompany.contactNumber,
      benefits: selectedCompany.benefits.split(", "),
    };
  
    upCompany(updatedCompany)
      // to check data updated use param { data }
      .then(() => {
        console.log("Company updated successfully:");
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Failed to update company:", error);
      });
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  return (
    <>
    
      <StyledTableRow sx={{ cursor: "pointer" }}>
        <StyledTableCell onClick={handleRowClick}>{count}</StyledTableCell>
        <StyledTableCell onClick={handleRowClick}>{capitalizeWords(companyName)}</StyledTableCell>
        <StyledTableCell onClick={handleRowClick}>{numberOfPosition}</StyledTableCell>
        <StyledTableCell>{contactNumber}</StyledTableCell>
        <StyledTableCell onClick={handleRowClick}>{capitalizeWords(jobLocation)}</StyledTableCell>
        <StyledTableCell onClick={handleRowClick}>{benefits.map(capitalizeWords).join(", ")}</StyledTableCell>
        <StyledTableCell>
          <Button variant="contained" style={{ backgroundColor: "#4caf50" }} size="small"
            onClick={handleEditClick}>Edit</Button>
        </StyledTableCell>
      </StyledTableRow>
      
      {/* Edit Company Dialog */}
      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle sx={{ fontSize: "30px" }}>Edit Company</DialogTitle>
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
            label="Number of Positions"
            variant="outlined"
            fullWidth
            name="numberOfPosition"
            value={selectedCompany.numberOfPosition}
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
            label="Contact Number"
            variant="outlined"
            fullWidth
            name="contactNumber"
            value={selectedCompany.contactNumber}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Benefits"
            variant="outlined"
            fullWidth
            name="benefits"
            value={selectedCompany.benefits}
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

      {/* Company Info Modal */}
      <Modal title={"Company Info"} isOpen={isInfoModalOpen} onClose={handleCloseInfoModal}>
        <ShowCardInfo jobId={_id} />
      </Modal>
    </>
  );
};

Company.propTypes = {
  _id: PropTypes.string.isRequired, 
  count: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  numberOfPosition: PropTypes.string.isRequired,
  jobLocation: PropTypes.string.isRequired,
  benefits: PropTypes.array.isRequired,
  contactNumber: PropTypes.string.isRequired
};

const CompanyPage = () => {
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showNewData, setShowNewData] = useState(true);

  useEffect(() => {
    const getCompanyData = async () => {
      try {
        const response = await fetch(`${JOBHUB_BASE_URL}/v1/admins/alljobs`);
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const json = await response.json();
        setJobList(json.jobs.reverse() || []);
      } catch (error) {
        console.error(error);
        alert("Failed to load data, please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getCompanyData();
  }, []);

  const handleDownloadExcel = () => {
    if (jobList.length === 0) {
      alert("No data available to download.");
      return;
    }
    const data = jobList.map((job, index) => ({
      S_No: index + 1,
      CompanyName: capitalizeWords(job.companyName),
      NumberOfPositions: job.numberOfPosition,
      Location: capitalizeWords(job.jobLocation),
      Benefits: job.benefits.map(capitalizeWords).join(", "),
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Company");
    XLSX.writeFile(workbook, "CompanyData.xlsx");
  };

  const toggleDataView = () => {
    setShowNewData((prev) => !prev);
  };
  
  const filteredJobs = useMemo(() => {
    let filteredData = jobList.filter((user) =>
      Object.values(user).some((value) =>
    (value != null ? value.toString() : '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    return showNewData ? filteredData : filteredData.slice().reverse();
  }, [searchTerm, jobList, showNewData]);

  
  return (
    <div style={{ padding: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Grid sx={{display:'flex', gap:'10px', alignItems:'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "300px" }}
        />
        <Btn variant="contained" text={showNewData ? "Older Data" : "New Data"} click={toggleDataView} />
        </Grid>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Btn text="Download Excel" click={handleDownloadExcel} />
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 , maxHeight:{xs:'65vh', sm:'70vh', md:'70vh', lg:'75vh'}, overflowY:'visible'}}>
        <Table sx={{ minWidth: 700 , }} stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S_No</StyledTableCell>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell>No. of Positions</StyledTableCell>
              <StyledTableCell>Contact No.</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Benefits</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <NotFound />
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job, index) => <Company key={job._id} count={index + 1} {...job} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompanyPage;