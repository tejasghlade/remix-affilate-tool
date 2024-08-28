import { json, type MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import Text from "~/components/Text";
import { getCalculations } from "~/data/calculations";

import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function showMoney(amount: number) {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function Index() {
  const initialReferredCustomers = 1;
  const initialNewProjects = 5;
  const initialExistingProjects = 0;
  const [referredCustomers, setReferredCustomers] = useState(
    initialReferredCustomers
  );
  const [newProjects, setNewProjects] = useState(initialNewProjects);
  const [existingProjects, setExistingProjects] = useState(
    initialExistingProjects
  );
  const [totalRevenue, setTotalRevenue] = useState<number[]>([]);
  const [affiliatePayout, setAffiliatePayout] = useState<number[]>([]);

  useEffect(() => {
    // send a request to the server to get the
    fetchCalculation();
  }, [referredCustomers, newProjects, existingProjects]);

  const fetchCalculation = async () => {
    const response = await fetch(
      `/api/calculations?referredCustomers=${referredCustomers}&newProjects=${newProjects}&existingProjects=${existingProjects}`
    );
  
    const data = await response.json(); // Parse the response body as JSON
  
    console.log(data); // Log the parsed data
    setTotalRevenue(data.revenue);
    setAffiliatePayout(data.payout);
  };

  // const calculateRevenueAndPayout = () => {
  //   const revenue: number[] = [];
  //   const payout: number[] = [];
  //   let cumulativeCustomers = referredCustomers;

  //   for (let month = 0; month < 12; month++) {
  //     const monthRevenue =
  //       (newProjects * 95 + existingProjects * 0.25) * cumulativeCustomers;
  //     revenue.push(monthRevenue);

  //     const monthPayout = monthRevenue * referralPayoutRate;
  //     payout.push(monthPayout);

  //     // Update cumulativeCustomers for the next month
  //     cumulativeCustomers =
  //       cumulativeCustomers +
  //       referredCustomers -
  //       cumulativeCustomers * monthlyChurnRate;
  //   }

  //   setTotalRevenue(revenue);
  //   setAffiliatePayout(payout);
  // };

  const generateMonthNames = () => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const startMonthIndex = 7; // August (0-based index)
    const startYear = 2024;

    const months = [];
    for (let i = 0; i < 13; i++) { // 13 months to include August 2025
      const monthIndex = (startMonthIndex + i) % 12;
      const year = startYear + Math.floor((startMonthIndex + i) / 12);
      const monthName = monthNames[monthIndex];
      if (i === 0 || monthIndex === 0) { // Current month or January
        months.push(`${monthName} ${"  "} ${year}`);
      } else {
        months.push(monthName);
      }
    }
    return months;
  };

  console.log(generateMonthNames())

  const monthNames = generateMonthNames();

  const graphData = 
 totalRevenue.map((rev, index) => ({
        name: monthNames[index],
        revenue: rev,
        payout: affiliatePayout[index],
      }));

  console.log(graphData)

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="flex items-center justify-center text-center"
        style={{
          height: "15vh",
        }}
      >
        <Text
          size="xxxl"
          className={cn(
            "text-center",
            "py-5",
            "capitalize",
            "text-black",
            "font-bold"
          )}
        >
          Calculate your recurring <br /> passive income
        </Text>
      </div>

      <main
        className="flex flex-row justify-center items-center"
        style={{
          width: "80%",
          height: "70vh",
        }}
      >
        <section
          style={{
            width: "30%",
            padding: "0 20px",
            // borderRight: "1px solid #ccc",
          }}
          className="flex flex-col self-items-center"
        >
          <Text size="md" className=" font-normal block mb-5">
            Add in your expected referrals to see how much you could earn as a{" "}
            <span className="font-bold">Sunvoy Affiliate</span> in just 1 year
          </Text>
          {/* First slider */}
          <div>
            <div className="flex justify-between items-center">
              <Text className="text-subtitle" size="md" lineBreak>
                Referred Customer per month
              </Text>
              <Text className="text-subtitle">{referredCustomers}</Text>
            </div>
            <div className="py-3">
              <input
                className="w-full"
                type="range"
                min="1"
                max="10"
                value={referredCustomers}
                onChange={(e) => setReferredCustomers(parseInt(e.target.value))}
              />
            </div>
          </div>
          {/* Second slider */}
          <div>
            <div className="flex justify-between items-center">
              <Text className="text-subtitle" size="md" lineBreak>
                Avg. new projects per month
              </Text>
              <Text className="text-subtitle">{newProjects}</Text>
            </div>
            <div className="py-3">
              <input
                type="range"
                className="w-full"
                min="5"
                max="50"
                value={newProjects}
                onChange={(e) => setNewProjects(parseInt(e.target.value))}
              />
            </div>
          </div>
          {/* Third slider */}
          <div>
            <div className="flex justify-between items-center">
              <Text className="text-subtitle" size="md" lineBreak>
                Avg. existing projects
              </Text>
              <Text className="text-subtitle">{existingProjects}</Text>
            </div>
            <div className="py-3">
              <input
                type="range"
                className="w-full"
                min="0"
                max="10000"
                value={existingProjects}
                onChange={(e) => setExistingProjects(parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* values */}
          <Text size="md" className=" font-normal block m-2 text-center">
            Your
            <span className="font-bold"> monthly income </span>
            after 1 year:
          </Text>
          <Text size="xhuge">
            {showMoney(
              totalRevenue.reduce((a, b) => a + b, 0) -
                affiliatePayout.reduce((a, b) => a + b, 0)
            )}
          </Text>
        </section>

        {/* Result */}
        <section
          style={{
            width: "70%",
            padding: "0 20px",
          }}
        >
          <div className="text-center">
            <Text size="md" lineBreak>
              Your monthly income after 1 year:
            </Text>
            <Text>{`Revenue: ${totalRevenue.reduce(
              (a, b) => a + b,
              0
            )}, Payout: ${affiliatePayout.reduce((a, b) => a + b, 0)}`}</Text>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={totalRevenue.map((rev, index) => ({
                name: monthNames[index],
                revenue: rev,
                payout: affiliatePayout[index],
              }))}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" axisLine={false} />
              {/* <YAxis  /> */}
              {/* <Tooltip /> */}
              {/* <Legend  /> */}
              <Bar dataKey="revenue" fill="#cfd6df">
                {totalRevenue.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="#cfd6df"
                    className="bar-cell"
                  />
                ))}
                 <LabelList dataKey="revenue"  position="top" />
              </Bar>
              {/* <Bar dataKey="revenue" fill="#b0cc53" /> */}
              {/* <Bar dataKey="payout" fill="#82ca9d" /> */}
            </BarChart>
          </ResponsiveContainer>
          <style jsx>{`
            .bar-cell:hover {
              fill: #b0cc53 !important;
              background: transparent;
            }
              .recharts-cartesian-axis-tick-line {
              display: none;}
          `}</style>
        </section>
      </main>
      {/* small label */}
      <Text
        size="md"
        className=" font-normal block m-2 text-center text-subtitle"
      >
        Calculatios are based on the number of customers you refer each month
        and their avg. project volume.
        <br />
        Factor in our churn rate and this brings your to your estimated toalta
        passsive future income.
      </Text>
    </div>
  );
}


