// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react";

const rules = {
    $default: {
        allow: {
            view: "true",
            create: "auth.id != null",
            update: "auth.id != null",
            delete: "false",
        },
    },
    clicks: {
        allow: {
            create: "auth.id != null",
            update: "false",
        },
    },
} satisfies InstantRules;

export default rules;
