import axios from "axios";

export default async function (API_URL, userLoginInfo) {
	console.log(`${API_URL}/auth/login`, userLoginInfo);
	const options = {
		method: "POST",
		url: `${API_URL}/auth/login`,
		data: userLoginInfo,
	};
	const response = await axios.request(options);
	return response.data.token;
}
