/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DateTime } from "luxon";
import { connectMongoDB } from "./dbConnection";
import User from "../api/models/UserModel";
import PDFRecord from "../api/models/PDFRecord";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export const SavePdfAws = async (id: string, mealPlanPDF: any, shoppingListPDF: any) => {
  try {
    const timestamp = DateTime.utc().toFormat("yyyyMMdd_HHmmss");
    const mealPlanKey = `meal_plans/user_${id}/${timestamp}_meal_plan.pdf`;
    const shoppingListKey = `shopping_lists/user_${id}/${timestamp}_shopping_list.pdf`;

    const mealPlanBuffer = Buffer.from(mealPlanPDF, "base64");
    const shoppingListBuffer = Buffer.from(shoppingListPDF, "base64");

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: mealPlanKey,
        Body: mealPlanBuffer,
        ContentType: "application/pdf",
      })
    );

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: shoppingListKey,
        Body: shoppingListBuffer,
        ContentType: "application/pdf",
      })
    );

    const mealPlanUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${mealPlanKey}`;
    const shoppingListUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${shoppingListKey}`;

    connectMongoDB();
    // @ts-ignore
    const pdfRecord = await PDFRecord.create({
      userId: id,
      mealPlanUrl: mealPlanUrl,
      shoppingListUrl: shoppingListUrl,
    });

    return {
      meal_plan_url: mealPlanUrl,
      shopping_list_url: shoppingListUrl,
      db_record: pdfRecord,
    };
  } catch (error) {
    console.error("Error in SavePdfAws:", error);
    // @ts-nocheck
    throw new Error("Failed to save PDFs to AWS S3");
  }
};
