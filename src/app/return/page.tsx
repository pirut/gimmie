import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";

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
        const customerEmail = session.customer_details?.email ?? "your email";
        return (
            <section id="success">
                <p>We appreciate your business! A confirmation email will be sent to {customerEmail}. If you have any questions, please email </p>
                <a href="mailto:orders@example.com">orders@example.com</a>.
            </section>
        );
    }
}
