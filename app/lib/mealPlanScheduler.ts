import cron from 'node-cron';
import {generateWeeklyMealPlans} from './weeklyMealPlanGenerator';

export async function  startMealPlanScheduler() {
  cron.schedule('*/1 * * * *', await generateWeeklyMealPlans); // Every 5 minutes
  console.log('Meal Plan Scheduler started');
}

