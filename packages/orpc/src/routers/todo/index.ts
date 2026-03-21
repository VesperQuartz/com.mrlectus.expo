import { base } from "#/routers/base";

export const listTodos = base
	.route({
		method: "GET",
	})
	.handler(async ({ context }) => {
		return [
			{
				id: Math.random() * 100,
				task: "today is a big day",
			},
		];
	});
