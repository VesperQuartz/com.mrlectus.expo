import { env } from "@repo/shared";
import { db } from "@repo/storage";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
	admin as adminPlugin,
	bearer,
	openAPI,
	username,
} from "better-auth/plugins";
import { ac, adminRole, customRole, userRole } from "./permission";

export const auth = betterAuth({
	baseURL: env.BETTER_AUTH_URL,
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	emailAndPassword: {
		enabled: true,
		// requireEmailVerification: true,
		// customSyntheticUser: ({ coreFields, additionalFields, id }) => ({
		// 	...coreFields,
		// 	role: "user", // or your configured defaultRole
		// 	banned: false,
		// 	banReason: null,
		// 	banExpires: null,
		// 	...additionalFields,
		// 	id,
		// }),
	},
	trustedOrigins: [
		"https://*.ngrok-free.app",
		"mobile://",
		...(process.env.NODE_ENV === "development"
			? [
					"exp://", // Trust all Expo URLs (prefix matching)
					"exp://**", // Trust all Expo URLs (wildcard matching)
					"exp://192.168.*.*:*/**", // Trust 192.168.x.x IP range with any port and path
				]
			: []),
	],
	plugins: [
		openAPI(),
		bearer(),
		username(),
		adminPlugin({
			ac,
			roles: {
				admin: adminRole,
				user: userRole,
				custom: customRole,
				superadmin: adminRole,
			},
			adminRoles: ["admin", "superadmin"],
		}),
	],
});
