import { expoClient } from "@better-auth/expo/client";
import { env } from "@repo/shared";
import { createAuthClient } from "better-auth/client";
import { adminClient, usernameClient } from "better-auth/client/plugins";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
	baseURL: env.EXPO_PUBLIC_API_URL,
	plugins: [
		usernameClient(),
		adminClient(),
		expoClient({
			scheme: "mobile",
			storagePrefix: "auth__",
			storage: SecureStore,
		}),
	],
});
