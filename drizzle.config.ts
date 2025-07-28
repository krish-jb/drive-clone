import type { Config } from "drizzle-kit";

import { env } from "~/env";

export default {
    schema: "./src/server/db/schema.ts",
    dialect: "singlestore",
    dbCredentials: {
        database: env.SINGLESTORE_DB_NAME,
        host: env.SINGLESTORE_HOST,
        password: env.SINGLESTORE_USER_PASS,
        port: Number.parseInt(env.SINGLESTORE_PORT),
        ssl: {},
        user: env.SINGLESTORE_USER,
    },
    tablesFilter: ["drive-clone_*"],
} satisfies Config;
