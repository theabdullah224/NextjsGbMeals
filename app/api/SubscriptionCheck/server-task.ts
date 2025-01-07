import {connectMongoDB} from "@/app/lib/dbConnection";
import UserModel from "@/app/api/models/UserModel";


export async function updateExpiredPlans() {
  try {

    
    // Connect to the database
    await connectMongoDB();

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

    // Update users whose `currentPeriodEnd` matches today's date (ignoring time)
    const result = await UserModel.updateMany(
      {
        status: "active",
        $expr: {
          $eq: [
            { $dateToString: { format: "%Y-%m-%d", date: "$currentPeriodEnd" } }, // Extract date in "YYYY-MM-DD"
            today, // Today's date in "YYYY-MM-DD"
          ],
        },
      },
      {
        $set: {
          planType: "inactive",
          currentPeriodEnd: null,
          status: "inactive",
        },
      }
    );


    return result.modifiedCount;
  } catch (error) {
    console.error("Error updating expired plans:", error);
    throw error;
  }
}


setInterval(updateExpiredPlans, 60 * 60 * 1000); 

