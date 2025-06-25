import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { amount: string } }): Promise<Metadata> {
    const amount = params.amount || "1";
    return {
        title: `I've given $${amount} on gimme.jrbussard.com, you should too!`,
        openGraph: {
            images: [
                {
                    url: `https://gimme.jrbussard.com/api/og?amount=${amount}&v=2`,
                    width: 1200,
                    height: 630,
                    alt: `I've given $${amount} on gimme.jrbussard.com, you should too!`,
                },
            ],
        },
        other: {
            "og:image:width": "1200",
            "og:image:height": "630",
        },
    };
}
