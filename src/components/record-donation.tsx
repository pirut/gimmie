"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/instantdb";
import { id } from "@instantdb/react";

type RecordDonationProps = {
    customerEmail: string;
};

export default function RecordDonation({ customerEmail }: RecordDonationProps) {
    const router = useRouter();

    useEffect(() => {
        if (customerEmail) {
            db.transact(
                db.tx.dollars[id()].update({
                    userId: customerEmail,
                    createdAt: Date.now(),
                })
            );
        }
        router.push("/thank-you");
    }, [customerEmail, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <p>Recording your contribution...</p>
        </div>
    );
}
