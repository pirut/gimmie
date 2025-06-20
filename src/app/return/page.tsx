import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";

// Optionally, you could use Clerk's API to look up the user by email if you want to match to a real userId
// For now, we'll use the email as the userId if we can't match

type PageProps = {
    params: Promise<Record<string, never>>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ReturnPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const sessionId = searchParams.session_id;

    if (!sessionId || typeof sessionId !== "string") {
        throw new Error("Please provide a valid session_id (`cs_test_...`)");
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items", "payment_intent"],
    });

    if (session.status === "open") {
        return redirect("/");
    }

    if (session.status === "complete") {
        const customerEmail = session.customer_details?.email ?? "unknown";
        // Use absolute URL for server-side fetch
        const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        await fetch(`${baseUrl}/return/record-dollar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: customerEmail,
                createdAt: Date.now(),
            }),
        });
        // Redirect to thank you page to show updated total
        return redirect("/thank-you");
    }

    // If not open or complete, just redirect home
    return redirect("/");
}
