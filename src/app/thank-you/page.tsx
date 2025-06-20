"use client";

import Dollars from "@/components/gifts";
import { Header } from "@/components/header";

export default function ThankYouPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <Header></Header>
            <h1 className="text-3xl font-bold mb-4">Thank you for your support!</h1>
            <p className="mb-8 text-lg">Your dollar has been received. You rock!</p>
            <Dollars />
        </div>
    );
}
