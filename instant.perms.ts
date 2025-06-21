import type { InstantRules } from "@instantdb/react";

const rules = {
    $default: {
        allow: {
            view: "true",
            create: "true",
            update: "true",
            delete: "true",
        },
    },
} satisfies InstantRules;

export default rules;
