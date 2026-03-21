import "../global.css";

import { Toasts } from "@backpackapp-io/react-native-toast";
import { PortalHost } from "@rn-primitives/portal";
import { SplashScreen, Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { authClient } from "@/lib/auth-client";
import { AsyncProvider } from "@/providers/async";

SplashScreen.preventAutoHideAsync();

function useSession() {
	const [state, setState] = React.useState(() => authClient.useSession.get());

	React.useEffect(() => {
		return authClient.useSession.subscribe(setState);
	}, []);

	return state;
}
export default function Layout() {
	const session = useSession();

	if (session.isPending) {
		return null;
	}

	SplashScreen.hideAsync();

	return (
		<GestureHandlerRootView>
			<AsyncProvider>
				<SafeAreaProvider>
					<Stack>
						<Stack.Protected guard={!!session.data?.user}>
							<Stack.Screen
								name="(dashboard)/index"
								options={{ title: "Dashboard" }}
							/>
						</Stack.Protected>
						<Stack.Screen
							name="(auth)/login"
							options={{ headerShown: false }}
						/>
					</Stack>
					<PortalHost />
					<StatusBar backgroundColor="transparent" barStyle="dark-content" />
					<Toasts />
				</SafeAreaProvider>
			</AsyncProvider>
		</GestureHandlerRootView>
	);
}
