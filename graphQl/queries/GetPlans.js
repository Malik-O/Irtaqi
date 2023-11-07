import { gql } from "@apollo/client";

export default gql`
	query Plans($entityID: ID) {
		plans(entity_id: $entityID) {
			amount
			id
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
