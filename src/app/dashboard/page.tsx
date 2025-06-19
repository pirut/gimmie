import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
                        <p className="mt-2 text-muted-foreground">Hello, {user.firstName || user.emailAddresses[0]?.emailAddress}!</p>
                    </div>

                    <div className="bg-card p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
                        <div className="space-y-2">
                            <p>
                                <strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}
                            </p>
                            <p>
                                <strong>Name:</strong> {user.firstName} {user.lastName}
                            </p>
                            <p>
                                <strong>User ID:</strong> {user.id}
                            </p>
                            <p>
                                <strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
