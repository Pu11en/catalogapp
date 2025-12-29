import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, items, total } = body;

        if (!email || !items || !total) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Find or create buyer
        const buyer = await prisma.buyer.upsert({
            where: { email },
            update: {},
            create: {
                email,
                businessName: "Guest Guest",
                contactName: "Guest",
            },
        });

        // Create order
        const order = await prisma.order.create({
            data: {
                buyerId: buyer.id,
                items: JSON.stringify(items),
                subtotal: total,
                status: "processing",
                notes: "Guest Order via POC"
            },
        });

        return NextResponse.json({ success: true, orderId: order.id });
    } catch (error) {
        console.error("Order placement error:", error);
        return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json({ error: "Email required" }, { status: 400 });
        }

        const orders = await prisma.order.findMany({
            where: {
                buyer: {
                    email: email
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json({ orders });
    } catch (error) {
        console.error("Order fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
