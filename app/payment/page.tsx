

import RootLayout from "../layout";
import PriceCard from "../mealPlanner/components/priceCard/PriceCard";

export default function page() {
  return (
    <RootLayout title="Choose Your Plan">

    <div className="min-h-screen w-screen flex items-center justify-center">
      <PriceCard />
    </div>
    </RootLayout>
  );
}
