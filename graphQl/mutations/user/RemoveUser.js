import { gql } from "@apollo/client";

export default gql`
	mutation Mutation($UserID: ID) {
		removeUser(id: $UserID) {
			id
			first_name
			rest_of_name
			parent_name
		}
	}
`;
