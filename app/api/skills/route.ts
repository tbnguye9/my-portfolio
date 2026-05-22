import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const skill = await prisma.skill.create({ data: body });
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 },
    );
  }
}
