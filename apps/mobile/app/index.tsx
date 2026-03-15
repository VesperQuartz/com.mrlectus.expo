import {
	AlertDialog,
	Box,
	Button,
	DateTimePicker,
	Host,
} from "@expo/ui/jetpack-compose";
import { background, size } from "@expo/ui/jetpack-compose/modifiers";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";
import { orpc } from "@/lib/orpc";

export default function Home() {
	const [visible, setVisible] = React.useState(false);
	const [selectedDate, setSelectedDate] = React.useState(new Date());
	const task = useQuery(orpc.todos.list.queryOptions());

	console.log(task.data, "TASK DATA1");

	return (
		<View>
			<Text>{JSON.stringify(task.data)}</Text>
			<Host matchContents>
				<Button onPress={() => setVisible(true)} color="tomato">
					Show Alert
				</Button>
				<AlertDialog
					visible={visible}
					title="Confirm Action"
					text="Are you sure you want to proceed?"
					confirmButtonText="Confirm"
					dismissButtonText="Cancel"
					onConfirmPressed={() => {
						console.log("Confirmed");
						setVisible(false);
					}}
					onDismissPressed={() => {
						console.log("Dismissed");
						setVisible(false);
					}}
				/>
			</Host>
			<Host matchContents>
				<Box
					contentAlignment="center"
					modifiers={[size(200, 200), background("#E0E0E0")]}
				>
					<Text>Centered in Box</Text>
				</Box>
			</Host>
			<Host matchContents>
				<DateTimePicker
					onDateSelected={(date) => {
						setSelectedDate(date);
					}}
					displayedComponents="date"
					initialDate={selectedDate.toISOString()}
					variant="input"
				/>
			</Host>
		</View>
	);
}
