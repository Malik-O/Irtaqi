import { gql } from "@apollo/client";

export default gql`
	query Groups($user_id: ID) {
		groups(user_id: $user_id) {
			id
			as
			title
		}
	}
`;
