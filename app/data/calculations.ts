
import { json } from '@remix-run/react';


// todo :: add type for calculation
export const getCalculations = async ({ 
    referredCustomers, 
    newProjects, 
    existingProjects
 } : any) => {
    // const url = new URL(request.url);


  const monthlyChurnRate = 0.02; // 2% churn rate
  const referralPayoutRate = 0.2; // 20% referral payout

  const revenue: number[] = [];
  const payout: number[] = [];
  let cumulativeCustomers = referredCustomers;

  for (let month = 0; month < 14; month++) {
    const monthRevenue =
      (newProjects * 95 + existingProjects * 0.25) * cumulativeCustomers;
    revenue.push(monthRevenue);

    const monthPayout = monthRevenue * referralPayoutRate;
    payout.push(monthPayout);

    // Update cumulativeCustomers for the next month
    cumulativeCustomers =
      cumulativeCustomers +
      referredCustomers -
      cumulativeCustomers * monthlyChurnRate;
  }

  return json({ revenue, payout });
};