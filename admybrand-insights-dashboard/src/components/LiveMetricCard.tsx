'use client';
import { useEffect, useState } from 'react';
import MetricCard from "@/components/cards/MetricCard";


export default function LiveMetricCard() {
  const [revenue, setRevenue] = useState(1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue((prev) => prev + Math.floor(Math.random() * 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return <MetricCard title="Revenue" value={revenue} />;
}
