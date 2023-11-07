import { gql } from "@apollo/client";

export default gql`
	query PlanInstanceHistoryAtDate($planInstanceId: ID, $date: String) {
		PlanInstanceHistoryAtDate(
			plan_instance_id: $planInstanceId
			date: $date
		) {
			id
			amount_done
			plan_instance_id
			updated_by
			date
			grade
			note
			createdAt
			updatedAt
		}
	}
`;
