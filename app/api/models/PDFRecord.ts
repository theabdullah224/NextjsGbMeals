import mongoose, { Schema, model, Document } from 'mongoose';

interface PDFRecordDocument extends Document {
  userId: string;
  mealPlanUrl: string[]; 
  shoppingListUrl: string[];
  createdAt: Date;
}

const PDFRecordSchema = new Schema<PDFRecordDocument>({
  userId: { type: String, required: true },
  mealPlanUrl: { type: [String], required: true },
  shoppingListUrl: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

const PDFRecord = mongoose.models.PDFRecord || model<PDFRecordDocument>('PDFRecord', PDFRecordSchema);

export default PDFRecord;
