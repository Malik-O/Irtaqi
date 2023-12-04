import { gql } from "@apollo/client";

export default gql`
	mutation Mutation($userID: ID!) {
		seenAllNotifications(userID: $userID)
	}
`;
