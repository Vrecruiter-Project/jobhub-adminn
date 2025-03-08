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
import ShimmerEffect from "../../../../../../../utils/Shimmer";
import useOnline from "../../../../../../../utils/useOnline";
import Btn from "../../../Button/Btnn";
import Search from "../../../Button/Search";
import BasicModal from "../../../Model/Model";
import RegistrationPage from "../../../../../Form/Addcandidate";

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

const User = ({ count, fullname, email, position, dob, number, gender, address }) => (
  <StyledTableRow>
    <StyledTableCell>{count}</StyledTableCell>
    <StyledTableCell>{fullname}</StyledTableCell>
    <StyledTableCell>{email}</StyledTableCell>
    <StyledTableCell>{position}</StyledTableCell>
    <StyledTableCell>{dob}</StyledTableCell>
    <StyledTableCell>{number}</StyledTableCell>
    <StyledTableCell>{gender}</StyledTableCell>
    <StyledTableCell>{address}</StyledTableCell>
  </StyledTableRow>
);

User.propTypes = {
  count: PropTypes.number.isRequired,
  fullname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

const CandidateData = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(`${JOBHUB_BASE_URL}/candidates/getcandidates`);
        if (!response.ok) throw new Error("Failed to fetch candidates");
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load data, please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, []);

  const off = useOnline();
  if (!off) return <h1>You are Offline, please connect to the internet!</h1>;

  const handleDownloadExcel = () => {
    if (userInfo.length === 0) {
      alert("No data available to download.");
      return;
    }
    const data = userInfo.map((user, index) => ({
      S_No: index + 1,
      FullName: user.fullname,
      Email: user.email,
      Position: user.position,
      DOB: user.dob,
      PhoneNumber: user.number,
      Gender: user.gender,
      Address: user.address,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
    XLSX.writeFile(workbook, "CandidatesData.xlsx");
  };

  // Optimize filtering with useMemo
  const filteredUsers = useMemo(() => {
    return userInfo.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, userInfo]);

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
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

        {/* <Search /> */}
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "300px" }}
        />
        <Box sx={{ display: "flex", gap: "10px" }}>
          {/* <Btn text="Add Data" click={handleDownloadExcel} /> */}
          <BasicModal text="Add Data" form={<RegistrationPage />} />
          <Btn text="Download Excel" click={handleDownloadExcel} />
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>S_No</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Position</StyledTableCell>
              <StyledTableCell>DOB</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <h3>No results found</h3>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user, index) => <User key={index} count={index + 1} {...user} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CandidateData;
