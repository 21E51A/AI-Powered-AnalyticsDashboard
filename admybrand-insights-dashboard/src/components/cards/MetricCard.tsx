'use client';

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export type MetricCardProps = {
  title: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down";
  trendPercent?: number;
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  trend,
  trendPercent,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-gray-500 dark:text-gray-400">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </div>
          {trend && trendPercent !== undefined && (
            <div
              className={`flex items-center mt-1 text-sm font-medium ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend === "up" ? "▲" : "▼"} {trendPercent}%
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MetricCard;
