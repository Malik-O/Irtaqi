import { gql } from "@apollo/client";

export default gql`
	mutation Mutation(
		$first_name: String
		$parent_name: String
		$rest_of_name: String
		$gender: Boolean
		$dateOfBirth: String
		$nationalID: String
		$email: String
		$phone: String
		$parentPhone: String
		$roleTitle: String
		$resourceIds: [String]
	) {
		createUser(
			first_name: $first_name
			parent_name: $parent_name
			rest_of_name: $rest_of_name
			gender: $gender
			dateOfBirth: $dateOfBirth
			nationalID: $nationalID
			email: $email
			phone: $phone
			parentPhone: $parentPhone
			role_title: $roleTitle
			resource_ids: $resourceIds
		) {
			dateOfBirth
			email
			first_name
			gender
			id
			parentPhone
			nationalID
			parent_name
			phone
			rest_of_name
			roles {
				id
				title
				resource_type
				resource_id
			}
		}
	}
`;
