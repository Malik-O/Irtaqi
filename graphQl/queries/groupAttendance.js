import { gql } from "@apollo/client";

export default gql`
	query GroupAttendance($date: String, $groupID: ID) {
		groupAttendance(date: $date, group_id: $groupID) {
			id
			status
			user_id
			date
			updated_by
			note
		}
	}
`;
