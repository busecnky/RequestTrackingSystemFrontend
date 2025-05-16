import "./userHome.scss"
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getMyTickets, createTicket } from "../../service/ticketService"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";

const UserHomePage = () => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "SERVICE",
  });

  useEffect(() => {
    getMyTickets(token)
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTicket(form, token)
      .then(() => window.location.reload())
      .catch((error) => {
        if (error.response) {
          const message =
            error.response.data?.message || "An unexpected error occurred.";
          setErrors({ general: message });
        } else {
          setErrors({ general: "Server is not reachable." });
        }
      });
  };

  return (
    <div className="user-container">
      <h2>User Home Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-title-select">
          <input className="user-title"
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <div className="user-select">

            <FormControl fullWidth>
              <InputLabel id="select-label">Category</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={form.category}
                label="Category"
                onChange={(e) => {
                  setForm({ ...form, category: e.target.value });
                }}
              >
                <MenuItem value="SERVICE">SERVICE</MenuItem>
                <MenuItem value="PROBLEM">PROBLEM</MenuItem>
                <MenuItem value="REQUEST">REQUEST</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button type="submit">Create Ticket</button>
      </form>
      {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

      <h3>My Tickets</h3>
      <ul>
        <div className="ticket-user-header">
          <p>Title </p>
          <p>Status</p>
          <p>Description </p>
          <p>Response</p>
        </div>
        {tickets.map((req) => (
          <li className="ticket-user-container" key={req.id}>
            <div className="ticket-user-cell">
              <div className="user-cell"><strong>{req.title}</strong></div>
              <div className="user-cell"><span>{req.status}</span></div>
              <div className="user-cell"><span>{req.description}</span></div>
              <div className="user-cell">{req.response || "No response yet"}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserHomePage;