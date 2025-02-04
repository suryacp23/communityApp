import axios from "axios";

// Fetch blogs
export const fetchBlogs = () =>
	axios.get("/api/events").then((res) => res.data);

// Fetch events created by user
export const fetchUserEvents = (userId) =>
	axios.get(`/api/events?userId=${userId}`).then((res) => res.data);

export const Fetchevent = (eventId) =>
	axios.get(`/api/events/${eventId}`).then((res) => res.data);

//create a new event
export const createEvent = (formData) =>
	axios
		.post("/api/events", formData, { withCredentials: true })
		.then((res) => res.data);

//delete event
export const deleteEvent = (eventId) =>
	axios
		.delete(`/api/events/${eventId}`, { withCredentials: true })
		.then((res) => res.data);

// Sign up a user
export const SignupData = ({ userName, email, password }) =>
	axios
		.post("/api/auth/signup", { userName, email, password })
		.then((res) => res.data);

// Log in a user
export const logindata = ({ userName, password }) =>
	axios
		.post("/api/auth/login", { userName, password })
		.then((res) => res.data);

// Sign out a user
export const signout = () =>
	axios
		.post("/api/auth/logout", {}, { withCredentials: true })
		.then((res) => res.data);

// Upload profile image
export const uploadImage = (formData) =>
	axios
		.post("/api/profile/upload", formData, {
			withCredentials: true,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((res) => res.data);

// Update profile data
export const updateProfile = (profile) =>
	axios
		.put("/api/profile", profile, { withCredentials: true })
		.then((res) => res.data);

// Get the paneldata
export const getPanelData = () =>
	axios
		.get("/api/profile", { withCredentials: true })
		.then((res) => res.data);

// Fetch comments
export const commentsFetch = (blogId) =>
	axios.get(`/api/comment/getPostComments/${blogId}`).then((res) => res.data);

// Create comment
export const createComment = (comment) =>
	axios
		.post(`/api/comment/create`, comment, { withCredentials: true })
		.then((res) => res.data);

export const getgroups = async (role = "member") => {
	return axios.get(`/api/group?role=${role}`).then((res) => res.data);
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

export const request = async (data) => {
	return axios.post(`/api/group/request`, data, { withCredentials: true });
};

export const getGroupJoinRequests = async () => {
	return axios
		.get(`/api/group/r/request`, { withCredentials: true })
		.then((res) => res.data);
};

export const approve = async (data) => {
	return axios.post(`/api/group/approve`, data, { withCredentials: true });
};

export const updateLike = (eventId) => {
	axios.post(`api/like/${eventId}`);
};

export const getGroupByEventId = (eventId) =>
	axios
		.get(`/api/group/byEvent/${eventId}`, { withCredentials: true })
		.then((res) => res.data);

export const getAppliedEvents = (eventId) =>
	axios
		.get(`/api/payment/${eventId}`, { withCredentials: true })
		.then((res) => res.data);
