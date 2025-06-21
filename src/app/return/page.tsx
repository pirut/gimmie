import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import RecordDonation from "@/components/record-donation";

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
        return <RecordDonation customerEmail={customerEmail} />;
    }

    // If not open or complete, just redirect home
    return redirect("/");
}
