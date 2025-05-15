import axios from "./axiosInstance";

export const createTicket = (data, token) =>
  axios.post("/tickets", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMyTickets = (token) =>
  axios.get("/tickets/my", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllTickets = (status, token) => {
  const url = status ? `/tickets?status=${status}` : `/tickets`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const respondToTicket = (id, responseText, token) =>
  axios.post(
    `/tickets/${id}/respond`,
    { response: responseText },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
