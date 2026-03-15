import "../global.css";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AsyncProvider } from "@/providers/async";

export default function Layout() {
	return (
		<AsyncProvider>
			<SafeAreaProvider>
				<Stack />
			</SafeAreaProvider>
		</AsyncProvider>
	);
}
