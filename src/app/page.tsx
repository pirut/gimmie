"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Checkout from "@/components/checkout";
import Dollars from "@/components/gifts";
import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { db } from "@/lib/instantdb";
import { Cursors } from "@instantdb/react";
import { useEffect } from "react";
import Image from "next/image";

export default function HomePage() {
    const { user } = useUser();
    const room = db.room("chat", "main");
    const { data } = db.useQuery({ dollars: {} });
    const dollars: { userId: string; createdAt: number }[] = data?.dollars ?? [];
    const dollarsGiven = user ? dollars.filter((d) => d.userId === user.id).length : 0;

    // Get publishPresence from usePresence
    const { publishPresence } = room.usePresence();

    useEffect(() => {
        if (user) {
            publishPresence({
                name: user.fullName || user.username || user.primaryEmailAddress?.emailAddress || "Anonymous",
                status: "online",
                profileImageUrl: user.imageUrl,
                dollarsGiven,
            });
        }
    }, [user, dollarsGiven, publishPresence]);

    // Debug: log user on every render
    console.log("User:", user);

    type Presence = {
        name: string;
        status: string;
        profileImageUrl?: string;
        dollarsGiven?: number;
    };

    // Helper to generate a random color based on user id (so it's stable per user)
    function getRandomColor(userId: string) {
        if (!userId) return "#888";
        let hash = 0;
        for (let i = 0; i < userId.length; i++) {
            hash = userId.charCodeAt(i) + ((hash << 5) - hash);
        }
        const h = Math.abs(hash) % 360;
        return `hsl(${h}, 80%, 60%)`;
    }

    function renderCursor({ presence, color }: { presence: Presence; color: string }) {
        // Use random color for others, tomato for self
        const dotColor = presence?.profileImageUrl ? getRandomColor(presence.profileImageUrl) : color;
        return (
            <div style={{ position: "relative", width: 64, height: 64, pointerEvents: "none", zIndex: 0, opacity: 0.6 }}>
                {/* Cursor dot with shadow and border */}
                <div
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        background: dotColor,
                        position: "absolute",
                        left: 16,
                        top: 16,
                        zIndex: 1,
                        boxShadow: "0 4px 16px 0 rgba(0,0,0,0.18)",
                        border: "3px solid #fff",
                        transition: "background 0.3s",
                    }}
                />
                {/* Profile image (top right, spaced out, with slight rotation) */}
                {presence?.profileImageUrl && (
                    <Image
                        src={presence.profileImageUrl}
                        alt="profile"
                        width={32}
                        height={32}
                        style={{
                            position: "absolute",
                            top: -10,
                            right: -10,
                            borderRadius: 16,
                            border: "2px solid #fff",
                            background: "#fff",
                            zIndex: 1,
                            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)",
                            transform: "rotate(-8deg) scale(1.05)",
                        }}
                    />
                )}
                {/* Dollars given (top left, spaced out, fun style) */}
                {typeof presence?.dollarsGiven === "number" && (
                    <div
                        style={{
                            position: "absolute",
                            top: -10,
                            left: -10,
                            background: "linear-gradient(90deg, #fffbe7 60%, #ffe7e7 100%)",
                            color: "#222",
                            borderRadius: 12,
                            padding: "4px 12px",
                            fontSize: 15,
                            fontWeight: 700,
                            zIndex: 1,
                            border: "2px solid #ffe066",
                            fontFamily: "JetBrains Mono, monospace",
                            boxShadow: "0 2px 8px 0 rgba(255,224,102,0.18)",
                            letterSpacing: 1,
                            transform: "rotate(-6deg)",
                        }}
                    >
                        ${presence.dollarsGiven}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Cursors room={room} className="min-w-full h-100vh" userCursorColor="tomato" renderCursor={renderCursor}>
            <div className="min-h-screen flex flex-col relative z-10">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
                    <Dollars />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="lg">Give Me a Dollar</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <SignedIn>
                                <DialogTitle>Throw me A Bone</DialogTitle>
                                <DialogContent className="max-h-full">
                                    <DialogTitle>Throw me A Bone</DialogTitle>
                                    <Checkout />
                                </DialogContent>
                            </SignedIn>
                            <SignedOut>
                                <DialogTitle>You think i would take money from a stranger?</DialogTitle>
                                <div className="flex justify-center justify-self-center gap-4 mt-2">
                                    <SignUpButton>
                                        <Button variant="outline">Sign Up</Button>
                                    </SignUpButton>
                                    <SignInButton>
                                        <Button variant="outline">Sign In</Button>
                                    </SignInButton>
                                </div>
                            </SignedOut>
                        </DialogContent>
                    </Dialog>
                </main>
                <Footer />
            </div>
        </Cursors>
    );
}
