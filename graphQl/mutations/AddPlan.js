import { gql } from "@apollo/client";

export default gql`
	mutation Mutation(
		$entityId: ID
		$entityType: String
		$title: String
		$color: String
		$orderReversed: Boolean
		$from: Int
		$amount: Int
		$weeks: Int
		$rabtAmount: Int
		$workingDays: [Int]
		$startingAt: String
		$note: String
	) {
		addPlan(
			entity_id: $entityId
			entity_type: $entityType
			title: $title
			color: $color
			order_reversed: $orderReversed
			from: $from
			amount: $amount
			weeks: $weeks
			rabt_amount: $rabtAmount
			working_days: $workingDays
			starting_at: $startingAt
			note: $note
		) {
			id
			rabt_for_plan_id
			entity_id
			entity_type
			title
			color
			order_reversed
			from
			amount
			weeks
			rabt_amount
			working_days
			starting_at
			custom
			note
			Plans_instances {
				date
				from
				id
				note
				to
			}
		}
	}
`;
