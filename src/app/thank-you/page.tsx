"use client";

import Dollars from "@/components/gifts";
import { Header } from "@/components/header";
import { useUser } from "@clerk/nextjs";
import { db } from "@/lib/instantdb";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setDisplayName } from "@/app/actions/user";
import { ShareButton } from "@/components/share-button";
import Image from "next/image";

export default function ThankYouPage() {
    const { user } = useUser();
    const { data } = db.useQuery({ dollars: {}, displayNames: {} });
    const [newDisplayName, setNewDisplayName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Find current user's display name
    const displayNames: Array<{ userId: string; displayName: string }> = data?.displayNames ?? [];
    const myDisplayName = user ? displayNames.find((d) => d.userId === user.id)?.displayName : undefined;

    // Get current user's donation count
    type Dollar = { userId: string };
    const myDollarCount = user ? data?.dollars?.filter((d: Dollar) => d.userId === user.id).length || 1 : 1;

    // Show prompt if user is signed in, has no display name, and hasn't just submitted
    const shouldPrompt = user && !myDisplayName && !submitted;

    const submitDisplayName = async () => {
        if (!user || !newDisplayName) return;
        setSubmitted(true);
        try {
            await setDisplayName(newDisplayName);
            setNewDisplayName("");
        } catch (error) {
            console.error("Failed to set display name:", error);
            setSubmitted(false);
        }
    };

    const shareUrl = `https://gimme.jrbussard.com/?amount=${myDollarCount}`;
    const ogImageUrl = `https://gimme.jrbussard.com/api/og?amount=${myDollarCount}`;
    const shareText = `I've given $${myDollarCount} on gimme.jrbussard.com, you should too!`;

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center p-8">
                <h1 className="text-3xl font-bold mb-4">Thank you for your support!</h1>
                <p className="mb-8 text-lg">Your dollar has been received. You rock!</p>
                <div className="flex flex-col items-center w-full max-w-xs mb-6">
                    <ShareButton url={shareUrl} text={shareText} tooltip="Share your dollars!" buttonClassName="" />
                </div>
                <Image src={ogImageUrl} alt={shareText} width={400} height={210} className="rounded-lg shadow mb-8" unoptimized priority />
                {shouldPrompt && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                        <Card>
                            <CardHeader>
                                <CardTitle>Choose a Display Name</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form
                                    className="flex flex-col gap-6"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        submitDisplayName();
                                    }}
                                >
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="displayName">Display Name</Label>
                                        <Input
                                            id="displayName"
                                            value={newDisplayName}
                                            onChange={(e) => setNewDisplayName(e.target.value)}
                                            placeholder="Enter display name"
                                            type="text"
                                            required
                                            autoFocus
                                        />
                                    </div>
                                    <CardFooter className="flex flex-col gap-2">
                                        <Button type="submit" disabled={!newDisplayName}>
                                            Save
                                        </Button>
                                    </CardFooter>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}
                <Dollars />
            </div>
        </>
    );
}
