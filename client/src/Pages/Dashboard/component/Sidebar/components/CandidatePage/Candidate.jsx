import React, { useState, useEffect, useMemo } from "react";
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
  CircularProgress,
  Grid,
} from "@mui/material";
import { JOBHUB_BASE_URL } from "../../../../../../api/api";
import Btn from "../../../Button/Btnn";
import { NotFound } from "../../../../../../../utils/Error";
import BasicModal from "../../../Model/Model";
import RegistrationPage from "../../../../../Form/Addcandidate";
import User from "./util/User";
import { handleDownloadExcel } from "./util/excelUtils";
import { StyledTableCell } from "./util/StyledComponents";
import { updateCandidate } from "./Services/candidateApi";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const CandidateData = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showNewData, setShowNewData] = useState(true);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const getUserInfo = async () => {
      
      try {
        const response = await fetch(`${JOBHUB_BASE_URL}/candidates/getcandidates`);
        if (!response.ok) throw new Error("Failed to fetch candidates");
        const data = await response.json();
        setUserInfo(data.reverse());
      } catch (error) {
        console.error(error);
        alert("Failed to load data, please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, [reload]);

  const handleRefresh = () => {
    setReload(prev => !prev);
  };

  const updateUser = async (updatedUser) => {
    try {
      const updatedData = await updateCandidate(updatedUser); 
      setUserInfo((prevData) =>
        prevData.map((user) => (user._id === updatedUser._id ? updatedData : user))
      );
    } catch (error) {
      console.error(error);
      alert("Please filled Remark to User !");
    }
  };
  
  const toggleDataView = () => {
    setShowNewData((prev) => !prev);
  };

  const filteredUsers = useMemo(() => {
    let filteredData = userInfo.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return showNewData ? filteredData : filteredData.slice().reverse();
  }, [searchTerm, userInfo, showNewData]
  );

  return (
    <Box sx={{ marginBottom: "20px", padding: '30px' }}>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-start', gap: '10px' }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Btn variant="contained" text={showNewData ? "Older Data" : "New Data"} click={toggleDataView} />
          <Btn variant="contained" text={"Refresh Data"} click={handleRefresh}/>
        </Grid>
        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}>
          <BasicModal btn={<Btn text="Add Data" />} form={<RegistrationPage />} />
          <Btn text="Download Excel" click={() => handleDownloadExcel(userInfo)} />

        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3, marginTop: "20px" }}>
        <Table sx={{ minWidth: 700, tableLayout: "auto" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>S_No</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Position</StyledTableCell>
              <StyledTableCell>DOB</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Walk-in</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Enrollment</StyledTableCell>
              <StyledTableCell>Remark</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Allot</StyledTableCell>
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
                  <NotFound />
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user, index) => (
                <User key={index} count={index + 1} {...user} updateUser={updateUser} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CandidateData;