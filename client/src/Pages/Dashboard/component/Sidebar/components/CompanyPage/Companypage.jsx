import { useEffect, useState } from "react";
// import { COMPANY_BASE_URL } from "../../../../../../api/api";
import { JOBHUB_BASE_URL } from "../../../../../../api/api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, tableCellClasses } from "@mui/material";

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
const List = ({ companyName }) => {
  return (
    <StyledTableRow>
      <StyledTableCell sx={{ textAlign: 'center' }}>{companyName}</StyledTableCell>
    </StyledTableRow>
  );
};

List.propTypes = {
  companyName: PropTypes.string.isRequired,
};

const CompanyPage = () => {
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCompanyData() {
      const response = await fetch(`${JOBHUB_BASE_URL}/v1/admins/alljobs`);
      const json = await response.json();
      // Assuming the jobs data is inside a `jobs` key in the response
      setJobList(json.jobs || []);  // Ensure default to empty array if no jobs
      setLoading(false);
    }
    getCompanyData();
  }, []);

  return (
    <TableContainer component={Paper} style={{ width: '100%' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
          <TableRow>
            <StyledTableCell sx={{ textAlign: 'center' }}>Full Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Position</StyledTableCell>
            <StyledTableCell align="center">DOB</StyledTableCell>
            <StyledTableCell align="center">Phone Number</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            // Render a loading row instead of a div
            <StyledTableRow>
              <StyledTableCell>
                Loading...
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            jobList.map((user, index) => (
              <List key={index} companyName={user.companyName} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompanyPage;
