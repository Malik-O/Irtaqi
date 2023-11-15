import { useEffect } from "react";
import { Button, Text } from "react-native";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
// redux
import { useSelector, useDispatch } from "react-redux";
//* components
import ScreenView from "../../../../components/ScreenView";
import ScreenText from "../../../../components/ScreenText";
import GlobalDatePicker from "../../../../components/GlobalDatePicker";
import UserCard from "../../../../components/UserCard";
//* hook
import useGroupAttendance from "../../../../hook/attendance/useGroupAttendance";
//* utils
import fStudentsFromGroup from "../../../../utils/fStudentsFromGroup";

export default function attendance() {
	const { groupID } = useLocalSearchParams();
	const { loading, refetchGroupAttendance } = useGroupAttendance();
	// redux
	const { groups, attendanceHistory } = useSelector((state) => state.groups);
	const students = fStudentsFromGroup({ groups, groupID });
	return (
		<ScreenView>
			{/* <GlobalDatePicker /> */}
			<ScreenText>
				attendance: {loading + ""} {}
			</ScreenText>
			<ScreenText>
				{JSON.stringify(attendanceHistory, null, 2)}
			</ScreenText>
			<Button title="refresh" onPress={refetchGroupAttendance} />
			{students.map((student, i) => (
				<UserCard key={i} student={student} />
			))}
		</ScreenView>
	);
}
