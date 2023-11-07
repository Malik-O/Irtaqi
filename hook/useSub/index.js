// graphQL
import { gql, useSubscription } from "@apollo/client";

const COMMENTS_SUBSCRIPTION = gql`
	subscription {
		newUserSubscription {
			first_name
		}
	}
`;

export default function () {
	const s = useSubscription(COMMENTS_SUBSCRIPTION);
	return s;
}
