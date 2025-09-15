"use server";

import { db } from "@/lib/instantdb.server";
import { auth } from "@clerk/nextjs/server";
import { id } from "@instantdb/admin";

export async function setDisplayName(displayName: string) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    if (!displayName || typeof displayName !== "string" || displayName.length > 50) {
        throw new Error("Invalid display name");
    }

    // Query for existing display name and available clicks
    const { displayNames, clicks } = await db.query({
        displayNames: {
            $: {
                where: { userId: userId },
            },
        },
        clicks: {
            $: {
                where: { userId: userId },
            },
        },
    });

    // Count unused clicks
    const unusedClicks = clicks.filter((click) => !click.used);
    if (unusedClicks.length < 100) {
        throw new Error("You need at least 100 unused clicks to change your display name");
    }

    const clicksToUse = unusedClicks.slice(0, 100);

    const existing = displayNames[0];

    try {
        // First transaction: Update or create display name
        if (existing) {
            await db.transact(
                db.tx.displayNames[existing.id].update({
                    userId,
                    displayName,
                })
            );
        } else {
            await db.transact(
                db.tx.displayNames[id()].update({
                    userId,
                    displayName,
                })
            );
        }

        const usedForMessage = existing
            ? "Changed display name to: " + displayName
            : "Set initial display name to: " + displayName;

        const clickUpdateTransactions = clicksToUse.map((click, index) =>
            db.tx.clicks[click.id].update({
                used: true,
                usedFor: `${usedForMessage} (click ${index + 1} of 100)`,
            })
        );

        await db.transact(clickUpdateTransactions);
    } catch (error) {
        console.error("Transaction failed:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Failed to update display name");
    }
}

export async function getAvailableClicks(userId: string) {
    const { clicks } = await db.query({
        clicks: {
            $: {
                where: { userId },
            },
        },
    });

    return clicks.filter((click) => !click.used).length;
}

export async function useClicks(userId: string, purpose: string, amount = 1) {
    if (amount < 1) {
        throw new Error("Amount must be at least 1");
    }

    const { clicks } = await db.query({
        clicks: {
            $: {
                where: { userId },
            },
        },
    });

    const availableClicks = clicks.filter((click) => !click.used);
    if (availableClicks.length < amount) {
        throw new Error("Not enough unused clicks available");
    }

    const clickUpdates = availableClicks.slice(0, amount).map((click) =>
        db.tx.clicks[click.id].update({
            userId: click.userId,
            createdAt: click.createdAt,
            used: true,
            usedFor: purpose,
        })
    );

    await db.transact(clickUpdates);

    return true;
}

// TEMPORARY: Migration function to fix missing fields on clicks
export async function migrateClicksForCurrentUser() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const { clicks } = await db.query({
        clicks: {
            $: { where: { userId } },
        },
    });
    const txs = clicks
        .filter((click) => click.used === undefined || click.usedFor === undefined)
        .map((click) => {
            const payload = {
                id: click.id,
                userId: click.userId,
                createdAt: click.createdAt,
                used: click.used !== undefined ? click.used : false,
                usedFor: click.usedFor !== undefined ? click.usedFor : "",
            };
            console.log("Migrating click:", click, "with payload:", payload);
            return db.tx.clicks[click.id].update(payload);
        });
    if (txs.length > 0) {
        await db.transact(txs);
        return `${txs.length} clicks migrated.`;
    } else {
        return "No clicks needed migration.";
    }
}
