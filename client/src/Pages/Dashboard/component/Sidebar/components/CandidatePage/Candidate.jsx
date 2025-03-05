import  { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, tableCellClasses } from "@mui/material";

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
      <StyledTableCell>{fullname}</StyledTableCell>
      <StyledTableCell>{email}</StyledTableCell>
      <StyledTableCell>{position}</StyledTableCell>
      <StyledTableCell>{dob}</StyledTableCell>
      <StyledTableCell>{number}</StyledTableCell>
      <StyledTableCell>{gender}</StyledTableCell>
      <StyledTableCell>{address}</StyledTableCell>
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
    getUserInfo();
  }, []);

  async function getUserInfo() {
    const data = await fetch('https://jobhub-project-official-1.onrender.com/api/candidates/getcandidates');
    const json = await data.json();
    setUserInfo(json);
  }

  return (
    <TableContainer component={Paper}>
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
          {userInfo.map((user, index) => (
            <User
              key={index}
              fullname={user.fullname}
              email={user.email}
              position={user.position}
              dob={user.dob}
              number={user.number}
              gender={user.gender}
              address={user.address}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompanyData;
