import { gql } from "@apollo/client";

export default gql`
	mutation (
		$entityId: ID
		$entityType: String
		$from: Int
		$title: String
		$amount: Int
		$weeks: Int
		$workingDays: [Int]
		$orderReversed: Boolean
		$startingAt: String
	) {
		addPlan(
			entity_id: $entityId
			entity_type: $entityType
			from: $from
			title: $title
			amount: $amount
			weeks: $weeks
			working_days: $workingDays
			order_reversed: $orderReversed
			starting_at: $startingAt
		) {
			id
			amount
			from
			order_reversed
			note
			weeks
			title
			working_days
			starting_at
			rabt_for_plan_id
			rabt_amount
			entity_type
			entity_id
			color
			Plans_instances {
				id
				from
				to
				date
			}
		}
	}
`;
