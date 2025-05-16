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
import { updateStatus, respondToTicket } from "../../service/ticketService";
import { useFormik } from "formik";
import * as Yup from "yup";

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

const validationSchema = Yup.object({
  status: Yup.string().required("Status is required"),
  responseText: Yup.string().required("Response is required"),
});

const UpdateTicketModal = ({
  open,
  handleClose,
  ticketId,
  token,
  onUpdateSuccess
}) => {
  const formik = useFormik({
    initialValues: {
      status: '',
      responseText: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Updating ticket ID:", ticketId, "with values:", values);

      try {
        if (!ticketId) return;

        if (values.status) {
          console.log(values.status);
          await updateStatus(ticketId, values.status, token);
        }

        if (values.responseText.trim() !== '') {
          await respondToTicket(ticketId, values.responseText, token);
        }

        alert('Ticket updated!');
        handleCloseWithReset();
        onUpdateSuccess?.();
      } catch (err) {
        console.error(err);
        alert('Error updating ticket.');
      }
    },
  });
  const handleCloseWithReset = () => {
    formik.resetForm(); 
    handleClose();
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
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            label="Status"
            error={formik.touched.status && Boolean(formik.errors.status)}
          >
            <MenuItem value="RESPONDED">RESPONDED</MenuItem>
            <MenuItem value="CLOSED">CLOSED</MenuItem>
          </Select>
          {formik.touched.status && formik.errors.status && (
            <Typography color="red">{formik.errors.status}</Typography>
          )}
        </FormControl>

        <TextField
          label="Admin Response"
          multiline
          rows={4}
          fullWidth
          id="responseText"
          name="responseText"
          value={formik.values.responseText}
          onChange={formik.handleChange}
          error={formik.touched.responseText && Boolean(formik.errors.responseText)}
          helperText={formik.touched.responseText && formik.errors.responseText}
          sx={{ mb: 2 }}
          required
        />
        {formik.touched.responseText && formik.errors.responseText && (
          <Typography color="red">{formik.errors.responseText}</Typography>
        )}

        <Button variant="contained" color="primary" onClick={formik.handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateTicketModal;