"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/instantdb";
import { id } from "@instantdb/react";

type RecordDonationProps = {
    customerId: string;
};

export default function RecordDonation({ customerId }: RecordDonationProps) {
    const router = useRouter();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        if (customerId) {
            db.transact(
                db.tx.dollars[id()].update({
                    userId: customerId,
                    createdAt: Date.now(),
                })
            );
        }
        router.push("/thank-you");
    }, [customerId, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <p>Recording your contribution...</p>
        </div>
    );
}
