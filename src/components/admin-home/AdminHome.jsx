import "./adminHome.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getAllTicketsByStatus } from "../../service/ticketService";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import Button from '@mui/material/Button';
import UpdateTicketModal from "../update-ticket-modal/UpdateTicketModal";

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

const AdminHome = () => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);



  const fetchTickets = () => {
    getAllTicketsByStatus(selectedStatus, token)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTickets();
  }, [selectedStatus]);
  const handleOpen = (ticketId) => {
    setSelectedTicketId(ticketId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTicketId(null);
  };

  return (
    <div className="admin-container">
      <h2>Admin Home Page</h2>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="select-label">Filter by Status</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selectedStatus}
          label="Filter by Status"
          onChange={(e) => {
            setSelectedStatus(e.target.value);
          }}
        >
          <MenuItem value="">ALL</MenuItem>
          <MenuItem value="OPEN">OPEN</MenuItem>
          <MenuItem value="RESPONDED">RESPONDED</MenuItem>
          <MenuItem value="CLOSED">CLOSED</MenuItem>
        </Select>
      </FormControl>

      <ul>
        <div className="ticket-header">
          <p>Created by </p>
          <p>Title </p>
          <p>Status</p>
          <p>Description </p>
          <p>Response </p>
          <p></p>
        </div>
        {tickets.map((req) => (
          <li className="ticket-container" key={req.id}>
            <div className="ticket-cell">
              <div className="cell"><strong>{req.username}</strong></div>
              <div className="cell"><strong>{req.title}</strong></div>
              <div className="cell"><span>{req.status}</span></div>
              <div className="cell"><span>{req.description}</span></div>
              <div className="cell">{req.response && (
                <span> <strong>{req.response}</strong>  </span>
              )}
              </div>
            </div>
            <div className="ticket-actions">
              <Button
                sx={{ fontWeight: 'bold' }}
                variant="outlined"
                onClick={() => handleOpen(req.id)}
                disabled={req.status === 'CLOSED'}

              >
                Update
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <UpdateTicketModal
        open={open}
        handleClose={handleClose}
        ticketId={selectedTicketId}
        token={token}
        onUpdateSuccess={fetchTickets}
      />
    </div>
  );
};

export default AdminHome;
