import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async (
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) => {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) return new NextResponse("Unauthorized", { status: 403 });

    const { courseId } = await params;
    const id = parseInt(courseId, 10);
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const data = await db.query.courses.findFirst({
        where: eq(courses.id, id),
    });

    if (!data) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(data);
};

export const PUT = async (
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) => {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) return new NextResponse("Unauthorized", { status: 403 });

    const { courseId } = await params;
    const id = parseInt(courseId, 10);
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const body = await req.json();
    const data = await db.update(courses)
        .set({ ...body })
        .where(eq(courses.id, id))
        .returning();

    if (!data[0]) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) => {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) return new NextResponse("Unauthorized", { status: 403 });

    const { courseId } = await params;
    const id = parseInt(courseId, 10);
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const data = await db.delete(courses)
        .where(eq(courses.id, id))
        .returning();

    if (!data[0]) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(data[0]);
};