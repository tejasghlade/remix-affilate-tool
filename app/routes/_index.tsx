import { type MetaFunction } from "@remix-run/node";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon from the appropriate package
import debounce from "lodash/debounce";
import BarCharts from "~/components/charts/BarCharts";
import InputSlider from "~/components/inputs/InputSlider";
import Text from "~/components/Text";
import { showMoney } from "~/components/utils/showMoney";

import { cn } from "~/lib/utils";
import { CalculationData } from "~/types";
import { LoadingIcon } from "~/components/LoadingIcon";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  // todo :: initial values
  const initialReferredCustomers = 1;
  const initialNewProjects = 10;
  const initialExistingProjects = 100;

  // todo :: slider values
  const [referredCustomers, setReferredCustomers] = useState(
    initialReferredCustomers
  );
  const [newProjects, setNewProjects] = useState(initialNewProjects);
  const [existingProjects, setExistingProjects] = useState(
    initialExistingProjects
  );

  const [data, setData] = useState<CalculationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  // Debounce the fetchCalculation function
  const debouncedFetchCalculation = useCallback(
    debounce(
      async (
        referredCustomers: number,
        newProjects: number,
        existingProjects: number
      ) => {
        setLoading(true);

        try {
          const response = await fetch(
            `/api/calculations?referredCustomers=${referredCustomers}&newProjects=${newProjects}&existingProjects=${existingProjects}`
          );
          const data: CalculationData = await response.json();
          setData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      },
      500
    ),
    [] // Empty dependency array ensures this function is created only once
  );
  // todo :: fetch calculation
  useEffect(() => {
    debouncedFetchCalculation(referredCustomers, newProjects, existingProjects);
  }, [
    referredCustomers,
    newProjects,
    existingProjects,
    debouncedFetchCalculation,
  ]);

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex items-center justify-center text-center h-[18vh]">
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
   



      {loading ? (
        <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-4/5  scroll-smooth h-[70vh]">
          <LoadingIcon />
        </div>
      ) : (
        <main className="flex flex-col md:flex-row justify-center items-center w-full md:w-4/5 ">
          <section className="w-full md:w-1/3 p-5 flex flex-col ">
            <Text size="lg" className=" block mb-5 ">
              Add in your expected referrals to see  <br /> how much you could earn as a
              <span className="font-bold">  Sunvoy  <br /> Affiliate</span> in just 1 year
            </Text>
            {/* First slider */}
            <div className="w-full">
              <div className="flex justify-between items-center">
                <Text className="text-subtitle" size="md" lineBreak>
                  Referred Customer per month
                </Text>
                <Text className="text-subtitle">{referredCustomers}</Text>
              </div>
              <div className="py-3">
                <InputSlider
                  min={1}
                  max={10}
                  value={referredCustomers}
                  setValue={setReferredCustomers}
                />
              </div>
            </div>
            {/* Second slider */}
            <div className="w-full">
              <div className="flex justify-between items-center">
                <Text className="text-subtitle" size="md" lineBreak>
                  Avg. new projects per month
                </Text>
                <Text className="text-subtitle">{newProjects}</Text>
              </div>
              <div className="py-3">
                <InputSlider
                  min={5}
                  max={50}
                  value={newProjects}
                  setValue={setNewProjects}
                />
              </div>
            </div>
            {/* Third slider */}
            <div className="w-full">
              <div className="flex justify-between items-center">
                <Text className="text-subtitle" size="md" lineBreak>
                  Avg. existing projects
                </Text>
                <Text className="text-subtitle">{existingProjects}</Text>
              </div>
              <div className="py-3">
                <InputSlider
                  min={0}
                  max={10000}
                  value={existingProjects}
                  setValue={setExistingProjects}
                />
              </div>
            </div>

            {/* values */}
           
         
            <Text size="lg" className="font-normal block m-2 text-center">
              Your
              <span className="font-bold"> monthly income </span>
              after 1 year:
            </Text>
            <Text size="xhuge" className="block font-bold text-center">
              {showMoney(data?.monthlyIncomeAfter1Year || 0)}
            </Text>
          </section>

          {/* Result */}
          <section className="w-full md:w-3/4 p-5">
            {/* Chart */}
            <BarCharts
              totalRevenue={data?.revenue || []}
              affiliatePayout={data?.payout || []}
              monthNames={data?.months || []}
            />
          </section>
        </main>
      )}


      {/* small label */}
      <div className="mt-10">
        <Text
          size="md"
          className="font-normal block m-2 text-center text-subtitle"
        >
          Calculations are based on the number of customers you refer each month
          and their avg. project volume.
          <br />
          Factor in our churn rate and this brings you to your estimated total
          passive future income.
        </Text>
      </div>
    </div>
  );
}
