"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Checkout from "@/components/checkout";
import Dollars from "@/components/gifts";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { db } from "@/lib/instantdb";
import { Cursors } from "@instantdb/react";

export default function HomePage() {
    const room = db.room("chat", "main");
    return (
        <Cursors room={room} className="min-w-full h-100vh" userCursorColor="tomato">
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-4">
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
