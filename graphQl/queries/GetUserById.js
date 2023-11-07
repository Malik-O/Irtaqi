import { gql } from "@apollo/client";

export default gql`
	query User($id: ID) {
		user(id: $id) {
			first_name
		}
	}
`;
