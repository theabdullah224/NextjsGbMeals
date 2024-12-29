// /app/api/mealplan/route.ts
import { generateWeeklyMealPlans } from '@/app/lib/weeklyMealPlanGenerator';

export async function GET() {
  try {
    // Call your function to generate the meal plan
    await generateWeeklyMealPlans();
    return new Response('Meal plan generated successfully.', { status: 200 });
  } catch (error) {
    console.error(error)
    return new Response('Error generating meal plan', { status: 500 });
  }
}
