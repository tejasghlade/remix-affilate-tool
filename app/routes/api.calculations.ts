import { json } from "@remix-run/react";



export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const referredCustomers = Number(url.searchParams.get('referredCustomers'));
    const newProjects = Number(url.searchParams.get('newProjects'));
    const existingProjects = Number(url.searchParams.get('existingProjects'));

    const monthlyChurnRate = 0.02; // 2% churn rate
    const referralPayoutRate = 0.2; // 20% referral payout

    const revenue: number[] = [];
    const payout: number[] = [];
    let cumulativeCustomers = referredCustomers;

    for (let month = 0; month < 12; month++) {
        const monthRevenue =
            (newProjects * 95 + existingProjects * 0.25) * cumulativeCustomers;
        revenue.push(Math.round(monthRevenue)); // Round revenue to nearest integer

        const monthPayout = monthRevenue * referralPayoutRate;
        payout.push(monthPayout);

        // Update cumulativeCustomers for the next month
        cumulativeCustomers =
            cumulativeCustomers +
            referredCustomers -
            cumulativeCustomers * monthlyChurnRate;
    }

    return json({ revenue, payout });
}