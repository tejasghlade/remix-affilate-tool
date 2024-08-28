import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Text from "~/components/Text";
// import { Slider } from "~/components/ui/slider";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  let initialReferredCustomers = 1;
  let initialNewProjects = 5;
  let initialExistingProjects = 0;
  const [referredCustomers, setReferredCustomers] = useState(
    initialReferredCustomers
  );
  const [newProjects, setNewProjects] = useState(initialNewProjects);
  const [existingProjects, setExistingProjects] = useState(
    initialExistingProjects
  );
  const [totalRevenue, setTotalRevenue] = useState<number[]>([]);
  const [affiliatePayout, setAffiliatePayout] = useState<number[]>([]);

  let monthlyChurnRate = 0.02; // 2% churn rate
  let referralPayoutRate = 0.2; // 20% referral payout

  useEffect(() => {
    calculateRevenueAndPayout();
  }, [referredCustomers, newProjects, existingProjects, monthlyChurnRate]);

  const calculateRevenueAndPayout = () => {
    const revenue: number[] = [];
    const payout: number[] = [];
    let cumulativeCustomers = referredCustomers;

    for (let month = 0; month < 12; month++) {
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

    setTotalRevenue(revenue);
    setAffiliatePayout(payout);
  };

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
            {totalRevenue.reduce((a, b) => a + b, 0).toLocaleString("en-US")}
          </Text>
        </section>

        {/* Result */}
        <section
          style={{
            width: "70%",
            padding: "0 20px",
          }}
        >
          {/* <div className="text-center">
            <Text size="md" lineBreak>
              Your monthly income after 1 year:
            </Text>
            <Text>{`Revenue: ${totalRevenue.reduce(
              (a, b) => a + b,
              0
            )}, Payout: ${affiliatePayout.reduce((a, b) => a + b, 0)}`}</Text>
          </div> */}
          {/* Chart */}
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={totalRevenue.map((rev, index) => ({
                name: `Month ${index + 1}`,
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
              <YAxis hide />
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
          `}</style>
        </section>
      </main>
      {/* small label */}
      <Text size="md" className=" font-normal block m-2 text-center text-subtitle">
        Calculatios are based on the number of customers you refer each month
        and their avg. project volume.
        <br />
        Factor in our churn rate and this brings your to your estimated toalta
        passsive future income.
      </Text>
    </div>
  );
}
