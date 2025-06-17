"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center justify-center space-y-4 mt-20">
            <div className="text-3xl font-bold">{count}</div>
            <Button size="lg" onClick={() => setCount((c) => c + 1)}>
                Give Me a Dollar
            </Button>
        </div>
    );
}
