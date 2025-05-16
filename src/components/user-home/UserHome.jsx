import "./userHome.scss"
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getMyTickets, createTicket } from "../../service/ticketService"
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Button
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  ticketCategory: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
});
const UserHomePage = () => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getMyTickets(token)
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const formik = useFormik({
    initialValues: {
      title: "",
      ticketCategory: "SERVICE",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      createTicket(values, token)
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
    },
  });

  return (
    <div className="user-container">
      <h2>User Home Page</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="user-title-select">
          <input
            className="user-title"
            type="text"
            placeholder="Title"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <div style={{ color: "red" }} className="error-message">{formik.errors.title}</div>
          )}
          <div className="user-select">
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="ticketCategory"
                name="ticketCategory"
                value={formik.values.ticketCategory}
                label="Category"
                onChange={formik.handleChange}
              >
                <MenuItem value="SERVICE">SERVICE</MenuItem>
                <MenuItem value="PROBLEM">PROBLEM</MenuItem>
                <MenuItem value="REQUEST">REQUEST</MenuItem>
              </Select>
              {formik.touched.ticketCategory && formik.errors.ticketCategory && (
                <div className="error-message">{formik.errors.ticketCategory}</div>
              )}
            </FormControl>
          </div>
        </div>
        <textarea
          placeholder="Description"
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />


        <button type="submit">Create Ticket</button>
      </form>
        {formik.touched.description && formik.errors.description && (
          <div style={{ color: "red" }} className="error-message">{formik.errors.description}</div>
        )}
      <h3>My Tickets</h3>
      <ul>
        <div className="ticket-user-header">
          <p>Title </p>
          <p>Category </p>
          <p>Status</p>
          <p>Description</p>
          <p>Response</p>
        </div>
        {tickets.map((req) => (
          <li className="ticket-user-container" key={req.id}>
            <div className="ticket-user-cell">
              <div className="user-cell"><strong>{req.title}</strong></div>
              <div className="user-cell"><span>{req.category}</span></div>
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