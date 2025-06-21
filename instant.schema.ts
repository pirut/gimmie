import { i } from "@instantdb/react";

const schema = i.schema({
    entities: {
        dollars: i.entity({
            userId: i.string(),
            createdAt: i.number(),
        }),
        displayNames: i.entity({
            userId: i.string().unique(),
            displayName: i.string(),
        }),
    },
});

export default schema;
