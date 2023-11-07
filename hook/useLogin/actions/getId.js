// requests
import getUserDataReq from "../requests/getUserDataReq";
import getTokenReq from "../requests/getTokenReq";

const API_URL = "http://192.168.1.2:800";

export default async function (userLoginInfo) {
	// get the token
	const token = await getTokenReq(API_URL, userLoginInfo);
	// get user id
	var {
		user: { _id: id },
	} = await getUserDataReq(API_URL, token);
	return id;
	// update on the app storage
	// await updateUserData({ id });
}
