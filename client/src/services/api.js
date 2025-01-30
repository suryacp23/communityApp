import axios from "axios";

// Fetch blogs
export const fetchBlogs = () =>
  axios.get("/api/events").then((res) => res.data);



export const Fetchevent = (eventId) =>
  axios.get(`/api/events/${eventId}`).then((res) => res.data);

//delete events
export const deleteEvent = (eventId) =>
  axios.delete(`/api/events/${eventId}`).then((res) => res.data);

// Sign up a user
export const SignupData = ({ userName, email, password }) =>
  axios
    .post("/api/auth/signup", { userName, email, password })
    .then((res) => res.data);

// Log in a user
export const logindata = ({ userName, password }) =>
  axios.post("/api/auth/login", { userName, password }).then((res) => res.data);

// Fetch comments
export const commentsFetch = (blogId) =>
  axios.get(`/api/comment/getPostComments/${blogId}`).then((res) => res.data);

// Create comment
export const createComment = (comment) =>
  axios
    .post(`/api/comment/create`, comment, { withCredentials: true })
    .then((res) => res.data);

// Sign out a user
export const signout = () =>
  axios
    .post("/api/auth/logout", {}, { withCredentials: true })
    .then((res) => res.data);

export const getgroups = async () => {
  return axios.get(`/api/group`).then((res) => res.data);
};

export const getgroupInfo = async (groupId) => {
  return axios.get(`/api/group/${groupId}`);
};

export const fetchChat = async (groupid) => {
  return axios.get(`/api/message/${groupid}`);
};

//attendance endpoints
export const getAttendances = async (eventId) => {
  return axios.get(`/api/attendance/${eventId}`).then((res) => res.data);
};
export const checkAttendance = async ({ eventId, decodedText }) => {
  const response = await axios.post(
    `/api/attendance/scan/${eventId}`,
    decodedText
  );
  return response.data;
};

export const request = async (groupId) => {
  return axios.post(`api/group/request`, groupId, { withCredentials: true });
};

export const getGroupJoinRequests = async (groupId) => {
  return axios
    .get(`/api/group/request/${groupId}`, { withCredentials: true })
    .then((res) => res.data);
};

export const createEvent = (formData) =>
  axios
    .post("/api/events", formData, { withCredentials: true })
    .then((res) => res.data);
