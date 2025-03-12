import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    TableCell,
    TableRow,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

import { StyledTableCell, StyledTableRow } from "./StyledComponents";
import { capitalizeWords } from "./CapitalWord";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormControlLabel } from '@mui/material';

const User = ({ count, fullname, email, position, dob, number, gender, address, updateUser, enrollment, remark, _id, createdAt }) => {
    let formattedDob = "";
    if (dob) {
        formattedDob = new Date(dob).toISOString().split('T')[0];
    }
    let walkindate = "";
    if (createdAt) {
        walkindate = new Date(createdAt).toISOString().split('T')[0];
    }

    const [openModal, setOpenModal] = useState(false);
    const [jobModal, setJobModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({
        _id,
        count,
        fullname,
        email,
        position,
        number,
        gender,
        remark: remark || "",
        address,
        enrollment: enrollment || "",
        createdAt

    });

    const handleAssignClick = () => {
        setJobModal(true); // Open the modal
    };

    const handleClose = () => {
        setJobModal(false); // Close the modal
    };

    const handleEditClick = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
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
            <StyledTableCell>{walkindate}</StyledTableCell>

            <StyledTableCell>{capitalizeWords(address)}</StyledTableCell>
            <StyledTableCell>{enrollment ? '✅' : '❌'}</StyledTableCell>
            <StyledTableCell>{remark ? capitalizeWords(remark) : "📃"}</StyledTableCell>
            <StyledTableCell>
                <Button variant="contained" style={{ backgroundColor: "#4caf50" }} size="small"
                    onClick={handleEditClick}>
                    Edit
                </Button>
            </StyledTableCell>
            <StyledTableCell>
                <Button variant="contained" style={{ backgroundColor: "#4caf50" }} size="small" onClick={handleAssignClick}>
                    Assign
                </Button>
            </StyledTableCell>

            {/* Dialog for Assign Button */}
            <Dialog open={jobModal} onClose={handleClose}>
                <DialogTitle>Assign Job to {[number,fullname]}</DialogTitle> {/* Display row number here */}
                <DialogContent>
                    <CompanyModal rowNumber={[number,fullname]} /> {/* Pass row number as a prop */}
                </DialogContent>
            </Dialog>

            {/* Dialog for Edit Button */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle sx={{ fontSize: '30px' }}>Edit Candidate</DialogTitle>
                <DialogContent>
                    <FormControlLabel
                        sx={{ float: 'right' }}
                        control={
                            <Checkbox
                                checked={selectedUser.enrollment}
                                onChange={(e) => handleChange({ target: { name: 'enrollment', value: e.target.checked } })}
                            />
                        }
                        label="Enrollment"
                    />
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
                    <TextField
                        label="Add remark"
                        variant="outlined"
                        fullWidth
                        name="remark"
                        value={selectedUser.remark}
                        onChange={handleChange}
                        sx={{ marginBottom: "16px" }}
                    />
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

export default User;