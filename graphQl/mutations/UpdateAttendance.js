import { gql } from "@apollo/client";

export default gql`
	mutation Mutation(
		$userId: ID
		$status: String
		$date: String
		$note: String
		$updatedBy: ID
	) {
		updateAttendance(
			user_id: $userId
			status: $status
			date: $date
			note: $note
			updated_by: $updatedBy
		)
	}
`;
