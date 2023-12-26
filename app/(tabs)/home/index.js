import "../../../wdyr";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Agenda from "../../../components/Agenda";

function index() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Agenda />
		</SafeAreaView>
	);
}
index.whyDidYouRender = {
	logOnDifferentValues: true,
};
export default index;
