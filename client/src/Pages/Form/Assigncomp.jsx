import React, { useState, useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Assigncomp = ({ number }) => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jobhub-project-official-1.onrender.com/api/v1/admins/alljobs");
        const result = await response.json();

        if (result && Array.isArray(result.jobs)) {
          setData(result.jobs);
        } else {
          throw new Error("Unexpected API response structure");
        }
      } catch (error) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row._id));
    }
  };

  const sendMessage = (phoneNumber, message) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleSend = () => {
    const selectedData = data.filter((row) => selectedRows.includes(row._id));

    if (selectedData.length === 0) {
      alert("Please select at least one job to send.");
      return;
    }

    const message = selectedData
      .map(
        (row, index) =>
          `${index + 1}. Company: ${row.companyName || "N/A"}\n   Job Title: ${row.jobTitle || "N/A"}\n  
            Job Role: ${row.jobRole || "N/A"}\n   Job Location: ${row.jobLocation || "N/A"}\n }\n}`
      )
      .join("\n\n");

    const phoneNumber = `91${number}`;

    sendMessage(phoneNumber, `Here are the selected job details:\n\n${message}`);
  };

  const filteredUsers = useMemo(() => {
    let filteredData = data.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    return filteredData
  }, [searchTerm, data]
  );

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ overflowX: "auto", maxHeight: { xs: 400, md: "auto" } }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{ position: 'sticky', top: 0 }}>
                <StyledTableCell>
                  <Checkbox
                    onChange={handleSelectAll}
                    checked={selectedRows.length === data.length && data.length > 0}
                    disableRipple
                    disableFocusRipple
                  />
                </StyledTableCell>
                <StyledTableCell>Company Name</StyledTableCell>
                <StyledTableCell>Job Title</StyledTableCell>
                <StyledTableCell>Number of Positions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell>
                      <Checkbox
                        checked={selectedRows.includes(row._id)}
                        onChange={() => handleRowSelection(row._id)}
                        disableRipple
                        disableFocusRipple
                      />
                    </StyledTableCell>
                    <StyledTableCell>{row.companyName || "N/A"}</StyledTableCell>
                    <StyledTableCell>{row.jobTitle || "N/A"}</StyledTableCell>
                    <StyledTableCell>{row.numberOfPosition || "N/A"}</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan="4" style={{ textAlign: "center" }}>
                    No data available
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box sx={{ display: 'flex', gap: '30px', alignItems: "center", mt: '10px' }}>


        <Button
          sx={{
            position: "sticky",
            bottom: "20px",
            zIndex: 1,
            left: { xs: "10px", md: "30px" },
          }}
          variant="contained"
          color="success"
          onClick={handleSend}
          disabled={selectedRows.length === 0}
        >
          Send via WhatsApp
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "300px" }}
        />
      </Box>
    </div>
  );
};

export default Assigncomp;