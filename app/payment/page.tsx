

import PriceCard from "../mealPlanner/components/priceCard/PriceCard";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Choose Your Plan',
  description: 'Choose Your Plan',
};



export default function page() {
  return (

    <div className="min-h-screen w-screen flex items-center justify-center">
      <PriceCard />
    </div>
  );
}
