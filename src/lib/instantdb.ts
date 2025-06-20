import { i, init } from "@instantdb/react";

const APP_ID = process.env.NEXT_PUBLIC_INSTANTDB_PUBLISHABLE_KEY!;

const schema = i.schema({
    entities: {
        dollars: i.entity({
            userId: i.string(),
            createdAt: i.number(),
        }),
    },
});

export const db = init({ appId: APP_ID, schema });
