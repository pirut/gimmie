"use client";

import { useState, useTransition } from "react";

import { recordClick } from "@/app/actions/click";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { CheckCircle2, Loader2, MousePointerClick } from "lucide-react";

type Status = "idle" | "success" | "error";

export default function GiveClickButton() {
    const [status, setStatus] = useState<Status>("idle");
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        setStatus("idle");
        startTransition(async () => {
            try {
                await recordClick();
                setStatus("success");
            } catch (error) {
                console.error("Failed to record click", error);
                setStatus("error");
            }
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" variant="default">
                    Send a Click
                </Button>
            </DialogTrigger>
            <DialogContent>
                <SignedIn>
                    <DialogTitle className="flex items-center gap-2">
                        <MousePointerClick className="h-5 w-5" /> Give a Click
                    </DialogTitle>
                    <DialogDescription>
                        Add your support with a single click. No payments, just positive vibes.
                    </DialogDescription>
                    <DialogFooter className="flex flex-col gap-3 sm:flex-col">
                        <Button type="button" onClick={handleClick} disabled={isPending} className="w-full">
                            {isPending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" /> Recording your click...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <MousePointerClick className="h-4 w-4" /> Record my click
                                </span>
                            )}
                        </Button>
                        {status === "success" && (
                            <div className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400">
                                <CheckCircle2 className="h-4 w-4" /> Thanks! Your click was counted.
                            </div>
                        )}
                        {status === "error" && (
                            <div className="text-sm text-red-600 dark:text-red-400 text-center">
                                Something went wrong. Please try again.
                            </div>
                        )}
                    </DialogFooter>
                </SignedIn>
                <SignedOut>
                    <DialogTitle>Log your clicks with an account</DialogTitle>
                    <DialogDescription>
                        Create a free account or sign in so we can keep track of your supportive clicks.
                    </DialogDescription>
                    <div className="flex justify-center gap-4 mt-2">
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
    );
}
