import axios from "./axiosInstance";

export const createTicket = (data, token) =>
  axios.post("/tickets", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMyTickets = (token) =>
  axios.get("/tickets/my", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllTicketsByStatus = (ticketStatus, token) => {
  return axios.get(`/tickets`, {
      params: ticketStatus ? { ticketStatus } : {},
      headers: { Authorization: `Bearer ${token}` },
    });
};

export const respondToTicket = (id, responseText, token) => {
  return axios.post(`/tickets/${id}/respond`,
    {},
    {
      params: { responseText },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateStatus = (id, ticketStatus, token) => {
  return axios.put(`/tickets/${id}/status`,
    {},
    {
      params: { ticketStatus },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

