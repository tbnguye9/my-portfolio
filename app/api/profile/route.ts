import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const profile = await prisma.profile.findFirst();

    if (profile) {
      const updated = await prisma.profile.update({
        where: { id: profile.id },
        data: body,
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.profile.create({ data: body });
      return NextResponse.json(created);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
