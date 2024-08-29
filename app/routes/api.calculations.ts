import { json } from "@remix-run/react";


const generateMonthNames = (startMonth: number, startYear : number) => {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const startMonthIndex = startMonth; // August (0-based index)
    // const startYear = startYear;

    const months = [];
    for (let i = 0; i < 13; i++) { // 13 months to include August 2025
        const monthIndex = (startMonthIndex + i) % 12;
        const year = startYear + Math.floor((startMonthIndex + i) / 12);
        const monthName = monthNames[monthIndex];
        if (i === 0 || monthIndex === 0) { // Current month or January
            months.push(`${monthName} ${year}`);
        } else {
            months.push(monthName);
        }
    }
    return months;
};




export const loader = async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const referredCustomers = Number(url.searchParams.get('referredCustomers'));
    const newProjects = Number(url.searchParams.get('newProjects'));
    const existingProjects = Number(url.searchParams.get('existingProjects'));

    const monthlyChurnRate = 0.02; // 2% churn rate
    const referralPayoutRate = 0.2; // 20% referral payout

    const revenue: number[] = [];
    const payout: number[] = [];
    let cumulativeCustomers = referredCustomers;

    for (let month = 0; month < 13; month++) {
        const monthRevenue =
            (newProjects * 95 + existingProjects * 0.25) * cumulativeCustomers;
        revenue.push(Math.round(monthRevenue)); // Round revenue to nearest integer

        const monthPayout = monthRevenue * referralPayoutRate;
        payout.push(Math.round(monthPayout)); // Round payout to nearest integer

        // Update cumulativeCustomers for the next month
        cumulativeCustomers =
            cumulativeCustomers +
            referredCustomers -
            cumulativeCustomers * monthlyChurnRate;
    }

    const totalRevenue = revenue.reduce((a, b) => a + b, 0);
    const totalPayout = payout.reduce((a, b) => a + b, 0);
    const monthlyIncomeAfter1Year = revenue[12] - payout[12]; // Monthly income for the 13th month

    // Generate months from the current month
    const currentDate = new Date();
    const startMonth = currentDate.getMonth(); // 0-based index
    const startYear = currentDate.getFullYear();

    const months = generateMonthNames(startMonth, startYear);


     // Introduce a 3-second delay before sending the response
     await new Promise(resolve => setTimeout(resolve, 1000));

    return json({ revenue, payout , monthlyIncomeAfter1Year, months ,totalRevenue , totalPayout });
}