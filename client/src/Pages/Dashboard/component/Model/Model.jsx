import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Btn from '../Button/Btnn';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  mt: '13rem',
  borderRadius: '10px',
  scrollbarWidth: 'none',
  overflowY: 'auto',
  maxHeight: '100%',
};

export default function BasicModal({ form, text }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Btn text={text} click={handleOpen} />

      <Modal sx={{
        maxHeight: '70vh',
      }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {form}
        </Box>
      </Modal>
    </div>
  );
}
