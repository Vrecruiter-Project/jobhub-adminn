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
} from "@mui/material";
import * as XLSX from "xlsx";
import { JOBHUB_BASE_URL } from "../../../../../../api/api";
import Btn from "../../../Button/Btnn";
import { NotFound } from "../../../../../../../utils/Error";

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
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const Company = ({ count, companyName, numberOfPosition, jobLocation, benefits }) => (
  <StyledTableRow>
    <StyledTableCell>{count}</StyledTableCell>
    <StyledTableCell>{capitalizeWords(companyName)}</StyledTableCell>
    <StyledTableCell>{numberOfPosition}</StyledTableCell>
    <StyledTableCell>{capitalizeWords(jobLocation)}</StyledTableCell>
    <StyledTableCell>{benefits.map(capitalizeWords).join(", ")}</StyledTableCell>
  </StyledTableRow>
);

Company.propTypes = {
  count: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  numberOfPosition: PropTypes.string.isRequired,
  jobLocation: PropTypes.string.isRequired,
  benefits: PropTypes.array.isRequired,
};

const CompanyPage = () => {
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCompanyData = async () => {
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
          sx={{ width: "300px" }}
        />
      
        <Box sx={{ display: "flex", gap: "10px" }}>

          <Btn text="Download Excel" click={handleDownloadExcel} />

        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>S_No</StyledTableCell>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell>No. of Positions</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Benefits</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <NotFound />
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job, index) => <Company key={index} count={index + 1} {...job} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompanyPage;
