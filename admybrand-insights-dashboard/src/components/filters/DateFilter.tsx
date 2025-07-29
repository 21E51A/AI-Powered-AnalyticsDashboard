'use client';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';

export default function DateFilter({ onChange }: { onChange: (range: any) => void }) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  return (
    <DateRange
      editableDateInputs={true}
      onChange={(item) => {
        setRange([item.selection]);
        onChange(item.selection);
      }}
      moveRangeOnFirstSelection={false}
      ranges={range}
    />
  );
}
