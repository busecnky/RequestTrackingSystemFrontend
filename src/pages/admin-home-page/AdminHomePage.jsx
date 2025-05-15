import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getAllTickets, respondToTicket } from "../../service/ticketService"

const AdminHomePage = () => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchTickets = () => {
    getAllTickets(selectedStatus, token)
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTickets();
  }, [selectedStatus]);

  const handleResponse = (id, responseText) => {
    respondToTicket(id, responseText, token)
      .then(fetchTickets)
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Admin Home Page</h2>

      <label>Filter by Status:</label>
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="OPEN">OPEN</option>
        <option value="RESPONDED">RESPONDED</option>
        <option value="CLOSED">CLOSED</option>
      </select>

      <ul>
        {tickets.map((req) => (
          <li key={req.id}>
            <strong>{req.title}</strong> - {req.status} <br />
            {req.description} <br />
            <em>Created by: {req.createdBy}</em>
            <br />
            <textarea
              placeholder="Admin Response"
              onBlur={(e) => handleResponse(req.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminHomePage;
