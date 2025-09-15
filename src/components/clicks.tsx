"use client";

import { db } from "@/lib/instantdb";
import GiveClickButton from "@/components/give-click-button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { MousePointerClick } from "lucide-react";

export default function Clicks() {
    const { data, isLoading, error } = db.useQuery({ clicks: {}, displayNames: {} });

    if (isLoading) return <div>Loading clicks...</div>;
    if (error) return <div className="text-red-500">Error: {error.message}</div>;

    const clicks = data?.clicks ?? [];
    const displayNames = data?.displayNames ?? [];

    // Sort clicks by createdAt in descending order (latest first) and limit to 100
    const sortedClicks = [...clicks].sort((a, b) => b.createdAt - a.createdAt).slice(0, 100);

    const total = clicks.length;

    // Map userId to displayName
    const displayNameMap: Record<string, string> = {};
    for (const entry of displayNames) {
        displayNameMap[entry.userId] = entry.displayName;
    }

    return (
        <Card className="mb-8 w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-2 sm:px-4 md:px-8">
            <CardHeader className="flex flex-col items-center gap-4 mb-4">
                <CardTitle className="text-xl font-bold text-center">
                    Total Clicks Recorded: <br /> {total}
                </CardTitle>
                <GiveClickButton />
            </CardHeader>
            <CardContent className="p-0">
                <ul className="divide-y divide-gray-200">
                    {sortedClicks.length === 0 && <li className="py-2 text-muted-foreground">No clicks recorded yet.</li>}
                    {sortedClicks.map((click) => (
                        <li key={click.id} className="py-2 flex justify-between text-sm gap-10 px-6">
                            <span className="flex items-center gap-2">
                                <MousePointerClick className="h-4 w-4" /> 1 click from {displayNameMap[click.userId] || "Anonymous"}
                            </span>
                            <span className="text-xs text-gray-400">{new Date(click.createdAt).toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
                {clicks.length > 100 && (
                    <CardDescription className="text-center text-sm text-muted-foreground mt-2">Showing latest 100 of {total} clicks</CardDescription>
                )}
            </CardContent>
        </Card>
    );
}
