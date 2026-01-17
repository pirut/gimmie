"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
    {
        question: "What is this site?",
        answer: "It's a goofy click counter. Tap the button, log a click, and share the fun!",
    },
    {
        question: "Is this a joke?",
        answer: "Absolutely—it's internet silliness at its finest, now 100% free.",
    },
    {
        question: "Do I need to pay anything?",
        answer: "Nope. Just sign in so we can keep track of your clicks and you're good to go.",
    },
    {
        question: "Why do clicks matter?",
        answer: "Clicks let you climb the leaderboard and unlock display name changes after 100 of them.",
    },
];

export default function FAQPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-2xl mx-auto w-full">
                <Card className="w-full mb-6">
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <CardDescription>Everything you want to know about Give Me a Click</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        {faqs.map((faq, idx) => (
                            <Card key={idx} className="w-full">
                                <CardHeader>
                                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{faq.answer}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                        <Button asChild className="mt-4 self-center" variant="outline">
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
