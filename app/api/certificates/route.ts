import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(certificates);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const certificate = await prisma.certificate.create({ data: body });
    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 },
    );
  }
}
