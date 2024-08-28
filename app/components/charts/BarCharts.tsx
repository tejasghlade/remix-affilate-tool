import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "aug 2024",
        uv: 4000,
        amt: 2400,
    },
    {
        name : "sep 2024",
        uv : 3000,
        amt : 2210
    },
    {
        name : "oct 2024",
        uv : 2000,
        amt : 2290
    },
    {
        name : "nov 2024",
        uv : 2000,
        amt : 2290
    },
    {
        name : "dec 2024",
        uv : 2000,
        amt : 2290
    },
    {
        name : "jan 2025",
        uv : 2000,
        amt : 2290
    },
    {
        name : "feb 2025",
        uv : 2000,
        amt : 2290
    },
    {
        name :  "mar 2025",
        uv : 2000,
        amt : 2290
    },
    {
        name : "apr 2025",
        uv : 2000,
        amt : 2290
    },
  
];

// const modifiedData = data.map((item) => {
//     return {
//         ...item,
//         name: item.name.replace("2024", "2025"),
//     };
// });

const BarChartComponent: React.FC = () => {
  return (
    <section>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid  strokeDasharray="3 3" /> */}

        <XAxis dataKey="name" hide={true} />
        <YAxis hide={true} />
        <Tooltip />

        {/* <Legend /> */}
        {/* <Bar
          dataKey="pv"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        /> */}
        <Bar
          dataKey="uv"
          fill="#cfd6df"
          activeBar={<Rectangle fill="#b0cc53" baseFrequency={0.1} />}
          values="uv"
        />
      </BarChart>
    </section>
  );
};

export default BarChartComponent;
