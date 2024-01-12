import { gql } from "@apollo/client";

export default gql`
	mutation RemoveGroup($id: ID) {
		removeGroup(id: $id) {
			id
			title
			description
		}
	}
`;
