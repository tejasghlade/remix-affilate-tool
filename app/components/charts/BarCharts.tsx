import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { showMoney } from "../utils/showMoney";


const BarCharts = ({
  totalRevenue,
  affiliatePayout,
  monthNames,
}: {
  totalRevenue: number[];
  affiliatePayout: number[];
  monthNames: string[];
}) => {
  const CustomXAxisTick = ({
    x,
    y,
    payload,
  }: {
    x: number;
    y: number;
    payload: { value: string };
  }) => {
    const [month, year] = payload.value.split(" ");
    return (
      <text
        x={x}
        y={y}
        dy={16}
        textAnchor="middle"
        fill="#999999"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {year ? (
           <g transform={`translate(${x},${y})`}>
            {month}
            {/* add spece */}
            {/* <tspan height={1} x={x} dx={5} dy={15} fill="#999999" > </tspan> */}
            {/* add year */}
            <tspan
              style={{
                marginTop: "3px",
                fontSize: "13px",
                // rotate 
                transform: "rotate(90deg)",
                transformOrigin: "center",

              }}
              x={x}
              dx={2}
              dy={18}
              fill="#999999"
              transform="translate(100,100) rotate(90)"
            >
              {year}
            </tspan>
            </g>
        ) : (
          payload.value
        )}
      </text>
    );
  };

  return (
    <>
      <section className="bar-chart">
        <ResponsiveContainer width="100%" height={530}>
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
            <XAxis
              dataKey="name"
              tick={
                <CustomXAxisTick
                  x={0}
                  y={0}
                  payload={{
                    value: "",
                  }}
                />
              }
            />
           
            {/* <Tooltip /> */}
            {/* <Legend  /> */}
            <Bar dataKey="revenue" fill="#cfd6df">
              {totalRevenue.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === totalRevenue.length - 1 ? "#b0cc53" : "#cfd6df"
                  }
                  className="bar-cell"
                />
              ))}
              <LabelList
                
                dataKey="revenue"
                position="top"
                color="#cfd6df"
                formatter={(value: number) => showMoney(value)}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <style>
          {`
            .bar-cell:hover {
              fill: #b0cc53 !important;
              background: transparent;
            }
            .recharts-cartesian-axis-tick-line {
              display: none;
            }
               @media (max-width: 768px) {
            .x-axis-label {
              transform: rotate(90deg);
              transform-origin: center;
              text-anchor: start;
            }
          }
        
            .recharts-surface {
              height: 105% !important;
            }
          `}
        </style>
      </section>
    </>
  );
};

// export function links() {
//   return [{ rel: 'stylesheet', href: styles }];
// }

export default BarCharts;
