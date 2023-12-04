import { gql } from "@apollo/client";

export default gql`
	mutation Mutation(
		$user_id: ID
		$status: String
		$date: String
		$note: String
		$updated_by: ID
	) {
		updateAttendance0(
			user_id: $user_id
			status: $status
			date: $date
			note: $note
			updated_by: $updated_by
		) {
			id
			user_id
			status
			date
			note
			updated_by
		}
	}
`;
