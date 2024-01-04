import { gql } from "@apollo/client";

export default gql`
	mutation Mutation($centerID: ID, $title: String, $description: String) {
		createGroup(
			center_id: $centerID
			title: $title
			description: $description
		) {
			center_id
			description
			id
			title
		}
	}
`;
