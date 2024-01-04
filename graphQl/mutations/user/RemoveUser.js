import { gql } from "@apollo/client";

export default gql`
	mutation Mutation($UserID: ID) {
		removeUser(id: $UserID)
	}
`;
