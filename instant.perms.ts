// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react";

const rules = {
    $default: {
        allow: {
            view: "true",
            create: "true",
            delete: "true",
            update: "true",
        },
    },
} satisfies InstantRules;

export default rules;
