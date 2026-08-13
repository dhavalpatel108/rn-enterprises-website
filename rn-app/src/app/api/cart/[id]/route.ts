import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const params = await context.params;
    const { id } = params;

    const item = await prisma.cartItem.findUnique({ where: { id } });
    if (!item || item.userId !== (session.user as any).id) {
      return NextResponse.json({ message: "Not found or forbidden" }, { status: 403 });
    }

    await prisma.cartItem.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
