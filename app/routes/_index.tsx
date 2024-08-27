import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      {/* title */}
      <h1 className="text-2xl text-center font-bold">Calculate Your Recurring Passive Income</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Column 1 */}
        <div className="bg-gray-200 p-4">
          <p>Add in your expected referrals to see how much you could earn as a Sunvoy Affiliate in just 1 year</p>

          <section>
            

          </section>
        </div>

        {/* Column 2 */}
        <div className="bg-gray-200 p-4">Column 2</div>
      </div>
      {/* description */}
    </div>
  );
}
