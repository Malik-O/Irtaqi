import axios from "axios";

export default async function (API_URL, token) {
	const options = {
		method: "GET",
		url: `${API_URL}/auth/user`,
		headers: {
			authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.request(options);
	return response.data;
}
