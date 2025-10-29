import { z } from "zod";

const envSchema = z
	.object({
		EXPO_PUBLIC_BASE_URL: z.string(),
	})
	.readonly();

export const env = envSchema.parse(process.env);
