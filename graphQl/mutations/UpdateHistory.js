import { gql } from "@apollo/client";

export default gql`
	mutation Mutation(
		$plan_instance_id: ID
		$amount_done: Int
		$grade: Int
		$date: String
	) {
		updateHistory0(
			plan_instance_id: $plan_instance_id
			amount_done: $amount_done
			grade: $grade
			date: $date
		) {
			id
			plan_instance_id
			date
			grade
			amount_done
		}
	}
`;
