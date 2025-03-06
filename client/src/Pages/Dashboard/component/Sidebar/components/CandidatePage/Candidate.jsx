import  { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, tableCellClasses } from "@mui/material";
// import { CANDITATE_BASE_URL } from "../../../../../../api/api";
import { JOBHUB_BASE_URL } from "../../../../../../api/api";
import ShimmerEffect from "../../../../../../../utils/Shimmer";
import useOnline from "../../../../../../../utils/useOnline";

// StyledTableCell for custom cell styles (with custom header and body styles)
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

// StyledTableRow for custom row styles with hover and alternating row color
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

// User component with prop validation
const User = ({ fullname, email, position, dob, number, gender, address }) => {
  return (
    <StyledTableRow>
      <StyledTableCell sx={{textAlign:'center'}}>{fullname}</StyledTableCell>
      <StyledTableCell  sx={{textAlign:'center'}}>{email}</StyledTableCell>
      <StyledTableCell  sx={{textAlign:'center'}}>{position}</StyledTableCell>
      <StyledTableCell  sx={{textAlign:'center'}}>{dob}</StyledTableCell>
      <StyledTableCell  sx={{textAlign:'center'}}>{number}</StyledTableCell>
      <StyledTableCell  sx={{textAlign:'center'}}>{gender}</StyledTableCell>
      <StyledTableCell  sx={{textAlign:'center'}}>{address}</StyledTableCell>
    </StyledTableRow>
  );
};

// Prop validation for the User component
User.propTypes = {
  fullname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

const CompanyData = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    async function getUserInfo() {
      const data = await fetch(`${JOBHUB_BASE_URL}/candidates/getcandidates`);
      const json = await data.json();
      setUserInfo(json);
    }
    getUserInfo();
  }, []);

  // offline state 
  const off = useOnline();
  if (!off) {
    return (
        <>
          <h1>You are Offline please help to connect the internet !!</h1>
        </>
      )
  }

  return (
    <TableContainer component={Paper} style={{ width: '100%' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
          <TableRow>
            <StyledTableCell>Full Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Position</StyledTableCell>
            <StyledTableCell align="center">DOB</StyledTableCell>
            <StyledTableCell align="center">Phone Number</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(userInfo?.length === 0) ? (<ShimmerEffect />) : userInfo.map((user, index) => (
            <User 
              key={index}
              {...user}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompanyData;
