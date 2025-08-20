"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a custom label";



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--text-white)",
  },
  label: {
    color: "var(--text-white)",

  },
};

export function ChartBarStacked({chartData,selectedMonthYear}) {
  return (
    <Card className={"text-zinc-50"}>
      <CardHeader>
        <CardTitle>Monthly Payment Totals</CardTitle>
        <CardDescription>{selectedMonthYear.monthName} {selectedMonthYear.year}</CardDescription>
      </CardHeader>
      <CardContent className={"w-full "}>
        <ChartContainer config={chartConfig} className={"w-full"}>
          <BarChart
          
            data={chartData}
            layout="vertical"
            margin={{ right: 100 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
            
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              
              hide
            />
            <XAxis dataKey="totalAmount" type="number" hide />
            <ChartTooltip
            
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
        
              dataKey="totalAmount"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            
            

            >
              <LabelList
              
                dataKey="month"
                position="insideLeft"
                offset={18}
                className="fill-[var(--color-label)] "
                fontSize={10}
              />
              <LabelList
                dataKey="totalAmount"
                position="right"
                offset={2}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">

      </CardFooter>
    </Card>
  );
}
