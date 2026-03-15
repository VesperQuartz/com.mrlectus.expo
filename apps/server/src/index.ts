import { auth } from "@repo/auth";
import { handler } from "@repo/orpc/server";
import { upgradeWebSocket, websocket } from "hono/bun";
import { cors } from "hono/cors";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { pinoLogger } from "hono-pino";
import { pino } from "pino";
import { authMiddleware, factory } from "./factory";

const app = factory.createApp().basePath("/api");

app.use(poweredBy());
app.use(secureHeaders());
app.use(requestId());
app.use(
	pinoLogger({
		pino: pino({
			level: "info",
			transport: {
				target: "hono-pino/debug-log",
			},
		}),
		contextKey: "logger" as const,
	}),
);
app.use(prettyJSON());
app.use(
	cors({
		origin: "*",
		credentials: true,
	}),
);

app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) {
		c.set("user", null);
		c.set("session", null);
		await next();
		return;
	}

	c.set("user", session.user);
	c.set("session", session.session);
	await next();
});

app.on(["POST", "GET"], "/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

app.use("/rpc/*", async (c, next) => {
	const { matched, response } = await handler.handle(c.req.raw, {
		prefix: "/api/rpc",
	});

	if (matched) {
		return c.newResponse(response.body, response);
	}
	await next();
});

app.get("/", authMiddleware, (c) => {
	return c.json("Hello Hono!");
});

app.get(
	"/ws",
	upgradeWebSocket(async (c) => {
		const user = c.get("user");
		const groupId = c.req.header("X-group-id");
		return {
			onOpen: (_evt, ws) => {
				ws.raw?.subscribe(String(groupId));
				const msg = `user ${user.name} has entered group ${groupId}`;
				ws.raw?.publishText(String(groupId), msg);
			},
			onMessage: async (evt, ws) => {
				ws.raw?.publishText(String(groupId), evt.data.toString());
			},
			onClose: () => {
				console.log("connection closed");
			},
		};
	}),
);

export default {
	fetch: app.fetch,
	websocket,
};
