"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";


type RecordDonationProps = {
    customerId: string;
};

export default function RecordDonation({ customerId }: RecordDonationProps) {
    const router = useRouter();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        const record = async () => {
            if (customerId) {
                try {
                    await fetch("/return/record-dollar", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            userId: customerId,
                            createdAt: Date.now(),
                        }),
                    });
                } catch (err) {
                    console.error("Error recording donation", err);
                }
            }
            router.push("/thank-you");
        };
        record();
    }, [customerId, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <p>Recording your contribution...</p>
        </div>
    );
}
