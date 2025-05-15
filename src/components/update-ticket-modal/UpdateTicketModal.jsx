import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { updateStatus, respondToTicket  } from "../../service/ticketService"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  p: 4,
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgb(255, 255, 255)'
};

const UpdateTicketModal = ({
  open,
  handleClose,
  ticketId,
  token,
  onUpdateSuccess
}) => {
  const [status, setStatus] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSubmit = async () => {
    console.log("Updating ticket ID:", ticketId, "with status:", status);

    try {
      if (!ticketId) return;

      if (status) {
        console.log(status);
        await updateStatus(ticketId, status, token);
      }

      if (responseText.trim() !== '') {
        await respondToTicket(ticketId, responseText, token);
      }

      alert('Ticket updated!');
      handleClose();
      onUpdateSuccess?.();
    } catch (err) {
      console.error(err);
      alert('Error updating ticket.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
        },
      }}
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" sx={{ mb: 2 }}>
          Update Ticket
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="RESPONDED">RESPONDED</MenuItem>
            <MenuItem value="CLOSED">CLOSED</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Admin Response"
          multiline
          rows={4}
          fullWidth
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateTicketModal;
