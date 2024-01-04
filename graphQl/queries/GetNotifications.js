import { gql } from "@apollo/client";

export default gql`
	query Notifications($userID: ID!) {
		notifications(userID: $userID) {
			id
			icon
			message
			seen
			type
			data
			createdAt
		}
	}
`;
