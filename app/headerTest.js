import { useRef, useState } from "react";
import { Button, Card, Text } from "react-native-paper";
import { useSharedValue, withTiming } from "react-native-reanimated";
import CoolScrollView from "../components/CoolScrollView";
import CoolTabsView from "../components/CoolTabsView";
import ScreenView from "../components/ScreenView";

export default function () {
	return (
		<ScreenView hasScrollView={false} paddingTop={false}>
			<CoolScrollView props={{ title: "Group", more: true, back: true }}>
				{new Array(10).fill().map((_, i) => (
					<Card style={{ margin: 20 }} key={i}>
						<Card.Title
							title="Card Title"
							subtitle="Card Subtitle"
						/>
						<Card.Content>
							<Text variant="titleLarge">Card title</Text>
							<Text variant="bodyMedium">Card content</Text>
						</Card.Content>
						<Card.Actions>
							<Button>Cancel</Button>
							<Button>Ok</Button>
						</Card.Actions>
					</Card>
				))}
			</CoolScrollView>
		</ScreenView>
	);
}
