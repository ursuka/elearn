import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async (
    req: Request,
    { params }: { params: Promise<{ challengeId: string }> }
) => {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) return new NextResponse("Unauthorized", { status: 403 });

    const { challengeId } = await params;
    const id = parseInt(challengeId, 10);
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const data = await db.query.challenges.findFirst({
        where: eq(challenges.id, id),
    });

    if (!data) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(data);
};

export const PUT = async (
    req: Request,
    { params }: { params: Promise<{ challengeId: string }> }
) => {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) return new NextResponse("Unauthorized", { status: 403 });

    const { challengeId } = await params;
    const id = parseInt(challengeId, 10);
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const body = await req.json();
    const data = await db.update(challenges)
        .set({ ...body })
        .where(eq(challenges.id, id))
        .returning();

    if (!data[0]) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    { params }: { params: Promise<{ challengeId: string }> }
) => {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) return new NextResponse("Unauthorized", { status: 403 });

    const { challengeId } = await params;
    const id = parseInt(challengeId, 10);
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const data = await db.delete(challenges)
        .where(eq(challenges.id, id))
        .returning();

    if (!data[0]) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(data[0]);
};