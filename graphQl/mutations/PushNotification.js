import { gql } from "@apollo/client";

export default gql`
	mutation Mutation(
		$userID: ID
		$message: String
		$type: String
		$seen: Boolean
		$icon: String
		$error: String
	) {
		pushNotification(
			userID: $userID
			message: $message
			type: $type
			seen: $seen
			icon: $icon
			error: $error
		) {
			createdAt
			icon
			id
			message
			seen
			type
			userID
		}
	}
`;
