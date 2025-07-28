import { z } from "zod/v4";

const envSchema = z
	.object({
		baseUrl: z.string(),
	})
	.readonly();

export const env = envSchema.parse({
	baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
});
