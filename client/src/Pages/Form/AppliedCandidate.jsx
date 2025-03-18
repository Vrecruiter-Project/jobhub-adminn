import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const CandidateModal = ({ open, onClose, selectedItem }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Applied Candidate Details
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {selectedItem && (
            <>
              <strong>Name:</strong> {selectedItem.firstName} {selectedItem.lastName}
              <br />
              <strong>Email:</strong> {selectedItem.email}
              <br />
              <strong>Mobile:</strong> {selectedItem.mobileNumber}
              <br />
              <strong>DOB:</strong> {selectedItem.dob}
              <br />
              <strong>Gender:</strong> {selectedItem.gender}
              <br />
              <strong>Qualification:</strong> {selectedItem.qualification}
              <br />
              <strong>Address:</strong> {selectedItem.address}
            </>
          )}
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: "#4caf50", marginTop: "16px" }}
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CandidateModal;