import { ArrowRight, ArrowUp, Download, Star } from "lucide-react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock Data
const totalRevenueData = [
  { name: "Jan", desktop: 4000, mobile: 2400 },
  { name: "Feb", desktop: 3000, mobile: 1398 },
  { name: "Mar", desktop: 2000, mobile: 9800 },
  { name: "Apr", desktop: 2780, mobile: 3908 },
  { name: "May", desktop: 1890, mobile: 4800 },
  { name: "Jun", desktop: 2390, mobile: 3800 },
];

const returningRateData = [
  { name: "Mar", value: 2400 },
  { name: "Apr", value: 1398 },
  { name: "May", value: 9800 },
  { name: "Jun", value: 3908 },
  { name: "Jul", value: 4800 },
  { name: "Aug", value: 3800 },
  { name: "Sep", value: 4300 },
  { name: "Oct", value: 2100 },
  { name: "Nov", value: 3200 },
  { name: "Dec", value: 1800 },
];

const salesByLocationData = [
  { name: "Canada", value: 85, change: 5.2, color: "bg-green-500" },
  { name: "Greenland", value: 80, change: 7.8, color: "bg-green-500" },
  { name: "Russia", value: 63, change: -2.1, color: "bg-red-500" },
  { name: "China", value: 60, change: 3.4, color: "bg-green-500" },
  { name: "Australia", value: 45, change: 1.2, color: "bg-green-500" },
  { name: "Greece", value: 40, change: 1, color: "bg-green-500" },
];

const storeVisitsData = [
  { name: "Direct", value: 400 },
  { name: "Social", value: 300 },
  { name: "Email", value: 200 },
  { name: "Referrals", value: 278 },
  { name: "Other", value: 189 },
];

const COLORS = ["#1f2937", "#4b5563", "#9ca3af", "#d1d5db", "#e5e7eb"];

const customerReviewsData = {
  average: 4.5,
  total: 5500,
  ratings: [
    { stars: 5, count: 4000, color: "bg-green-500" },
    { stars: 4, count: 2100, color: "bg-green-400" },
    { stars: 3, count: 800, color: "bg-yellow-400" },
    { stars: 2, count: 631, color: "bg-orange-500" },
    { stars: 1, count: 344, color: "bg-red-500" },
  ],
};

// Main App Component
export function StatsChart() {
  return (
    <div className="text-gray-900 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Dashboard Area */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TotalRevenueCard />
          <ReturningRateCard />
        </div>
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <SalesByLocationCard />
          <StoreVisitsCard />
          <CustomerReviewsCard />
        </div>
      </div>
    </div>
  );
}

// Card Components
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`p-4 sm:p-6 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-4 sm:p-6 ${className}`}>{children}</div>;

const Button = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "ghost";
  className?: string;
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    default:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300",
    ghost: "hover:bg-gray-100",
  };
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Progress = ({
  value,
  colorClassName,
}: {
  value: number;
  colorClassName: string;
}) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className={`${colorClassName} h-2 rounded-full`}
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

// Dashboard Card Components
function TotalRevenueCard() {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-800">Total Revenue</h3>
        <p className="text-sm text-gray-500">Income in the last 28 days</p>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={totalRevenueData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  hide
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    color: "#1f2937",
                  }}
                />
                <Bar
                  dataKey="desktop"
                  fill="#1f2937"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
                <Bar
                  dataKey="mobile"
                  fill="#9ca3af"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex md:flex-col justify-around md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
          <div>
            <p className="text-sm text-gray-500">Desktop</p>
            <p className="text-2xl font-bold">24,828</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mobile</p>
            <p className="text-2xl font-bold">25,010</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReturningRateCard() {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Returning Rate
          </h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">$42,379</p>
            <span className="text-sm font-semibold text-green-600 flex items-center">
              <ArrowUp className="w-4 h-4" />
              +2.5%
            </span>
          </div>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={returningRateData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                hide
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  color: "#1f2937",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1f2937"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#9ca3af"
                strokeWidth={2}
                dot={false}
                transform="translate(0, -20)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function SalesByLocationCard() {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Sales by Location
          </h3>
          <p className="text-sm text-gray-500">Income in the last 28 days</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {salesByLocationData.map((item) => (
            <li key={item.name} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.name}</span>
                  <span
                    className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                      item.change > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.change > 0 ? "+" : ""}
                    {item.change}%
                  </span>
                </div>
                <span className="text-gray-500">{item.value}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-gray-800 h-1.5 rounded-full"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function StoreVisitsCard() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-800">
          Store Visits by Source
        </h3>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={storeVisitsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {storeVisitsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  color: "#1f2937",
                }}
              />
              <Legend
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function CustomerReviewsCard() {
  const maxCount = Math.max(...customerReviewsData.ratings.map((r) => r.count));
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Customer Reviews
          </h3>
          <p className="text-sm text-gray-500">
            Based on 5,500 verified purchases
          </p>
        </div>
        <Button variant="ghost" className="text-sm font-semibold text-gray-700">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">
                {customerReviewsData.average}
              </span>
            </div>
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(customerReviewsData.average)
                      ? "fill-current"
                      : "fill-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">out of 5</p>
          </div>
          <div className="flex-1 space-y-2">
            {customerReviewsData.ratings.map((rating) => (
              <div
                key={rating.stars}
                className="flex items-center gap-2 text-sm"
              >
                <span className="w-4 text-center">{rating.stars}</span>
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <div className="flex-1">
                  <Progress
                    value={(rating.count / maxCount) * 100}
                    colorClassName={rating.color}
                  />
                </div>
                <span className="w-10 text-right text-gray-500">
                  {rating.count}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500">March 12, 2025</p>
          </div>
          <h4 className="font-semibold mt-2">Exceeded my expectations!</h4>
          <p className="text-sm text-gray-600 mt-1">
            I was skeptical at first, but this product has completely changed my
            daily routine. The quality is outstanding and it&apos;s so easy to
            use.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <p className="text-sm font-semibold">Sarah J.</p>
            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Verified Purchase
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
