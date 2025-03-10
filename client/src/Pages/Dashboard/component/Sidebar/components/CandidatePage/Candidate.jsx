



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
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as XLSX from "xlsx";
import { JOBHUB_BASE_URL } from "../../../../../../api/api";
import useOnline from "../../../../../../../utils/useOnline";
import Btn from "../../../Button/Btnn";
import { NotFound } from "../../../../../../../utils/Error";
import BasicModal from "../../../Model/Model";
import RegistrationPage from "../../../../../Form/Addcandidate";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';
const HoverIcon = styled('span')(({ theme }) => ({
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  padding: '5px', // Optional: add some padding for better visual
  borderRadius: '4px', // Optional: add border radius for rounded background
}));

const GreenHoverIcon = styled(HoverIcon)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'lightgrey',
    color:'green',
  },
  marginRight: '20px',
}));

const RedHoverIcon = styled(HoverIcon)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'lightgrey',
    color:"red",
  },
}));
// const capitalizeWords = (str) =>
//   str
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join(" ");
const capitalizeWords = (str) => {
  if (!str) {
    return ""; // Or handle the case where str is undefined/null appropriately
  }
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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

// const User = ({ count, fullname, email, position, dob, number, gender, address, updateUser, _id }) => {
//   const formattedDob = new Date(dob).toLocaleDateString();.
const User = ({ count, fullname, email, position, dob, number, gender, address, updateUser, _id }) => {
  let formattedDob = "";
  if(dob){
      formattedDob = new Date(dob).toISOString().split('T')[0];
  }



  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    _id,
    count,
    fullname,
    email,
    position,
    
    number,
    gender,
    address,
  });

  const handleEditClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSave = async () => {
    await updateUser(selectedUser);
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <StyledTableRow key={_id}>
      <StyledTableCell>{count}</StyledTableCell>
      <StyledTableCell>{capitalizeWords(fullname)}</StyledTableCell>
      <StyledTableCell>{email}</StyledTableCell>
      <StyledTableCell>{capitalizeWords(position)}</StyledTableCell>
      <StyledTableCell>{formattedDob}</StyledTableCell>
      <StyledTableCell>{number}</StyledTableCell>
      <StyledTableCell>{capitalizeWords(gender)}</StyledTableCell>
      <StyledTableCell>{capitalizeWords(address)}</StyledTableCell>
      <StyledTableCell ><GreenHoverIcon>
        <CheckIcon />
      </GreenHoverIcon>
      <RedHoverIcon>
        <CloseIcon />
      </RedHoverIcon></StyledTableCell>
      <StyledTableCell>
        <Button variant="contained" style={{backgroundColor:"#4caf50"}} size="small" onClick={handleEditClick}>
          Edit
        </Button>
      </StyledTableCell>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit Candidate</DialogTitle>
        <DialogContent>
        <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            name="fullname"
            value={selectedUser.fullname}
            onChange={handleChange}
            sx={{ marginBottom: "16px", marginTop: "13px" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={selectedUser.email}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Position"
            variant="outlined"
            fullWidth
            name="position"
            value={selectedUser.position}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            name="number"
            value={selectedUser.number}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            name="gender"
            value={selectedUser.gender}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            name="address"
            value={selectedUser.address}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          {/* <TextField
            label="DOB"
            variant="outlined"
            fullWidth
            name="dob"
            type="date"
            value={selectedUser.dob}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </StyledTableRow>
  );
};

User.propTypes = {
  count: PropTypes.number.isRequired,
  fullname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
};

const CandidateData = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showNewData, setShowNewData] = useState(true);

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
  }, []);

  const off = useOnline();
  if (!off) return <h1>You are Offline, please connect to the internet!</h1>;

  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(`${JOBHUB_BASE_URL}/candidates/updatecandidate/${updatedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedData = await response.json();

      setUserInfo((prevData) =>
        prevData.map((user) => (user._id === updatedUser._id ? updatedData : user))
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update user, please try again.");
    }
  };

  const handleDownloadExcel = () => {
    if (userInfo.length === 0) {
      alert("No data available to download.");
      return;
    }

    const data = userInfo.map((user, index) => ({
      S_No: index + 1,
      FullName: capitalizeWords(user.fullname),
      Email: user.email,
      Position: capitalizeWords(user.position),
      DOB: user.dob,
      PhoneNumber: user.number,
      Gender: capitalizeWords(user.gender),
      Address: capitalizeWords(user.address),
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
    XLSX.writeFile(workbook, "CandidatesData.xlsx");
  };

  const toggleDataView = () => {
    setShowNewData((prev) => !prev);
  };

  // Optimize filtering and data sorting with useMemo
  const filteredUsers = useMemo(() => {
    let filteredData = userInfo.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return showNewData ? filteredData : filteredData.slice().reverse();
  }, [searchTerm, userInfo, showNewData]);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
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
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "300px" }}
          />
          <Box sx={{ display: "flex", gap: "10px" }}>
            <BasicModal text="Add Data" form={<RegistrationPage />} />
            <Btn text="Download Excel" click={handleDownloadExcel} />
            <Btn variant="contained" text={showNewData ? "Older Data" : "New Data"} click={toggleDataView}>
              Toggle Data View
            </Btn>
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
                <StyledTableCell>Enroll/Unenroll</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
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
              ) : 
              (
                filteredUsers.map((user, index) => (
                  <User key={index} count={index + 1} {...user} updateUser={updateUser} />
                ))
              )
              
              }


            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default CandidateData;

