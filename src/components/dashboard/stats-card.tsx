import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { ArrowUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { Badge } from "../ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const revenueData = [
  { name: "Jan", value: 280 },
  { name: "Feb", value: 400 },
  { name: "Mar", value: 300 },
  { name: "Apr", value: 600 },
  { name: "May", value: 200 },
  { name: "Jun", value: 500 },
];

const salesData = [
  { name: "Jan", value: 250 },
  { name: "Feb", value: 350 },
  { name: "Mar", value: 700 },
  { name: "Apr", value: 400 },
  { name: "May", value: 300 },
  { name: "Jun", value: 400 },
];

const customersData = [
  { name: "Jan", value: 150 },
  { name: "Feb", value: 550 },
  { name: "Mar", value: 400 },
  { name: "Apr", value: 200 },
  { name: "May", value: 250 },
  { name: "Jun", value: 600 },
];

interface StatCardProps {
  title: string;
  value: string;
  percentage: number;
  from: string;
  data: Array<{ name: string; value: number }>;
  chartColor: string;
}

interface TinyChartProps {
  data: Array<{ name: string; value: number }>;
  strokeColor: string;
}

const TinyChart = ({ data, strokeColor }: TinyChartProps) => (
  <div className="h-20 w-full">
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937", // bg-gray-800
            borderColor: "#374151", // border-gray-700
            color: "#ffffff",
            borderRadius: "0.5rem",
            fontSize: "12px",
            padding: "4px 8px",
          }}
          labelStyle={{ display: "none" }}
          itemStyle={{ color: "#ffffff" }}
          formatter={(value) => [`$${value.toLocaleString()}`]}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2.5}
          dot={false}
          activeDot={{
            r: 6,
            fill: strokeColor,
            strokeWidth: 2,
            stroke: "#ffffff",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const CongratsCard = () => (
  <div className="relative bg-gray-50 p-6 rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
    <div
      className="absolute -top-10 -right-10 text-8xl opacity-10"
      aria-hidden="true"
    >
      🎉
    </div>
    <div className="relative z-10 flex flex-col flex-grow justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">
          Congratulations Toby! 🎉
        </h3>
        <p className="text-sm text-gray-500 mt-1">Best seller of the month</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900 mt-4">$15,231.89</p>
        <div className="flex items-center text-sm text-green-600 font-medium mt-1">
          <ArrowUp className="h-4 w-4 mr-1" />
          <span>+65% from last month</span>
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({
  title,
  value,
  percentage,
  from,
  data,
  chartColor,
}: StatCardProps) => {
  const isPositive = percentage > 0;
  return (
    // <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full flex flex-col justify-between">
    //   <div>
    //     <div className="flex justify-between items-start">
    //       <h4 className="text-base font-medium text-gray-600">{title}</h4>
    //     </div>
    //     <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
    //   </div>
    //   <TinyChart data={data} strokeColor={chartColor} />
    // </div>

    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            {isPositive ? <IconTrendingUp /> : <IconTrendingDown />}
            {isPositive ? (
              <span>+{percentage.toFixed(1)}%</span>
            ) : (
              <span>{percentage.toFixed(1)}%</span>
            )}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start  text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {isPositive ? (
            <>
              Trending up this month <IconTrendingUp className="size-4" />
            </>
          ) : (
            <>
              Trending down this month <IconTrendingDown className="size-4" />
            </>
          )}
        </div>
        <TinyChart data={data} strokeColor={chartColor} />
      </CardFooter>
    </Card>
  );
};

export function StatsCards() {
  return (
    <div className="  mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Congrats Card */}
          <div className="md:col-span-1">
            <CongratsCard />
          </div>

          {/* Stat Cards */}
          <StatCard
            title="Revenue"
            value="$125,231"
            percentage={20.1}
            from="month"
            data={revenueData}
            chartColor="#3b82f6" // blue-500
          />
          <StatCard
            title="Sales"
            value="20K"
            percentage={-1.7}
            from="month"
            data={salesData}
            chartColor="#8b5cf6" // violet-500
          />
          <StatCard
            title="New Customers"
            value="3602"
            percentage={36.5}
            from="month"
            data={customersData}
            chartColor="#10b981" // emerald-500
          />
        </div>
      </div>
    </div>
  );
}
