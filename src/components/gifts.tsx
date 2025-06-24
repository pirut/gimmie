"use client";

import { db } from "@/lib/instantdb";
import GiveDollarButton from "@/components/give-dollar-button";

export default function Dollars() {
    const { data, isLoading, error } = db.useQuery({ dollars: {}, displayNames: {} });

    if (isLoading) return <div>Loading dollars...</div>;
    if (error) return <div className="text-red-500">Error: {error.message}</div>;

    const dollars = data?.dollars ?? [];
    const displayNames = data?.displayNames ?? [];

    // Sort dollars by createdAt in descending order (latest first) and limit to 100
    const sortedDollars = dollars.sort((a, b) => b.createdAt - a.createdAt).slice(0, 100);

    const total = dollars.length;

    // Map userId to displayName
    const displayNameMap: Record<string, string> = {};
    for (const entry of displayNames) {
        displayNameMap[entry.userId] = entry.displayName;
    }

    return (
        <div className="mb-8 w-full max-w-md mx-auto bg-card p-4 rounded-lg border">
            <div className="flex flex-col items-center gap-4 mb-4">
                <h2 className="text-xl font-bold">Total Dollars Given: {total}</h2>
                <GiveDollarButton />
            </div>
            <ul className="divide-y divide-gray-200">
                {sortedDollars.length === 0 && <li className="py-2 text-muted-foreground">No dollars given yet.</li>}
                {sortedDollars.map((dollar) => (
                    <li key={dollar.id} className="py-2 flex justify-between text-sm">
                        <span>$1 from {displayNameMap[dollar.userId] || "Anonymous"}</span>
                        <span className="text-xs text-gray-400">{new Date(dollar.createdAt).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
            {dollars.length > 100 && <div className="text-center text-sm text-muted-foreground mt-2">Showing latest 100 of {total} dollars</div>}
        </div>
    );
}
