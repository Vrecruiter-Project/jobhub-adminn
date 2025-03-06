import { useEffect, useState } from "react";
import { JOBHUB_BASE_URL } from "../../../../../../api/api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, tableCellClasses } from "@mui/material";
import ShimmerEffect from "../../../../../../../utils/Shimmer";
import PropTypes from "prop-types";
// import { ImageOutlined } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#8BC34A', // Light green color (you can use hex, RGB, or theme color)
    color: theme.palette.common.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: '16px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textTransform:'capitalize',
    padding: '12px',
    color: theme.palette.text.primary,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// List component to display each company name/job
const List = ({ companyName, numberOfPosition, jobLocation, benefits }) => {
  // Remove spaces and join benefits into a comma-separated string
  const formattedBenefits = benefits.map(benefit => benefit.trim()).join(', ');

  return (
    <StyledTableRow>
      <StyledTableCell sx={{ textAlign: 'center' }}>{companyName}</StyledTableCell>
      <StyledTableCell sx={{ textAlign: 'center' }}>{numberOfPosition}</StyledTableCell>
      <StyledTableCell sx={{ textAlign: 'center' }}>{jobLocation}</StyledTableCell>
      <StyledTableCell sx={{ textAlign: 'center' }}>{formattedBenefits}</StyledTableCell>
    </StyledTableRow>
  );
};

List.propTypes = {
  companyName: PropTypes.string.isRequired,
  numberOfPosition: PropTypes.string.isRequired,
  jobLocation: PropTypes.string.isRequired,
  benefits: PropTypes.array.isRequired, // benefits is now expected to be an array
};

const CompanyPage = () => {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    async function getCompanyData() {
      const response = await fetch(`${JOBHUB_BASE_URL}/v1/admins/alljobs`);
      const json = await response.json();
      // Assuming the jobs data is inside a `jobs` key in the response
      setJobList(json.jobs || []);  // Ensure default to empty array if no jobs
      
    }
    getCompanyData();
  }, []);

  return (
    <TableContainer component={Paper} style={{ width: '100%' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
          <TableRow>
            <StyledTableCell sx={{ textAlign: 'center' }}>Company Name</StyledTableCell>
            <StyledTableCell align="center">No.of Position</StyledTableCell>
            <StyledTableCell align="center">Location</StyledTableCell>
            <StyledTableCell align="center">Benefits</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(jobList?.length === 0) ? (<ShimmerEffect effect={4}/>) :
            jobList.map((user, index) => (
              <List key={index} {...user} />
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompanyPage;