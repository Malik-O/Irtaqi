import { gql } from "@apollo/client";

export default gql`
	query RootQueryType($nationalID: String) {
		isNationalIDExists(nationalID: $nationalID) {
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
`;
