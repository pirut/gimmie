import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/header";
import { db } from "@/lib/instantdb.server";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestionIcon } from "lucide-react";

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Fetch display name and total dollars given from InstantDB
    const userId = user.id;
    const data = await db.query({
        displayNames: { $: { where: { userId } } },
        dollars: { $: { where: { userId } } },
    });
    const displayName = data.displayNames[0]?.displayName || user.firstName || user.emailAddresses[0]?.emailAddress;
    const totalDollars = data.dollars.length;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full space-y-8">
                    <Card className="w-full mb-6">
                        <CardHeader>
                            <CardTitle>Welcome to Your Dashboard</CardTitle>
                            <CardDescription>Hello, {displayName}!</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Your Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <CardDescription>
                                <strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}
                            </CardDescription>
                            <CardDescription>
                                <strong>Name:</strong> {user.firstName} {user.lastName}
                            </CardDescription>
                            <CardDescription>
                                <strong>Display Name:</strong> {displayName}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="ml-2 rounded-full" aria-label="How to change display name?">
                                            <MessageCircleQuestionIcon />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>How to Change Your Display Name</DialogTitle>
                                            <DialogDescription>
                                                To change your display name, simply give another dollar. You will be prompted to enter a new display name during
                                                the donation process.
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </CardDescription>
                            <CardDescription>
                                <strong>Total Dollars Given:</strong> ${totalDollars}
                            </CardDescription>
                            <CardDescription>
                                <strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
