import { gql } from "@apollo/client";

export default gql`
	query Groups($user_id: ID) {
		groups(user_id: $user_id) {
			id
			as
			title
			staff {
				id
				as
				first_name
				parent_name
				rest_of_name
				dateOfBirth
				email
				gender
				nationalID
				parentPhone
				phone
			}
			courses {
				id
				title
				floatingStudents {
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
				}
				subgroups {
					id
					title
					student_ids
					students {
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
					}
				}
			}
		}
	}
`;
