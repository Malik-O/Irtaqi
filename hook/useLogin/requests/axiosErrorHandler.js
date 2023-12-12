export default function (err) {
	switch (err.code) {
		case "ERR_BAD_REQUEST":
			return "invalidLoginData";
		case "ERR_NETWORK":
			return "networkError";
		default:
			return "QueryError";
	}
}
