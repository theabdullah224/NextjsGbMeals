/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextRequest, NextResponse } from "next/server";
import PDFRecord from "@/app/api/models/PDFRecord";
import { connectMongoDB } from "@/app/lib/dbConnection";

// @ts-ignore
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

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
