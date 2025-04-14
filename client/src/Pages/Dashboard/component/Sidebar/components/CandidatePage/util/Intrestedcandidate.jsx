import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { StyledTableCell } from "./StyledComponents";
import { useEffect, useState } from "react";
import { JOBHUB_BASE_URL } from "../../../../../../../api/api";
import Interested from "./Insterested";

const InterestedCandidate = () => {
    const [insCandidate, setInsCandidate] = useState([]);

    useEffect(() => {
        async function getIntrestedCandidateData() {
            try {
                const response = await fetch(`${JOBHUB_BASE_URL}/v1/admins/alljobs`,{
                    method:'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": import.meta.env.VITE_API_SECRET_KEY,
                      },
                });
                if (!response.ok) throw new Error("Failed to fetch jobs");
                const json = await response.json();
                setInsCandidate(json.jobs || []);
            } catch (error) {
                console.error(error);
                alert("Failed to load data, please try again later.");
            }
        }
        getIntrestedCandidateData();
    }, []);

    return (
        <div className="p-2">
            <TableContainer component={Paper} sx={{ boxShadow: 3,maxHeight:{xs:'80vh', sm:'70vh', md:'70vh', lg:'73vh'}, overflowY:'visible'  }}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            {/* <StyledTableCell>S_No</StyledTableCell> */}
                            <StyledTableCell>Position</StyledTableCell>
                            <StyledTableCell>Company</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Mobile Number</StyledTableCell>
                            <StyledTableCell>DOB</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Qualification</StyledTableCell>
                            <StyledTableCell>Location</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            insCandidate.length === 0 ? <TableRow>
                                <TableCell colSpan={10} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow> :
                                insCandidate.map((item, index) => (
                                    <Interested
                                        key={index}
                                        companyName={item.companyName}
                                        jobRole={item.jobRole}
                                        students={item.students}
                                        // count={index}
                                    />
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default InterestedCandidate;