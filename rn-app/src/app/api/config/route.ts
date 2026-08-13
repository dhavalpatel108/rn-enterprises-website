import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const configs = await prisma.config.findMany();
    const configMap: Record<string, any> = {};
    for (const c of configs) {
      configMap[c.key] = JSON.parse(c.value);
    }
    return NextResponse.json(configMap);
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user as any).role !== "OWNER") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const data = await req.json(); // Expected: { [key: string]: any }

    const updates = Object.entries(data).map(async ([key, value]) => {
      return prisma.config.upsert({
        where: { key },
        update: { value: JSON.stringify(value) },
        create: { id: key, key, value: JSON.stringify(value) }
      });
    });

    await Promise.all(updates);

    return NextResponse.json({ message: "Config updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
