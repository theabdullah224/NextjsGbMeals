/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextRequest, NextResponse } from 'next/server';

import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { connectMongoDB } from '@/app/lib/dbConnection';
import PDFRecord from '../../models/PDFRecord';


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
  });
  

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME!;


export async function DELETE(request: NextRequest) {
  const url = new URL(request.url); // Parse the request URL
  const pdfId = url.pathname.split('/').pop(); // Extract "pdfId" from the path

  if (!pdfId) {
    return new NextResponse('PDF ID not provided', { status: 400 });
  }

  try {
    // Connect to the database
    await connectMongoDB();

    // Use the extracted pdfId directly
    // @ts-ignore
    const pdf = await PDFRecord.findById(pdfId);

    if (!pdf) {
      return NextResponse.json(
        { error: 'PDF not found' },
        { status: 404 }
      );
    }


  
    try {
 
      const meal_plan_key = pdf.mealPlanUrl.split('.com/')[-1];
      const shopping_list_key = pdf.shoppingListUrl.split('.com/')[-1];
      
      await s3Client.send(new DeleteObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: meal_plan_key
      }));

      await s3Client.send(new DeleteObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: shopping_list_key
      }));
    } catch (s3Error) {
      console.error('Error deleting from S3:', s3Error);
    }
// @ts-ignore
    await PDFRecord.findByIdAndDelete(pdfId);
    return NextResponse.json(
      { message: 'PDF deleted successfully' }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting PDF:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete PDF',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}