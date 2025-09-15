"use server";

import { auth } from "@clerk/nextjs/server";
import { id } from "@instantdb/admin";

import { db } from "@/lib/instantdb.server";

export async function recordClick() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    await db.transact(
        db.tx.clicks[id()].update({
            userId,
            createdAt: Date.now(),
            used: false,
        })
    );

    return { success: true };
}
