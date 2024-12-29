// app/api/cron/mealplan/route.ts
import { generateWeeklyMealPlans } from '@/app/lib/weeklyMealPlanGenerator';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await generateWeeklyMealPlans();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Meal plan generation failed:', error);
    return NextResponse.json({ error: 'Failed to generate meal plans' }, { status: 500 });
  }
}



