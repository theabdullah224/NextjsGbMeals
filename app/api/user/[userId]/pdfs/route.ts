/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextRequest, NextResponse } from "next/server";
import PDFRecord from "@/app/api/models/PDFRecord";
import { connectMongoDB } from "@/app/lib/dbConnection";

export async function GET(request: NextRequest) {
  // Extract userId from the URL
  const url = new URL(request.url);
  const userId = url.pathname.split('/').pop(); // Get the last segment from the URL

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    await connectMongoDB();

    // @ts-ignore
    const pdfRecords = await PDFRecord.find({ userId }).sort({ createdAt: -1 });
    const pdfList = pdfRecords.map((pdf) => ({
      id: pdf._id.toString(),
      userId: pdf.userId,
      mealPlanUrl: pdf.mealPlanUrl,
      shoppingListUrl: pdf.shoppingListUrl,
      createdAt: pdf.createdAt.toISOString(),
    }));

    return NextResponse.json(
      {
        message: "PDFs retrieved successfully",
        pdfs: pdfList,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching PDFs:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch PDFs",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
