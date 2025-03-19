import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Checkbox,
    FormControlLabel,
} from "@mui/material";

import { StyledTableCell, StyledTableRow } from "./StyledComponents";
import { capitalizeWords } from "./CapitalWord";
import BasicModal from "../../../../Model/Model";
import Assigncomp from "../../../../../../Form/Assigncomp";
import Modal from "../../CompanyPage/Component/Commodel";
import ShowCandidateInfo from "../../../../../../Form/FullcadidateInfo";

const User = ({
    count,
    fullname,
    email,
    position,
    dob,
    number,
    gender,
    address,
    updateUser,
    enrollment,
    remark,
    _id,
    createdAt,
}) => {
    // Format date of birth (dob)
    let formattedDob = "";
    if (dob) {
        formattedDob = new Date(dob).toISOString().split("T")[0];
    }

    // Format walk-in date (createdAt)
    let walkindate = "";
    if (createdAt) {
        walkindate = new Date(createdAt).toISOString().split("T")[0];
    }

    const [buttonText, setButtonText] = useState(false);
    // State for modals and selected user data
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
        enrollment: enrollment || false,
        createdAt,
    });

    const handleClick = () => {
        setButtonText((prev) => !prev);
    };
    // Handlers for modals
    const handleAssignClick = () => {
        setJobModal(true);
    };

    const handleClose = () => {
        setJobModal(false);
    };

    const handleEditClick = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Save handler for updating user data
    const handleSave = () => {
        updateUser(selectedUser);
        setOpenModal(false);
    };

    // Input change handler
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setSelectedUser((prevUser) => ({
            ...prevUser,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <>
            <StyledTableRow key={_id} sx={{ cursor: "pointer" }}>
                <StyledTableCell onClick={handleAssignClick}>{count}</StyledTableCell>
                <StyledTableCell onClick={handleAssignClick}>{capitalizeWords(fullname)}</StyledTableCell>
                <StyledTableCell onClick={handleAssignClick}>{email}</StyledTableCell>
                <StyledTableCell onClick={handleAssignClick}>{capitalizeWords(position)}</StyledTableCell>
                <StyledTableCell onClick={handleAssignClick}>{formattedDob}</StyledTableCell>
                <StyledTableCell onClick={handleAssignClick}>{number}</StyledTableCell>
                <StyledTableCell onClick={handleAssignClick}>{capitalizeWords(gender)}</StyledTableCell>
                <StyledTableCell onClick={handleAssignClick}>{walkindate}</StyledTableCell>
                <StyledTableCell onClick={handleAssignClick}>{capitalizeWords(address)}</StyledTableCell>
                <StyledTableCell>{enrollment ? "✅" : "❌"}</StyledTableCell>
                <StyledTableCell>{remark ? capitalizeWords(remark) : "📃"}</StyledTableCell>
                <StyledTableCell>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#4caf50" }}
                        size="small"
                        onClick={handleEditClick}
                    >
                        Edit
                    </Button>
                </StyledTableCell>
                {enrollment && (
                    <StyledTableCell>
                        <BasicModal
                            form={<Assigncomp number={number} />}
                            btn={
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: "#4caf50" }}
                                    onClick={handleClick}
                                >
                                    {buttonText ? "Assigned" : "Assign"}
                                </Button>
                            }
                            btnStyle={{ backgroundColor: "#4caf50" }}
                        />
                    </StyledTableCell>
                )}
            </StyledTableRow>

            {/* Edit Candidate Dialog */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle sx={{ fontSize: "30px" }}>Edit Candidate</DialogTitle>
                <DialogContent>
                    <FormControlLabel
                        sx={{ float: "right" }}
                        control={
                            <Checkbox
                                checked={selectedUser.enrollment}
                                onChange={(e) =>
                                    handleChange({ target: { name: "enrollment", value: e.target.checked } })
                                }
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

            {/* Candidate Info Modal */}
            <Modal title={"Candidate Info"} isOpen={jobModal} onClose={handleClose}>
                <ShowCandidateInfo canID={_id} />
            </Modal>
        </>
    );
};

User.propTypes = {
    count: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    dob: PropTypes.string,
    number: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    updateUser: PropTypes.func.isRequired,
    enrollment: PropTypes.bool,
    remark: PropTypes.string,
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
};

export default User;