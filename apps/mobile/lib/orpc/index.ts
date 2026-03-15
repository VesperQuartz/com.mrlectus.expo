import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { client } from "@repo/orpc/client";

export const orpc = createTanstackQueryUtils(client);
