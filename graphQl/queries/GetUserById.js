import { gql } from "@apollo/client";

export default gql`
	query User($id: ID) {
		user(id: $id) {
			id
			first_name
			parent_name
			rest_of_name
			dateOfBirth
			email
			gender
			nationalID
			parentPhone
			phone
			roles {
				id
				resource_id
				resource_type
				title
			}
		}
	}
`;
