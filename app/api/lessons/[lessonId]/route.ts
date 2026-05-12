import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async (
    req: Request,
    { params }: { params: Promise<{ lessonId: string }> }
) => {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) return new NextResponse("Unauthorized", { status: 403 });

    const { lessonId } = await params;
    const id = parseInt(lessonId, 10);
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, id),
    });

    if (!data) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(data);
};

export const PUT = async (
    req: Request,
    { params }: { params: Promise<{ lessonId: string }> }
) => {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) return new NextResponse("Unauthorized", { status: 403 });

    const { lessonId } = await params;
    const id = parseInt(lessonId, 10);
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const body = await req.json();
    const data = await db.update(lessons)
        .set({ ...body })
        .where(eq(lessons.id, id))
        .returning();

    if (!data[0]) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    { params }: { params: Promise<{ lessonId: string }> }
) => {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) return new NextResponse("Unauthorized", { status: 403 });

    const { lessonId } = await params;
    const id = parseInt(lessonId, 10);
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const data = await db.delete(lessons)
        .where(eq(lessons.id, id))
        .returning();

    if (!data[0]) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(data[0]);
};