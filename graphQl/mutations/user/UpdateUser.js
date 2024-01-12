import { gql } from "@apollo/client";

export default gql`
	mutation Mutation(
		$userID: ID
		$email: String
		$parentPhone: String
		$phone: String
	) {
		updateUser(
			id: $userID
			email: $email
			parentPhone: $parentPhone
			phone: $phone
		) {
			id
			dateOfBirth
			email
			first_name
			gender
			nationalID
			parentPhone
			parent_name
			phone
			rest_of_name
		}
	}
`;
