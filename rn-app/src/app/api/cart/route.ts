import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json(cartItems);
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { category, type, design, hardware, height, width, price, quantity } = data;

    const cartItem = await prisma.cartItem.create({
      data: {
        userId: (session.user as any).id,
        category,
        type,
        design,
        hardware,
        height,
        width,
        price,
        quantity: quantity || 1
      }
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
