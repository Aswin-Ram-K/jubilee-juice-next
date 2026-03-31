import { NextResponse } from "next/server";

async function checkDatabase(): Promise<"connected" | "error"> {
  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.$queryRaw`SELECT 1`;
    return "connected";
  } catch {
    return "error";
  }
}

export async function GET() {
  const database = await checkDatabase();
  const status = database === "connected" ? "healthy" : "degraded";

  return NextResponse.json(
    {
      status,
      timestamp: new Date().toISOString(),
      checks: { database },
    },
    { status: status === "healthy" ? 200 : 503 }
  );
}
