import jwt from "jsonwebtoken";
const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "10d",
	});
	res.cookie("auth", token, {
		httpOnly: true,
		secure: false,
		sameSite: "strict",
		maxAge: 10 * 24 * 60 * 60 * 1000,
	});
};
export default generateToken;
