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

export function ShareButton({
    url = "https://gimme.jrbussard.com/",
    text = "Check out gimme.jrbussard.com – Give a dollar, make a difference!",
    tooltip = "Share this site",
    icon,
    buttonClassName = "border-blue-600 text-blue-600 hover:bg-blue-50",
}: ShareButtonProps) {
    const [copied, setCopied] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isShareSupported, setIsShareSupported] = useState(false);

    React.useEffect(() => {
        setIsClient(true);
        setIsShareSupported(typeof window !== "undefined" && !!navigator.share);
    }, []);

    if (!isClient) return null;

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
