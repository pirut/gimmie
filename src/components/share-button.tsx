"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Share2 } from "lucide-react";
import React from "react";

interface ShareButtonProps {
    url?: string;
    text?: string;
    tooltip?: string;
    icon?: React.ReactNode;
    buttonClassName?: string;
}

export function ShareButton({ url: propUrl, text: propText, tooltip = "Share this site", icon, buttonClassName = "" }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isShareSupported, setIsShareSupported] = useState(false);
    const pathname = typeof window !== "undefined" ? window.location.pathname : undefined;
    const fullUrl = typeof window !== "undefined" ? window.location.href : undefined;

    React.useEffect(() => {
        setIsClient(true);
        setIsShareSupported(typeof window !== "undefined" && !!navigator.share);
    }, []);

    if (!isClient) return null;

    // Dynamic share text logic
    const url = propUrl || fullUrl || "https://gimme.jrbussard.com/";
    let text = propText || "Check out gimme.jrbussard.com - Give a dollar!";
    if (!propText && pathname) {
        // Thank you page: /thank-you/[amount]
        const thankYouMatch = pathname.match(/^\/thank-you\/(\d+)/);
        if (thankYouMatch) {
            const amount = thankYouMatch[1];
            text = `I've given $${amount} on gimme.jrbussard.com, you should too!`;
        }
    }

    const handleShare = async () => {
        if (isShareSupported) {
            try {
                await navigator.share({
                    title: "Gimme a Dollar",
                    text,
                    url,
                });
            } catch (err: unknown) {
                // Ignore abort/cancellation errors
                if (err && typeof err === "object" && "name" in err && (err as { name: string }).name !== "AbortError") {
                    console.error(err);
                }
            }
        } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" className={buttonClassName} size="icon" onClick={handleShare} aria-label={tooltip}>
                        {icon || <Share2 className="h-5 w-5" />}
                        <span className="sr-only">{isShareSupported ? "Share this site!" : copied ? "Link copied!" : "Copy share link"}</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{isShareSupported ? (copied ? "Link copied!" : tooltip) : copied ? "Link copied!" : "Copy share link"}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
