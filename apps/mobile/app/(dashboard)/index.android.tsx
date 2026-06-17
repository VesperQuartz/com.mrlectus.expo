import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";
import { Container } from "@/components/Container";
import { orpc } from "@/lib/orpc";

export default function Home() {
	const task = useQuery(orpc.todos.list.queryOptions());

	console.log(task.data, "TASK DATA1");

	return (
		<Container>
			<View>
				<Text>{JSON.stringify(task.data)}</Text>
				<Text>Dashboard</Text>
			</View>
		</Container>
	);
}
