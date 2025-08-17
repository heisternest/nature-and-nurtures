"use client";
import { DataTable } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownRight,
  ArrowUpRight,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";

// Mock Data
const totalPostsData = [
  { name: "Week 1", value: 10 },
  { name: "Week 2", value: 15 },
  { name: "Week 3", value: 8 },
  { name: "Week 4", value: 20 },
  { name: "Week 5", value: 18 },
  { name: "Week 6", value: 25 },
];

const viewsData = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 2100 },
  { name: "Mar", value: 1500 },
  { name: "Apr", value: 2800 },
  { name: "May", value: 1800 },
  { name: "Jun", value: 3200 },
];

const likesData = [
  { name: "Jan", value: 300 },
  { name: "Feb", value: 450 },
  { name: "Mar", value: 320 },
  { name: "Apr", value: 600 },
  { name: "May", value: 480 },
  { name: "Jun", value: 700 },
];

const commentsData = [
  { name: "Jan", value: 50 },
  { name: "Feb", value: 80 },
  { name: "Mar", value: 60 },
  { name: "Apr", value: 120 },
  { name: "May", value: 90 },
  { name: "Jun", value: 150 },
];

const blogPosts = [
  {
    id: "#1002",
    title: "Getting Started with React Hooks",
    date: "11 Feb, 2024",
    author: "Wade Warren",
    status: "Published",
    category: "React",
    views: 1250,
    comments: 45,
  },
  {
    id: "#1004",
    title: "A Deep Dive into Tailwind CSS",
    date: "13 Feb, 2024",
    author: "Esther Howard",
    status: "Published",
    category: "CSS",
    views: 2400,
    comments: 82,
  },
  {
    id: "#1007",
    title: "Mastering TypeScript for Large Apps",
    date: "15 Feb, 2024",
    author: "Jenny Wilson",
    status: "Draft",
    category: "TypeScript",
    views: 0,
    comments: 0,
  },
  {
    id: "#1009",
    title: "UI/UX Design Principles for Devs",
    date: "17 Feb, 2024",
    author: "Guy Hawkins",
    status: "Published",
    category: "Design",
    views: 1890,
    comments: 63,
  },
  {
    id: "#1011",
    title: "Building a Blog with Next.js",
    date: "19 Feb, 2024",
    author: "Jacob Jones",
    status: "Draft",
    category: "Next.js",
    views: 0,
    comments: 0,
  },
  {
    id: "#1013",
    title: "State Management in React",
    date: "21 Feb, 2024",
    author: "Kristin Watson",
    status: "Published",
    category: "React",
    views: 3120,
    comments: 112,
  },
  {
    id: "#1015",
    title: "An Introduction to GraphQL",
    date: "23 Feb, 2024",
    author: "Albert Flores",
    status: "Archived",
    category: "API",
    views: 980,
    comments: 30,
  },
  {
    id: "#1018",
    title: "Deploying Apps with Vercel",
    date: "25 Feb, 2024",
    author: "Eleanor Pena",
    status: "Published",
    category: "Deployment",
    views: 1500,
    comments: 55,
  },
  {
    id: "#1019",
    title: "Theming with Shadcn/UI",
    date: "27 Feb, 2024",
    author: "Theresa Webb",
    status: "Draft",
    category: "UI",
    views: 0,
    comments: 0,
  },
];

interface StatCardProps {
  title: string;
  value: string;
  percentage: string;
  data: { name: string; value: number }[];
  chartType: "bar" | "line";
  trend: "up" | "down";
}

const StatCard = ({
  title,
  value,
  percentage,
  data,
  chartType,
  trend,
}: StatCardProps) => {
  const ChartComponent = chartType === "bar" ? BarChart : LineChart;
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500";
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex-1">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <div className={`flex items-center text-xs ${trendColor}`}>
            <TrendIcon className="w-4 h-4 mr-1" />
            <span>{percentage}% last week</span>
          </div>
        </div>
        <div className="w-24 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent data={data}>
              {chartType === "bar" ? (
                <Bar
                  dataKey="value"
                  fill={trend === "up" ? "#10B981" : "#EF4444"}
                  stroke={trend === "up" ? "#10B981" : "#EF4444"}
                  strokeWidth={2}
                />
              ) : (
                <Line
                  dataKey="value"
                  stroke={trend === "up" ? "#10B981" : "#EF4444"}
                  strokeWidth={2}
                  dot={false}
                />
              )}
            </ChartComponent>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses =
    "px-2 py-1 text-xs font-medium rounded-full inline-flex items-center";
  let specificClasses = "";
  switch (status.toLowerCase()) {
    case "published":
      specificClasses =
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      break;
    case "draft":
      specificClasses =
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      break;
    case "archived":
      specificClasses =
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      break;
    default:
      specificClasses =
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
  return (
    <span className={`${baseClasses} ${specificClasses}`}>
      <span
        className={`w-2 h-2 mr-2 rounded-full ${
          status.toLowerCase() === "published"
            ? "bg-green-500"
            : status.toLowerCase() === "draft"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
      ></span>
      {status}
    </span>
  );
};

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Published", "Draft", "Archived"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Blog Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your posts and view analytics.
          </p>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Posts"
            value="84"
            percentage="15.2"
            data={totalPostsData}
            chartType="line"
            trend="up"
          />
          <StatCard
            title="Views over time"
            value="21.4k"
            percentage="22.8"
            data={viewsData}
            chartType="line"
            trend="up"
          />
          <StatCard
            title="Total Likes"
            value="1,280"
            percentage="8.5"
            data={likesData}
            chartType="bar"
            trend="up"
          />
          <StatCard
            title="Total Comments"
            value="321"
            percentage="-3.1"
            data={commentsData}
            chartType="line"
            trend="down"
          />
        </div>

        {/* Blog Posts Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              {/* Tabs and Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                  <TabsList>
                    {tabs.map((tab) => (
                      <TabsTrigger key={tab} value={tab}>
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <button className="ml-2 px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center">
                    <PlusCircle className="w-4 h-4 mr-1" /> Add
                  </button>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-grow sm:flex-grow-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search posts..."
                      className="pl-9 pr-3 py-2 w-full sm:w-48 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4h18M7 8h10M10 12h4"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M4.222 4.222l1.414 1.414m12.728 0l-1.414 1.414M5.636 18.364l-1.414 1.414"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              {tabs.map((tab) => {
                const dataForTab =
                  tab === "All"
                    ? blogPosts
                    : blogPosts.filter((p) => p.status === tab);
                return (
                  <TabsContent key={tab} value={tab}>
                    <DataTable<Post>
                      data={dataForTab as Post[]}
                      columns={columns}
                    />
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

type Post = {
  id: string;
  title: string;
  date: string;
  author: string;
  status: string;
  category: string;
  views: number;
  comments: number;
};

const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Post Title",
    cell: (info) => (
      <div className="font-medium">{info.getValue<string>()}</div>
    ),
  },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "author", header: "Author" },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => <StatusBadge status={info.getValue<string>()} />,
  },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "views",
    header: "Views",
    cell: (info) => (
      <div className="text-right">
        {info.getValue<number>().toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: (info) => <div className="text-right">{info.getValue<number>()}</div>,
  },
  {
    id: "actions",
    header: "Action",
    cell: () => (
      <div className="flex justify-center">
        <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];
