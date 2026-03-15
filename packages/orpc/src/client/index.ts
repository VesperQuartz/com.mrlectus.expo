import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { env } from "@repo/shared";
import type { router } from "../routers";

const baseUrl = env.EXPO_PUBLIC_API_URL;

export const link = new RPCLink({
	url: `${baseUrl}/api/rpc`,
	method: ({ context }, path) => {
		// Use GET for cached responses
		if (context["cache"]) {
			return "GET";
		}

		// Use GET for rendering requests
		// Use GET for read-like operations
		if (path.at(-1)?.match(/^(?:get|find|list|search|show)(?:[A-Z].*)?$/)) {
			return "GET";
		}

		// Use PUT for update-like operations
		if (path.at(-1)?.match(/^(?:update|change)(?:[A-Z].*)?$/)) {
			return "PUT";
		}

		// Use PATCH for patch-like operations
		if (path.at(-1)?.match(/^(?:patch)(?:[A-Z].*)?$/)) {
			return "PATCH";
		}
		return "POST";
	},
});

// const link = new RPCLink({
// 	headers: () => ({
// 		authorization: "Bearer token",
// 	}),
// 	// fetch: <-- provide fetch polyfill fetch if needed
// 	interceptors: [
// 		onError((error) => {
// 			console.error(error);
// 		}),
// 	],
// });
//
//
export const client: RouterClient<typeof router> = createORPCClient(link);
