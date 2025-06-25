// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react";

const rules = {
    $default: {
        allow: {
            view: "true",
            create: "false",
            update: "false",
            delete: "false",
        },
    },
    dollars: {
        allow: {
            view: "true",
            create: "false",
            update: "false",
            delete: "false",
        },
    },
    displayNames: {
        allow: {
            view: "true",
            create: "false",
            update: "false",
            delete: "false",
        },
    },
} satisfies InstantRules;

export default rules;
