import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { withTiming } from "react-native-reanimated";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
// redux
import { useSelector, useDispatch } from "react-redux";
//* components
import ScreenView from "../../../../components/ScreenView";
import ScreenText from "../../../../components/ScreenText";
import GlobalDatePicker from "../../../../components/GlobalDatePicker";
import AttendanceCard from "../../../../components/AttendanceCard";
import ScrollViewWithPicker from "../../../../components/ScrollViewWithPicker";
//* hook
import useGroupAttendance from "../../../../hook/attendance/useGroupAttendance";
//* utils
import fStudentsFromGroup from "../../../../utils/fStudentsFromGroup";

const navigationData = [
	{ first_name: "محمد علاء", id: "6514396c1ffb2f1f855acff8", selected: true },
	{ first_name: "زياد مصطفى", id: "6553dc479c1608ae3fbacca1" },
];
export default function () {
	const { groupID } = useLocalSearchParams();
	const { isLoading, refetchGroupAttendance } = useGroupAttendance();
	// redux
	const { groups, attendanceHistory } = useSelector((state) => state.groups);
	const students = fStudentsFromGroup({ groups, groupID });
	async function refetchPage(sharedValue, newValue) {
		await refetchGroupAttendance();
		console.log("done", sharedValue, newValue);
		sharedValue.value = newValue;
		// console.log("callBack:", callBack);
		// return refetchGroupAttendance();
		// callBack();
	}
	return (
		<ScrollViewWithPicker
			hasNavigationHeader={false}
			onRefresh={refetchGroupAttendance}
		>
			{/* <ScreenText>attendance: {isLoading + ""}</ScreenText>
			<ScreenText>
				{JSON.stringify(attendanceHistory, null, 2)}
			</ScreenText> */}
			{/* <Button title="refresh" onPress={refetchGroupAttendance} /> */}
			{isLoading ? (
				<ActivityIndicator style={{ marginTop: 20 }} size="large" />
			) : (
				students.map((student, i) => (
					<AttendanceCard key={i} student={student} />
				))
			)}
		</ScrollViewWithPicker>
	);
}
