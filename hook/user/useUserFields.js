import { useMemo } from "react";

export default function () {
	return useMemo(
		() => ({
			static: [
				{ label: "nationalID" },
				{ label: "gender" },
				{ label: "dateOfBirth", date: true },
			],
			editable: [
				{
					label: "email",
					keyboardType: "email-address",
					errorHint: "emailHint",
				},
				{
					label: "phone",
					keyboardType: "phone-pad",
					errorHint: "requiredHint",
				},
				{
					label: "parentPhone",
					keyboardType: "phone-pad",
					errorHint: "requiredHint",
				},
			],
		}),
		[],
	);
}
