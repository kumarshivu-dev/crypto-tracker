import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_CMC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_CMC_API_KEY;

export async function GET(req) {
  const { searchParams } = new URL(req?.url);
  const start = searchParams.get("start") || "1";
  const limit = searchParams.get("limit") || "10";
  const convert = searchParams.get("convert") || "USD";

  const url = `${API_BASE_URL}/v1/cryptocurrency/listings/latest?start=${start}&limit=${limit}&convert=${convert}`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from CoinMarketCap" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("CMC API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
