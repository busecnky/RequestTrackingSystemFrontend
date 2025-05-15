import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getMyTickets, createTicket  } from "../../service/ticketService"


const UserHomePage = () => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "GENERAL",
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
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>User Home Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="GENERAL">GENERAL</option>
          <option value="TECHNICAL">TECHNICAL</option>
          <option value="OTHER">OTHER</option>
        </select>
        <button type="submit">Create Ticket</button>
      </form>

      <h3>My Tickets</h3>
      <ul>
        {tickets.map((req) => (
          <li key={req.id}>
            <strong>{req.title}</strong> - {req.status} <br />
            {req.description} <br />
            Admin Response: {req.adminResponse || "No response yet"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserHomePage;