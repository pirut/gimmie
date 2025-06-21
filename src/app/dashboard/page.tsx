import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/header";

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full space-y-8">
                    <Card className="w-full mb-6">
                        <CardHeader>
                            <CardTitle>Welcome to Your Dashboard</CardTitle>
                            <CardDescription>Hello, {user.firstName || user.emailAddresses[0]?.emailAddress}!</CardDescription>
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
                                <strong>User ID:</strong> {user.id}
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
