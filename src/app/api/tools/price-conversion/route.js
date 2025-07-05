import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_CMC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_CMC_API_KEY;

export async function GET(req) {
  const { searchParams } = new URL(req?.url);
  const amount = searchParams.get("amount");
  const from = searchParams.get("id");
  const to = searchParams.get("convert");
  const url = `${API_BASE_URL}/v2/tools/price-conversion?amount=${amount}&id=${from}&convert=${to}`;

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
