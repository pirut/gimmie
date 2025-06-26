import type { Metadata } from "next";

type Props = {
    params: { amount: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const amount = params.amount;
    const title = `I've given $${amount} on gimme.jrbussard.com`;
    const description = "You should too!";
    const url = `https://gimme.jrbussard.com/${amount}`;
    const imageUrl = `https://gimme.jrbussard.com/api/og?amount=${amount}`;

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: url,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [imageUrl],
        },
    };
}
