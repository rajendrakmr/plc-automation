// app/api/search/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q") || "";

    // demo products
    const products = [
        "Siemens PLC",
        "Allen Bradley Drive",
        "Mitsubishi Servo",
        "Delta VFD",
        "ABB HMI",
        "Fanuc CNC",
        "Yaskawa Servo",
        "Omron PLC",
        "Schneider Electric PLC"
    ];

    const filtered = products.filter((item) =>
        item
            .toLowerCase()
            .includes(q.toLowerCase())
    );

    return NextResponse.json({
        results: filtered
    });
}