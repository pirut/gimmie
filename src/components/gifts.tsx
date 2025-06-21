"use client";

import { useUser } from "@clerk/nextjs";
import { db } from "@/lib/instantdb";

export default function Dollars() {
    const { user } = useUser();
    const { data, isLoading, error } = db.useQuery({ dollars: {}, displayNames: {} });

    if (isLoading) return <div>Loading dollars...</div>;
    if (error) return <div className="text-red-500">Error: {error.message}</div>;

    const dollars = data?.dollars ?? [];
    const displayNames = data?.displayNames ?? [];
    const total = dollars.length;

    // Map userId to displayName
    const displayNameMap: Record<string, string> = {};
    for (const entry of displayNames) {
        displayNameMap[entry.userId] = entry.displayName;
    }

    return (
        <div className="mb-8 w-full max-w-md mx-auto bg-card p-4 rounded-lg border">
            <h2 className="text-xl font-bold mb-2">Total Dollars Given: {total}</h2>
            <ul className="divide-y divide-gray-200">
                {dollars.length === 0 && <li className="py-2 text-muted-foreground">No dollars given yet.</li>}
                {dollars.map((dollar) => (
                    <li key={dollar.id} className="py-2 flex justify-between text-sm">
                        <span>
                            $1 from{" "}
                            {dollar.userId === user?.id ? displayNameMap[dollar.userId] || dollar.userId : displayNameMap[dollar.userId] || dollar.userId}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(dollar.createdAt).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
