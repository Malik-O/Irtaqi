import { gql } from "@apollo/client";

export default gql`
	mutation Mutation(
		$userID: ID
		$groupID: ID
		$roleTitle: String
		$move: Boolean
		$update: Boolean
		$remove: Boolean
	) {
		assignToGroup(
			user_id: $userID
			group_id: $groupID
			role_title: $roleTitle
			move: $move
			update: $update
			remove: $remove
		)
	}
`;
