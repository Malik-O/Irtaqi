import { gql } from "@apollo/client";

export default gql`
	query Groups($user_id: ID) {
		groups(user_id: $user_id) {
			id
			as
			title
			courses {
				id
				title
				floatingStudents {
					id
					first_name
				}
				subgroups {
					id
					title
					student_ids
					students {
						id
						first_name
					}
				}
			}
		}
	}
`;
