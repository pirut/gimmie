"use client";

import { db } from "@/lib/instantdb";
import { Header } from "@/components/header";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription, CardAction } from "@/components/ui/card";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Checkout from "@/components/checkout";

// Types based on schema
export type Dollar = {
    id: string;
    createdAt: number;
    userId: string;
    used?: boolean;
    usedFor?: string;
};
export type DisplayName = {
    id: string;
    displayName: string;
    userId: string;
};

// Reusable dialog for giving a dollar (Stripe checkout)
function GiveDollarDialog({ trigger }: { trigger: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Give a Dollar</DialogTitle>
                    <DialogDescription>Complete your donation securely with Stripe checkout.</DialogDescription>
                </DialogHeader>
                <Checkout />
            </DialogContent>
        </Dialog>
    );
}

export default function LeaderboardPage() {
    // Fetch all dollars and display names
    const { data, isLoading, error } = db.useQuery({ dollars: {}, displayNames: {} });

    // Map userId to displayName
    const displayNameMap: Record<string, string> = useMemo(() => {
        const map: Record<string, string> = {};
        (data?.displayNames ?? []).forEach((entry: DisplayName) => {
            map[entry.userId] = entry.displayName;
        });
        return map;
    }, [data?.displayNames]);

    // Count dollars per user
    const leaderboard = useMemo(() => {
        const counts: Record<string, number> = {};
        (data?.dollars ?? []).forEach((d: Dollar) => {
            counts[d.userId] = (counts[d.userId] || 0) + 1;
        });
        // Convert to array and sort
        return Object.entries(counts)
            .map(([userId, count]) => ({
                userId,
                displayName: displayNameMap[userId] || "Anonymous",
                count,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 100);
    }, [data?.dollars, displayNameMap]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <Card className="w-full max-w-2xl mx-auto shadow-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 animate-in fade-in duration-700 relative">
                    <CardAction className="absolute top-6 right-6 z-10">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    What is this?
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>About the Leaderboard</DialogTitle>
                                    <DialogDescription>
                                        This leaderboard celebrates the top 100 people who have given a dollar on this site. The more dollars you give, the
                                        higher you climb!
                                    </DialogDescription>
                                    <Card className="mt-4">
                                        <CardContent className="flex flex-col gap-2 py-4">
                                            <CardDescription>• Each $1 given counts as one point.</CardDescription>
                                            <CardDescription>• Display names are shown if you set one.</CardDescription>
                                            <CardDescription>• The top 3 are honored with special medals 🥇🥈🥉.</CardDescription>
                                            <CardDescription>• Want to see your name here? Give a dollar!</CardDescription>
                                        </CardContent>
                                    </Card>
                                </DialogHeader>
                                <div className="flex justify-center mt-4">
                                    <GiveDollarDialog trigger={<Button className="w-full max-w-xs">Give a Dollar</Button>} />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardAction>
                    <CardHeader className="flex flex-col items-center gap-2 pb-2">
                        <CardTitle className="text-3xl font-extrabold flex items-center gap-2">🏆 Leaderboard</CardTitle>
                        <CardDescription className="text-lg text-yellow-700 font-semibold tracking-wide">Top 100 Most Generous Givers</CardDescription>
                        <CardDescription className="text-sm text-muted-foreground">Thank you for making this silly dream a reality!</CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-x-auto px-0">
                        {isLoading ? (
                            <div className="text-center py-8 text-lg font-medium animate-pulse">Loading leaderboard...</div>
                        ) : error ? (
                            <div className="text-red-500 text-center py-8">Error: {error.message}</div>
                        ) : leaderboard.length === 0 ? (
                            <div className="text-muted-foreground text-center py-8">No donations yet.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-separate border-spacing-y-1 mt-2">
                                    <thead>
                                        <tr>
                                            <th className="py-3 px-4 bg-yellow-200 rounded-l-lg text-lg font-bold text-yellow-900">#</th>
                                            <th className="py-3 px-4 bg-yellow-200 text-lg font-bold text-yellow-900">Name</th>
                                            <th className="py-3 px-4 bg-yellow-200 rounded-r-lg text-lg font-bold text-yellow-900">Total Dollars</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaderboard.map((entry, idx) => {
                                            // Emoji for top 3
                                            let placeIcon = null;
                                            if (idx === 0) placeIcon = "🥇";
                                            else if (idx === 1) placeIcon = "🥈";
                                            else if (idx === 2) placeIcon = "🥉";
                                            // Row highlight for top 1
                                            const rowClass =
                                                idx === 0
                                                    ? "bg-yellow-100/90 font-extrabold text-yellow-900 shadow-lg animate-pulse"
                                                    : idx % 2 === 0
                                                    ? "bg-white/80"
                                                    : "bg-yellow-50/80";
                                            return (
                                                <tr key={entry.userId} className={`transition-all duration-200 ${rowClass} hover:bg-yellow-200/70`}>
                                                    <td className="py-2 px-4 text-xl font-bold text-center align-middle">
                                                        {placeIcon ? (
                                                            <span className="mr-1" title={`Place ${idx + 1}`}>
                                                                {placeIcon}
                                                            </span>
                                                        ) : null}
                                                        <span className="align-middle">{idx + 1}</span>
                                                    </td>
                                                    <td className="py-2 px-4 text-lg font-semibold align-middle">{entry.displayName}</td>
                                                    <td className="py-2 px-4 text-lg font-mono align-middle">
                                                        <span className="inline-block bg-yellow-300/60 rounded px-2 py-1 font-bold text-yellow-900 shadow-sm">
                                                            ${entry.count}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col items-center gap-2 pt-4">
                        <GiveDollarDialog
                            trigger={
                                <Button size="lg" className="w-full max-w-xs mx-auto">
                                    Give a Dollar
                                </Button>
                            }
                        />
                        <span>Want to see your name here? Every dollar counts!</span>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}
