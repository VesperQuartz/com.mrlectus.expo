import { expoClient } from "@better-auth/expo/client";
import { env } from "@repo/shared";
import {
	type BetterAuthClientOptions,
	createAuthClient,
} from "better-auth/client";
import { adminClient, usernameClient } from "better-auth/client/plugins";
import * as SecureStore from "expo-secure-store";

const authClientConfig: BetterAuthClientOptions = {
	baseURL: env.EXPO_PUBLIC_API_URL,
	fetchOptions: {
		credentials: "include",
	},
	plugins: [
		usernameClient(),
		adminClient(),
		expoClient({
			scheme: "mobile",
			storagePrefix: "auth__",
			storage: SecureStore,
		}),
	],
};

export const authClient = createAuthClient(authClientConfig) as ReturnType<
	typeof createAuthClient<typeof authClientConfig>
>;
