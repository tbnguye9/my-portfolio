import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const certificate = await prisma.certificate.update({
      where: { id: Number(id) },
      data: body,
    });
    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update certificate" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.certificate.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 },
    );
  }
}
